import React from 'react';
import { useTranslation } from 'react-i18next';
import { useResumeStore } from '@/store';

const ProfileEditor: React.FC = () => {
  const { t } = useTranslation();
  const { resumeData, setResumeData } = useResumeStore();
  const profile = resumeData.profile || {};

  const handleChange = (field: string, value: string) => {
    setResumeData({
      profile: {
        ...profile,
        [field]: value,
      },
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t('profile.name')}
        </label>
        <input
          type="text"
          value={profile.name || ''}
          onChange={(e) => handleChange('name', e.target.value)}
          className="input-field"
          placeholder="请输入姓名"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t('profile.positionTitle')}
        </label>
        <input
          type="text"
          value={profile.positionTitle || ''}
          onChange={(e) => handleChange('positionTitle', e.target.value)}
          className="input-field"
          placeholder="前端工程师"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('profile.mobile')}
          </label>
          <input
            type="text"
            value={profile.mobile || ''}
            onChange={(e) => handleChange('mobile', e.target.value)}
            className="input-field"
            placeholder="138****8888"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('profile.email')}
          </label>
          <input
            type="email"
            value={profile.email || ''}
            onChange={(e) => handleChange('email', e.target.value)}
            className="input-field"
            placeholder="example@email.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('profile.workExpYear')}
          </label>
          <input
            type="text"
            value={profile.workExpYear || ''}
            onChange={(e) => handleChange('workExpYear', e.target.value)}
            className="input-field"
            placeholder="3年"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('profile.workPlace')}
          </label>
          <input
            type="text"
            value={profile.workPlace || ''}
            onChange={(e) => handleChange('workPlace', e.target.value)}
            className="input-field"
            placeholder="北京"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t('profile.github')}
        </label>
        <input
          type="text"
          value={profile.github || ''}
          onChange={(e) => handleChange('github', e.target.value)}
          className="input-field"
          placeholder="https://github.com/username"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t('profile.zhihu')}
        </label>
        <input
          type="text"
          value={profile.zhihu || ''}
          onChange={(e) => handleChange('zhihu', e.target.value)}
          className="input-field"
          placeholder="https://zhihu.com/people/username"
        />
      </div>
    </div>
  );
};

export default ProfileEditor;
