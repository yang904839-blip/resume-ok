import React from 'react';
import { useResumeStore } from '@/store';

const Template37: React.FC = () => {
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
      {/* Law/Academic Professional Style */}
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold mb-2 uppercase tracking-wide" style={{ color: theme.color }}>
          {profile?.name}
        </h1>
        <div className="h-1 w-32 mx-auto mb-4" style={{ backgroundColor: theme.color }}></div>
        <p className="text-xl text-gray-700 mb-4">{profile?.positionTitle}</p>
        <div className="flex justify-center gap-5 text-sm text-gray-600">
          {profile?.email && <span>{profile.email}</span>}
          {profile?.phone && <span>•</span>}
          {profile?.phone && <span>{profile?.mobile}</span>}
          {profile?.location && <span>•</span>}
          {profile?.location && <span>{profile?.workPlace}</span>}
        </div>
      </header>

      {aboutMe && (
        <section className="resume-section mb-9">
          <h2 className="text-center text-base font-bold mb-4 uppercase tracking-wide" style={{ color: theme.color }}>
            Professional Statement
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed text-center max-w-3xl mx-auto">{aboutMe}</p>
        </section>
      )}

      {workExperience.length > 0 && (
        <section className="resume-section mb-9">
          <h2 className="text-center text-base font-bold mb-5 uppercase tracking-wide pb-2 border-b" style={{ color: theme.color }}>
            Professional Experience
          </h2>
          {workExperience.map((work, idx) => (
            <div key={idx} className="mb-6">
              <h3 className="text-base font-bold text-center mb-1">{work.department_name}</h3>
              <p className="text-sm text-gray-700 text-center mb-1 italic">{work.company_name}</p>
              <p className="text-xs text-gray-600 text-center mb-3">{work.work_time?.[0]} - {work.work_time?.[1]}</p>
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{work.work_desc}</p>
            </div>
          ))}
        </section>
      )}

      {education.length > 0 && (
        <section className="resume-section mb-9">
          <h2 className="text-center text-base font-bold mb-5 uppercase tracking-wide pb-2 border-b" style={{ color: theme.color }}>
            Education
          </h2>
          {education.map((edu, idx) => (
            <div key={idx} className="mb-5 text-center">
              <h3 className="text-base font-bold mb-1">{edu.school}</h3>
              <p className="text-sm text-gray-700 mb-1">{edu.major} · {edu.degree}</p>
              <p className="text-xs text-gray-600 mb-2">{edu.edu_time?.[0]} - {edu.edu_time?.[1]}</p>
            </div>
          ))}
        </section>
      )}

      {projectExperience.length > 0 && (
        <section className="resume-section mb-9">
          <h2 className="text-center text-base font-bold mb-5 uppercase tracking-wide pb-2 border-b" style={{ color: theme.color }}>
            Key Projects
          </h2>
          {projectExperience.map((proj, idx) => (
            <div key={idx} className="mb-6">
              <h3 className="text-base font-bold text-center mb-1">{proj.project_name}</h3>
              <p className="text-xs text-gray-600 text-center mb-3">{proj.project_time?.[0]} - {proj.project_time?.[1]}</p>
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{proj.project_desc}</p>
            </div>
          ))}
        </section>
      )}

      <div className="grid grid-cols-2 gap-8">
        {skills.length > 0 && (
          <section>
            <h2 className="text-center text-base font-bold mb-4 uppercase tracking-wide" style={{ color: theme.color }}>
              Competencies
            </h2>
            <div className="space-y-1 text-center">
              {skills.map((skill, idx) => (
                <p key={idx} className="text-sm text-gray-700">{skill.skill_name}</p>
              ))}
            </div>
          </section>
        )}

        {awards.length > 0 && (
          <section>
            <h2 className="text-center text-base font-bold mb-4 uppercase tracking-wide" style={{ color: theme.color }}>
              Honors
            </h2>
            <div className="space-y-2 text-center">
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

export default Template37;
