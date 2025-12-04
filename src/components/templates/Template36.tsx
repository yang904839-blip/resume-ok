import React from 'react';
import { useResumeStore } from '@/store';

const Template36: React.FC = () => {
  const { resumeData, theme } = useResumeStore();
  
  const profile = resumeData.profile || { name: "" };
  const education = resumeData.educationList || [];
  const workExperience = resumeData.workExpList || [];
  const projectExperience = resumeData.projectList || [];
  const skills = resumeData.skillList || [];
  const awards = resumeData.awardList || [];
  const aboutMe = resumeData.aboutme?.aboutme_desc || '';

  return (
    <div className="w-[210mm] min-h-[297mm] bg-white text-gray-900 p-10">
      {/* Financial/Consulting Style */}
      <header className="mb-10 pb-8 border-b-4 border-gray-900">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold mb-2 uppercase tracking-tight">{profile?.name}</h1>
            <p className="text-xl text-gray-700">{profile?.positionTitle}</p>
          </div>
          <div className="text-right text-sm text-gray-600 space-y-1">
            {profile?.email && <p>{profile.email}</p>}
            {profile?.phone && <p>{profile?.mobile}</p>}
            {profile?.location && <p>{profile?.workPlace}</p>}
          </div>
        </div>
      </header>

      {aboutMe && (
        <section className="resume-section mb-8">
          <h2 className="text-sm font-bold mb-3 uppercase tracking-widest border-b-2 border-gray-900 pb-2">
            Summary
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed">{aboutMe}</p>
        </section>
      )}

      {workExperience.length > 0 && (
        <section className="resume-section mb-8">
          <h2 className="text-sm font-bold mb-4 uppercase tracking-widest border-b-2 border-gray-900 pb-2">
            Experience
          </h2>
          {workExperience.map((work, idx) => (
            <div key={idx} className="mb-5">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-base font-bold">{work.department_name}</h3>
                  <p className="text-sm text-gray-700 font-semibold">{work.company_name}</p>
                </div>
                <span className="text-sm text-gray-600 font-medium">{work.work_time?.[0]} - {work.work_time?.[1]}</span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{work.work_desc}</p>
            </div>
          ))}
        </section>
      )}

      {education.length > 0 && (
        <section className="resume-section mb-8">
          <h2 className="text-sm font-bold mb-4 uppercase tracking-widest border-b-2 border-gray-900 pb-2">
            Education
          </h2>
          {education.map((edu, idx) => (
            <div key={idx} className="mb-4">
              <div className="flex justify-between items-start mb-1">
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
        <section className="resume-section mb-8">
          <h2 className="text-sm font-bold mb-4 uppercase tracking-widest border-b-2 border-gray-900 pb-2">
            Projects
          </h2>
          {projectExperience.map((proj, idx) => (
            <div key={idx} className="mb-5">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-base font-bold">{proj.project_name}</h3>
                <span className="text-sm text-gray-600 font-medium">{proj.project_time?.[0]} - {proj.project_time?.[1]}</span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{proj.project_desc}</p>
            </div>
          ))}
        </section>
      )}

      <div className="grid grid-cols-2 gap-6">
        {skills.length > 0 && (
          <section>
            <h2 className="text-sm font-bold mb-3 uppercase tracking-widest border-b-2 border-gray-900 pb-2">
              Skills
            </h2>
            <div className="space-y-1">
              {skills.map((skill, idx) => (
                <p key={idx} className="text-sm text-gray-700">• {skill.skill_name}</p>
              ))}
            </div>
          </section>
        )}

        {awards.length > 0 && (
          <section>
            <h2 className="text-sm font-bold mb-3 uppercase tracking-widest border-b-2 border-gray-900 pb-2">
              Awards
            </h2>
            <div className="space-y-2">
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

export default Template36;
