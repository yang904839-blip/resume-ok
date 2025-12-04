import React from 'react';
import { useResumeStore } from '@/store';

const Template39: React.FC = () => {
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
      {/* Premium Business Card Style */}
      <div className="border-4 p-10" style={{ borderColor: theme.color }}>
        <header className="mb-10 text-center">
          <h1 className="text-5xl font-bold mb-3" style={{ color: theme.color }}>{profile?.name}</h1>
          <div className="h-1 w-24 mx-auto mb-4" style={{ backgroundColor: theme.color }}></div>
          <p className="text-2xl text-gray-700 mb-5">{profile?.positionTitle}</p>
          <div className="flex justify-center gap-4 text-sm text-gray-600">
            {profile?.email && <span>{profile.email}</span>}
            {profile?.phone && <span>|</span>}
            {profile?.phone && <span>{profile?.mobile}</span>}
            {profile?.location && <span>|</span>}
            {profile?.location && <span>{profile?.workPlace}</span>}
          </div>
        </header>

        {aboutMe && (
          <section className="resume-section mb-8 p-5 border-2 rounded" style={{ borderColor: `${theme.color}30` }}>
            <p className="text-sm text-gray-700 leading-relaxed text-center">{aboutMe}</p>
          </section>
        )}

        {workExperience.length > 0 && (
          <section className="resume-section mb-8">
            <h2 className="text-center text-base font-bold mb-5 uppercase tracking-widest pb-2 border-b-2" style={{ color: theme.color, borderColor: theme.color }}>
              Professional Experience
            </h2>
            {workExperience.map((work, idx) => (
              <div key={idx} className="mb-6 p-4 border-l-4" style={{ borderColor: theme.color }}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-base font-bold" style={{ color: theme.color }}>{work.department_name}</h3>
                    <p className="text-sm text-gray-700 font-semibold">{work.company_name}</p>
                  </div>
                  <span className="text-xs text-gray-600 font-medium">{work.work_time?.[0]} - {work.work_time?.[1]}</span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{work.work_desc}</p>
              </div>
            ))}
          </section>
        )}

        {education.length > 0 && (
          <section className="resume-section mb-8">
            <h2 className="text-center text-base font-bold mb-5 uppercase tracking-widest pb-2 border-b-2" style={{ color: theme.color, borderColor: theme.color }}>
              Education
            </h2>
            {education.map((edu, idx) => (
              <div key={idx} className="mb-4 p-4">
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
            <h2 className="text-center text-base font-bold mb-5 uppercase tracking-widest pb-2 border-b-2" style={{ color: theme.color, borderColor: theme.color }}>
              Key Projects
            </h2>
            {projectExperience.map((proj, idx) => (
              <div key={idx} className="mb-6 p-4 border-l-4" style={{ borderColor: theme.color }}>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-base font-bold" style={{ color: theme.color }}>{proj.project_name}</h3>
                  <span className="text-xs text-gray-600 font-medium">{proj.project_time?.[0]} - {proj.project_time?.[1]}</span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{proj.project_desc}</p>
              </div>
            ))}
          </section>
        )}

        <div className="grid grid-cols-2 gap-6">
          {skills.length > 0 && (
            <section className="p-4 border-2 rounded" style={{ borderColor: `${theme.color}30` }}>
              <h2 className="text-center text-sm font-bold mb-3 uppercase tracking-wider" style={{ color: theme.color }}>
                Skills
              </h2>
              <div className="flex flex-wrap gap-2 justify-center">
                {skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-xs rounded-full font-semibold"
                    style={{ backgroundColor: `${theme.tagColor}25`, color: theme.color }}
                  >
                    {skill.skill_name}
                  </span>
                ))}
              </div>
            </section>
          )}

          {awards.length > 0 && (
            <section className="p-4 border-2 rounded" style={{ borderColor: `${theme.color}30` }}>
              <h2 className="text-center text-sm font-bold mb-3 uppercase tracking-wider" style={{ color: theme.color }}>
                Awards
              </h2>
              <div className="space-y-2">
                {awards.map((award, idx) => (
                  <div key={idx} className="text-center">
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

export default Template39;
