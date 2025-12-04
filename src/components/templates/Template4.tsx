import React from 'react';
import { useTranslation } from 'react-i18next';
import { useResumeStore } from '@/store';
import { DEFAULT_TITLE_MAP } from '@/data/constants';

// Template4: 时间轴风格
const Template4: React.FC = () => {
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
    <div className="resume-template-content bg-white shadow-2xl mx-auto">
      {/* Header */}
      <div className="resume-section bg-gradient-to-r from-gray-900 to-gray-700 text-white p-10">
        <h1 className="text-4xl font-bold mb-2">{profile.name}</h1>
        <p className="text-xl mb-4">{profile.positionTitle}</p>
        <div className="flex flex-wrap gap-4 text-sm">
          {profile.mobile && <span>📱 {profile.mobile}</span>}
          {profile.email && <span>✉️ {profile.email}</span>}
          {profile.workPlace && <span>📍 {profile.workPlace}</span>}
          {profile.workExpYear && <span>💼 {profile.workExpYear}</span>}
        </div>
      </div>

      <div className="p-10">
        {/* About Me */}
        {aboutme.aboutme_desc && (
          <section className="resume-section mb-8">
            <h2 className="text-2xl font-bold mb-4" style={{ color: theme.color }}>
              {titleMap.aboutme}
            </h2>
            <p className="text-gray-700 leading-relaxed">{aboutme.aboutme_desc}</p>
          </section>
        )}

        {/* Work Experience - Timeline */}
        {workExpList.length > 0 && (
          <section className="resume-section mb-8">
            <h2 className="text-2xl font-bold mb-6" style={{ color: theme.color }}>
              {titleMap.workExpList}
            </h2>
            <div className="relative pl-8 border-l-4" style={{ borderColor: theme.color }}>
              {workExpList.map((work, index) => (
                <div key={index} className="mb-8 relative">
                  <div
                    className="absolute -left-10 w-4 h-4 rounded-full border-4 border-white"
                    style={{ backgroundColor: theme.color }}
                  />
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{work.company_name}</h3>
                      <p className="text-gray-600">{work.department_name}</p>
                    </div>
                    <span className="text-sm px-3 py-1 rounded-full bg-gray-100 text-gray-600 whitespace-nowrap">
                      {work.work_time?.[0]} - {work.work_time?.[1] === null ? t('work.current') : work.work_time?.[1]}
                    </span>
                  </div>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{work.work_desc}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects - Timeline */}
        {projectList.length > 0 && (
          <section className="resume-section mb-8">
            <h2 className="text-2xl font-bold mb-6" style={{ color: theme.color }}>
              {titleMap.projectList}
            </h2>
            <div className="relative pl-8 border-l-4" style={{ borderColor: theme.tagColor }}>
              {projectList.map((project, index) => (
                <div key={index} className="mb-8 relative">
                  <div
                    className="absolute -left-10 w-4 h-4 rounded-full border-4 border-white"
                    style={{ backgroundColor: theme.tagColor }}
                  />
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{project.project_name}</h3>
                      <p className="text-gray-600">{project.project_role}</p>
                    </div>
                    <span className="text-sm px-3 py-1 rounded-full bg-gray-100 text-gray-600 whitespace-nowrap">
                      {project.project_time}
                    </span>
                  </div>
                  {project.project_desc && <p className="text-gray-700 mb-2">{project.project_desc}</p>}
                  {project.project_content && (
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{project.project_content}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education & Skills Grid */}
        <div className="resume-section grid grid-cols-2 gap-8">
          {/* Education */}
          {educationList.length > 0 && (
            <section>
              <h2 className="text-xl font-bold mb-4" style={{ color: theme.color }}>
                {titleMap.educationList}
              </h2>
              {educationList.map((edu, index) => (
                <div key={index} className="mb-4">
                  <h3 className="font-bold text-gray-900">{edu.school}</h3>
                  <p className="text-sm text-gray-600">{edu.major} · {edu.academic_degree}</p>
                  <p className="text-sm text-gray-500">{edu.edu_time[0]} - {edu.edu_time[1]}</p>
                </div>
              ))}
            </section>
          )}

          {/* Skills */}
          {skillList.length > 0 && (
            <section>
              <h2 className="text-xl font-bold mb-4" style={{ color: theme.color }}>
                {titleMap.skillList}
              </h2>
              {skillList.map((skill, index) => (
                <div key={index} className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">{skill.skill_name}</span>
                    <span className="text-gray-500">{skill.skill_level}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${skill.skill_level}%`, backgroundColor: theme.color }}
                    />
                  </div>
                </div>
              ))}
            </section>
          )}
        </div>

        {/* Awards */}
        {awardList.length > 0 && (
          <section className="resume-section mt-8">
            <h2 className="text-xl font-bold mb-4" style={{ color: theme.color }}>
              {titleMap.awardList}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {awardList.map((award, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <span className="text-2xl">🏆</span>
                  <div>
                    <p className="text-gray-700">{award.award_info}</p>
                    <p className="text-sm text-gray-500">{award.award_time}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Template4;
