/** 复制文本到剪贴板 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const success = document.execCommand('copy');
      textArea.remove();
      return success;
    }
  } catch (error) {
    console.error('Failed to copy text: ', error);
    return false;
  }
};

/** 导出数据到本地文件 */
export const exportToLocal = (data: string, filename: string) => {
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/** 从本地文件读取数据 */
export const importFromLocal = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result === 'string') {
        resolve(result);
      } else {
        reject(new Error('Failed to read file'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
};

/** 检测设备类型 */
export const getDevice = (): 'mobile' | 'desktop' => {
  const userAgent = navigator.userAgent.toLowerCase();
  const mobileKeywords = ['android', 'iphone', 'ipad', 'mobile'];
  return mobileKeywords.some((keyword) => userAgent.includes(keyword))
    ? 'mobile'
    : 'desktop';
};

/** 压缩数据 */
export const compressData = async (data: string): Promise<string> => {
  const { default: LZString } = await import('lz-string');
  return LZString.compressToEncodedURIComponent(data);
};

/** 解压数据 */
export const decompressData = async (compressed: string): Promise<string> => {
  const { default: LZString } = await import('lz-string');
  return LZString.decompressFromEncodedURIComponent(compressed) || '';
};

/** 生成分享链接 */
export const generateShareLink = async (data: object): Promise<string> => {
  const jsonString = JSON.stringify(data);
  const compressed = await compressData(jsonString);
  const url = new URL(window.location.href);
  url.searchParams.set('data', compressed);
  return url.toString();
};

/** 从 URL 参数解析数据 */
export const parseDataFromUrl = async (): Promise<object | null> => {
  const params = new URLSearchParams(window.location.search);
  const data = params.get('data');
  if (!data) return null;
  
  try {
    const decompressed = await decompressData(data);
    return JSON.parse(decompressed);
  } catch (error) {
    console.error('Failed to parse data from URL:', error);
    return null;
  }
};

/** 深度合并对象 */
export const deepMerge = <T extends Record<string, any>>(
  target: T,
  ...sources: Partial<T>[]
): T => {
  if (!sources.length) return target;
  const source = sources.shift();

  if (source) {
    for (const key in source) {
      const sourceValue = source[key];
      const targetValue = target[key];

      if (
        sourceValue &&
        typeof sourceValue === 'object' &&
        !Array.isArray(sourceValue)
      ) {
        if (!targetValue || typeof targetValue !== 'object') {
          target[key] = {} as any;
        }
        target[key] = deepMerge(targetValue, sourceValue);
      } else {
        target[key] = sourceValue as any;
      }
    }
  }

  return deepMerge(target, ...sources);
};
