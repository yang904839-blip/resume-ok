import React from 'react';
import { useTranslation } from 'react-i18next';
import { HexColorPicker } from 'react-colorful';
import { useResumeStore } from '@/store';

const ThemeEditor: React.FC = () => {
  const { t } = useTranslation();
  const { theme, setTheme } = useResumeStore();

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {t('theme.primaryColor')}
        </label>
        <HexColorPicker
          color={theme.color}
          onChange={(color) => setTheme({ color })}
          style={{ width: '100%' }}
        />
        <div className="mt-2 flex items-center space-x-2">
          <div
            className="w-10 h-10 rounded-lg shadow-md"
            style={{ backgroundColor: theme.color }}
          />
          <input
            type="text"
            value={theme.color}
            onChange={(e) => setTheme({ color: e.target.value })}
            className="input-field flex-1"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {t('theme.tagColor')}
        </label>
        <HexColorPicker
          color={theme.tagColor}
          onChange={(color) => setTheme({ tagColor: color })}
          style={{ width: '100%' }}
        />
        <div className="mt-2 flex items-center space-x-2">
          <div
            className="w-10 h-10 rounded-lg shadow-md"
            style={{ backgroundColor: theme.tagColor }}
          />
          <input
            type="text"
            value={theme.tagColor}
            onChange={(e) => setTheme({ tagColor: e.target.value })}
            className="input-field flex-1"
          />
        </div>
      </div>
    </div>
  );
};

export default ThemeEditor;
