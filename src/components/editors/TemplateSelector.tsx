import React from 'react';
import { useTranslation } from 'react-i18next';
import { useResumeStore } from '@/store';
import { CheckIcon } from '@heroicons/react/24/solid';

const templates = [
  // 传统风格 - 10个
  { id: 'template1' as const, name: '经典渐变', description: '渐变色头部，经典布局', category: '传统风格' },
  { id: 'template2' as const, name: '侧边栏', description: '左侧边栏设计，信息分类清晰', category: '传统风格' },
  { id: 'template5' as const, name: '双栏布局', description: '左右双栏，信息密度高', category: '传统风格' },
  { id: 'template11' as const, name: '经典蓝调', description: '传统蓝色主题，专业稳重', category: '传统风格' },
  { id: 'template12' as const, name: '简洁标题', description: '大标题设计，层次分明', category: '传统风格' },
  { id: 'template13' as const, name: '边框装饰', description: '细边框设计，优雅大方', category: '传统风格' },
  { id: 'template14' as const, name: '竖线分隔', description: '竖线装饰，简约专业', category: '传统风格' },
  { id: 'template15' as const, name: '圆点装饰', description: '圆点列表，清新简洁', category: '传统风格' },
  { id: 'template16' as const, name: '灰色系', description: '灰色主题，沉稳内敛', category: '传统风格' },
  { id: 'template17' as const, name: '对角线', description: '对角线装饰，动感设计', category: '传统风格' },
  
  // 现代风格 - 10个
  { id: 'template3' as const, name: '卡片式', description: '现代卡片布局，充满设计感', category: '现代风格' },
  { id: 'template4' as const, name: '时间轴', description: '时间轴展示，突出发展路径', category: '现代风格' },
  { id: 'template7' as const, name: '创意图标', description: '图标装饰，视觉丰富', category: '现代风格' },
  { id: 'template18' as const, name: '渐变卡片', description: '多彩渐变，活力四射', category: '现代风格' },
  { id: 'template19' as const, name: '玻璃拟态', description: '毛玻璃效果，现代时尚', category: '现代风格' },
  { id: 'template20' as const, name: '几何图形', description: '几何装饰，创意十足', category: '现代风格' },
  { id: 'template21' as const, name: '波浪线', description: '波浪装饰，动感流畅', category: '现代风格' },
  { id: 'template22' as const, name: '彩色标签', description: '彩色标签，信息突出', category: '现代风格' },
  { id: 'template23' as const, name: '分层设计', description: '多层次布局，立体感强', category: '现代风格' },
  { id: 'template24' as const, name: '圆角卡片', description: '圆角设计，温馨亲和', category: '现代风格' },
  
  // 简约风格 - 10个
  { id: 'template6' as const, name: '极简主义', description: '极简设计，突出核心内容', category: '简约风格' },
  { id: 'template25' as const, name: '纯文字', description: '纯文字排版，简洁明了', category: '简约风格' },
  { id: 'template26' as const, name: '细线分隔', description: '细线装饰，精致优雅', category: '简约风格' },
  { id: 'template27' as const, name: '留白艺术', description: '大量留白，呼吸感强', category: '简约风格' },
  { id: 'template28' as const, name: '单色系', description: '单色设计，专注内容', category: '简约风格' },
  { id: 'template29' as const, name: '轻字体', description: '轻量字体，现代简约', category: '简约风格' },
  { id: 'template30' as const, name: '点线面', description: '点线面构成，设计感强', category: '简约风格' },
  { id: 'template31' as const, name: '网格系统', description: '网格布局，整齐规范', category: '简约风格' },
  { id: 'template32' as const, name: '黑白灰', description: '黑白灰配色，经典永恒', category: '简约风格' },
  { id: 'template33' as const, name: '无衬线', description: '无衬线字体，清新简洁', category: '简约风格' },
  
  // 专业风格 - 10个
  { id: 'template8' as const, name: '学术风格', description: '适合学术、科研岗位', category: '专业风格' },
  { id: 'template9' as const, name: '技术风格', description: '代码风格，适合程序员', category: '专业风格' },
  { id: 'template10' as const, name: '高级商务', description: '商务精英风格，高端大气', category: '专业风格' },
  { id: 'template34' as const, name: '金融风格', description: '金融行业专用，专业稳重', category: '专业风格' },
  { id: 'template35' as const, name: '律师风格', description: '法律行业专用，严谨正式', category: '专业风格' },
  { id: 'template36' as const, name: '医学风格', description: '医疗行业专用，清晰准确', category: '专业风格' },
  { id: 'template37' as const, name: '教育风格', description: '教育行业专用，亲和友好', category: '专业风格' },
  { id: 'template38' as const, name: '咨询风格', description: '咨询行业专用，专业高效', category: '专业风格' },
  { id: 'template39' as const, name: '工程风格', description: '工程行业专用，技术感强', category: '专业风格' },
  { id: 'template40' as const, name: '科研风格', description: '科研工作专用，学术严谨', category: '专业风格' },
];

const TemplateSelector: React.FC = () => {
  const { t } = useTranslation();
  const { template, setTemplate } = useResumeStore();

  const categories = Array.from(new Set(templates.map(t => t.category)));

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTemplate(e.target.value as any);
  };

  const currentTemplate = templates.find(t => t.id === template);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('选择模板')}
        </label>
        <select
          value={template}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-all duration-200 bg-white text-gray-900 cursor-pointer hover:border-blue-300"
        >
          {categories.map(category => (
            <optgroup key={category} label={category}>
              {templates.filter(t => t.category === category).map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name} - {item.description}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>
      
      {currentTemplate && (
        <div className="p-4 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
          <div className="flex items-center space-x-2 mb-2">
            <CheckIcon className="w-5 h-5 text-blue-500" />
            <h3 className="font-semibold text-gray-900">{currentTemplate.name}</h3>
          </div>
          <p className="text-sm text-gray-600">{currentTemplate.description}</p>
          <p className="text-xs text-gray-500 mt-1">分类：{currentTemplate.category}</p>
        </div>
      )}
    </div>
  );
};

export default TemplateSelector;
