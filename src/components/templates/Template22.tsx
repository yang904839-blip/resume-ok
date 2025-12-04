import React from 'react';
import { useResumeStore } from '@/store';

const Template22: React.FC = () => {
  const { resumeData, theme } = useResumeStore();
  
  const profile = resumeData.profile || { name: "" };
  const education = resumeData.educationList || [];
  const workExperience = resumeData.workExpList || [];
  const projectExperience = resumeData.projectList || [];
  const skills = resumeData.skillList || [];
  const awards = resumeData.awardList || [];
  const aboutMe = resumeData.aboutme?.aboutme_desc || '';

  return (
    <div className="w-[210mm] min-h-[297mm] bg-white text-gray-900 p-12">
      <div className="grid grid-cols-3 gap-8">
        {/* Left Sidebar */}
        <aside className="col-span-1">
          {/* Profile */}
          <div className="mb-6">
            <div className="w-24 h-24 rounded-full mx-auto mb-4" style={{ backgroundColor: theme.color }}></div>
            <h1 className="text-2xl font-bold text-center mb-1" style={{ color: theme.color }}>{profile?.name}</h1>
            <p className="text-sm text-center text-gray-600">{profile?.positionTitle}</p>
          </div>

          {/* Contact */}
          <div className="mb-6">
            <h2 className="text-sm font-bold mb-2 pb-1 border-b" style={{ color: theme.color }}>联系方式</h2>
            <div className="space-y-1 text-xs">
              {profile?.email && <p className="break-words">{profile.email}</p>}
              {profile?.phone && <p>{profile?.mobile}</p>}
              {profile?.location && <p>{profile?.workPlace}</p>}
            </div>
          </div>

          {/* About Me */}
          {aboutMe && (
            <div className="mb-6">
              <h2 className="text-sm font-bold mb-2 pb-1 border-b" style={{ color: theme.color }}>关于我</h2>
              <p className="text-xs text-gray-700 leading-relaxed">{aboutMe}</p>
            </div>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <div className="mb-6">
              <h2 className="text-sm font-bold mb-2 pb-1 border-b" style={{ color: theme.color }}>技能</h2>
              <div className="space-y-2">
                {skills.map((skill, idx) => (
                  <div key={idx}>
                    <p className="text-xs font-medium">{skill.skill_name}</p>
                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: '85%', backgroundColor: theme.color }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Awards */}
          {awards.length > 0 && (
            <div>
              <h2 className="text-sm font-bold mb-2 pb-1 border-b" style={{ color: theme.color }}>荣誉</h2>
              <div className="space-y-2">
                {awards.map((award, idx) => (
                  <div key={idx}>
                    <p className="text-xs font-semibold">{award.award_info}</p>
                    <p className="text-xs text-gray-600">{award.award_time}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </aside>

        {/* Right Content */}
        <main className="col-span-2">
          {/* Work Experience */}
          {workExperience.length > 0 && (
            <section className="resume-section mb-7">
              <h2 className="text-lg font-bold mb-4 pb-2 border-b-2" style={{ color: theme.color, borderColor: theme.color }}>
                工作经历
              </h2>
              {workExperience.map((work, idx) => (
                <div key={idx} className="mb-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-base font-bold">{work.department_name}</h3>
                      <p className="text-sm text-gray-600">{work.company_name}</p>
                    </div>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-4">{work.work_time?.[0]} - {work.work_time?.[1]}</span>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{work.work_desc}</p>
                </div>
              ))}
            </section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <section className="resume-section mb-7">
              <h2 className="text-lg font-bold mb-4 pb-2 border-b-2" style={{ color: theme.color, borderColor: theme.color }}>
                教育背景
              </h2>
              {education.map((edu, idx) => (
                <div key={idx} className="mb-3">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="text-base font-bold">{edu.school}</h3>
                      <p className="text-sm text-gray-600">{edu.major} · {edu.degree}</p>
                    </div>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-4">{edu.edu_time?.[0]} - {edu.edu_time?.[1]}</span>
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* Project Experience */}
          {projectExperience.length > 0 && (
            <section>
              <h2 className="text-lg font-bold mb-4 pb-2 border-b-2" style={{ color: theme.color, borderColor: theme.color }}>
                项目经验
              </h2>
              {projectExperience.map((proj, idx) => (
                <div key={idx} className="mb-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-base font-bold">{proj.project_name}</h3>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-4">{proj.project_time?.[0]} - {proj.project_time?.[1]}</span>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{proj.project_desc}</p>
                </div>
              ))}
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default Template22;
