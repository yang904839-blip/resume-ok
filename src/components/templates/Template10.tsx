import React from 'react';
import { useTranslation } from 'react-i18next';
import { useResumeStore } from '@/store';
import { DEFAULT_TITLE_MAP } from '@/data/constants';

// Template10: 高级商务风格
const Template10: React.FC = () => {
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
    <div className="resume-template-content bg-white mx-auto" style={{ width: '210mm', minHeight: '297mm' }}>
      {/* Premium Header with Accent Bar */}
      <div className="relative">
        <div className="absolute top-0 left-0 w-2 h-full" style={{ backgroundColor: theme.color }} />
        <div className="pl-16 pr-12 py-12">
          <h1 className="text-5xl font-bold tracking-tight mb-3" style={{ color: theme.color }}>
            {profile.name}
          </h1>
          <div className="h-0.5 w-20 mb-4" style={{ backgroundColor: theme.color }} />
          <p className="text-2xl text-gray-700 font-light mb-6">{profile.positionTitle}</p>
          <div className="flex flex-wrap gap-8 text-sm text-gray-600">
            {profile.mobile && (
              <div className="flex items-center space-x-2">
                <div className="w-1 h-4" style={{ backgroundColor: theme.tagColor }} />
                <span>{profile.mobile}</span>
              </div>
            )}
            {profile.email && (
              <div className="flex items-center space-x-2">
                <div className="w-1 h-4" style={{ backgroundColor: theme.tagColor }} />
                <span>{profile.email}</span>
              </div>
            )}
            {profile.workPlace && (
              <div className="flex items-center space-x-2">
                <div className="w-1 h-4" style={{ backgroundColor: theme.tagColor }} />
                <span>{profile.workPlace}</span>
              </div>
            )}
            {profile.workExpYear && (
              <div className="flex items-center space-x-2">
                <div className="w-1 h-4" style={{ backgroundColor: theme.tagColor }} />
                <span>{profile.workExpYear}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="px-16 pb-12">
        {/* Executive Summary */}
        {aboutme.aboutme_desc && (
          <section className="resume-section mb-12">
            <div className="flex items-center mb-4">
              <div className="w-12 h-0.5 mr-4" style={{ backgroundColor: theme.color }} />
              <h2 className="text-2xl font-bold tracking-wide uppercase" style={{ color: theme.color }}>
                Executive Summary
              </h2>
            </div>
            <p className="text-gray-700 leading-loose text-lg pl-16">{aboutme.aboutme_desc}</p>
          </section>
        )}

        {/* Professional Experience */}
        {workExpList.length > 0 && (
          <section className="resume-section mb-12">
            <div className="flex items-center mb-6">
              <div className="w-12 h-0.5 mr-4" style={{ backgroundColor: theme.color }} />
              <h2 className="text-2xl font-bold tracking-wide uppercase" style={{ color: theme.color }}>
                {titleMap.workExpList}
              </h2>
            </div>
            <div className="pl-16 space-y-8">
              {workExpList.map((work, index) => (
                <div key={index} className="relative">
                  <div className="absolute -left-16 top-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: theme.tagColor }} />
                  </div>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{work.company_name}</h3>
                      <p className="text-gray-600 font-medium">{work.department_name}</p>
                    </div>
                    <div className="text-right">
                      <div 
                        className="px-4 py-1 rounded text-white text-sm font-medium inline-block"
                        style={{ backgroundColor: theme.tagColor }}
                      >
                        {work.work_time?.[0]} – {work.work_time?.[1] === null ? t('work.current') : work.work_time?.[1]}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{work.work_desc}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Key Projects */}
        {projectList.length > 0 && (
          <section className="resume-section mb-12">
            <div className="flex items-center mb-6">
              <div className="w-12 h-0.5 mr-4" style={{ backgroundColor: theme.color }} />
              <h2 className="text-2xl font-bold tracking-wide uppercase" style={{ color: theme.color }}>
                {titleMap.projectList}
              </h2>
            </div>
            <div className="pl-16 space-y-8">
              {projectList.map((project, index) => (
                <div key={index} className="relative">
                  <div className="absolute -left-16 top-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: theme.tagColor }} />
                  </div>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{project.project_name}</h3>
                      <p className="text-gray-600 font-medium">{project.project_role}</p>
                    </div>
                    <div 
                      className="px-4 py-1 rounded text-white text-sm font-medium"
                      style={{ backgroundColor: theme.tagColor }}
                    >
                      {project.project_time}
                    </div>
                  </div>
                  {project.project_desc && (
                    <p className="text-gray-700 mb-3">{project.project_desc}</p>
                  )}
                  {project.project_content && (
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{project.project_content}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education, Skills & Achievements */}
        <div className="grid grid-cols-3 gap-10">
          {/* Education */}
          {educationList.length > 0 && (
            <section>
              <div className="flex items-center mb-4">
                <div className="w-8 h-0.5 mr-3" style={{ backgroundColor: theme.color }} />
                <h2 className="text-lg font-bold tracking-wide uppercase" style={{ color: theme.color }}>
                  {titleMap.educationList}
                </h2>
              </div>
              <div className="space-y-4">
                {educationList.map((edu, index) => (
                  <div key={index} className="border-l-2 pl-4" style={{ borderColor: theme.tagColor }}>
                    <h3 className="font-bold text-gray-900">{edu.school}</h3>
                    <p className="text-sm text-gray-600">{edu.major}</p>
                    <p className="text-sm text-gray-600">{edu.academic_degree}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {edu.edu_time[0]} – {edu.edu_time[1]}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Core Competencies */}
          {skillList.length > 0 && (
            <section>
              <div className="flex items-center mb-4">
                <div className="w-8 h-0.5 mr-3" style={{ backgroundColor: theme.color }} />
                <h2 className="text-lg font-bold tracking-wide uppercase" style={{ color: theme.color }}>
                  {titleMap.skillList}
                </h2>
              </div>
              <div className="space-y-3">
                {skillList.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-semibold text-gray-800">{skill.skill_name}</span>
                      <span className="text-gray-500">{skill.skill_level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 h-1.5">
                      <div
                        className="h-full"
                        style={{ width: `${skill.skill_level}%`, backgroundColor: theme.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Awards & Recognition */}
          {awardList.length > 0 && (
            <section>
              <div className="flex items-center mb-4">
                <div className="w-8 h-0.5 mr-3" style={{ backgroundColor: theme.color }} />
                <h2 className="text-lg font-bold tracking-wide uppercase" style={{ color: theme.color }}>
                  {titleMap.awardList}
                </h2>
              </div>
              <div className="space-y-3">
                {awardList.map((award, index) => (
                  <div key={index} className="border-l-2 pl-4" style={{ borderColor: theme.tagColor }}>
                    <p className="font-medium text-gray-900 text-sm">{award.award_info}</p>
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

export default Template10;
