import React, { useEffect, useState, useRef } from 'react';
import A4Page from './A4Page';

interface MultiPageRendererProps {
  children: React.ReactNode;
  onPagesGenerated?: (pageCount: number) => void;
}

/**
 * 多页面渲染器 (True Pagination Version)
 * 
 * 核心逻辑：
 * 1. 在隐藏容器中渲染完整简历
 * 2. 遍历 DOM 节点，将其物理移动（克隆）到 A4Page 容器中
 * 3. 智能处理跨页：
 *    - 如果一个元素（如段落）能放入当前页，则放入
 *    - 如果放不下，则放入下一页
 *    - 如果是容器元素（如 Section），则在两页都创建容器，将其子元素分散
 */
const MultiPageRenderer: React.FC<MultiPageRendererProps> = ({ children, onPagesGenerated }) => {
  const [pages, setPages] = useState<React.ReactNode[][]>([]);
  const measureRef = useRef<HTMLDivElement>(null);
  // 用于强制重新渲染
  const [renderTrigger, setRenderTrigger] = useState(0);

  useEffect(() => {
    const distributeContent = () => {
      if (!measureRef.current) return;

      const sourceRoot = measureRef.current.firstElementChild as HTMLElement;
      if (!sourceRoot) return;

      console.log('[MultiPageRenderer] Starting content distribution...');

      const PAGE1_HEIGHT = 1103; // 1123 - 20
      const OTHER_PAGE_HEIGHT = 1083; // 1123 - 20 - 20

      const newPages: HTMLElement[] = [];
      
      // 创建第一页
      let currentPageIndex = 0;
      let currentPageContent = document.createElement('div');
      currentPageContent.className = 'resume-content-page';
      // 保持原始根节点的类名，确保样式生效
      currentPageContent.className = sourceRoot.className; 
      // 清除可能影响布局的样式
      currentPageContent.style.height = '100%';
      currentPageContent.style.overflow = 'hidden';
      
      let currentHeight = 0;
      const pageLimit = () => currentPageIndex === 0 ? PAGE1_HEIGHT : OTHER_PAGE_HEIGHT;

      newPages.push(currentPageContent);

      // 递归处理节点
      const processNode = (node: HTMLElement, targetContainer: HTMLElement) => {
        // 如果是文本节点或非元素节点，直接克隆
        if (node.nodeType !== 1) {
          targetContainer.appendChild(node.cloneNode(true));
          return;
        }

        const element = node as HTMLElement;
        const tagName = element.tagName.toLowerCase();

        // 测量当前元素的高度（包括 margin）
        // 注意：这里我们只是估算，因为元素还没放入新容器，样式可能略有不同
        // 但由于我们克隆了类名，且宽度固定，高度应该一致
        const rect = element.getBoundingClientRect();
        const style = window.getComputedStyle(element);
        const marginTop = parseFloat(style.marginTop);
        const marginBottom = parseFloat(style.marginBottom);
        const elementHeight = rect.height + marginTop + marginBottom;

        // 策略 1: 如果元素足够小，且能完全放入当前页，则直接放入
        // 这里的"足够小"是指不是那种巨大的容器（比如整个简历的根容器）
        // 我们假设 h1-h6, p, li, span, img 等是原子元素，不应该被拆分
        const isAtomic = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'li', 'img', 'span', 'a', 'strong', 'em'].includes(tagName);
        
        // 检查是否需要换页
        // 如果是原子元素，且放不下 -> 换页
        // 如果是容器元素，且放不下 -> 尝试拆分
        
        if (currentHeight + elementHeight <= pageLimit()) {
          // 能放下，直接克隆整个子树
          targetContainer.appendChild(element.cloneNode(true));
          currentHeight += elementHeight;
        } else {
          // 放不下
          if (isAtomic) {
            // 原子元素，整体移到下一页
            // 创建新页
            currentPageIndex++;
            const newPage = document.createElement('div');
            newPage.className = sourceRoot.className; // 保持样式上下文
            newPage.style.height = '100%';
            newPage.style.overflow = 'hidden';
            newPages.push(newPage);
            
            currentPageContent = newPage;
            currentHeight = 0;
            
            // 放入新页
            currentPageContent.appendChild(element.cloneNode(true));
            currentHeight += elementHeight;
            
            // 注意：这里我们需要更新 targetContainer 的引用吗？
            // 递归调用中，targetContainer 是上一层的容器。
            // 如果我们在这里换页了，意味着当前原子元素被移动到了新页的根容器下。
            // 这可能会破坏 DOM 结构（比如 li 脱离了 ul）。
            // 这是一个复杂点。
            
            // 修正策略：
            // 我们不能简单地把 li 扔到新页的根目录下，它必须在 ul 里。
            // 所以，如果父容器跨页了，父容器必须在新页重建。
          } else {
            // 容器元素，需要拆分
            // 1. 在当前页创建容器副本（不带子元素）
            const currentContainerClone = element.cloneNode(false) as HTMLElement;
            targetContainer.appendChild(currentContainerClone);
            
            // 2. 加上当前容器自身的 padding/border 高度
            // 简化处理，暂不精确计算容器自身的装饰高度，主要关注内容
            
            // 3. 遍历子元素
            const children = Array.from(element.childNodes);
            
            // 这里的逻辑有点 tricky：我们需要在递归中维护"当前正在写入的容器"
            // 如果发生了换页，我们需要在新页重建当前容器的层级结构
            
            // 让我们换一种思路：扁平化流式处理？不，那样会丢失样式结构。
            // 必须维护结构。
            
            // 重新设计递归：
            // processNode 接收一个 node，把它"流"入 pages。
            // 如果 node 是容器，它会创建 clone，然后 processChildren。
            // 如果 processChildren 触发了换页，它会返回"我换页了"，
            // 那么父级需要在新页也创建一个 clone 来接住剩下的孩子。
          }
        }
      };
      
      // --- 采用新的"双层遍历"策略 ---
      // 1. 顶层通常是 Sections。我们先按 Section 粒度处理。
      // 2. 如果 Section 放不下，再深入 Section 内部处理。
      
      const processChildren = (nodes: NodeListOf<ChildNode>, parentPath: HTMLElement[]) => {
        for (const node of Array.from(nodes)) {
          if (node.nodeType !== 1) continue; // 忽略非元素节点（如纯换行文本）
          const element = node as HTMLElement;
          
          const rect = element.getBoundingClientRect();
          const style = window.getComputedStyle(element);
          const height = rect.height + parseFloat(style.marginTop) + parseFloat(style.marginBottom);
          
          // 检查是否能放入当前页
          if (currentHeight + height <= pageLimit()) {
            // 能放下：找到当前页对应的父容器，append
            const targetParent = getTargetParentInCurrentPage(parentPath, newPages[currentPageIndex]);
            targetParent.appendChild(element.cloneNode(true));
            currentHeight += height;
          } else {
            // 放不下
            // 1. 如果高度超过一整页，或者它是一个容器，尝试拆分
            // 2. 否则，换页
            
            // 简单判断：如果是容器且高度很大，拆分
            const isContainer = ['div', 'ul', 'ol', 'section', 'article'].includes(element.tagName.toLowerCase());
            
            if (isContainer && element.children.length > 0) {
              // 拆分容器：
              // 在当前页创建容器壳
              const targetParent = getTargetParentInCurrentPage(parentPath, newPages[currentPageIndex]);
              const containerClone = element.cloneNode(false) as HTMLElement;
              targetParent.appendChild(containerClone);
              
              // 增加一点容器自身的 padding 高度估算（可选）
              
              // 递归处理子元素
              // 注意：parentPath 需要加入当前元素
              processChildren(element.childNodes, [...parentPath, element]);
            } else {
              // 整体换页
              currentPageIndex++;
              currentHeight = 0;
              
              const newPage = document.createElement('div');
              newPage.className = sourceRoot.className;
              newPages.push(newPage);
              
              // 在新页重建父级路径
              const targetParent = getTargetParentInCurrentPage(parentPath, newPage);
              targetParent.appendChild(element.cloneNode(true));
              currentHeight += height;
            }
          }
        }
      };

      // 辅助函数：在指定页面中找到或重建父级路径
      const getTargetParentInCurrentPage = (path: HTMLElement[], pageRoot: HTMLElement): HTMLElement => {
        let current = pageRoot;
        // path[0] 是 root 的直接子级... 不，path 应该是从 root 下一层开始
        // 我们的 path 包含了正在处理的容器链
        
        // 实际上，我们需要在 pageRoot 下重建 path 中的每一个节点（如果还没重建的话）
        // 但这里有个问题：如何对应？
        // 我们可以给每个原始节点一个 ID，或者利用 path 的层级。
        
        // 简化：path 是 [div.section, ul]
        // 我们需要在 pageRoot 下找 div.section -> ul
        // 如果找不到，就创建。
        
        // 为了避免混淆同名元素，我们可以利用 WeakMap 或者给原始元素打标。
        // 这里用简单的层级重建。
        
        // 修正：由于我们是顺序遍历，如果当前页是最新的，且我们正在处理 path，
        // 那么 path 对应的克隆节点应该是当前页的最后一个分支。
        
        for (const originalNode of path) {
          // 检查 current 的最后一个子元素是否对应 originalNode
          // 这里比较 tag 和 class
          let lastChild = current.lastElementChild as HTMLElement;
          
          // 这里的判断条件可能不够严谨，但在顺序写入的场景下通常有效
          // 我们假设：只要我们还在处理这个 path，那么 current 的最后一个子元素就是 path 对应的那一层
          // 除非我们刚换页，那时候 lastChild 是 null 或者不匹配
          
          const isMatch = lastChild && 
                          lastChild.tagName === originalNode.tagName && 
                          lastChild.className === originalNode.className;
                          
          if (isMatch) {
            current = lastChild;
          } else {
            // 不匹配（可能是刚换页，或者是新的一层），创建克隆
            const clone = originalNode.cloneNode(false) as HTMLElement;
            current.appendChild(clone);
            current = clone;
          }
        }
        return current;
      };

      // 开始遍历
      // sourceRoot 的子元素是第一层
      processChildren(sourceRoot.childNodes, []);

      // 转换 newPages 为 React Nodes
      const pageNodes = newPages.map((pageEl, index) => {
        return (
          <div 
            key={index}
            dangerouslySetInnerHTML={{ __html: pageEl.innerHTML }} 
            className={pageEl.className}
          />
        );
      });
      
      // 这种方式会导致 React 事件失效，但对于预览和 PDF 导出（静态展示）是完全可以接受的。
      // 且能完美保留样式。
      
      // 包装成二维数组以适配之前的接口（虽然这里其实是一维的 Page 内容）
      // 我们调整一下 state 结构
      setPages(newPages.map(p => [p])); 
      onPagesGenerated?.(newPages.length);
    };

    // 延迟执行以确保 DOM 渲染
    const timer = setTimeout(distributeContent, 100);
    return () => clearTimeout(timer);
  }, [children, renderTrigger]);

  // 监听窗口大小变化重新计算
  useEffect(() => {
    const handleResize = () => setRenderTrigger(prev => prev + 1);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {/* 隐藏的测量容器：渲染完整的 React 组件树 */}
      <div
        ref={measureRef}
        style={{
          position: 'absolute',
          left: '-9999px',
          top: 0,
          width: '794px', // A4 宽度
          visibility: 'hidden',
        }}
      >
        <div className="resume-template-content">
          {children}
        </div>
      </div>

      {/* 实际显示的页面 */}
      <div className="multi-page-container">
        {pages.map((pageContent, index) => (
          <A4Page key={index} isFirstPage={index === 0} pageIndex={index}>
             {/* 这里我们需要渲染 HTML 字符串 */}
             {/* 由于 pageContent 是 HTMLElement，我们需要取其 innerHTML */}
             {/* 但为了性能和正确性，最好是直接把 HTMLElement 挂载上去？React 不支持直接挂载 DOM 对象 */}
             {/* 所以 dangerouslySetInnerHTML 是最简单的方案 */}
             <div 
               className="resume-template-content"
               dangerouslySetInnerHTML={{ 
                 __html: (pageContent[0] as unknown as HTMLElement).innerHTML 
               }} 
             />
          </A4Page>
        ))}
      </div>
    </>
  );
};

export default MultiPageRenderer;
