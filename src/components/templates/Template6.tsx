import React from 'react';
import { useTranslation } from 'react-i18next';
import { useResumeStore } from '@/store';
import { DEFAULT_TITLE_MAP } from '@/data/constants';

// Template6: 极简主义
const Template6: React.FC = () => {
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
      <div className="p-16">
        {/* Header - Minimal */}
        <div className="mb-12 pb-8 border-b border-gray-300">
          <h1 className="text-6xl font-light mb-2 tracking-tight">{profile.name}</h1>
          <p className="text-xl text-gray-600 font-light">{profile.positionTitle}</p>
        </div>

        {/* Contact Info - Inline */}
        <div className="mb-12 text-sm text-gray-600 space-x-8">
          {profile.email && <span>{profile.email}</span>}
          {profile.mobile && <span>{profile.mobile}</span>}
          {profile.workPlace && <span>{profile.workPlace}</span>}
          {profile.workExpYear && <span>{profile.workExpYear}</span>}
        </div>

        {/* About Me */}
        {aboutme.aboutme_desc && (
          <section className="resume-section mb-12">
            <p className="text-gray-700 leading-loose text-lg font-light">{aboutme.aboutme_desc}</p>
          </section>
        )}

        {/* Work Experience */}
        {workExpList.length > 0 && (
          <section className="resume-section mb-12">
            <h2 className="text-2xl font-light mb-8 tracking-wide uppercase text-gray-800">
              {titleMap.workExpList}
            </h2>
            {workExpList.map((work, index) => (
              <div key={index} className="mb-8">
                <div className="flex justify-between items-baseline mb-3">
                  <h3 className="text-lg font-medium">{work.company_name}</h3>
                  <span className="text-sm text-gray-500">
                    {work.work_time?.[0]} — {work.work_time?.[1] === null ? t('work.current') : work.work_time?.[1]}
                  </span>
                </div>
                <p className="text-gray-600 mb-2 font-light">{work.department_name}</p>
                <p className="text-gray-700 leading-relaxed font-light whitespace-pre-wrap">{work.work_desc}</p>
              </div>
            ))}
          </section>
        )}

        {/* Projects */}
        {projectList.length > 0 && (
          <section className="resume-section mb-12">
            <h2 className="text-2xl font-light mb-8 tracking-wide uppercase text-gray-800">
              {titleMap.projectList}
            </h2>
            {projectList.map((project, index) => (
              <div key={index} className="mb-8">
                <div className="flex justify-between items-baseline mb-3">
                  <h3 className="text-lg font-medium">{project.project_name}</h3>
                  <span className="text-sm text-gray-500">{project.project_time}</span>
                </div>
                <p className="text-gray-600 mb-2 font-light">{project.project_role}</p>
                {project.project_desc && (
                  <p className="text-gray-700 mb-2 font-light">{project.project_desc}</p>
                )}
                {project.project_content && (
                  <p className="text-gray-700 leading-relaxed font-light whitespace-pre-wrap">{project.project_content}</p>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Education & Skills */}
        <div className="grid grid-cols-2 gap-16 mb-12">
          {educationList.length > 0 && (
            <section>
              <h2 className="text-2xl font-light mb-6 tracking-wide uppercase text-gray-800">
                {titleMap.educationList}
              </h2>
              {educationList.map((edu, index) => (
                <div key={index} className="mb-6">
                  <h3 className="font-medium text-gray-900">{edu.school}</h3>
                  <p className="text-gray-600 font-light">{edu.major}</p>
                  <p className="text-gray-600 font-light">{edu.academic_degree}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {edu.edu_time[0]} — {edu.edu_time[1]}
                  </p>
                </div>
              ))}
            </section>
          )}

          {skillList.length > 0 && (
            <section>
              <h2 className="text-2xl font-light mb-6 tracking-wide uppercase text-gray-800">
                {titleMap.skillList}
              </h2>
              <div className="space-y-3">
                {skillList.map((skill, index) => (
                  <div key={index}>
                    <span className="text-gray-800 font-light">{skill.skill_name}</span>
                    {skill.skill_desc && (
                      <p className="text-sm text-gray-600 font-light mt-1">{skill.skill_desc}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Awards */}
        {awardList.length > 0 && (
          <section>
            <h2 className="text-2xl font-light mb-6 tracking-wide uppercase text-gray-800">
              {titleMap.awardList}
            </h2>
            <div className="space-y-2">
              {awardList.map((award, index) => (
                <div key={index} className="flex justify-between">
                  <span className="text-gray-700 font-light">{award.award_info}</span>
                  <span className="text-sm text-gray-500">{award.award_time}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Template6;
