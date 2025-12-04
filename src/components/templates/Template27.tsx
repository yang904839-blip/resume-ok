import React from 'react';
import { useResumeStore } from '@/store';

const Template27: React.FC = () => {
  const { resumeData, theme } = useResumeStore();
  
  const profile = resumeData.profile || { name: "" };
  const education = resumeData.educationList || [];
  const workExperience = resumeData.workExpList || [];
  const projectExperience = resumeData.projectList || [];
  const skills = resumeData.skillList || [];
  const awards = resumeData.awardList || [];
  const aboutMe = resumeData.aboutme?.aboutme_desc || '';

  return (
    <div className="w-[210mm] min-h-[297mm] bg-white text-gray-800 p-12">
      {/* Header with Thin Accent Line */}
      <header className="mb-10">
        <div className="h-px mb-6" style={{ backgroundColor: theme.color }}></div>
        <h1 className="text-4xl font-light tracking-tight mb-2">{profile?.name}</h1>
        <p className="text-base text-gray-600 mb-4">{profile?.positionTitle}</p>
        <div className="flex gap-4 text-xs text-gray-500">
          {profile?.email && <span>{profile.email}</span>}
          {profile?.phone && <span>·</span>}
          {profile?.phone && <span>{profile?.mobile}</span>}
          {profile?.location && <span>·</span>}
          {profile?.location && <span>{profile?.workPlace}</span>}
        </div>
      </header>

      {aboutMe && (
        <section className="resume-section mb-9">
          <p className="text-sm text-gray-700 leading-relaxed border-l pl-4" style={{ borderColor: `${theme.color}40` }}>
            {aboutMe}
          </p>
        </section>
      )}

      {workExperience.length > 0 && (
        <section className="resume-section mb-9">
          <h2 className="text-sm font-medium mb-5" style={{ color: theme.color }}>Work Experience</h2>
          {workExperience.map((work, idx) => (
            <div key={idx} className="mb-6 pl-4 border-l" style={{ borderColor: `${theme.color}20` }}>
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="text-base font-medium">{work.department_name}</h3>
                <span className="text-xs text-gray-400">{work.work_time?.[0]} – {work.work_time?.[1]}</span>
              </div>
              <p className="text-sm text-gray-600 mb-2">{work.company_name}</p>
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{work.work_desc}</p>
            </div>
          ))}
        </section>
      )}

      {education.length > 0 && (
        <section className="resume-section mb-9">
          <h2 className="text-sm font-medium mb-5" style={{ color: theme.color }}>Education</h2>
          {education.map((edu, idx) => (
            <div key={idx} className="mb-5 pl-4 border-l" style={{ borderColor: `${theme.color}20` }}>
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="text-base font-medium">{edu.school}</h3>
                <span className="text-xs text-gray-400">{edu.edu_time?.[0]} – {edu.edu_time?.[1]}</span>
              </div>
              <p className="text-sm text-gray-600">{edu.major} · {edu.degree}</p>
            </div>
          ))}
        </section>
      )}

      {projectExperience.length > 0 && (
        <section className="resume-section mb-9">
          <h2 className="text-sm font-medium mb-5" style={{ color: theme.color }}>Projects</h2>
          {projectExperience.map((proj, idx) => (
            <div key={idx} className="mb-6 pl-4 border-l" style={{ borderColor: `${theme.color}20` }}>
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="text-base font-medium">{proj.project_name}</h3>
                <span className="text-xs text-gray-400">{proj.project_time?.[0]} – {proj.project_time?.[1]}</span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{proj.project_desc}</p>
            </div>
          ))}
        </section>
      )}

      <div className="grid grid-cols-2 gap-8">
        {skills.length > 0 && (
          <section>
            <h2 className="text-sm font-medium mb-4" style={{ color: theme.color }}>Skills</h2>
            <div className="space-y-1">
              {skills.map((skill, idx) => (
                <p key={idx} className="text-sm text-gray-700">{skill.skill_name}</p>
              ))}
            </div>
          </section>
        )}

        {awards.length > 0 && (
          <section>
            <h2 className="text-sm font-medium mb-4" style={{ color: theme.color }}>Awards</h2>
            <div className="space-y-2">
              {awards.map((award, idx) => (
                <div key={idx}>
                  <p className="text-sm text-gray-700">{award.award_info}</p>
                  <p className="text-xs text-gray-500">{award.award_time}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Template27;
