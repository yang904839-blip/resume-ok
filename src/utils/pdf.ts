import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

/**
 * 下载简历为 PDF - 基于多页面架构
 * 逐页截图并合并成多页PDF
 */
export const downloadPDF = async (filename: string = 'resume') => {
  // 获取所有 A4 页面元素
  const pages = document.querySelectorAll('.a4-page') as NodeListOf<HTMLElement>;
  
  if (pages.length === 0) {
    throw new Error('No pages found to export');
  }

  console.log(`[PDF Export] Found ${pages.length} pages to export`);

  // 创建 PDF 文档
  // A4 尺寸：794px × 1123px (72 DPI)
  const pdf = new jsPDF({
    unit: 'px',
    format: [794, 1123],
    compress: true,
  });

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    const pageContent = page.querySelector('.page-content') as HTMLElement;
    
    console.log(`[PDF Export] Capturing page ${i + 1}/${pages.length}`);

    // 保存原始样式
    const originalPageStyles = {
      boxShadow: page.style.boxShadow,
      borderRadius: page.style.borderRadius,
      overflow: page.style.overflow,
    };
    
    const originalContentStyles = pageContent ? {
      overflow: pageContent.style.overflow,
      height: pageContent.style.height,
    } : null;

    // 临时移除样式，确保完整截图
    page.style.boxShadow = 'none';
    page.style.borderRadius = '0';
    page.style.overflow = 'visible'; // 关键：允许内容溢出以便截图
    
    if (pageContent) {
      pageContent.style.overflow = 'visible';
      pageContent.style.height = 'auto';
    }

    try {
      // 等待一小段时间确保样式应用
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // 截图当前页面
      const canvas = await html2canvas(page, {
        scale: 2, // 高清截图
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
        removeContainer: true,
        width: 794,
        height: 1123,
        windowWidth: 794,
        windowHeight: 1123,
      });

      // 恢复原始样式
      page.style.boxShadow = originalPageStyles.boxShadow;
      page.style.borderRadius = originalPageStyles.borderRadius;
      page.style.overflow = originalPageStyles.overflow;
      
      if (pageContent && originalContentStyles) {
        pageContent.style.overflow = originalContentStyles.overflow;
        pageContent.style.height = originalContentStyles.height;
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
      // 恢复样式
      page.style.boxShadow = originalPageStyles.boxShadow;
      page.style.borderRadius = originalPageStyles.borderRadius;
      page.style.overflow = originalPageStyles.overflow;
      
      if (pageContent && originalContentStyles) {
        pageContent.style.overflow = originalContentStyles.overflow;
        pageContent.style.height = originalContentStyles.height;
      }
      
      console.error(`[PDF Export] Error capturing page ${i + 1}:`, error);
      throw error;
    }
  }

  // 保存 PDF
  pdf.save(`${filename}.pdf`);
  console.log(`[PDF Export] PDF saved as ${filename}.pdf`);
};

/** 打印简历 */
export const printResume = () => {
  window.print();
};
