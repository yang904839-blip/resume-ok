import React from 'react';
import { useTranslation } from 'react-i18next';
import { useResumeStore } from '@/store';
import { DEFAULT_TITLE_MAP } from '@/data/constants';

// Template8: 学术风格
const Template8: React.FC = () => {
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
        {/* Academic Header */}
        <div className="text-center mb-12 pb-8 border-b-2 border-gray-900">
          <h1 className="text-4xl font-serif font-bold mb-2">{profile.name}</h1>
          <p className="text-lg text-gray-700 mb-4">{profile.positionTitle}</p>
          <div className="text-sm text-gray-600 space-x-4">
            {profile.email && <span>{profile.email}</span>}
            <span>•</span>
            {profile.mobile && <span>{profile.mobile}</span>}
            {profile.workPlace && (
              <>
                <span>•</span>
                <span>{profile.workPlace}</span>
              </>
            )}
          </div>
        </div>

        {/* Research Interests / About */}
        {aboutme.aboutme_desc && (
          <section className="resume-section mb-10">
            <h2 className="text-xl font-serif font-bold mb-4 uppercase tracking-wider border-b border-gray-300 pb-2">
              Research Interests / {titleMap.aboutme}
            </h2>
            <p className="text-gray-700 leading-relaxed text-justify">{aboutme.aboutme_desc}</p>
          </section>
        )}

        {/* Education */}
        {educationList.length > 0 && (
          <section className="resume-section mb-10">
            <h2 className="text-xl font-serif font-bold mb-4 uppercase tracking-wider border-b border-gray-300 pb-2">
              {titleMap.educationList}
            </h2>
            {educationList.map((edu, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-serif font-bold text-gray-900">{edu.school}</h3>
                  <span className="text-sm text-gray-600">
                    {edu.edu_time[0]} – {edu.edu_time[1]}
                  </span>
                </div>
                <p className="text-gray-700 italic">{edu.academic_degree} in {edu.major}</p>
              </div>
            ))}
          </section>
        )}

        {/* Research Experience / Work */}
        {workExpList.length > 0 && (
          <section className="resume-section mb-10">
            <h2 className="text-xl font-serif font-bold mb-4 uppercase tracking-wider border-b border-gray-300 pb-2">
              Research Experience / {titleMap.workExpList}
            </h2>
            {workExpList.map((work, index) => (
              <div key={index} className="mb-6">
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="font-serif font-bold text-gray-900">{work.company_name}</h3>
                  <span className="text-sm text-gray-600">
                    {work.work_time?.[0]} – {work.work_time?.[1] === null ? 'Present' : work.work_time?.[1]}
                  </span>
                </div>
                <p className="text-gray-700 italic mb-2">{work.department_name}</p>
                <p className="text-gray-700 leading-relaxed text-justify whitespace-pre-wrap">{work.work_desc}</p>
              </div>
            ))}
          </section>
        )}

        {/* Publications / Projects */}
        {projectList.length > 0 && (
          <section className="resume-section mb-10">
            <h2 className="text-xl font-serif font-bold mb-4 uppercase tracking-wider border-b border-gray-300 pb-2">
              Publications / {titleMap.projectList}
            </h2>
            {projectList.map((project, index) => (
              <div key={index} className="mb-6">
                <div className="flex items-start mb-2">
                  <span className="text-gray-600 mr-2">[{index + 1}]</span>
                  <div className="flex-1">
                    <h3 className="font-serif font-bold text-gray-900">{project.project_name}</h3>
                    <p className="text-gray-700 italic">{project.project_role}</p>
                    {project.project_time && (
                      <p className="text-sm text-gray-600">{project.project_time}</p>
                    )}
                    {project.project_desc && (
                      <p className="text-gray-700 mt-2">{project.project_desc}</p>
                    )}
                    {project.project_content && (
                      <p className="text-gray-700 leading-relaxed text-justify mt-2 whitespace-pre-wrap">
                        {project.project_content}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Skills & Honors */}
        <div className="grid grid-cols-2 gap-10">
          {/* Skills */}
          {skillList.length > 0 && (
            <section>
              <h2 className="text-xl font-serif font-bold mb-4 uppercase tracking-wider border-b border-gray-300 pb-2">
                {titleMap.skillList}
              </h2>
              <ul className="space-y-2">
                {skillList.map((skill, index) => (
                  <li key={index} className="text-gray-700">
                    <span className="font-semibold">{skill.skill_name}</span>
                    {skill.skill_desc && <span className="text-gray-600"> – {skill.skill_desc}</span>}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Awards & Honors */}
          {awardList.length > 0 && (
            <section>
              <h2 className="text-xl font-serif font-bold mb-4 uppercase tracking-wider border-b border-gray-300 pb-2">
                Honors & {titleMap.awardList}
              </h2>
              <ul className="space-y-2">
                {awardList.map((award, index) => (
                  <li key={index} className="flex justify-between">
                    <span className="text-gray-700">{award.award_info}</span>
                    <span className="text-sm text-gray-600">{award.award_time}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* References */}
        <div className="mt-12 pt-6 border-t border-gray-300 text-center">
          <p className="text-sm text-gray-600 italic">References available upon request</p>
        </div>
      </div>
    </div>
  );
};

export default Template8;
