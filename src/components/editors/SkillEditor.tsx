import React from 'react';
import { useTranslation } from 'react-i18next';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useResumeStore } from '@/store';

const SkillEditor: React.FC = () => {
  const { t } = useTranslation();
  const { resumeData, setResumeData } = useResumeStore();
  const skillList = resumeData.skillList || [];

  const handleAdd = () => {
    setResumeData({
      skillList: [
        ...skillList,
        {
          skill_name: '',
          skill_level: 80,
          skill_desc: '',
        },
      ],
    });
  };

  const handleRemove = (index: number) => {
    setResumeData({
      skillList: skillList.filter((_, i) => i !== index),
    });
  };

  const handleChange = (index: number, field: string, value: any) => {
    const newList = [...skillList];
    newList[index] = { ...newList[index], [field]: value };
    setResumeData({ skillList: newList });
  };

  return (
    <div className="space-y-4">
      {skillList.map((skill, index) => (
        <div key={index} className="p-4 bg-gray-50 rounded-lg space-y-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">技能 {index + 1}</span>
            <button
              onClick={() => handleRemove(index)}
              className="text-red-500 hover:text-red-700"
            >
              <TrashIcon className="w-5 h-5" />
            </button>
          </div>

          <input
            type="text"
            value={skill.skill_name || ''}
            onChange={(e) => handleChange(index, 'skill_name', e.target.value)}
            className="input-field"
            placeholder={t('skill.name')}
          />

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              {t('skill.level')}: {skill.skill_level}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={skill.skill_level || 80}
              onChange={(e) => handleChange(index, 'skill_level', Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${skill.skill_level}%, #e5e7eb ${skill.skill_level}%, #e5e7eb 100%)`,
              }}
            />
          </div>

          <textarea
            value={skill.skill_desc || ''}
            onChange={(e) => handleChange(index, 'skill_desc', e.target.value)}
            className="input-field min-h-[60px] resize-y"
            placeholder={t('skill.desc')}
          />
        </div>
      ))}

      <button
        onClick={handleAdd}
        className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-all flex items-center justify-center space-x-2"
      >
        <PlusIcon className="w-5 h-5" />
        <span>{t('common.add')}</span>
      </button>
    </div>
  );
};

export default SkillEditor;
