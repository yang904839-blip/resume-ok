import React from 'react';
import { useTranslation } from 'react-i18next';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useResumeStore } from '@/store';

const EducationEditor: React.FC = () => {
  const { t } = useTranslation();
  const { resumeData, setResumeData } = useResumeStore();
  const educationList = resumeData.educationList || [];

  const handleAdd = () => {
    setResumeData({
      educationList: [
        ...educationList,
        {
          edu_time: [undefined, ''],
          school: '',
          major: '',
          academic_degree: '',
        },
      ],
    });
  };

  const handleRemove = (index: number) => {
    setResumeData({
      educationList: educationList.filter((_, i) => i !== index),
    });
  };

  const handleChange = (index: number, field: string, value: any) => {
    const newList = [...educationList];
    newList[index] = { ...newList[index], [field]: value };
    setResumeData({ educationList: newList });
  };

  return (
    <div className="space-y-4">
      {educationList.map((edu, index) => (
        <div key={index} className="p-4 bg-gray-50 rounded-lg space-y-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">教育经历 {index + 1}</span>
            <button
              onClick={() => handleRemove(index)}
              className="text-red-500 hover:text-red-700"
            >
              <TrashIcon className="w-5 h-5" />
            </button>
          </div>

          <input
            type="text"
            value={edu.school}
            onChange={(e) => handleChange(index, 'school', e.target.value)}
            className="input-field"
            placeholder={t('education.school')}
          />

          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              value={edu.major || ''}
              onChange={(e) => handleChange(index, 'major', e.target.value)}
              className="input-field"
              placeholder={t('education.major')}
            />
            <input
              type="text"
              value={edu.academic_degree || ''}
              onChange={(e) => handleChange(index, 'academic_degree', e.target.value)}
              className="input-field"
              placeholder={t('education.degree')}
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              value={edu.edu_time[0] || ''}
              onChange={(e) =>
                handleChange(index, 'edu_time', [e.target.value, edu.edu_time[1]])
              }
              className="input-field"
              placeholder="2018.09"
            />
            <input
              type="text"
              value={edu.edu_time[1] || ''}
              onChange={(e) =>
                handleChange(index, 'edu_time', [edu.edu_time[0], e.target.value])
              }
              className="input-field"
              placeholder="2022.06"
            />
          </div>
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

export default EducationEditor;
