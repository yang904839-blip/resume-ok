import React, { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ResumePreview from './components/ResumePreview';
import { useResumeStore } from './store';
import { parseDataFromUrl } from './utils';

const App: React.FC = () => {
  const { i18n } = useTranslation();
  const { locale, mode, importData } = useResumeStore();

  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale, i18n]);

  useEffect(() => {
    // 从 URL 加载分享数据
    parseDataFromUrl().then((data) => {
      if (data) {
        const { theme, ...resumeData } = data as any;
        importData(resumeData, theme);
      }
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            padding: '16px',
            borderRadius: '12px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          },
        }}
      />
      
      <Header />
      
      <div className="flex-1 flex overflow-hidden">
        {mode === 'edit' && <Sidebar />}
        
        <main className="flex-1 overflow-auto p-8 scrollbar-thin">
          <div className="max-w-7xl mx-auto">
            <ResumePreview />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
