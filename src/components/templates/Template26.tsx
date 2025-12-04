import React from 'react';
import { useResumeStore } from '@/store';

const Template26: React.FC = () => {
  const { resumeData, theme } = useResumeStore();
  
  const profile = resumeData.profile || { name: "" };
  const education = resumeData.educationList || [];
  const workExperience = resumeData.workExpList || [];
  const projectExperience = resumeData.projectList || [];
  const skills = resumeData.skillList || [];
  const awards = resumeData.awardList || [];
  const aboutMe = resumeData.aboutme?.aboutme_desc || '';

  return (
    <div className="w-[210mm] min-h-[297mm] bg-white text-black p-14 font-mono">
      {/* Pure Text - No styling */}
      <header className="mb-10">
        <h1 className="text-3xl mb-1">{profile?.name}</h1>
        <p className="text-base mb-3">{profile?.positionTitle}</p>
        <div className="text-xs space-y-0.5">
          {profile?.email && <p>{profile.email}</p>}
          {profile?.phone && <p>{profile?.mobile}</p>}
          {profile?.location && <p>{profile?.workPlace}</p>}
        </div>
      </header>

      {aboutMe && (
        <section className="resume-section mb-8">
          <h2 className="text-sm mb-3">ABOUT</h2>
          <p className="text-xs leading-relaxed">{aboutMe}</p>
        </section>
      )}

      {workExperience.length > 0 && (
        <section className="resume-section mb-8">
          <h2 className="text-sm mb-3">EXPERIENCE</h2>
          {workExperience.map((work, idx) => (
            <div key={idx} className="mb-5">
              <p className="text-sm">{work.department_name}</p>
              <p className="text-xs">{work.company_name} / {work.work_time?.[0]} - {work.work_time?.[1]}</p>
              <p className="text-xs mt-2 leading-relaxed whitespace-pre-line">{work.work_desc}</p>
            </div>
          ))}
        </section>
      )}

      {education.length > 0 && (
        <section className="resume-section mb-8">
          <h2 className="text-sm mb-3">EDUCATION</h2>
          {education.map((edu, idx) => (
            <div key={idx} className="mb-4">
              <p className="text-sm">{edu.school}</p>
              <p className="text-xs">{edu.major} · {edu.degree} / {edu.edu_time?.[0]} - {edu.edu_time?.[1]}</p>
            </div>
          ))}
        </section>
      )}

      {projectExperience.length > 0 && (
        <section className="resume-section mb-8">
          <h2 className="text-sm mb-3">PROJECTS</h2>
          {projectExperience.map((proj, idx) => (
            <div key={idx} className="mb-5">
              <p className="text-sm">{proj.project_name} / {proj.project_time?.[0]} - {proj.project_time?.[1]}</p>
              <p className="text-xs mt-2 leading-relaxed whitespace-pre-line">{proj.project_desc}</p>
            </div>
          ))}
        </section>
      )}

      {skills.length > 0 && (
        <section className="resume-section mb-8">
          <h2 className="text-sm mb-3">SKILLS</h2>
          <p className="text-xs">{skills.map(s => s.name).join(' · ')}</p>
        </section>
      )}

      {awards.length > 0 && (
        <section>
          <h2 className="text-sm mb-3">AWARDS</h2>
          {awards.map((award, idx) => (
            <p key={idx} className="text-xs mb-1">{award.award_info} ({award.award_time})</p>
          ))}
        </section>
      )}
    </div>
  );
};

export default Template26;
