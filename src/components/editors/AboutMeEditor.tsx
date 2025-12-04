import React from 'react';
import { useTranslation } from 'react-i18next';
import { useResumeStore } from '@/store';

const AboutMeEditor: React.FC = () => {
  const { t } = useTranslation();
  const { resumeData, setResumeData } = useResumeStore();
  const aboutme = resumeData.aboutme || { aboutme_desc: '' };

  const handleChange = (value: string) => {
    setResumeData({
      aboutme: {
        aboutme_desc: value,
      },
    });
  };

  return (
    <div className="space-y-4">
      <textarea
        value={aboutme.aboutme_desc}
        onChange={(e) => handleChange(e.target.value)}
        className="input-field min-h-[150px] resize-y"
        placeholder={t('aboutme.desc')}
      />
      <p className="text-xs text-gray-500">
        提示：可以简要介绍您的工作经验、技术特长、职业目标等
      </p>
    </div>
  );
};

export default AboutMeEditor;
