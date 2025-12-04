import React from 'react';
import { useResumeStore } from '@/store';

const Template32: React.FC = () => {
  const { resumeData, theme } = useResumeStore();
  
  const profile = resumeData.profile || { name: "" };
  const education = resumeData.educationList || [];
  const workExperience = resumeData.workExpList || [];
  const projectExperience = resumeData.projectList || [];
  const skills = resumeData.skillList || [];
  const awards = resumeData.awardList || [];
  const aboutMe = resumeData.aboutme?.aboutme_desc || '';

  return (
    <div className="w-[210mm] min-h-[297mm] bg-white text-gray-900 p-14">
      {/* Single Line Dividers */}
      <header className="mb-10">
        <h1 className="text-4xl font-thin mb-2">{profile?.name}</h1>
        <div className="h-px bg-gray-200 my-4"></div>
        <p className="text-lg text-gray-600 mb-3">{profile?.positionTitle}</p>
        <div className="flex gap-4 text-xs text-gray-500">
          {profile?.email && <span>{profile.email}</span>}
          {profile?.phone && <span>{profile?.mobile}</span>}
          {profile?.location && <span>{profile?.workPlace}</span>}
        </div>
      </header>

      {aboutMe && (
        <section className="resume-section mb-9">
          <div className="h-px bg-gray-200 mb-4"></div>
          <p className="text-sm text-gray-700 leading-relaxed">{aboutMe}</p>
        </section>
      )}

      {workExperience.length > 0 && (
        <section className="resume-section mb-9">
          <div className="h-px bg-gray-200 mb-5"></div>
          {workExperience.map((work, idx) => (
            <div key={idx} className="mb-6">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="text-base font-normal">{work.department_name}</h3>
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
          <div className="h-px bg-gray-200 mb-5"></div>
          {education.map((edu, idx) => (
            <div key={idx} className="mb-5">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="text-base font-normal">{edu.school}</h3>
                <span className="text-xs text-gray-400">{edu.edu_time?.[0]} – {edu.edu_time?.[1]}</span>
              </div>
              <p className="text-sm text-gray-600">{edu.major} · {edu.degree}</p>
            </div>
          ))}
        </section>
      )}

      {projectExperience.length > 0 && (
        <section className="resume-section mb-9">
          <div className="h-px bg-gray-200 mb-5"></div>
          {projectExperience.map((proj, idx) => (
            <div key={idx} className="mb-6">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="text-base font-normal">{proj.project_name}</h3>
                <span className="text-xs text-gray-400">{proj.project_time?.[0]} – {proj.project_time?.[1]}</span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{proj.project_desc}</p>
            </div>
          ))}
        </section>
      )}

      <div className="h-px bg-gray-200 mb-5"></div>
      <div className="grid grid-cols-2 gap-8">
        {skills.length > 0 && (
          <section>
            <div className="space-y-1">
              {skills.map((skill, idx) => (
                <p key={idx} className="text-sm text-gray-700">{skill.skill_name}</p>
              ))}
            </div>
          </section>
        )}

        {awards.length > 0 && (
          <section>
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

export default Template32;
