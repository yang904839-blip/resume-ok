import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import {
  DocumentArrowDownIcon,
  DocumentArrowUpIcon,
  ShareIcon,
  PrinterIcon,
  BookmarkIcon,
  LanguageIcon,
  EyeIcon,
  PencilIcon,
  BeakerIcon,
} from '@heroicons/react/24/outline';
import { useResumeStore } from '@/store';
import { copyToClipboard, exportToLocal, importFromLocal, generateShareLink } from '@/utils';
import { downloadPDF } from '@/utils/pdf';

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { resumeData, theme, mode, locale, setMode, setLocale, importData, loadTestData } = useResumeStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadTestData = () => {
    loadTestData();
    toast.success('已加载测试数据（4页内容）');
  };

  const handleExport = () => {
    const data = JSON.stringify({ ...resumeData, theme }, null, 2);
    exportToLocal(data, 'resume-config');
    toast.success(t('message.saveSuccess'));
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const content = await importFromLocal(file);
      const data = JSON.parse(content);
      const { theme: importedTheme, ...resumeData } = data;
      importData(resumeData, importedTheme);
      toast.success(t('message.importSuccess'));
    } catch (error) {
      toast.error(t('message.importError'));
    }
    e.target.value = '';
  };

  const handleShare = async () => {
    try {
      const link = await generateShareLink({ ...resumeData, theme });
      await copyToClipboard(link);
      toast.success(t('message.shareSuccess'));
    } catch (error) {
      toast.error('分享失败');
    }
  };

  const handleDownloadPDF = async () => {
    if (isLoading) return;
    setIsLoading(true);
    const toastId = toast.loading('正在准备导出...');
    
    try {
      await downloadPDF('resume', (current, total) => {
        toast.loading(`正在处理第 ${current} / ${total} 页...`, { id: toastId });
      });
      toast.success(t('message.downloadSuccess'), { id: toastId });
    } catch (error) {
      console.error('PDF Download Error:', error);
      toast.error(`Download failed: ${error instanceof Error ? error.message : 'Unknown error'}`, { id: toastId, duration: 5000 });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyConfig = async () => {
    const data = JSON.stringify({ ...resumeData, theme }, null, 2);
    const success = await copyToClipboard(data);
    if (success) {
      toast.success(t('message.copySuccess'));
    }
  };

  const toggleLanguage = () => {
    const newLocale = locale === 'zh-CN' ? 'en-US' : 'zh-CN';
    setLocale(newLocale);
    i18n.changeLanguage(newLocale);
  };

  const toggleMode = () => {
    setMode(mode === 'edit' ? 'view' : 'edit');
  };

  return (
    <header className="no-print glass-effect border-b border-white/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white text-xl font-bold">R</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {t('header.title')}
              </h1>
              <p className="text-sm text-gray-500">
                {mode === 'edit' ? t('header.mode.edit') : t('header.mode.view')}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            {/* Mode Toggle */}
            <button
              onClick={toggleMode}
              className="button-secondary flex items-center space-x-2"
              title={mode === 'edit' ? '切换到预览' : '切换到编辑'}
            >
              {mode === 'edit' ? (
                <EyeIcon className="w-5 h-5" />
              ) : (
                <PencilIcon className="w-5 h-5" />
              )}
            </button>

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="button-secondary flex items-center space-x-2"
              title="切换语言"
            >
              <LanguageIcon className="w-5 h-5" />
              <span>{locale === 'zh-CN' ? 'EN' : '中'}</span>
            </button>

            {mode === 'edit' && (
              <>
                {/* Test Data */}
                <button
                  onClick={handleLoadTestData}
                  className="button-secondary flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-none hover:from-purple-600 hover:to-pink-600"
                  title="加载测试数据（4页）"
                >
                  <BeakerIcon className="w-5 h-5" />
                  <span className="hidden md:inline">测试</span>
                </button>

                {/* Save */}
                <button
                  onClick={handleCopyConfig}
                  className="button-secondary flex items-center space-x-2"
                  title={t('actions.copyConfig')}
                >
                  <BookmarkIcon className="w-5 h-5" />
                  <span className="hidden md:inline">{t('common.copy')}</span>
                </button>

                {/* Export */}
                <button
                  onClick={handleExport}
                  className="button-secondary flex items-center space-x-2"
                  title={t('actions.saveResume')}
                >
                  <DocumentArrowDownIcon className="w-5 h-5" />
                  <span className="hidden md:inline">{t('common.export')}</span>
                </button>

                {/* Import */}
                <label className="button-secondary flex items-center space-x-2 cursor-pointer">
                  <DocumentArrowUpIcon className="w-5 h-5" />
                  <span className="hidden md:inline">{t('common.import')}</span>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImport}
                    className="hidden"
                  />
                </label>

                {/* Share */}
                <button
                  onClick={handleShare}
                  className="button-secondary flex items-center space-x-2"
                  title={t('actions.shareLink')}
                >
                  <ShareIcon className="w-5 h-5" />
                  <span className="hidden md:inline">{t('common.share')}</span>
                </button>
              </>
            )}

            {/* Download PDF */}
            <button
              onClick={handleDownloadPDF}
              disabled={isLoading}
              className="button-primary flex items-center space-x-2 disabled:opacity-50"
              title={t('actions.downloadPDF')}
            >
              <PrinterIcon className="w-5 h-5" />
              <span>{isLoading ? '生成中...' : t('actions.downloadPDF')}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
