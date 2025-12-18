import React, { useEffect, useState, useRef } from 'react';
import A4Page from './A4Page';

interface MultiPageRendererProps {
  children: React.ReactNode;
  onPagesGenerated?: (pageCount: number) => void;
}

/**
 * 多页面渲染器 (Multi-Column Support Version)
 * 
 * 核心逻辑：
 * 1. 遍历 DOM 树
 * 2. 检测 Flex/Grid 容器
 * 3. 对于普通容器：串行处理子元素（Child B 接在 Child A 后面）
 * 4. 对于 Flex/Grid 容器：并行处理子元素（Child A 和 Child B 都从容器起始位置开始）
 * 5. 动态维护每一页的 DOM 结构，确保跨页时容器结构完整
 */
const MultiPageRenderer: React.FC<MultiPageRendererProps> = ({ children, onPagesGenerated }) => {
  const [pages, setPages] = useState<React.ReactNode[][]>([]);
  const measureRef = useRef<HTMLDivElement>(null);
  const [renderTrigger, setRenderTrigger] = useState(0);

  useEffect(() => {
    const distributeContent = () => {
      if (!measureRef.current) return;

      const sourceRoot = measureRef.current.firstElementChild as HTMLElement;
      if (!sourceRoot) return;

      console.log('[MultiPageRenderer] Starting content distribution (Multi-Column)...');

      const PAGE1_HEIGHT = 1103; // 1123 - 20
      const OTHER_PAGE_HEIGHT = 1083; // 1123 - 20 - 20

      const newPages: HTMLElement[] = [];
      
      // 初始化第一页
      const createPage = (index: number) => {
        const page = document.createElement('div');
        page.className = sourceRoot.className; // 保持根样式
        page.style.height = '100%';
        page.style.overflow = 'hidden';
        // 确保根容器也是 flex/grid 如果原始就是的话（虽然通常是 block）
        // 但这里我们只用它作为 page root，具体的布局由子元素决定
        return page;
      };

      newPages.push(createPage(0));

      const getPageLimit = (pageIndex: number) => pageIndex === 0 ? PAGE1_HEIGHT : OTHER_PAGE_HEIGHT;

      // 核心递归函数
      // 返回：该节点处理完毕后，最终到达的 { pageIndex, currentHeight }
      // 对于 Flex 容器，返回的是所有列中最长的那一列的结束状态
      const processNode = (
        node: HTMLElement, 
        startPageIndex: number, 
        startHeight: number, 
        parentPath: HTMLElement[]
      ): { pageIndex: number, currentHeight: number } => {
        
        // 1. 测量当前节点（作为整体）的高度
        // 注意：如果是容器，这个高度可能包含 padding/border
        const style = window.getComputedStyle(node);
        const isFlex = style.display === 'flex' || style.display === 'inline-flex';
        const isGrid = style.display === 'grid' || style.display === 'inline-grid';
        const isContainer = isFlex || isGrid || node.children.length > 0;
        
        // 原子元素判断（不拆分）
        const tagName = node.tagName.toLowerCase();
        const isAtomic = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'li', 'img', 'span', 'a', 'strong', 'em', 'svg', 'button', 'input'].includes(tagName);
        
        // 获取节点自身的高度（margin box）
        // 这里的测量可能不准，因为还没有放入新容器。
        // 但对于原子元素，我们可以直接测量 measureRef 里的源节点。
        const rect = node.getBoundingClientRect();
        const marginTop = parseFloat(style.marginTop);
        const marginBottom = parseFloat(style.marginBottom);
        const nodeHeight = rect.height + marginTop + marginBottom;

        // --- Case 1: 原子元素 ---
        if (isAtomic || !isContainer) {
          // 检查是否能放入当前页
          if (startHeight + nodeHeight <= getPageLimit(startPageIndex)) {
            // 能放下
            const targetParent = getTargetParentInPage(parentPath, newPages[startPageIndex]);
            targetParent.appendChild(node.cloneNode(true));
            return { pageIndex: startPageIndex, currentHeight: startHeight + nodeHeight };
          } else {
            // 放不下 -> 换页
            const nextPageIndex = startPageIndex + 1;
            // 确保新页存在
            while (newPages.length <= nextPageIndex) {
              newPages.push(createPage(newPages.length));
            }
            
            const targetParent = getTargetParentInPage(parentPath, newPages[nextPageIndex]);
            targetParent.appendChild(node.cloneNode(true));
            // 新页起始高度为 0 + nodeHeight
            return { pageIndex: nextPageIndex, currentHeight: nodeHeight };
          }
        }

        // --- Case 2: 容器元素 ---
        
        // 首先，在当前页创建容器壳
        // 注意：容器本身可能有 padding/border，这些也占空间
        // 简化处理：我们先创建壳，然后让子元素去填充
        // 如果容器本身有高度（比如 min-height），这会比较复杂。我们假设高度由内容撑开。
        
        // 在当前页创建壳
        let currentPageIndex = startPageIndex;
        let currentHeight = startHeight;
        
        // 确保当前页存在
        while (newPages.length <= currentPageIndex) {
          newPages.push(createPage(newPages.length));
        }
        
        // 将当前节点（壳）加入当前页
        // 注意：这里我们不 cloneNode(true)，只 clone 壳
        // 并且我们需要把这个壳加入到 parentPath 中，传给子元素
        const containerClone = node.cloneNode(false) as HTMLElement;
        const targetParent = getTargetParentInPage(parentPath, newPages[currentPageIndex]);
        targetParent.appendChild(containerClone);
        
        // 新的 parentPath
        const newParentPath = [...parentPath, node]; // 使用原始 node 作为标识
        
        // 处理子元素
        const children = Array.from(node.children) as HTMLElement[];
        
        if (isFlex || isGrid) {
          // --- 并行处理 (Parallel Layout) ---
          let maxPageIndex = currentPageIndex;
          let maxEndHeight = currentHeight;
          
          // 对于 Flex/Grid，所有子元素都从容器的起始位置开始
          // 即：它们共享相同的 startPageIndex 和 startHeight
          // 但它们会分别延伸
          
          for (const child of children) {
            // 每个子元素都从容器的起始状态开始
            // 注意：这里有个微小的修正，如果是 flex-direction: column，其实还是串行的
            // 只有 row 才是并行的。
            // 简单起见，我们假设 flex 都是并行的（即使是 column，并行处理通常也没错，只是高度会重叠？）
            // 不，如果是 column，必须串行。
            
            const isRow = style.flexDirection.includes('row') || isGrid; // Grid 默认视为二维/并行
            
            if (isRow) {
              // 并行：每个子元素从容器起始点开始
              const result = processNode(child, currentPageIndex, currentHeight, newParentPath);
              
              if (result.pageIndex > maxPageIndex) {
                maxPageIndex = result.pageIndex;
                maxEndHeight = result.currentHeight;
              } else if (result.pageIndex === maxPageIndex) {
                maxEndHeight = Math.max(maxEndHeight, result.currentHeight);
              }
            } else {
              // 串行 (Flex Column)：累加高度
              // 下一个子元素从上一个子元素的结束位置开始
              const result = processNode(child, maxPageIndex, maxEndHeight, newParentPath);
              maxPageIndex = result.pageIndex;
              maxEndHeight = result.currentHeight;
            }
          }
          
          return { pageIndex: maxPageIndex, currentHeight: maxEndHeight };
          
        } else {
          // --- 串行处理 (Block Layout) ---
          let pageIndex = currentPageIndex;
          let height = currentHeight;
          
          for (const child of children) {
            const result = processNode(child, pageIndex, height, newParentPath);
            pageIndex = result.pageIndex;
            height = result.currentHeight;
          }
          
          return { pageIndex, currentHeight: height };
        }
      };

      // 辅助函数：在指定页面中找到对应的父级容器
      // 如果不存在，则创建（重建层级结构）
      const getTargetParentInPage = (path: HTMLElement[], pageRoot: HTMLElement): HTMLElement => {
        let current = pageRoot;
        
        // path 包含了从 sourceRoot 的下一级开始的路径
        // 比如 sourceRoot -> div.section -> ul
        // path = [div.section, ul]
        
        // 我们需要在 pageRoot 下找到对应的 div.section -> ul
        // 这里的对应关系通过原始节点的引用或者特征来判断
        
        // 修正：path 中的第一个元素应该是 sourceRoot 的子元素
        // 但我们在 processNode 中传入的 parentPath 是空的，然后 push 了 node
        // 所以 path[0] 就是当前正在处理的顶层节点
        
        for (const originalNode of path) {
          // 在 current 的子元素中查找是否已经创建了 originalNode 的克隆
          // 这里我们需要一种可靠的方式来关联。
          // 简单方式：给 originalNode 加个临时 ID？不行，React 会重绘。
          // 我们可以比较 tagName 和 className，以及顺序？
          // 或者，利用 WeakMap 存储 originalNode -> clonedNodeInPage 的映射？
          // 是的，WeakMap 是最好的。
          // map.get(originalNode) -> { pageIndex: clonedNode }
          
          // 但这里我们没有全局 Map。
          // 让我们尝试简单的查找：查找 current 的最后一个子元素，看是否匹配
          // 因为我们是顺序处理的，所以正在处理的路径通常就在最后
          
          let found = false;
          const children = Array.from(current.children) as HTMLElement[];
          // 从后往前找，通常就在最后一个
          for (let i = children.length - 1; i >= 0; i--) {
            const child = children[i];
            // 比较特征
            if (child.tagName === originalNode.tagName && 
                child.className === originalNode.className &&
                // 还可以比较 style
                child.getAttribute('style') === originalNode.getAttribute('style')) {
              current = child;
              found = true;
              break;
            }
          }
          
          if (!found) {
            // 没找到，创建新的克隆
            const clone = originalNode.cloneNode(false) as HTMLElement;
            current.appendChild(clone);
            current = clone;
          }
        }
        
        return current;
      };

      // 开始处理
      // 这里的 sourceRoot 本身就是 pageRoot 的内容，所以我们处理 sourceRoot 的子元素
      const children = Array.from(sourceRoot.children) as HTMLElement[];
      let pageIndex = 0;
      let currentHeight = 0;
      
      // 顶层通常是 Block 布局，串行处理
      for (const child of children) {
        const result = processNode(child, pageIndex, currentHeight, []);
        pageIndex = result.pageIndex;
        currentHeight = result.currentHeight;
      }

      // 转换结果
      setPages(newPages.map(p => [p])); 
      onPagesGenerated?.(newPages.length);
    };

    const timer = setTimeout(distributeContent, 100);
    return () => clearTimeout(timer);
  }, [children, renderTrigger]);

  // Resize 监听
  useEffect(() => {
    const handleResize = () => setRenderTrigger(prev => prev + 1);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <div
        ref={measureRef}
        style={{
          position: 'absolute',
          left: '-9999px',
          top: 0,
          width: '794px',
          visibility: 'hidden',
        }}
      >
        <div className="resume-template-content">
          {children}
        </div>
      </div>

      <div className="multi-page-container">
        {pages.map((pageContent, index) => (
          <A4Page key={index} isFirstPage={index === 0} pageIndex={index}>
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
