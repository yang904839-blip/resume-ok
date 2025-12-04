import React from 'react';
import { useTranslation } from 'react-i18next';
import { useResumeStore } from '@/store';
import { DEFAULT_TITLE_MAP } from '@/data/constants';
import {
  BriefcaseIcon,
  AcademicCapIcon,
  RocketLaunchIcon,
  WrenchScrewdriverIcon,
  TrophyIcon,
} from '@heroicons/react/24/solid';

// Template7: 创意图标风格
const Template7: React.FC = () => {
  const { t } = useTranslation();
  const { resumeData, theme, locale } = useResumeStore();
  const titleMap = DEFAULT_TITLE_MAP[locale];

  const profile = resumeData.profile || {};
  const educationList = resumeData.educationList || [];
  const workExpList = resumeData.workExpList || [];
  const projectList = resumeData.projectList || [];
  const skillList = resumeData.skillList || [];
  const awardList = resumeData.awardList || [];
  const aboutme = resumeData.aboutme || {};

  return (
    <div className="resume-template-content bg-gradient-to-br from-gray-50 to-white mx-auto" style={{ width: '210mm', minHeight: '297mm' }}>
      {/* Creative Header */}
      <div className="relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, ${theme.color} 0%, transparent 50%),
                             radial-gradient(circle at 80% 80%, ${theme.tagColor} 0%, transparent 50%)`
          }}
        />
        <div className="relative p-12">
          <h1 className="text-5xl font-bold mb-3" style={{ color: theme.color }}>
            {profile.name}
          </h1>
          <p className="text-2xl text-gray-700 mb-6">{profile.positionTitle}</p>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            {profile.mobile && <span>📱 {profile.mobile}</span>}
            {profile.email && <span>✉️ {profile.email}</span>}
            {profile.workPlace && <span>📍 {profile.workPlace}</span>}
            {profile.workExpYear && <span>💼 {profile.workExpYear}</span>}
          </div>
        </div>
      </div>

      <div className="px-12 pb-12">
        {/* About Me with Icon */}
        {aboutme.aboutme_desc && (
          <section className="resume-section mb-10">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <p className="text-gray-700 leading-relaxed">{aboutme.aboutme_desc}</p>
            </div>
          </section>
        )}

        {/* Work Experience with Icon */}
        {workExpList.length > 0 && (
          <section className="resume-section mb-10">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 rounded-xl shadow-lg" style={{ backgroundColor: theme.color }}>
                <BriefcaseIcon className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">{titleMap.workExpList}</h2>
            </div>
            <div className="space-y-6">
              {workExpList.map((work, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{work.company_name}</h3>
                      <p className="text-gray-600">{work.department_name}</p>
                    </div>
                    <span 
                      className="px-4 py-1 rounded-full text-white text-sm whitespace-nowrap"
                      style={{ backgroundColor: theme.tagColor }}
                    >
                      {work.work_time?.[0]} - {work.work_time?.[1] === null ? t('work.current') : work.work_time?.[1]}
                    </span>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-sm whitespace-pre-wrap">{work.work_desc}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects with Icon */}
        {projectList.length > 0 && (
          <section className="resume-section mb-10">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 rounded-xl shadow-lg" style={{ backgroundColor: theme.color }}>
                <RocketLaunchIcon className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">{titleMap.projectList}</h2>
            </div>
            <div className="space-y-6">
              {projectList.map((project, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{project.project_name}</h3>
                      <p className="text-gray-600">{project.project_role}</p>
                    </div>
                    <span 
                      className="px-4 py-1 rounded-full text-white text-sm whitespace-nowrap"
                      style={{ backgroundColor: theme.tagColor }}
                    >
                      {project.project_time}
                    </span>
                  </div>
                  {project.project_desc && <p className="text-gray-700 mb-2 text-sm">{project.project_desc}</p>}
                  {project.project_content && (
                    <p className="text-gray-700 leading-relaxed text-sm whitespace-pre-wrap">{project.project_content}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills, Education, Awards Grid */}
        <div className="grid grid-cols-3 gap-6">
          {/* Skills */}
          {skillList.length > 0 && (
            <section>
              <div className="flex items-center space-x-2 mb-4">
                <div className="p-2 rounded-lg shadow" style={{ backgroundColor: theme.color }}>
                  <WrenchScrewdriverIcon className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">{titleMap.skillList}</h2>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-md space-y-3">
                {skillList.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium">{skill.skill_name}</span>
                      <span className="text-gray-500">{skill.skill_level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${skill.skill_level}%`, backgroundColor: theme.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {educationList.length > 0 && (
            <section>
              <div className="flex items-center space-x-2 mb-4">
                <div className="p-2 rounded-lg shadow" style={{ backgroundColor: theme.color }}>
                  <AcademicCapIcon className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">{titleMap.educationList}</h2>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-md space-y-4">
                {educationList.map((edu, index) => (
                  <div key={index} className="text-sm">
                    <h3 className="font-bold text-gray-900">{edu.school}</h3>
                    <p className="text-gray-600">{edu.major}</p>
                    <p className="text-gray-500 text-xs">{edu.edu_time[0]} - {edu.edu_time[1]}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Awards */}
          {awardList.length > 0 && (
            <section>
              <div className="flex items-center space-x-2 mb-4">
                <div className="p-2 rounded-lg shadow" style={{ backgroundColor: theme.color }}>
                  <TrophyIcon className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">{titleMap.awardList}</h2>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-md space-y-3">
                {awardList.map((award, index) => (
                  <div key={index} className="text-sm">
                    <p className="font-medium text-gray-900">{award.award_info}</p>
                    <p className="text-xs text-gray-500">{award.award_time}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default Template7;
