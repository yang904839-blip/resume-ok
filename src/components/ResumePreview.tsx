import React, { useState, useRef, useEffect } from 'react';
import { useResumeStore } from '@/store';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import Template1 from './templates/Template1';
import Template2 from './templates/Template2';
import Template3 from './templates/Template3';
import Template4 from './templates/Template4';
import Template5 from './templates/Template5';
import Template6 from './templates/Template6';
import Template7 from './templates/Template7';
import Template8 from './templates/Template8';
import Template9 from './templates/Template9';
import Template10 from './templates/Template10';
import Template11 from './templates/Template11';
import Template12 from './templates/Template12';
import Template13 from './templates/Template13';
import Template14 from './templates/Template14';
import Template15 from './templates/Template15';
import Template16 from './templates/Template16';
import Template17 from './templates/Template17';
import Template18 from './templates/Template18';
import Template19 from './templates/Template19';
import Template20 from './templates/Template20';
import Template21 from './templates/Template21';
import Template22 from './templates/Template22';
import Template23 from './templates/Template23';
import Template24 from './templates/Template24';
import Template25 from './templates/Template25';
import Template26 from './templates/Template26';
import Template27 from './templates/Template27';
import Template28 from './templates/Template28';
import Template29 from './templates/Template29';
import Template30 from './templates/Template30';
import Template31 from './templates/Template31';
import Template32 from './templates/Template32';
import Template33 from './templates/Template33';
import Template34 from './templates/Template34';
import Template35 from './templates/Template35';
import Template36 from './templates/Template36';
import Template37 from './templates/Template37';
import Template38 from './templates/Template38';
import Template39 from './templates/Template39';
import Template40 from './templates/Template40';

const ResumePreview: React.FC = () => {
  const { template, resumeData } = useResumeStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageBreaks, setPageBreaks] = useState<number[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);

  const renderTemplate = () => {
    switch (template) {
      case 'template1':
        return <Template1 />;
      case 'template2':
        return <Template2 />;
      case 'template3':
        return <Template3 />;
      case 'template4':
        return <Template4 />;
      case 'template5':
        return <Template5 />;
      case 'template6':
        return <Template6 />;
      case 'template7':
        return <Template7 />;
      case 'template8':
        return <Template8 />;
      case 'template9':
        return <Template9 />;
      case 'template10':
        return <Template10 />;
      case 'template11':
        return <Template11 />;
      case 'template12':
        return <Template12 />;
      case 'template13':
        return <Template13 />;
      case 'template14':
        return <Template14 />;
      case 'template15':
        return <Template15 />;
      case 'template16':
        return <Template16 />;
      case 'template17':
        return <Template17 />;
      case 'template18':
        return <Template18 />;
      case 'template19':
        return <Template19 />;
      case 'template20':
        return <Template20 />;
      case 'template21':
        return <Template21 />;
      case 'template22':
        return <Template22 />;
      case 'template23':
        return <Template23 />;
      case 'template24':
        return <Template24 />;
      case 'template25':
        return <Template25 />;
      case 'template26':
        return <Template26 />;
      case 'template27':
        return <Template27 />;
      case 'template28':
        return <Template28 />;
      case 'template29':
        return <Template29 />;
      case 'template30':
        return <Template30 />;
      case 'template31':
        return <Template31 />;
      case 'template32':
        return <Template32 />;
      case 'template33':
        return <Template33 />;
      case 'template34':
        return <Template34 />;
      case 'template35':
        return <Template35 />;
      case 'template36':
        return <Template36 />;
      case 'template37':
        return <Template37 />;
      case 'template38':
        return <Template38 />;
      case 'template39':
        return <Template39 />;
      case 'template40':
        return <Template40 />;
      default:
        return <Template1 />;
    }
  };

  // 智能分页 - 确保标题和内容不在页尾被裁切
  useEffect(() => {
    const calculateSmartPages = () => {
      if (!contentRef.current) return;
      
      const templateContent = contentRef.current.querySelector('.resume-template-content');
      if (!templateContent) {
        console.log('No .resume-template-content found');
        return;
      }
      
      const pageHeight = 1123; // A4 高度
      const contentHeight = (templateContent as HTMLElement).scrollHeight;
      const minBottomSpace = 60; // 页尾至少保留60px，不足则将内容移到下一页
      
      // 基础分页：按内容高度计算
      const basePages = Math.ceil(contentHeight / pageHeight);
      const breaks: number[] = [];
      
      for (let i = 0; i < basePages; i++) {
        breaks.push(i * pageHeight);
      }
      
      console.log(`Content height: ${contentHeight}px, Base pages: ${basePages}`);
      
      // 获取所有需要保护的元素（标题、段落等）
      const protectedElements = Array.from(
        templateContent.querySelectorAll('h1, h2, h3, h4, p, li, div.mb-2, div.mb-4, div.mb-6, div.mb-8')
      ).filter((el: Element) => {
        const element = el as HTMLElement;
        return element.offsetHeight > 0 && element.textContent?.trim().length > 0;
      });
      
      console.log(`Found ${protectedElements.length} protected elements to check`);
      
      // 检查每个分页边界
      for (let i = 1; i < breaks.length; i++) {
        const breakPoint = breaks[i];
        let adjusted = false;
        
        // 检查所有受保护的元素
        for (const element of protectedElements) {
          const el = element as HTMLElement;
          const isHeading = el.tagName.match(/^H[1-4]$/);
          
          // 计算元素位置
          let offsetTop = 0;
          let current: HTMLElement | null = el;
          while (current && current !== templateContent) {
            offsetTop += current.offsetTop;
            current = current.offsetParent as HTMLElement;
          }
          
          const elementHeight = el.offsetHeight;
          const elementBottom = offsetTop + elementHeight;
          
          // 情况1: 元素会被分页点裁切
          if (offsetTop < breakPoint && elementBottom > breakPoint) {
            // 将分页点移到元素前面
            breaks[i] = offsetTop;
            console.log(`Adjusted break ${i} to ${offsetTop}px (${el.tagName} would be cut)`);
            adjusted = true;
            break;
          }
          
          // 情况2: 元素在页面底部，空间不足
          const prevBreak = breaks[i - 1];
          if (offsetTop >= prevBreak && offsetTop < breakPoint) {
            const distanceFromBottom = breakPoint - offsetTop;
            // 如果元素距离页底太近（不足minBottomSpace）或标题会被孤立
            if (distanceFromBottom < minBottomSpace || (isHeading && distanceFromBottom < elementHeight + 20)) {
              // 将这个元素移到下一页
              breaks[i] = offsetTop;
              console.log(`Adjusted break ${i} to ${offsetTop}px (${el.tagName} too close to bottom, ${distanceFromBottom}px remaining)`);
              adjusted = true;
              break;
            }
          }
        }
        
        if (adjusted) {
          // 重新排序并去重
          breaks.sort((a, b) => a - b);
          const uniqueBreaks = Array.from(new Set(breaks));
          breaks.length = 0;
          breaks.push(...uniqueBreaks);
        }
      }
      
      const pages = breaks.length;
      console.log(`Total pages: ${pages}, page breaks at:`, breaks);
      
      setPageBreaks(breaks);
      setTotalPages(pages);
      
      if (currentPage > pages) {
        setCurrentPage(1);
      }
    };

    // 延迟计算，等待内容完全渲染
    const timer = setTimeout(calculateSmartPages, 800);
    
    window.addEventListener('resize', calculateSmartPages);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', calculateSmartPages);
    };
  }, [template, resumeData]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="space-y-6">
      {/* 页面导航 */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-4 bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-sm sticky top-0 z-10">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`flex items-center space-x-1 px-4 py-2 rounded-lg transition-all duration-200 ${
              currentPage === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600 active:scale-95'
            }`}
          >
            <ChevronLeftIcon className="w-4 h-4" />
            <span>上一页</span>
          </button>

          <div className="flex items-center space-x-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageClick(page)}
                className={`w-10 h-10 rounded-lg transition-all duration-200 ${
                  currentPage === page
                    ? 'bg-blue-500 text-white shadow-lg scale-110'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`flex items-center space-x-1 px-4 py-2 rounded-lg transition-all duration-200 ${
              currentPage === totalPages
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600 active:scale-95'
            }`}
          >
            <span>下一页</span>
            <ChevronRightIcon className="w-4 h-4" />
          </button>

          <div className="ml-4 text-sm text-gray-600 font-medium">
            第 {currentPage} / {totalPages} 页
          </div>
        </div>
      )}

      {/* 简历内容 - 分页显示 */}
      <div className="relative flex justify-center">
        <div 
          className="relative bg-white shadow-2xl rounded-lg overflow-hidden"
          style={{
            width: '794px',
            height: '1123px',
          }}
        >
          {/* 第2页及以后添加顶部padding */}
          {currentPage > 1 && (
            <div 
              className="absolute top-0 left-0 right-0 bg-white pointer-events-none z-10"
              style={{ height: '20px' }}
            />
          )}
          
          <div 
            className="resume-preview animate-fade-in w-full h-full overflow-hidden"
          >
            <div
              ref={contentRef}
              style={{
                transform: `translateY(calc(-${pageBreaks[currentPage - 1] || 0}px + ${currentPage > 1 ? '20px' : '0px'}))`,
                transition: 'transform 0.3s ease-in-out',
                paddingTop: currentPage > 1 ? '20px' : '0',
                paddingBottom: '20px',
              }}
            >
              {renderTemplate()}
            </div>
          </div>
          
          {/* 所有页面添加底部padding */}
          <div 
            className="absolute bottom-0 left-0 right-0 bg-white pointer-events-none z-10"
            style={{ height: '20px' }}
          />
          
          {/* 页面指示水印 */}
          <div className="absolute bottom-4 right-4 bg-black/5 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-gray-400 pointer-events-none z-20">
            Page {currentPage}
          </div>
        </div>
      </div>

      {/* 页面指示器（底部） */}
      {totalPages > 1 && (
        <div className="flex justify-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm">
            <span className="text-sm text-gray-600">
              {currentPage} / {totalPages}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumePreview;
