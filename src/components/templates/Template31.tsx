import React from 'react';
import { useResumeStore } from '@/store';

const Template31: React.FC = () => {
  const { resumeData, theme } = useResumeStore();
  
  const profile = resumeData.profile || { name: "" };
  const education = resumeData.educationList || [];
  const workExperience = resumeData.workExpList || [];
  const projectExperience = resumeData.projectList || [];
  const skills = resumeData.skillList || [];
  const awards = resumeData.awardList || [];
  const aboutMe = resumeData.aboutme?.aboutme_desc || '';

  return (
    <div className="w-[210mm] min-h-[297mm] bg-white text-gray-900 p-20 font-light">
      {/* Extra Spacious Minimal */}
      <header className="mb-14">
        <h1 className="text-5xl font-extralight tracking-tight mb-3">{profile?.name}</h1>
        <p className="text-xl text-gray-500 mb-6">{profile?.positionTitle}</p>
        <div className="text-sm text-gray-400 space-x-4">
          {profile?.email && <span>{profile.email}</span>}
          {profile?.phone && <span>{profile?.mobile}</span>}
          {profile?.location && <span>{profile?.workPlace}</span>}
        </div>
      </header>

      {aboutMe && (
        <section className="resume-section mb-12">
          <p className="text-base text-gray-600 leading-loose max-w-2xl">{aboutMe}</p>
        </section>
      )}

      {workExperience.length > 0 && (
        <section className="resume-section mb-12">
          {workExperience.map((work, idx) => (
            <div key={idx} className="mb-10">
              <div className="mb-3">
                <h3 className="text-xl font-light mb-1">{work.department_name}</h3>
                <p className="text-base text-gray-500">{work.company_name}</p>
                <p className="text-sm text-gray-400 mt-1">{work.work_time?.[0]} – {work.work_time?.[1]}</p>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{work.work_desc}</p>
            </div>
          ))}
        </section>
      )}

      {education.length > 0 && (
        <section className="resume-section mb-12">
          {education.map((edu, idx) => (
            <div key={idx} className="mb-8">
              <h3 className="text-xl font-light mb-1">{edu.school}</h3>
              <p className="text-base text-gray-500">{edu.major} · {edu.degree}</p>
              <p className="text-sm text-gray-400 mt-1">{edu.edu_time?.[0]} – {edu.edu_time?.[1]}</p>
            </div>
          ))}
        </section>
      )}

      {projectExperience.length > 0 && (
        <section className="resume-section mb-12">
          {projectExperience.map((proj, idx) => (
            <div key={idx} className="mb-10">
              <div className="mb-3">
                <h3 className="text-xl font-light mb-1">{proj.project_name}</h3>
                <p className="text-sm text-gray-400">{proj.project_time?.[0]} – {proj.project_time?.[1]}</p>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{proj.project_desc}</p>
            </div>
          ))}
        </section>
      )}

      <div className="space-y-8">
        {skills.length > 0 && (
          <section>
            <p className="text-base text-gray-600">{skills.map(s => s.name).join('  ·  ')}</p>
          </section>
        )}

        {awards.length > 0 && (
          <section>
            {awards.map((award, idx) => (
              <p key={idx} className="text-base text-gray-600 mb-2">{award.award_info} · {award.award_time}</p>
            ))}
          </section>
        )}
      </div>
    </div>
  );
};

export default Template31;
