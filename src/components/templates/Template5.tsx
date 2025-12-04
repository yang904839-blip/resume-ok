import React from 'react';
import { useTranslation } from 'react-i18next';
import { useResumeStore } from '@/store';
import { DEFAULT_TITLE_MAP } from '@/data/constants';

// Template5: 双栏布局
const Template5: React.FC = () => {
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
    <div className="resume-template-content bg-white shadow-2xl mx-auto" style={{ width: '210mm', minHeight: '297mm' }}>
      {/* Header */}
      <div className="border-b-4 px-12 py-8" style={{ borderColor: theme.color }}>
        <h1 className="text-5xl font-bold mb-2" style={{ color: theme.color }}>{profile.name}</h1>
        <p className="text-2xl text-gray-600 mb-4">{profile.positionTitle}</p>
        <div className="flex flex-wrap gap-6 text-sm text-gray-600">
          {profile.mobile && <span>📱 {profile.mobile}</span>}
          {profile.email && <span>✉️ {profile.email}</span>}
          {profile.workPlace && <span>📍 {profile.workPlace}</span>}
          {profile.workExpYear && <span>💼 {profile.workExpYear}</span>}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-0">
        {/* Left Column - 40% */}
        <div className="col-span-1 bg-gray-50 p-8 space-y-8">
          {/* About */}
          {aboutme.aboutme_desc && (
            <section>
              <h2 className="text-lg font-bold mb-3 pb-2 border-b-2" style={{ borderColor: theme.color }}>
                {titleMap.aboutme}
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed">{aboutme.aboutme_desc}</p>
            </section>
          )}

          {/* Skills */}
          {skillList.length > 0 && (
            <section>
              <h2 className="text-lg font-bold mb-3 pb-2 border-b-2" style={{ borderColor: theme.color }}>
                {titleMap.skillList}
              </h2>
              {skillList.map((skill, index) => (
                <div key={index} className="mb-4">
                  <div className="text-sm font-medium mb-1">{skill.skill_name}</div>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-gray-300 rounded-full h-2">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${skill.skill_level}%`, backgroundColor: theme.color }}
                      />
                    </div>
                    <span className="text-xs text-gray-500 w-10 text-right">{skill.skill_level}%</span>
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* Education */}
          {educationList.length > 0 && (
            <section>
              <h2 className="text-lg font-bold mb-3 pb-2 border-b-2" style={{ borderColor: theme.color }}>
                {titleMap.educationList}
              </h2>
              {educationList.map((edu, index) => (
                <div key={index} className="mb-4 text-sm">
                  <h3 className="font-bold text-gray-900">{edu.school}</h3>
                  <p className="text-gray-600">{edu.major}</p>
                  <p className="text-gray-600">{edu.academic_degree}</p>
                  <p className="text-gray-500 text-xs">{edu.edu_time[0]} - {edu.edu_time[1]}</p>
                </div>
              ))}
            </section>
          )}

          {/* Awards */}
          {awardList.length > 0 && (
            <section>
              <h2 className="text-lg font-bold mb-3 pb-2 border-b-2" style={{ borderColor: theme.color }}>
                {titleMap.awardList}
              </h2>
              {awardList.map((award, index) => (
                <div key={index} className="mb-3 text-sm">
                  <p className="font-medium text-gray-900">{award.award_info}</p>
                  <p className="text-xs text-gray-500">{award.award_time}</p>
                </div>
              ))}
            </section>
          )}
        </div>

        {/* Right Column - 60% */}
        <div className="col-span-2 p-8 space-y-8">
          {/* Work Experience */}
          {workExpList.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2" style={{ borderColor: theme.color }}>
                {titleMap.workExpList}
              </h2>
              {workExpList.map((work, index) => (
                <div key={index} className="mb-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{work.company_name}</h3>
                      <p className="text-gray-600">{work.department_name}</p>
                    </div>
                    <span className="text-sm text-gray-500 whitespace-nowrap ml-4">
                      {work.work_time?.[0]} - {work.work_time?.[1] === null ? t('work.current') : work.work_time?.[1]}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{work.work_desc}</p>
                </div>
              ))}
            </section>
          )}

          {/* Projects */}
          {projectList.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2" style={{ borderColor: theme.color }}>
                {titleMap.projectList}
              </h2>
              {projectList.map((project, index) => (
                <div key={index} className="mb-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{project.project_name}</h3>
                      <p className="text-gray-600">{project.project_role}</p>
                    </div>
                    <span className="text-sm text-gray-500 whitespace-nowrap ml-4">{project.project_time}</span>
                  </div>
                  {project.project_desc && <p className="text-sm text-gray-700 mb-2">{project.project_desc}</p>}
                  {project.project_content && (
                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{project.project_content}</p>
                  )}
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default Template5;
