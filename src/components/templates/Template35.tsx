import React from 'react';
import { useResumeStore } from '@/store';

const Template35: React.FC = () => {
  const { resumeData, theme } = useResumeStore();
  
  const profile = resumeData.profile || { name: "" };
  const education = resumeData.educationList || [];
  const workExperience = resumeData.workExpList || [];
  const projectExperience = resumeData.projectList || [];
  const skills = resumeData.skillList || [];
  const awards = resumeData.awardList || [];
  const aboutMe = resumeData.aboutme?.aboutme_desc || '';

  return (
    <div className="w-[210mm] min-h-[297mm] bg-white text-gray-900">
      {/* Corporate Header */}
      <header className="p-10 text-white" style={{ backgroundColor: theme.color }}>
        <h1 className="text-4xl font-bold mb-2">{profile?.name}</h1>
        <p className="text-xl mb-4 opacity-90">{profile?.positionTitle}</p>
        <div className="flex gap-6 text-sm opacity-85">
          {profile?.email && <span>{profile.email}</span>}
          {profile?.phone && <span>|</span>}
          {profile?.phone && <span>{profile?.mobile}</span>}
          {profile?.location && <span>|</span>}
          {profile?.location && <span>{profile?.workPlace}</span>}
        </div>
      </header>

      <div className="p-10">
        {aboutMe && (
          <section className="resume-section mb-8 p-5 bg-gray-50 rounded-lg">
            <h2 className="text-base font-bold mb-3 uppercase" style={{ color: theme.color }}>
              Professional Profile
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed">{aboutMe}</p>
          </section>
        )}

        {workExperience.length > 0 && (
          <section className="resume-section mb-8">
            <h2 className="text-base font-bold mb-4 uppercase pb-2 border-b-2" style={{ color: theme.color, borderColor: theme.color }}>
              Career History
            </h2>
            {workExperience.map((work, idx) => (
              <div key={idx} className="mb-5 p-4 border-l-4" style={{ borderColor: `${theme.color}40` }}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-base font-bold">{work.department_name}</h3>
                    <p className="text-sm text-gray-700 font-medium">{work.company_name}</p>
                  </div>
                  <span className="text-xs text-white px-3 py-1 rounded" style={{ backgroundColor: theme.color }}>
                    {work.work_time?.[0]} - {work.work_time?.[1]}
                  </span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{work.work_desc}</p>
              </div>
            ))}
          </section>
        )}

        {education.length > 0 && (
          <section className="resume-section mb-8">
            <h2 className="text-base font-bold mb-4 uppercase pb-2 border-b-2" style={{ color: theme.color, borderColor: theme.color }}>
              Academic Background
            </h2>
            {education.map((edu, idx) => (
              <div key={idx} className="mb-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="text-base font-bold">{edu.school}</h3>
                    <p className="text-sm text-gray-700">{edu.major} · {edu.degree}</p>
                  </div>
                  <span className="text-xs text-gray-600">{edu.edu_time?.[0]} - {edu.edu_time?.[1]}</span>
                </div>
              </div>
            ))}
          </section>
        )}

        {projectExperience.length > 0 && (
          <section className="resume-section mb-8">
            <h2 className="text-base font-bold mb-4 uppercase pb-2 border-b-2" style={{ color: theme.color, borderColor: theme.color }}>
              Notable Projects
            </h2>
            {projectExperience.map((proj, idx) => (
              <div key={idx} className="mb-5 p-4 border-l-4" style={{ borderColor: `${theme.color}40` }}>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-base font-bold">{proj.project_name}</h3>
                  <span className="text-xs text-white px-3 py-1 rounded" style={{ backgroundColor: theme.color }}>
                    {proj.project_time?.[0]} - {proj.project_time?.[1]}
                  </span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{proj.project_desc}</p>
              </div>
            ))}
          </section>
        )}

        <div className="grid grid-cols-2 gap-6">
          {skills.length > 0 && (
            <section className="p-5 bg-gray-50 rounded-lg">
              <h2 className="text-base font-bold mb-3 uppercase" style={{ color: theme.color }}>
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 text-xs rounded font-semibold"
                    style={{ backgroundColor: `${theme.tagColor}30`, color: theme.color }}
                  >
                    {skill.skill_name}
                  </span>
                ))}
              </div>
            </section>
          )}

          {awards.length > 0 && (
            <section className="p-5 bg-gray-50 rounded-lg">
              <h2 className="text-base font-bold mb-3 uppercase" style={{ color: theme.color }}>
                Recognition
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
    </div>
  );
};

export default Template35;
