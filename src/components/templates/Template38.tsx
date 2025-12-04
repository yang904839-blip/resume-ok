import React from 'react';
import { useResumeStore } from '@/store';

const Template38: React.FC = () => {
  const { resumeData, theme } = useResumeStore();
  
  const profile = resumeData.profile || { name: "" };
  const education = resumeData.educationList || [];
  const workExperience = resumeData.workExpList || [];
  const projectExperience = resumeData.projectList || [];
  const skills = resumeData.skillList || [];
  const awards = resumeData.awardList || [];
  const aboutMe = resumeData.aboutme?.aboutme_desc || '';

  return (
    <div className="w-[210mm] min-h-[297mm] bg-white text-gray-900">
      {/* Corporate Two-Tone Layout */}
      <div className="grid grid-cols-3">
        {/* Left Sidebar - Dark */}
        <aside className="col-span-1 p-8 text-white" style={{ backgroundColor: theme.color }}>
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">{profile?.name}</h1>
            <p className="text-base opacity-90">{profile?.positionTitle}</p>
          </div>

          <div className="mb-8 pb-6 border-b border-white/30">
            <h2 className="text-xs font-bold mb-3 uppercase tracking-wider opacity-75">Contact</h2>
            <div className="space-y-2 text-xs">
              {profile?.email && <p className="break-words">{profile.email}</p>}
              {profile?.phone && <p>{profile?.mobile}</p>}
              {profile?.location && <p>{profile?.workPlace}</p>}
            </div>
          </div>

          {aboutMe && (
            <div className="mb-8 pb-6 border-b border-white/30">
              <h2 className="text-xs font-bold mb-3 uppercase tracking-wider opacity-75">About</h2>
              <p className="text-xs leading-relaxed opacity-90">{aboutMe}</p>
            </div>
          )}

          {skills.length > 0 && (
            <div className="mb-8 pb-6 border-b border-white/30">
              <h2 className="text-xs font-bold mb-3 uppercase tracking-wider opacity-75">Skills</h2>
              <div className="space-y-2">
                {skills.map((skill, idx) => (
                  <p key={idx} className="text-xs opacity-90">{skill.skill_name}</p>
                ))}
              </div>
            </div>
          )}

          {awards.length > 0 && (
            <div>
              <h2 className="text-xs font-bold mb-3 uppercase tracking-wider opacity-75">Awards</h2>
              <div className="space-y-3">
                {awards.map((award, idx) => (
                  <div key={idx}>
                    <p className="text-xs font-semibold">{award.award_info}</p>
                    <p className="text-xs opacity-75">{award.award_time}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </aside>

        {/* Right Content - Light */}
        <main className="col-span-2 p-10 bg-white">
          {workExperience.length > 0 && (
            <section className="resume-section mb-8">
              <h2 className="text-lg font-bold mb-5 pb-2 border-b-2" style={{ color: theme.color }}>
                Work Experience
              </h2>
              {workExperience.map((work, idx) => (
                <div key={idx} className="mb-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-base font-bold">{work.department_name}</h3>
                      <p className="text-sm text-gray-700 font-medium">{work.company_name}</p>
                    </div>
                    <span className="text-xs text-gray-600 whitespace-nowrap ml-4">{work.work_time?.[0]} - {work.work_time?.[1]}</span>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{work.work_desc}</p>
                </div>
              ))}
            </section>
          )}

          {education.length > 0 && (
            <section className="resume-section mb-8">
              <h2 className="text-lg font-bold mb-5 pb-2 border-b-2" style={{ color: theme.color }}>
                Education
              </h2>
              {education.map((edu, idx) => (
                <div key={idx} className="mb-4">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="text-base font-bold">{edu.school}</h3>
                      <p className="text-sm text-gray-700">{edu.major} · {edu.degree}</p>
                    </div>
                    <span className="text-xs text-gray-600 whitespace-nowrap ml-4">{edu.edu_time?.[0]} - {edu.edu_time?.[1]}</span>
                  </div>
                </div>
              ))}
            </section>
          )}

          {projectExperience.length > 0 && (
            <section>
              <h2 className="text-lg font-bold mb-5 pb-2 border-b-2" style={{ color: theme.color }}>
                Projects
              </h2>
              {projectExperience.map((proj, idx) => (
                <div key={idx} className="mb-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-base font-bold">{proj.project_name}</h3>
                    <span className="text-xs text-gray-600 whitespace-nowrap ml-4">{proj.project_time?.[0]} - {proj.project_time?.[1]}</span>
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

export default Template38;
