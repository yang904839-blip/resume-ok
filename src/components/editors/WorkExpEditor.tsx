import React from 'react';
import { useTranslation } from 'react-i18next';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useResumeStore } from '@/store';

const WorkExpEditor: React.FC = () => {
  const { t } = useTranslation();
  const { resumeData, setResumeData } = useResumeStore();
  const workExpList = resumeData.workExpList || [];

  const handleAdd = () => {
    setResumeData({
      workExpList: [
        ...workExpList,
        {
          company_name: '',
          department_name: '',
          work_time: [undefined, null],
          work_desc: '',
        },
      ],
    });
  };

  const handleRemove = (index: number) => {
    setResumeData({
      workExpList: workExpList.filter((_, i) => i !== index),
    });
  };

  const handleChange = (index: number, field: string, value: any) => {
    const newList = [...workExpList];
    newList[index] = { ...newList[index], [field]: value };
    setResumeData({ workExpList: newList });
  };

  return (
    <div className="space-y-4">
      {workExpList.map((work, index) => (
        <div key={index} className="p-4 bg-gray-50 rounded-lg space-y-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">工作经历 {index + 1}</span>
            <button
              onClick={() => handleRemove(index)}
              className="text-red-500 hover:text-red-700"
            >
              <TrashIcon className="w-5 h-5" />
            </button>
          </div>

          <input
            type="text"
            value={work.company_name}
            onChange={(e) => handleChange(index, 'company_name', e.target.value)}
            className="input-field"
            placeholder={t('work.company')}
          />

          <input
            type="text"
            value={work.department_name}
            onChange={(e) => handleChange(index, 'department_name', e.target.value)}
            className="input-field"
            placeholder={t('work.department')}
          />

          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              value={work.work_time?.[0] || ''}
              onChange={(e) =>
                handleChange(index, 'work_time', [e.target.value, work.work_time?.[1]])
              }
              className="input-field"
              placeholder="2020.07"
            />
            <input
              type="text"
              value={work.work_time?.[1] === null ? '至今' : work.work_time?.[1] || ''}
              onChange={(e) => {
                const value = e.target.value === '至今' ? null : e.target.value;
                handleChange(index, 'work_time', [work.work_time?.[0], value]);
              }}
              className="input-field"
              placeholder="至今"
            />
          </div>

          <textarea
            value={work.work_desc}
            onChange={(e) => handleChange(index, 'work_desc', e.target.value)}
            className="input-field min-h-[100px] resize-y"
            placeholder={t('work.desc')}
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

export default WorkExpEditor;
