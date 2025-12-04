import React from 'react';
import { useResumeStore } from '@/store';

const Template40: React.FC = () => {
  const { resumeData, theme } = useResumeStore();
  
  const profile = resumeData.profile || { name: "" };
  const education = resumeData.educationList || [];
  const workExperience = resumeData.workExpList || [];
  const projectExperience = resumeData.projectList || [];
  const skills = resumeData.skillList || [];
  const awards = resumeData.awardList || [];
  const aboutMe = resumeData.aboutme?.aboutme_desc || '';

  return (
    <div className="w-[210mm] min-h-[297mm] bg-gradient-to-br from-gray-50 to-white text-gray-900 p-10">
      {/* Luxury Professional Style */}
      <header className="mb-10 p-8 rounded-2xl shadow-xl" style={{ background: `linear-gradient(135deg, ${theme.color} 0%, ${theme.color}cc 100%)` }}>
        <h1 className="text-5xl font-bold mb-3 text-white">{profile?.name}</h1>
        <p className="text-2xl text-white/90 mb-5">{profile?.positionTitle}</p>
        <div className="flex gap-6 text-sm text-white/80">
          {profile?.email && <span>✉ {profile.email}</span>}
          {profile?.phone && <span>📱 {profile?.mobile}</span>}
          {profile?.location && <span>📍 {profile?.workPlace}</span>}
        </div>
      </header>

      {aboutMe && (
        <section className="resume-section mb-8 p-6 rounded-xl shadow-lg bg-white">
          <h2 className="text-base font-bold mb-3 uppercase tracking-wide" style={{ color: theme.color }}>
            Executive Summary
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed">{aboutMe}</p>
        </section>
      )}

      {workExperience.length > 0 && (
        <section className="resume-section mb-8">
          <h2 className="text-base font-bold mb-5 uppercase tracking-wide px-2" style={{ color: theme.color }}>
            Professional Experience
          </h2>
          <div className="space-y-4">
            {workExperience.map((work, idx) => (
              <div key={idx} className="p-6 rounded-xl shadow-lg bg-white">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-bold" style={{ color: theme.color }}>{work.department_name}</h3>
                    <p className="text-base text-gray-700 font-semibold">{work.company_name}</p>
                  </div>
                  <span className="text-xs text-white px-4 py-2 rounded-full font-semibold" style={{ backgroundColor: theme.color }}>
                    {work.work_time?.[0]} - {work.work_time?.[1]}
                  </span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{work.work_desc}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {education.length > 0 && (
        <section className="resume-section mb-8">
          <h2 className="text-base font-bold mb-5 uppercase tracking-wide px-2" style={{ color: theme.color }}>
            Education
          </h2>
          <div className="space-y-4">
            {education.map((edu, idx) => (
              <div key={idx} className="p-6 rounded-xl shadow-lg bg-white">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-base font-bold">{edu.school}</h3>
                    <p className="text-sm text-gray-700">{edu.major} · {edu.degree}</p>
                  </div>
                  <span className="text-xs text-gray-600 px-3 py-1 rounded-lg bg-gray-100">{edu.edu_time?.[0]} - {edu.edu_time?.[1]}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {projectExperience.length > 0 && (
        <section className="resume-section mb-8">
          <h2 className="text-base font-bold mb-5 uppercase tracking-wide px-2" style={{ color: theme.color }}>
            Key Projects
          </h2>
          <div className="space-y-4">
            {projectExperience.map((proj, idx) => (
              <div key={idx} className="p-6 rounded-xl shadow-lg bg-white">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-bold" style={{ color: theme.color }}>{proj.project_name}</h3>
                  <span className="text-xs text-white px-4 py-2 rounded-full font-semibold" style={{ backgroundColor: theme.color }}>
                    {proj.project_time?.[0]} - {proj.project_time?.[1]}
                  </span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{proj.project_desc}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="grid grid-cols-2 gap-6">
        {skills.length > 0 && (
          <section className="p-6 rounded-xl shadow-lg bg-white">
            <h2 className="text-base font-bold mb-4 uppercase tracking-wide" style={{ color: theme.color }}>
              Core Competencies
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 text-sm rounded-lg font-bold shadow"
                  style={{ backgroundColor: `${theme.tagColor}30`, color: theme.color }}
                >
                  {skill.skill_name}
                </span>
              ))}
            </div>
          </section>
        )}

        {awards.length > 0 && (
          <section className="p-6 rounded-xl shadow-lg bg-white">
            <h2 className="text-base font-bold mb-4 uppercase tracking-wide" style={{ color: theme.color }}>
              Honors & Recognition
            </h2>
            <div className="space-y-3">
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
  );
};

export default Template40;
