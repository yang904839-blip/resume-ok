import React from 'react';
import { useResumeStore } from '@/store';

const Template34: React.FC = () => {
  const { resumeData, theme } = useResumeStore();
  
  const profile = resumeData.profile || { name: "" };
  const education = resumeData.educationList || [];
  const workExperience = resumeData.workExpList || [];
  const projectExperience = resumeData.projectList || [];
  const skills = resumeData.skillList || [];
  const awards = resumeData.awardList || [];
  const aboutMe = resumeData.aboutme?.aboutme_desc || '';

  return (
    <div className="w-[210mm] min-h-[297mm] bg-white text-gray-900 p-12 font-serif">
      {/* Executive Style with Gold Accents */}
      <header className="mb-10 pb-6 border-b-2" style={{ borderColor: `${theme.color}` }}>
        <h1 className="text-5xl font-bold mb-3" style={{ color: theme.color }}>{profile?.name}</h1>
        <p className="text-2xl text-gray-700 mb-4 font-light">{profile?.positionTitle}</p>
        <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
          {profile?.email && <span>✉ {profile.email}</span>}
          {profile?.phone && <span>☎ {profile?.mobile}</span>}
          {profile?.location && <span>📍 {profile?.workPlace}</span>}
        </div>
      </header>

      {aboutMe && (
        <section className="resume-section mb-9 p-6 border-l-4" style={{ borderColor: theme.color, backgroundColor: `${theme.color}05` }}>
          <h2 className="text-lg font-bold mb-3 uppercase tracking-wide" style={{ color: theme.color }}>
            Executive Summary
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed">{aboutMe}</p>
        </section>
      )}

      {workExperience.length > 0 && (
        <section className="resume-section mb-9">
          <h2 className="text-lg font-bold mb-5 uppercase tracking-wide pb-2 border-b" style={{ color: theme.color }}>
            Professional Experience
          </h2>
          {workExperience.map((work, idx) => (
            <div key={idx} className="mb-6 pb-5 border-b border-gray-200 last:border-0">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-lg font-bold" style={{ color: theme.color }}>{work.department_name}</h3>
                  <p className="text-base text-gray-700 font-medium">{work.company_name}</p>
                </div>
                <span className="text-sm text-gray-600 font-medium">{work.work_time?.[0]} - {work.work_time?.[1]}</span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{work.work_desc}</p>
            </div>
          ))}
        </section>
      )}

      {education.length > 0 && (
        <section className="resume-section mb-9">
          <h2 className="text-lg font-bold mb-5 uppercase tracking-wide pb-2 border-b" style={{ color: theme.color }}>
            Education
          </h2>
          {education.map((edu, idx) => (
            <div key={idx} className="mb-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-base font-bold">{edu.school}</h3>
                  <p className="text-sm text-gray-700">{edu.major} · {edu.degree}</p>
                </div>
                <span className="text-sm text-gray-600">{edu.edu_time?.[0]} - {edu.edu_time?.[1]}</span>
              </div>
            </div>
          ))}
        </section>
      )}

      {projectExperience.length > 0 && (
        <section className="resume-section mb-9">
          <h2 className="text-lg font-bold mb-5 uppercase tracking-wide pb-2 border-b" style={{ color: theme.color }}>
            Key Projects
          </h2>
          {projectExperience.map((proj, idx) => (
            <div key={idx} className="mb-5">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-base font-bold" style={{ color: theme.color }}>{proj.project_name}</h3>
                <span className="text-sm text-gray-600">{proj.project_time?.[0]} - {proj.project_time?.[1]}</span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{proj.project_desc}</p>
            </div>
          ))}
        </section>
      )}

      <div className="grid grid-cols-2 gap-8">
        {skills.length > 0 && (
          <section>
            <h2 className="text-lg font-bold mb-4 uppercase tracking-wide pb-2 border-b" style={{ color: theme.color }}>
              Core Competencies
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {skills.map((skill, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.color }}></span>
                  <span className="text-sm">{skill.skill_name}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {awards.length > 0 && (
          <section>
            <h2 className="text-lg font-bold mb-4 uppercase tracking-wide pb-2 border-b" style={{ color: theme.color }}>
              Honors & Awards
            </h2>
            <div className="space-y-3">
              {awards.map((award, idx) => (
                <div key={idx}>
                  <p className="text-sm font-semibold">{award.award_info}</p>
                  <p className="text-xs text-gray-600">{award.award_time}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Template34;
