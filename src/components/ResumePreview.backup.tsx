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

  // 智能分页 - 按照用户新思路：顺序计算 + 裁切检测
  useEffect(() => {
    const calculateSmartPages = () => {
      if (!contentRef.current) return;
      
      const templateContent = contentRef.current.querySelector('.resume-template-content');
      if (!templateContent) {
        return;
      }
      
      const A4_HEIGHT = 1123;
      const PAGE_MARGIN = 20;
      
      // 第1页可视高度 = 1123 - 20 (下边距)
      const PAGE1_VISIBLE = A4_HEIGHT - PAGE_MARGIN;
      // 其他页可视高度 = 1123 - 20 (上边距) - 20 (下边距)
      const OTHER_PAGE_VISIBLE = A4_HEIGHT - PAGE_MARGIN * 2;
      
      const contentHeight = (templateContent as HTMLElement).scrollHeight;
      
      // 1. 获取所有文本元素并计算位置
      // 1. 获取所有文本元素并计算位置
      const textElements = Array.from(
        templateContent.querySelectorAll('*')
      ).filter((el: Element) => {
        const element = el as HTMLElement;
        const hasHeight = element.offsetHeight > 0;
        
        // 检查是否有直接的非空文本子节点
        const hasDirectText = Array.from(element.childNodes).some(
          node => node.nodeType === Node.TEXT_NODE && node.textContent?.trim().length! > 0
        );
        
        // 或者是特定的可视元素
        const isVisualElement = ['IMG', 'HR', 'SVG'].includes(element.tagName);
        
        return hasHeight && (hasDirectText || isVisualElement);
      }).map((el) => {
        const element = el as HTMLElement;
        let offsetTop = 0;
        let current: HTMLElement | null = element;
        while (current && current !== templateContent) {
          offsetTop += current.offsetTop;
          current = current.offsetParent as HTMLElement;
        }
        return {
          top: offsetTop,
          bottom: offsetTop + element.offsetHeight,
          tag: element.tagName,
          text: element.textContent?.substring(0, 20) // 用于调试
        };
      }).sort((a, b) => a.top - b.top);
      
      // 2. 顺序计算分页点
      const breaks: number[] = [0];
      
      // 用户指定的行高常量
      // 用户指定的行高常量
      const LINE_HEIGHT_TEXT = 39;
      const LINE_HEIGHT_SMALL_TITLE = 28.2;
      const LINE_HEIGHT_BIG_TITLE = 48;
      
      while (true) {
        const currentPageIndex = breaks.length - 1;
        const currentStart = breaks[currentPageIndex];
        
        // 计算当前页理论终点
        const capacity = currentPageIndex === 0 ? PAGE1_VISIBLE : OTHER_PAGE_VISIBLE;
        const targetEnd = currentStart + capacity;
        
        if (targetEnd >= contentHeight) {
          break;
        }
        
        let actualBreak = targetEnd;
        let settled = false;
        
        // 迭代修正分页点：如果调整后的分页点切穿了其他元素，继续调整
        let loopCount = 0;
        while (!settled && loopCount < 10) { // 防止死循环
          settled = true;
          loopCount++;
          
          console.log(`[Pagination] Iteration ${loopCount} for Page ${currentPageIndex + 1}. Current Break: ${actualBreak}`);
          
          for (const item of textElements) {
            // 优化：跳过之前的元素
            if (item.bottom <= currentStart) continue;
            
            // 移除 item.top >= actualBreak 的优化，确保不漏掉任何可能的重叠元素
            
            // 如果元素跨越了 actualBreak
            if (item.top < actualBreak && item.bottom > actualBreak) {
              console.log(`[Pagination] Found overlapping item: ${item.tag} (${item.top.toFixed(1)} - ${item.bottom.toFixed(1)}), Text: "${(item as any).text || ''}"`);
              
              let newBreak = actualBreak;
              
              // 第一页特殊逻辑：智能行级分割
              if (currentPageIndex === 0) {
                let lineHeight = LINE_HEIGHT_TEXT; // 默认为文本
                
                if (['H1', 'H2'].includes(item.tag)) {
                  lineHeight = LINE_HEIGHT_BIG_TITLE;
                } else if (['H3', 'H4', 'H5', 'H6'].includes(item.tag)) {
                  lineHeight = LINE_HEIGHT_SMALL_TITLE;
                }
                
                // 计算剩余空间能容纳的完整行数
                const remainingHeight = actualBreak - item.top;
                const lines = Math.floor(remainingHeight / lineHeight);
                
                if (lines > 0) {
                  // 如果能放下至少一行，则切在最后一行下面
                  const calculatedBreak = item.top + (lines * lineHeight);
                  // 关键修复：确保计算出的分页点不会仍然切穿该元素
                  if (calculatedBreak >= item.bottom) {
                    // 如果计算出的点已经超过元素底部，说明整个元素都能放下，不需要调整
                    newBreak = actualBreak;
                  } else if (calculatedBreak < item.bottom) {
                    // 如果计算出的点仍在元素内部，说明会切穿，必须移到元素顶部
                    newBreak = item.top;
                    console.log(`[Pagination] Smart split would still cut element. Moving entire element to next page. New break: ${newBreak}`);
                  }
                } else {
                  // 一行都放不下，整体移到下一页
                  newBreak = item.top;
                  console.log(`[Pagination] Smart split: Fits 0 lines. Moving to next page. New break: ${newBreak}`);
                }
                
              } else {
                // 其他页面逻辑：记录到被切文字的顶部
                newBreak = item.top;
                console.log(`[Pagination] Standard cut. Moving to next page. New break: ${newBreak}`);
              }
              
              // 如果计算出的新分页点比当前更靠上，说明需要更新并重新检查
              if (newBreak < actualBreak) {
                console.log(`[Pagination] Updating break from ${actualBreak} to ${newBreak}. Restarting check.`);
                actualBreak = newBreak;
                settled = false; // 标记未稳定
                break; // 跳出 for 循环，重新开始 while 循环
              }
            }
          }
        }
        
        breaks.push(actualBreak);
        
        // 防止死循环
        if (actualBreak <= currentStart) {
          breaks[breaks.length - 1] = targetEnd; 
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
    
    // 使用 ResizeObserver 监听内容高度变化（处理图片加载、字体加载导致的布局偏移）
    const resizeObserver = new ResizeObserver(() => {
      calculateSmartPages();
    });
    
    if (contentRef.current) {
      const templateContent = contentRef.current.querySelector('.resume-template-content');
      if (templateContent) {
        resizeObserver.observe(templateContent);
      }
    }
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', calculateSmartPages);
      resizeObserver.disconnect();
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

  // 计算当前页面的内容高度，用于裁剪
  const currentStart = pageBreaks[currentPage - 1] || 0;
  // 如果是最后一页，使用内容总高度；否则使用下一页的起始点作为当前页的结束点
  // 注意：contentRef.current?.querySelector('.resume-template-content')?.scrollHeight 可能比 pageBreaks[currentPage] 大
  // 但我们只需要显示到分页点即可
  const currentEnd = currentPage < totalPages ? pageBreaks[currentPage] : (contentRef.current?.querySelector('.resume-template-content')?.scrollHeight || 1123);
  
  const pageContentHeight = currentEnd - currentStart;
  // Page 2+ 有 20px 的顶部偏移，所以视口高度需要增加 20px
  const viewportHeight = currentPage > 1 ? pageContentHeight + 20 : pageContentHeight;

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
            className="resume-preview animate-fade-in w-full overflow-hidden"
            style={{
              height: `${viewportHeight}px` // 动态设置高度，裁剪多余内容
            }}
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
