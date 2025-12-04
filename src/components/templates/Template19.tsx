import React from 'react';
import { useResumeStore } from '@/store';

const Template19: React.FC = () => {
  const { resumeData, theme } = useResumeStore();
  
  const profile = resumeData.profile || { name: "" };
  const education = resumeData.educationList || [];
  const workExperience = resumeData.workExpList || [];
  const projectExperience = resumeData.projectList || [];
  const skills = resumeData.skillList || [];
  const awards = resumeData.awardList || [];
  const aboutMe = resumeData.aboutme?.aboutme_desc || '';

  return (
    <div className="w-[210mm] min-h-[297mm] bg-white text-gray-900 p-0 overflow-hidden">
      {/* Split Design */}
      <div className="flex">
        {/* Left Color Block */}
        <aside className="w-2/5 p-8 text-white" style={{ backgroundColor: theme.color }}>
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">{profile?.name}</h1>
            <p className="text-lg opacity-90">{profile?.positionTitle}</p>
          </div>

          {/* Contact */}
          <div className="mb-8">
            <h2 className="text-lg font-bold mb-3 pb-2 border-b border-white/30">联系方式</h2>
            <div className="space-y-2 text-sm">
              {profile?.email && <p>{profile.email}</p>}
              {profile?.phone && <p>{profile?.mobile}</p>}
              {profile?.location && <p>{profile?.workPlace}</p>}
            </div>
          </div>

          {/* About Me */}
          {aboutMe && (
            <div className="mb-8">
              <h2 className="text-lg font-bold mb-3 pb-2 border-b border-white/30">个人简介</h2>
              <p className="text-sm leading-relaxed opacity-90">{aboutMe}</p>
            </div>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-bold mb-3 pb-2 border-b border-white/30">技能</h2>
              <div className="space-y-2">
                {skills.map((skill, idx) => (
                  <div key={idx} className="text-sm opacity-90">• {skill.skill_name}</div>
                ))}
              </div>
            </div>
          )}

          {/* Awards */}
          {awards.length > 0 && (
            <div>
              <h2 className="text-lg font-bold mb-3 pb-2 border-b border-white/30">荣誉</h2>
              <div className="space-y-3">
                {awards.map((award, idx) => (
                  <div key={idx}>
                    <p className="text-sm font-semibold">{award.award_info}</p>
                    <p className="text-xs opacity-75">{award.award_time}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </aside>

        {/* Right Content */}
        <main className="flex-1 p-8">
          {/* Work Experience */}
          {workExperience.length > 0 && (
            <section className="resume-section mb-8">
              <h2 className="text-xl font-bold mb-4 pb-2 border-b" style={{ color: theme.color }}>工作经历</h2>
              {workExperience.map((work, idx) => (
                <div key={idx} className="mb-5">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-base font-semibold">{work.department_name}</h3>
                      <p className="text-sm text-gray-600">{work.company_name}</p>
                    </div>
                    <span className="text-xs text-gray-500">{work.work_time?.[0]} - {work.work_time?.[1]}</span>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{work.work_desc}</p>
                </div>
              ))}
            </section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <section className="resume-section mb-8">
              <h2 className="text-xl font-bold mb-4 pb-2 border-b" style={{ color: theme.color }}>教育背景</h2>
              {education.map((edu, idx) => (
                <div key={idx} className="mb-4">
                  <div className="flex justify-between items-start mb-1">
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

          {/* Project Experience */}
          {projectExperience.length > 0 && (
            <section>
              <h2 className="text-xl font-bold mb-4 pb-2 border-b" style={{ color: theme.color }}>项目经验</h2>
              {projectExperience.map((proj, idx) => (
                <div key={idx} className="mb-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-base font-semibold">{proj.project_name}</h3>
                    <span className="text-xs text-gray-500">{proj.project_time?.[0]} - {proj.project_time?.[1]}</span>
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

export default Template19;
