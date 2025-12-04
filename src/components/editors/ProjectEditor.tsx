import React from 'react';
import { useTranslation } from 'react-i18next';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useResumeStore } from '@/store';

const ProjectEditor: React.FC = () => {
  const { t } = useTranslation();
  const { resumeData, setResumeData } = useResumeStore();
  const projectList = resumeData.projectList || [];

  const handleAdd = () => {
    setResumeData({
      projectList: [
        ...projectList,
        {
          project_name: '',
          project_role: '',
          project_time: '',
          project_desc: '',
          project_content: '',
        },
      ],
    });
  };

  const handleRemove = (index: number) => {
    setResumeData({
      projectList: projectList.filter((_, i) => i !== index),
    });
  };

  const handleChange = (index: number, field: string, value: any) => {
    const newList = [...projectList];
    newList[index] = { ...newList[index], [field]: value };
    setResumeData({ projectList: newList });
  };

  return (
    <div className="space-y-4">
      {projectList.map((project, index) => (
        <div key={index} className="p-4 bg-gray-50 rounded-lg space-y-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">项目 {index + 1}</span>
            <button
              onClick={() => handleRemove(index)}
              className="text-red-500 hover:text-red-700"
            >
              <TrashIcon className="w-5 h-5" />
            </button>
          </div>

          <input
            type="text"
            value={project.project_name}
            onChange={(e) => handleChange(index, 'project_name', e.target.value)}
            className="input-field"
            placeholder={t('project.name')}
          />

          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              value={project.project_role}
              onChange={(e) => handleChange(index, 'project_role', e.target.value)}
              className="input-field"
              placeholder={t('project.role')}
            />
            <input
              type="text"
              value={project.project_time || ''}
              onChange={(e) => handleChange(index, 'project_time', e.target.value)}
              className="input-field"
              placeholder="2022.01 - 2023.12"
            />
          </div>

          <textarea
            value={project.project_desc || ''}
            onChange={(e) => handleChange(index, 'project_desc', e.target.value)}
            className="input-field min-h-[60px] resize-y"
            placeholder={t('project.desc')}
          />

          <textarea
            value={project.project_content || ''}
            onChange={(e) => handleChange(index, 'project_content', e.target.value)}
            className="input-field min-h-[100px] resize-y"
            placeholder={t('project.content')}
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

export default ProjectEditor;
