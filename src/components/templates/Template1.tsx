import React from 'react';
import { useTranslation } from 'react-i18next';
import { useResumeStore } from '@/store';
import { DEFAULT_TITLE_MAP } from '@/data/constants';
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  BriefcaseIcon,
} from '@heroicons/react/24/outline';

const Template1: React.FC = () => {
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
    <div
      className="resume-template-content bg-white shadow-2xl rounded-2xl overflow-hidden mx-auto"
      style={{ width: '210mm', minHeight: '297mm' }}
    >
      {/* Header Section */}
      <div
        className="p-12 text-white relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${theme.color} 0%, ${adjustColor(theme.color, -30)} 100%)`,
        }}
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24" />
        
        <div className="relative z-10">
          <h1 className="text-5xl font-bold mb-2">{profile.name}</h1>
          <p className="text-2xl text-white/90 mb-6">{profile.positionTitle}</p>
          
          <div className="flex flex-wrap gap-6 text-sm">
            {profile.mobile && (
              <div className="flex items-center space-x-2">
                <PhoneIcon className="w-5 h-5" />
                <span>{profile.mobile}</span>
              </div>
            )}
            {profile.email && (
              <div className="flex items-center space-x-2">
                <EnvelopeIcon className="w-5 h-5" />
                <span>{profile.email}</span>
              </div>
            )}
            {profile.workPlace && (
              <div className="flex items-center space-x-2">
                <MapPinIcon className="w-5 h-5" />
                <span>{profile.workPlace}</span>
              </div>
            )}
            {profile.workExpYear && (
              <div className="flex items-center space-x-2">
                <BriefcaseIcon className="w-5 h-5" />
                <span>{profile.workExpYear}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-12">
        {/* About Me */}
        {aboutme.aboutme_desc && (
          <section className="resume-section mb-8">
            <h2
              className="text-2xl font-bold mb-4 pb-2 border-b-2"
              style={{ borderColor: theme.color }}
            >
              {titleMap.aboutme}
            </h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {aboutme.aboutme_desc}
            </p>
          </section>
        )}

        {/* Education */}
        {educationList.length > 0 && (
          <section className="resume-section mb-8">
            <h2
              className="text-2xl font-bold mb-4 pb-2 border-b-2"
              style={{ borderColor: theme.color }}
            >
              {titleMap.educationList}
            </h2>
            <div className="space-y-4">
              {educationList.map((edu, index) => (
                <div key={index} className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{edu.school}</h3>
                    <p className="text-gray-600">
                      {edu.major} · {edu.academic_degree}
                    </p>
                  </div>
                  <span className="text-sm text-gray-500 whitespace-nowrap ml-4">
                    {edu.edu_time[0]} - {edu.edu_time[1]}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Work Experience */}
        {workExpList.length > 0 && (
          <section className="resume-section mb-8">
            <h2
              className="text-2xl font-bold mb-4 pb-2 border-b-2"
              style={{ borderColor: theme.color }}
            >
              {titleMap.workExpList}
            </h2>
            <div className="space-y-6">
              {workExpList.map((work, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {work.company_name}
                      </h3>
                      <p className="text-gray-600">{work.department_name}</p>
                    </div>
                    <span className="text-sm text-gray-500 whitespace-nowrap ml-4">
                      {work.work_time?.[0]} - {work.work_time?.[1] === null ? t('work.current') : work.work_time?.[1]}
                    </span>
                  </div>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {work.work_desc}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projectList.length > 0 && (
          <section className="resume-section mb-8">
            <h2
              className="text-2xl font-bold mb-4 pb-2 border-b-2"
              style={{ borderColor: theme.color }}
            >
              {titleMap.projectList}
            </h2>
            <div className="space-y-6">
              {projectList.map((project, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {project.project_name}
                      </h3>
                      <p className="text-gray-600">{project.project_role}</p>
                    </div>
                    <span className="text-sm text-gray-500 whitespace-nowrap ml-4">
                      {project.project_time}
                    </span>
                  </div>
                  {project.project_desc && (
                    <p className="text-gray-700 mb-2">{project.project_desc}</p>
                  )}
                  {project.project_content && (
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {project.project_content}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skillList.length > 0 && (
          <section className="resume-section mb-8">
            <h2
              className="text-2xl font-bold mb-4 pb-2 border-b-2"
              style={{ borderColor: theme.color }}
            >
              {titleMap.skillList}
            </h2>
            <div className="space-y-4">
              {skillList.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-900">{skill.skill_name}</span>
                    <span className="text-sm text-gray-500">{skill.skill_level}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${skill.skill_level}%`,
                        background: `linear-gradient(90deg, ${theme.color}, ${adjustColor(theme.color, 20)})`,
                      }}
                    />
                  </div>
                  {skill.skill_desc && (
                    <p className="text-sm text-gray-600 mt-1">{skill.skill_desc}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Awards */}
        {awardList.length > 0 && (
          <section className="resume-section mb-8">
            <h2
              className="text-2xl font-bold mb-4 pb-2 border-b-2"
              style={{ borderColor: theme.color }}
            >
              {titleMap.awardList}
            </h2>
            <div className="space-y-3">
              {awardList.map((award, index) => (
                <div key={index} className="flex justify-between items-start">
                  <span className="text-gray-700 flex-1">{award.award_info}</span>
                  <span className="text-sm text-gray-500 whitespace-nowrap ml-4">
                    {award.award_time}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

// Helper function to adjust color brightness
function adjustColor(color: string, amount: number): string {
  const clamp = (val: number) => Math.min(Math.max(val, 0), 255);
  const num = parseInt(color.replace('#', ''), 16);
  const r = clamp((num >> 16) + amount);
  const g = clamp(((num >> 8) & 0x00ff) + amount);
  const b = clamp((num & 0x0000ff) + amount);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

export default Template1;
