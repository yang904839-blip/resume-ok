import React from 'react';

interface A4PageProps {
  children: React.ReactNode;
  isFirstPage: boolean;
  pageIndex: number;
}

/**
 * A4 页面组件
 * - 固定尺寸：794px × 1123px
 * - 第一页：只有底边距 20px
 * - 其他页：上下边距各 20px
 */
const A4Page: React.FC<A4PageProps> = ({ children, isFirstPage, pageIndex }) => {
  return (
    <div
      className="a4-page"
      data-page={pageIndex}
      style={{
        width: '794px',
        height: '1123px',
        paddingTop: isFirstPage ? '0' : '20px',
        paddingBottom: '20px',
        overflow: 'hidden',
        backgroundColor: '#ffffff',
        position: 'relative',
        boxSizing: 'border-box',
      }}
    >
      <div className="page-content" style={{ height: '100%', overflow: 'hidden' }}>
        {children}
      </div>
    </div>
  );
};

export default A4Page;
