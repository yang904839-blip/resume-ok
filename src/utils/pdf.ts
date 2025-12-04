import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

/** 下载简历为 PDF - 智能分页，避免内容被裁切 */
export const downloadPDF = async (filename: string = 'resume') => {
  const element = document.querySelector('.resume-preview > div') as HTMLElement;
  if (!element) {
    throw new Error('Resume preview element not found');
  }

  // 临时移除阴影和圆角，确保PDF干净
  const originalBoxShadow = element.style.boxShadow;
  const originalBorderRadius = element.style.borderRadius;
  const originalOverflow = element.style.overflow;
  element.style.boxShadow = 'none';
  element.style.borderRadius = '0';
  element.style.overflow = 'visible';

  // 临时调整为自动高度以捕获所有内容
  const originalHeight = element.style.height;
  element.style.height = 'auto';

  // 使用 html2canvas 捕获元素
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#ffffff',
    logging: false,
    removeContainer: true,
  });

  // 恢复原始样式
  element.style.boxShadow = originalBoxShadow;
  element.style.borderRadius = originalBorderRadius;
  element.style.overflow = originalOverflow;
  element.style.height = originalHeight;

  // A4 尺寸配置
  const imgWidth = 210; // A4 宽度（mm）
  const pageHeight = 297; // A4 高度（mm）
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
  // 创建 PDF
  const pdf = new jsPDF('p', 'mm', 'a4');
  
  // 如果内容高度小于等于一页
  if (imgHeight <= pageHeight) {
    const imgData = canvas.toDataURL('image/png');
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
  } else {
    // 内容超过一页，需要分页
    const pageCanvas = document.createElement('canvas');
    const pageCtx = pageCanvas.getContext('2d');
    
    if (!pageCtx) {
      throw new Error('Canvas context not available');
    }
    
    // 计算每页的像素高度
    const pageHeightInPixels = (canvas.width * pageHeight) / imgWidth;
    const totalPages = Math.ceil(canvas.height / pageHeightInPixels);
    
    pageCanvas.width = canvas.width;
    pageCanvas.height = pageHeightInPixels;
    
    for (let page = 0; page < totalPages; page++) {
      // 清空画布
      pageCtx.fillStyle = '#ffffff';
      pageCtx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
      
      // 计算当前页的源位置
      const sourceY = page * pageHeightInPixels;
      const sourceHeight = Math.min(pageHeightInPixels, canvas.height - sourceY);
      
      // 绘制当前页内容
      pageCtx.drawImage(
        canvas,
        0, sourceY, canvas.width, sourceHeight,
        0, 0, pageCanvas.width, sourceHeight
      );
      
      const pageImgData = pageCanvas.toDataURL('image/png');
      
      if (page > 0) {
        pdf.addPage();
      }
      
      // 计算实际图片高度（最后一页可能不足一页高度）
      const actualImgHeight = (sourceHeight * imgWidth) / canvas.width;
      pdf.addImage(pageImgData, 'PNG', 0, 0, imgWidth, actualImgHeight);
    }
  }

  // 保存 PDF
  pdf.save(`${filename}.pdf`);
};

/** 打印简历 */
export const printResume = () => {
  window.print();
};
