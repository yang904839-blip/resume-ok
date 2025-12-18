import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

/**
 * 下载简历为 PDF - 基于多页面架构
 * 逐页截图并合并成多页PDF
 */
// 导出的 PDF 下载函数，增加进度回调
export const downloadPDF = async (
  filename: string = 'resume',
  onProgress?: (current: number, total: number) => void
) => {
  // 获取所有 A4 页面元素
  const pages = document.querySelectorAll('.a4-page') as NodeListOf<HTMLElement>;
  
  if (pages.length === 0) {
    throw new Error('No pages found to export');
  }

  console.log(`[PDF Export] Found ${pages.length} pages to export`);

  // 创建 PDF 文档
  // A4 尺寸：794px × 1123px (72 DPI)
  // 这里的尺寸是像素单位，对应于 CSS 中的尺寸
  const pdf = new jsPDF({
    unit: 'px',
    format: [794, 1123],
    orientation: 'portrait',
    compress: true,
  });

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    const pageContent = page.querySelector('.page-content') as HTMLElement;
    
    // 通知进度
    if (onProgress) {
      onProgress(i + 1, pages.length);
    }
    
    console.log(`[PDF Export] Capturing page ${i + 1}/${pages.length}`);

    // 保存原始样式
    const originalPageStyles = {
      boxShadow: page.style.boxShadow,
      borderRadius: page.style.borderRadius,
      overflow: page.style.overflow,
      transform: page.style.transform,
    };
    
    const originalContentStyles = pageContent ? {
      overflow: pageContent.style.overflow,
      height: pageContent.style.height,
    } : null;

    // 临时移除样式，确保完整截图
    page.style.boxShadow = 'none';
    page.style.borderRadius = '0';
    page.style.overflow = 'visible'; // 关键：允许内容溢出以便截图
    page.style.transform = 'none'; // 防止变换导致截图偏移
    
    if (pageContent) {
      pageContent.style.overflow = 'visible';
      pageContent.style.height = 'auto'; // 确保内容完全展示
    }

    try {
      // 等待一小段时间确保样式应用和图片加载
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // 截图当前页面
      const canvas = await html2canvas(page, {
        scale: 2, // 高清截图
        useCORS: true, // 允许跨域图片
        allowTaint: false, // 必须为 false，否则 toDataURL 会报错
        // backgroundColor: '#ffffff', // 强制背景色
        backgroundColor: null, // 透明背景，或者使用页面的背景
        logging: true,
        removeContainer: true,
        width: 794,
        height: 1123,
        windowWidth: 794,
        windowHeight: 1123,
        // 忽略可能导致报错的元素
        ignoreElements: (element) => {
          return element.classList.contains('no-print');
        }
      });

      // 恢复原始样式
      page.style.boxShadow = originalPageStyles.boxShadow;
      page.style.borderRadius = originalPageStyles.borderRadius;
      page.style.overflow = originalPageStyles.overflow;
      page.style.transform = originalPageStyles.transform;
      
      if (pageContent && originalContentStyles) {
        pageContent.style.overflow = originalContentStyles.overflow;
        pageContent.style.height = originalContentStyles.height;
      }

      // 检查 Canvas 有效性
      if (canvas.width === 0 || canvas.height === 0) {
        throw new Error(`Page ${i + 1} capture failed: Empty canvas`);
      }

      const imgData = canvas.toDataURL('image/png');

      // 添加新页（第一页除外）
      if (i > 0) {
        pdf.addPage();
      }

      // 添加图片到PDF
      pdf.addImage(imgData, 'PNG', 0, 0, 794, 1123, undefined, 'FAST');
      
      console.log(`[PDF Export] Page ${i + 1} added successfully`);
    } catch (error) {
      // 恢复样式（异常无论如何都要恢复）
      page.style.boxShadow = originalPageStyles.boxShadow;
      page.style.borderRadius = originalPageStyles.borderRadius;
      page.style.overflow = originalPageStyles.overflow;
      page.style.transform = originalPageStyles.transform;
      
      if (pageContent && originalContentStyles) {
        pageContent.style.overflow = originalContentStyles.overflow;
        pageContent.style.height = originalContentStyles.height;
      }
      
      console.error(`[PDF Export] Error capturing page ${i + 1}:`, error);
      throw error; // 继续抛出，中断导出
    }
  }

  // 保存 PDF
  console.log('[PDF Export] Generating Blob...');
  try {
    const blob = pdf.output('blob');
    console.log(`[PDF Export] Blob generated. Size: ${blob.size} bytes`);
    
    if (blob.size < 100) {
        throw new Error('Generated PDF is empty');
    }

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.pdf`;
    document.body.appendChild(link);
    link.click();
    
    // 清理 (延长到 60s，防止下载未开始就被回收)
    setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }, 60000);
    
    console.log(`[PDF Export] Download triggered for ${filename}.pdf`);
  } catch (error) {
    console.error('[PDF Export] Error saving PDF file:', error);
    throw new Error('Failed to save PDF file: ' + (error instanceof Error ? error.message : String(error)));
  }
};

/** 打印简历 */
export const printResume = () => {
  window.print();
};
