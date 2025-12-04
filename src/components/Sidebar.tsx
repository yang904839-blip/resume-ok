import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  UserCircleIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  RocketLaunchIcon,
  WrenchScrewdriverIcon,
  TrophyIcon,
  DocumentTextIcon,
  PaintBrushIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@heroicons/react/24/outline';
import { useResumeStore } from '@/store';
import ProfileEditor from './editors/ProfileEditor';
import EducationEditor from './editors/EducationEditor';
import WorkExpEditor from './editors/WorkExpEditor';
import ProjectEditor from './editors/ProjectEditor';
import SkillEditor from './editors/SkillEditor';
import AwardEditor from './editors/AwardEditor';
import AboutMeEditor from './editors/AboutMeEditor';
import ThemeEditor from './editors/ThemeEditor';
import TemplateSelector from './editors/TemplateSelector';

type Section = {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  component: React.ComponentType;
};

const Sidebar: React.FC = () => {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState<string>('profile');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(['profile'])
  );

  const sections: Section[] = [
    {
      id: 'theme',
      title: t('theme.title'),
      icon: PaintBrushIcon,
      component: ThemeEditor,
    },
    {
      id: 'template',
      title: t('template.title'),
      icon: DocumentTextIcon,
      component: TemplateSelector,
    },
    {
      id: 'profile',
      title: t('profile.title'),
      icon: UserCircleIcon,
      component: ProfileEditor,
    },
    {
      id: 'education',
      title: t('education.title'),
      icon: AcademicCapIcon,
      component: EducationEditor,
    },
    {
      id: 'work',
      title: t('work.title'),
      icon: BriefcaseIcon,
      component: WorkExpEditor,
    },
    {
      id: 'project',
      title: t('project.title'),
      icon: RocketLaunchIcon,
      component: ProjectEditor,
    },
    {
      id: 'skill',
      title: t('skill.title'),
      icon: WrenchScrewdriverIcon,
      component: SkillEditor,
    },
    {
      id: 'award',
      title: t('award.title'),
      icon: TrophyIcon,
      component: AwardEditor,
    },
    {
      id: 'aboutme',
      title: t('aboutme.title'),
      icon: DocumentTextIcon,
      component: AboutMeEditor,
    },
  ];

  const toggleSection = (id: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedSections(newExpanded);
    setActiveSection(id);
  };

  return (
    <aside className="no-print w-96 glass-effect border-r border-white/20 overflow-y-auto scrollbar-thin">
      <div className="p-6 space-y-4">
        <div className="mb-6">
          <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            编辑简历
          </h2>
          <p className="text-sm text-gray-500 mt-1">完善您的简历信息</p>
        </div>

        {sections.map((section) => {
          const Icon = section.icon;
          const Component = section.component;
          const isExpanded = expandedSections.has(section.id);

          return (
            <div key={section.id} className="bg-white/50 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between p-4 hover:bg-white/70 transition-all duration-200"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-medium text-gray-700">{section.title}</span>
                </div>
                {isExpanded ? (
                  <ChevronUpIcon className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDownIcon className="w-5 h-5 text-gray-400" />
                )}
              </button>

              {isExpanded && (
                <div className="p-4 pt-0 animate-slide-in">
                  <Component />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
