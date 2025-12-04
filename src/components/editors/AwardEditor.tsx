import React from 'react';
import { useTranslation } from 'react-i18next';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useResumeStore } from '@/store';

const AwardEditor: React.FC = () => {
  const { t } = useTranslation();
  const { resumeData, setResumeData } = useResumeStore();
  const awardList = resumeData.awardList || [];

  const handleAdd = () => {
    setResumeData({
      awardList: [
        ...awardList,
        {
          award_info: '',
          award_time: '',
        },
      ],
    });
  };

  const handleRemove = (index: number) => {
    setResumeData({
      awardList: awardList.filter((_, i) => i !== index),
    });
  };

  const handleChange = (index: number, field: string, value: any) => {
    const newList = [...awardList];
    newList[index] = { ...newList[index], [field]: value };
    setResumeData({ awardList: newList });
  };

  return (
    <div className="space-y-4">
      {awardList.map((award, index) => (
        <div key={index} className="p-4 bg-gray-50 rounded-lg space-y-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">奖项 {index + 1}</span>
            <button
              onClick={() => handleRemove(index)}
              className="text-red-500 hover:text-red-700"
            >
              <TrashIcon className="w-5 h-5" />
            </button>
          </div>

          <input
            type="text"
            value={award.award_info}
            onChange={(e) => handleChange(index, 'award_info', e.target.value)}
            className="input-field"
            placeholder={t('award.info')}
          />

          <input
            type="text"
            value={award.award_time || ''}
            onChange={(e) => handleChange(index, 'award_time', e.target.value)}
            className="input-field"
            placeholder="2023"
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

export default AwardEditor;
