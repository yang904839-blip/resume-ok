import React from 'react';
import { useResumeStore } from '@/store';

const Template16: React.FC = () => {
  const { resumeData, theme } = useResumeStore();
  
  const profile = resumeData.profile || { name: "" };
  const education = resumeData.educationList || [];
  const workExperience = resumeData.workExpList || [];
  const projectExperience = resumeData.projectList || [];
  const skills = resumeData.skillList || [];
  const awards = resumeData.awardList || [];
  const aboutMe = resumeData.aboutme?.aboutme_desc || '';

  return (
    <div className="w-[210mm] min-h-[297mm] bg-white text-gray-900 font-mono">
      {/* Header with Full Width Color Block */}
      <header className="p-10 text-white" style={{ backgroundColor: theme.color }}>
        <h1 className="text-4xl font-bold mb-2">{profile?.name}</h1>
        <p className="text-xl mb-4 opacity-90">{profile?.positionTitle}</p>
        <div className="flex gap-6 text-sm opacity-80">
          {profile?.email && <span>{profile.email}</span>}
          {profile?.phone && <span>{profile?.mobile}</span>}
          {profile?.location && <span>{profile?.workPlace}</span>}
        </div>
      </header>

      <div className="p-10">
        {/* About Me */}
        {aboutMe && (
          <section className="resume-section mb-6">
            <h2 className="text-lg font-bold mb-3 pb-2 border-b-2 border-gray-300">PROFILE</h2>
            <p className="text-sm text-gray-700 leading-relaxed">{aboutMe}</p>
          </section>
        )}

        {/* Work Experience */}
        {workExperience.length > 0 && (
          <section className="resume-section mb-6">
            <h2 className="text-lg font-bold mb-3 pb-2 border-b-2 border-gray-300">EXPERIENCE</h2>
            {workExperience.map((work, idx) => (
              <div key={idx} className="mb-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-base font-bold">{work.department_name}</h3>
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
          <section className="resume-section mb-6">
            <h2 className="text-lg font-bold mb-3 pb-2 border-b-2 border-gray-300">EDUCATION</h2>
            {education.map((edu, idx) => (
              <div key={idx} className="mb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-base font-bold">{edu.school}</h3>
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
          <section className="resume-section mb-6">
            <h2 className="text-lg font-bold mb-3 pb-2 border-b-2 border-gray-300">PROJECTS</h2>
            {projectExperience.map((proj, idx) => (
              <div key={idx} className="mb-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-base font-bold">{proj.project_name}</h3>
                  <span className="text-xs text-gray-500">{proj.project_time?.[0]} - {proj.project_time?.[1]}</span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{proj.project_desc}</p>
              </div>
            ))}
          </section>
        )}

        <div className="grid grid-cols-2 gap-6">
          {/* Skills */}
          {skills.length > 0 && (
            <section>
              <h2 className="text-lg font-bold mb-3 pb-2 border-b-2 border-gray-300">SKILLS</h2>
              <div className="space-y-1">
                {skills.map((skill, idx) => (
                  <div key={idx} className="text-sm">
                    <span className="font-bold mr-1" style={{ color: theme.color }}>▸</span>
                    {skill.skill_name}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Awards */}
          {awards.length > 0 && (
            <section>
              <h2 className="text-lg font-bold mb-3 pb-2 border-b-2 border-gray-300">AWARDS</h2>
              <div className="space-y-2">
                {awards.map((award, idx) => (
                  <div key={idx}>
                    <p className="text-sm font-bold">{award.award_info}</p>
                    <p className="text-xs text-gray-600">{award.award_time}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default Template16;
