import React from 'react';
import { useTranslation } from 'react-i18next';
import { useResumeStore } from '@/store';
import { DEFAULT_TITLE_MAP } from '@/data/constants';

// Template9: 技术风格 (代码风格)
const Template9: React.FC = () => {
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

  const SectionComment = ({ children }: { children: React.ReactNode }) => (
    <div className="text-green-600 font-mono text-sm mb-2">/* {children} */</div>
  );

  return (
    <div className="resume-template-content bg-gray-900 text-gray-100 mx-auto font-mono" style={{ width: '210mm', minHeight: '297mm' }}>
      <div className="p-12">
        {/* Code-style Header */}
        <div className="mb-8">
          <div className="text-blue-400 text-sm mb-2">// Resume Configuration</div>
          <div className="text-yellow-400 mb-1">const <span className="text-blue-300">developer</span> = {'{'}</div>
          <div className="pl-4">
            <div className="text-purple-400">name: <span className="text-green-400">"{profile.name}"</span>,</div>
            <div className="text-purple-400">role: <span className="text-green-400">"{profile.positionTitle}"</span>,</div>
            {profile.email && (
              <div className="text-purple-400">email: <span className="text-green-400">"{profile.email}"</span>,</div>
            )}
            {profile.mobile && (
              <div className="text-purple-400">phone: <span className="text-green-400">"{profile.mobile}"</span>,</div>
            )}
            {profile.workPlace && (
              <div className="text-purple-400">location: <span className="text-green-400">"{profile.workPlace}"</span>,</div>
            )}
            {profile.workExpYear && (
              <div className="text-purple-400">experience: <span className="text-green-400">"{profile.workExpYear}"</span>,</div>
            )}
            {profile.github && (
              <div className="text-purple-400">github: <span className="text-green-400">"{profile.github}"</span>,</div>
            )}
          </div>
          <div className="text-yellow-400">{'};'}</div>
        </div>

        {/* About */}
        {aboutme.aboutme_desc && (
          <div className="mb-8">
            <SectionComment>About Me</SectionComment>
            <div className="bg-gray-800 rounded-lg p-4 border-l-4" style={{ borderColor: theme.color }}>
              <p className="text-gray-300 leading-relaxed text-sm">{aboutme.aboutme_desc}</p>
            </div>
          </div>
        )}

        {/* Skills as Array */}
        {skillList.length > 0 && (
          <div className="mb-8">
            <SectionComment>{titleMap.skillList}</SectionComment>
            <div className="text-yellow-400 mb-1">const <span className="text-blue-300">skills</span> = [</div>
            <div className="pl-4 space-y-2">
              {skillList.map((skill, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <span className="text-green-400">"{skill.skill_name}"</span>
                  <span className="text-gray-500">//</span>
                  <div className="flex-1 bg-gray-800 rounded-full h-2 max-w-xs">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${skill.skill_level}%`, backgroundColor: theme.color }}
                    />
                  </div>
                  <span className="text-gray-500 text-xs">{skill.skill_level}%</span>
                </div>
              ))}
            </div>
            <div className="text-yellow-400">];</div>
          </div>
        )}

        {/* Work Experience as Objects */}
        {workExpList.length > 0 && (
          <div className="mb-8">
            <SectionComment>{titleMap.workExpList}</SectionComment>
            <div className="text-yellow-400 mb-1">const <span className="text-blue-300">workExperience</span> = [</div>
            {workExpList.map((work, index) => (
              <div key={index} className="pl-4 mb-4">
                <div className="text-yellow-400">{'{'}</div>
                <div className="pl-4">
                  <div className="text-purple-400">company: <span className="text-green-400">"{work.company_name}"</span>,</div>
                  <div className="text-purple-400">department: <span className="text-green-400">"{work.department_name}"</span>,</div>
                  <div className="text-purple-400">
                    period: <span className="text-green-400">
                      "{work.work_time?.[0]} ~ {work.work_time?.[1] === null ? 'Now' : work.work_time?.[1]}"
                    </span>,
                  </div>
                  <div className="text-purple-400">
                    description: <span className="text-green-400">"{work.work_desc.substring(0, 80)}..."</span>
                  </div>
                </div>
                <div className="text-yellow-400">{'}'}{'}'}</div>
              </div>
            ))}
            <div className="text-yellow-400">];</div>
          </div>
        )}

        {/* Projects */}
        {projectList.length > 0 && (
          <div className="mb-8">
            <SectionComment>{titleMap.projectList}</SectionComment>
            <div className="text-yellow-400 mb-1">const <span className="text-blue-300">projects</span> = [</div>
            {projectList.map((project, index) => (
              <div key={index} className="pl-4 mb-4">
                <div className="text-yellow-400">{'{'}</div>
                <div className="pl-4">
                  <div className="text-purple-400">name: <span className="text-green-400">"{project.project_name}"</span>,</div>
                  <div className="text-purple-400">role: <span className="text-green-400">"{project.project_role}"</span>,</div>
                  {project.project_time && (
                    <div className="text-purple-400">time: <span className="text-green-400">"{project.project_time}"</span>,</div>
                  )}
                  {project.project_desc && (
                    <div className="text-purple-400">
                      description: <span className="text-green-400">"{project.project_desc.substring(0, 60)}..."</span>
                    </div>
                  )}
                </div>
                <div className="text-yellow-400">{'}'}{'}'}</div>
              </div>
            ))}
            <div className="text-yellow-400">];</div>
          </div>
        )}

        {/* Education & Awards Grid */}
        <div className="grid grid-cols-2 gap-8">
          {educationList.length > 0 && (
            <div>
              <SectionComment>{titleMap.educationList}</SectionComment>
              <div className="space-y-3">
                {educationList.map((edu, index) => (
                  <div key={index} className="bg-gray-800 rounded p-3 text-sm">
                    <div className="text-blue-300 font-semibold">{edu.school}</div>
                    <div className="text-gray-400">{edu.major} | {edu.academic_degree}</div>
                    <div className="text-gray-500 text-xs">{edu.edu_time[0]} - {edu.edu_time[1]}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {awardList.length > 0 && (
            <div>
              <SectionComment>{titleMap.awardList}</SectionComment>
              <div className="space-y-2">
                {awardList.map((award, index) => (
                  <div key={index} className="flex items-start space-x-2 text-sm">
                    <span className="text-yellow-400">✓</span>
                    <div className="flex-1">
                      <div className="text-gray-300">{award.award_info}</div>
                      <div className="text-gray-500 text-xs">{award.award_time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-gray-700 text-center">
          <div className="text-gray-500 text-sm">
            <span className="text-blue-400">export default</span> developer;
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template9;
