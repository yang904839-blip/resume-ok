import React from 'react';
import { useResumeStore } from '@/store';

const Template13: React.FC = () => {
  const { resumeData, theme } = useResumeStore();
  
  const profile = resumeData.profile || { name: "" };
  const education = resumeData.educationList || [];
  const workExperience = resumeData.workExpList || [];
  const projectExperience = resumeData.projectList || [];
  const skills = resumeData.skillList || [];
  const awards = resumeData.awardList || [];
  const aboutMe = resumeData.aboutme?.aboutme_desc || '';

  return (
    <div className="w-[210mm] min-h-[297mm] bg-white text-gray-900 p-10">
      {/* Header */}
      <header className="text-center mb-8 pb-6 border-b-2" style={{ borderColor: theme.color }}>
        <h1 className="text-4xl font-bold mb-2" style={{ color: theme.color }}>{profile?.name}</h1>
        <p className="text-xl text-gray-700 mb-3">{profile?.positionTitle}</p>
        <div className="flex justify-center gap-4 text-sm text-gray-600">
          {profile?.email && <span>{profile.email}</span>}
          {profile?.mobile && <span>|</span>}
          {profile?.mobile && <span>{profile?.mobile}</span>}
          {profile?.workPlace && <span>|</span>}
          {profile?.workPlace && <span>{profile?.workPlace}</span>}
        </div>
      </header>

      <div className="grid grid-cols-3 gap-8">
        {/* Left Column - Sidebar */}
        <div className="col-span-1 space-y-6">
          {/* About Me */}
          {aboutMe && (
            <section>
              <h2 className="text-lg font-bold mb-3 pb-2 border-b" style={{ color: theme.color }}>简介</h2>
              <p className="text-xs text-gray-700 leading-relaxed">{aboutMe}</p>
            </section>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <section>
              <h2 className="text-lg font-bold mb-3 pb-2 border-b" style={{ color: theme.color }}>技能</h2>
              <div className="space-y-2">
                {skills.map((skill, idx) => (
                  <div key={idx} className="text-xs">
                    <span className="font-medium" style={{ color: theme.color }}>●</span> {skill.skill_name}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Awards */}
          {awards.length > 0 && (
            <section>
              <h2 className="text-lg font-bold mb-3 pb-2 border-b" style={{ color: theme.color }}>获奖</h2>
              <div className="space-y-2">
                {awards.map((award, idx) => (
                  <div key={idx}>
                    <p className="text-xs font-semibold">{award.award_info}</p>
                    <p className="text-xs text-gray-600">{award.award_time}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column - Main Content */}
        <div className="col-span-2 space-y-6">
          {/* Education */}
          {education.length > 0 && (
            <section>
              <h2 className="text-lg font-bold mb-3 pb-2 border-b" style={{ color: theme.color }}>教育背景</h2>
              {education.map((edu, idx) => (
                <div key={idx} className="mb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-base font-semibold">{edu.school}</h3>
                      <p className="text-sm text-gray-600">{edu.major} · {edu.degree}</p>
                    </div>
                    <span className="text-xs text-gray-500">{edu.edu_time?.[0]} - {edu.edu_time?.[1]}</span>
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* Work Experience */}
          {workExperience.length > 0 && (
            <section>
              <h2 className="text-lg font-bold mb-3 pb-2 border-b" style={{ color: theme.color }}>工作经历</h2>
              {workExperience.map((work, idx) => (
                <div key={idx} className="mb-4">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="text-base font-semibold">{work.department_name}</h3>
                      <p className="text-sm text-gray-600">{work.company_name}</p>
                    </div>
                    <span className="text-xs text-gray-500">{work.work_time?.[0]} - {work.work_time?.[1]}</span>
                  </div>
                  <p className="text-xs text-gray-700 leading-relaxed whitespace-pre-line">{work.work_desc}</p>
                </div>
              ))}
            </section>
          )}

          {/* Project Experience */}
          {projectExperience.length > 0 && (
            <section>
              <h2 className="text-lg font-bold mb-3 pb-2 border-b" style={{ color: theme.color }}>项目经验</h2>
              {projectExperience.map((proj, idx) => (
                <div key={idx} className="mb-4">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-base font-semibold">{proj.project_name}</h3>
                    <span className="text-xs text-gray-500">{proj.project_time?.[0]} - {proj.project_time?.[1]}</span>
                  </div>
                  <p className="text-xs text-gray-700 leading-relaxed whitespace-pre-line">{proj.project_desc}</p>
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default Template13;
