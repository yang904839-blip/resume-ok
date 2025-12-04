import React from 'react';
import { useResumeStore } from '@/store';

const Template33: React.FC = () => {
  const { resumeData, theme } = useResumeStore();
  
  const profile = resumeData.profile || { name: "" };
  const education = resumeData.educationList || [];
  const workExperience = resumeData.workExpList || [];
  const projectExperience = resumeData.projectList || [];
  const skills = resumeData.skillList || [];
  const awards = resumeData.awardList || [];
  const aboutMe = resumeData.aboutme?.aboutme_desc || '';

  return (
    <div className="w-[210mm] min-h-[297mm] bg-white text-gray-800 p-16">
      {/* Japanese-inspired Minimalism */}
      <header className="mb-12">
        <h1 className="text-3xl font-light tracking-wide mb-3">{profile?.name}</h1>
        <p className="text-base text-gray-500 mb-5">{profile?.positionTitle}</p>
        <div className="space-y-1 text-xs text-gray-400">
          {profile?.email && <p>{profile.email}</p>}
          {profile?.phone && <p>{profile?.mobile}</p>}
          {profile?.location && <p>{profile?.workPlace}</p>}
        </div>
      </header>

      {aboutMe && (
        <section className="resume-section mb-10">
          <p className="text-sm text-gray-600 leading-loose">{aboutMe}</p>
        </section>
      )}

      {workExperience.length > 0 && (
        <section className="resume-section mb-10">
          <h2 className="text-xs text-gray-400 mb-6">EXPERIENCE</h2>
          {workExperience.map((work, idx) => (
            <div key={idx} className="mb-8">
              <p className="text-base font-normal mb-1">{work.department_name}</p>
              <p className="text-sm text-gray-500 mb-0.5">{work.company_name}</p>
              <p className="text-xs text-gray-400 mb-3">{work.work_time?.[0]} – {work.work_time?.[1]}</p>
              <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{work.work_desc}</p>
            </div>
          ))}
        </section>
      )}

      {education.length > 0 && (
        <section className="resume-section mb-10">
          <h2 className="text-xs text-gray-400 mb-6">EDUCATION</h2>
          {education.map((edu, idx) => (
            <div key={idx} className="mb-6">
              <p className="text-base font-normal mb-1">{edu.school}</p>
              <p className="text-sm text-gray-500 mb-0.5">{edu.major} · {edu.degree}</p>
              <p className="text-xs text-gray-400 mb-2">{edu.edu_time?.[0]} – {edu.edu_time?.[1]}</p>
            </div>
          ))}
        </section>
      )}

      {projectExperience.length > 0 && (
        <section className="resume-section mb-10">
          <h2 className="text-xs text-gray-400 mb-6">PROJECTS</h2>
          {projectExperience.map((proj, idx) => (
            <div key={idx} className="mb-8">
              <p className="text-base font-normal mb-1">{proj.project_name}</p>
              <p className="text-xs text-gray-400 mb-3">{proj.project_time?.[0]} – {proj.project_time?.[1]}</p>
              <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{proj.project_desc}</p>
            </div>
          ))}
        </section>
      )}

      {skills.length > 0 && (
        <section className="resume-section mb-10">
          <h2 className="text-xs text-gray-400 mb-4">SKILLS</h2>
          <p className="text-sm text-gray-600">{skills.map(s => s.name).join(' / ')}</p>
        </section>
      )}

      {awards.length > 0 && (
        <section>
          <h2 className="text-xs text-gray-400 mb-4">AWARDS</h2>
          {awards.map((award, idx) => (
            <p key={idx} className="text-sm text-gray-600 mb-2">{award.award_info} · {award.award_time}</p>
          ))}
        </section>
      )}
    </div>
  );
};

export default Template33;
