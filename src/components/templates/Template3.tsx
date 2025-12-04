import React from 'react';
import { useTranslation } from 'react-i18next';
import { useResumeStore } from '@/store';
import { DEFAULT_TITLE_MAP } from '@/data/constants';

const Template3: React.FC = () => {
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
      className="resume-template-content bg-gray-50 shadow-2xl rounded-2xl overflow-hidden mx-auto"
      style={{ width: '210mm', minHeight: '297mm' }}
    >
      {/* Modern Header */}
      <div className="bg-white px-12 py-8 border-b-4" style={{ borderColor: theme.color }}>
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-5xl font-extrabold text-gray-900 mb-2">{profile.name}</h1>
            <p className="text-xl font-medium" style={{ color: theme.color }}>
              {profile.positionTitle}
            </p>
          </div>
          <div className="text-right text-sm text-gray-600 space-y-1">
            {profile.mobile && <div>{profile.mobile}</div>}
            {profile.email && <div>{profile.email}</div>}
            {profile.workPlace && <div>{profile.workPlace}</div>}
            {profile.workExpYear && <div>经验: {profile.workExpYear}</div>}
          </div>
        </div>
      </div>

      <div className="p-12">
        {/* About Me */}
        {aboutme.aboutme_desc && (
          <section className="resume-section mb-10">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-xl font-bold mb-3 flex items-center" style={{ color: theme.color }}>
                <span className="w-1 h-6 mr-3 rounded-full" style={{ backgroundColor: theme.color }} />
                {titleMap.aboutme}
              </h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {aboutme.aboutme_desc}
              </p>
            </div>
          </section>
        )}

        {/* Two Column Layout */}
        <div className="grid grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="col-span-2 space-y-10">
            {/* Work Experience */}
            {workExpList.length > 0 && (
              <section>
                <h2 className="text-xl font-bold mb-4 flex items-center" style={{ color: theme.color }}>
                  <span className="w-1 h-6 mr-3 rounded-full" style={{ backgroundColor: theme.color }} />
                  {titleMap.workExpList}
                </h2>
                <div className="space-y-6">
                  {workExpList.map((work, index) => (
                    <div key={index} className="bg-white rounded-xl p-5 shadow-md">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{work.company_name}</h3>
                          <p className="text-sm text-gray-600">{work.department_name}</p>
                        </div>
                        <span
                          className="text-xs font-medium px-3 py-1 rounded-full text-white whitespace-nowrap"
                          style={{ backgroundColor: theme.tagColor }}
                        >
                          {work.work_time?.[0]} - {work.work_time?.[1] === null ? t('work.current') : work.work_time?.[1]}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap mt-2">
                        {work.work_desc}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Projects */}
            {projectList.length > 0 && (
              <section>
                <h2 className="text-xl font-bold mb-4 flex items-center" style={{ color: theme.color }}>
                  <span className="w-1 h-6 mr-3 rounded-full" style={{ backgroundColor: theme.color }} />
                  {titleMap.projectList}
                </h2>
                <div className="space-y-6">
                  {projectList.map((project, index) => (
                    <div key={index} className="bg-white rounded-xl p-5 shadow-md">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{project.project_name}</h3>
                          <p className="text-sm text-gray-600">{project.project_role}</p>
                        </div>
                        <span
                          className="text-xs font-medium px-3 py-1 rounded-full text-white whitespace-nowrap"
                          style={{ backgroundColor: theme.tagColor }}
                        >
                          {project.project_time}
                        </span>
                      </div>
                      {project.project_desc && (
                        <p className="text-sm text-gray-700 mb-2">{project.project_desc}</p>
                      )}
                      {project.project_content && (
                        <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                          {project.project_content}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Education */}
            {educationList.length > 0 && (
              <section>
                <h2 className="text-lg font-bold mb-3" style={{ color: theme.color }}>
                  {titleMap.educationList}
                </h2>
                <div className="space-y-4">
                  {educationList.map((edu, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 shadow-md">
                      <h3 className="font-bold text-gray-900 text-sm mb-1">{edu.school}</h3>
                      <p className="text-xs text-gray-600 mb-1">
                        {edu.major} · {edu.academic_degree}
                      </p>
                      <p className="text-xs" style={{ color: theme.tagColor }}>
                        {edu.edu_time[0]} - {edu.edu_time[1]}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Skills */}
            {skillList.length > 0 && (
              <section>
                <h2 className="text-lg font-bold mb-3" style={{ color: theme.color }}>
                  {titleMap.skillList}
                </h2>
                <div className="bg-white rounded-lg p-4 shadow-md space-y-3">
                  {skillList.map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-900">{skill.skill_name}</span>
                        <span className="text-xs text-gray-500">{skill.skill_level}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${skill.skill_level}%`,
                            backgroundColor: theme.color,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Awards */}
            {awardList.length > 0 && (
              <section>
                <h2 className="text-lg font-bold mb-3" style={{ color: theme.color }}>
                  {titleMap.awardList}
                </h2>
                <div className="bg-white rounded-lg p-4 shadow-md space-y-3">
                  {awardList.map((award, index) => (
                    <div key={index}>
                      <div className="text-sm font-medium text-gray-900">{award.award_info}</div>
                      <div className="text-xs" style={{ color: theme.tagColor }}>
                        {award.award_time}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template3;
