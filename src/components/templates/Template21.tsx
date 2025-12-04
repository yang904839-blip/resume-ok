import React from 'react';
import { useResumeStore } from '@/store';

const Template21: React.FC = () => {
  const { resumeData, theme } = useResumeStore();
  
  const profile = resumeData.profile || { name: "" };
  const education = resumeData.educationList || [];
  const workExperience = resumeData.workExpList || [];
  const projectExperience = resumeData.projectList || [];
  const skills = resumeData.skillList || [];
  const awards = resumeData.awardList || [];
  const aboutMe = resumeData.aboutme?.aboutme_desc || '';

  return (
    <div className="w-[210mm] min-h-[297mm] bg-white text-gray-900 p-10 relative">
      {/* Diagonal Background Decoration */}
      <div 
        className="absolute top-0 right-0 w-96 h-96 opacity-5 -z-10"
        style={{ 
          background: `linear-gradient(135deg, ${theme.color} 0%, transparent 70%)`,
          clipPath: 'polygon(100% 0, 100% 100%, 0 0)'
        }}
      ></div>

      {/* Header */}
      <header className="mb-8">
        <h1 className="text-6xl font-black mb-2" style={{ color: theme.color }}>{profile?.name}</h1>
        <p className="text-2xl font-light text-gray-600 mb-4">{profile?.positionTitle}</p>
        <div className="flex gap-5 text-sm text-gray-600">
          {profile?.email && <span className="flex items-center gap-1.5">✉ {profile.email}</span>}
          {profile?.phone && <span className="flex items-center gap-1.5">☎ {profile?.mobile}</span>}
          {profile?.location && <span className="flex items-center gap-1.5">📍 {profile?.workPlace}</span>}
        </div>
      </header>

      {/* About Me */}
      {aboutMe && (
        <section className="resume-section mb-7 p-5 border-l-4" style={{ borderColor: theme.color }}>
          <h2 className="text-lg font-bold mb-3 uppercase tracking-wider" style={{ color: theme.color }}>
            Profile
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed">{aboutMe}</p>
        </section>
      )}

      {/* Work Experience */}
      {workExperience.length > 0 && (
        <section className="resume-section mb-7">
          <h2 className="text-lg font-bold mb-4 uppercase tracking-wider" style={{ color: theme.color }}>
            Experience
          </h2>
          {workExperience.map((work, idx) => (
            <div key={idx} className="mb-5 relative pl-6">
              <div className="absolute left-0 top-2 w-2 h-2 rounded-full" style={{ backgroundColor: theme.color }}></div>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-base font-bold">{work.department_name}</h3>
                  <p className="text-sm text-gray-600 font-medium">{work.company_name}</p>
                </div>
                <span className="text-xs text-white px-3 py-1 rounded-full font-medium" style={{ backgroundColor: theme.color }}>
                  {work.work_time?.[0]} - {work.work_time?.[1]}
                </span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{work.work_desc}</p>
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="resume-section mb-7">
          <h2 className="text-lg font-bold mb-4 uppercase tracking-wider" style={{ color: theme.color }}>
            Education
          </h2>
          {education.map((edu, idx) => (
            <div key={idx} className="mb-4 relative pl-6">
              <div className="absolute left-0 top-2 w-2 h-2 rounded-full" style={{ backgroundColor: theme.color }}></div>
              <div className="flex justify-between items-start mb-1">
                <div>
                  <h3 className="text-base font-bold">{edu.school}</h3>
                  <p className="text-sm text-gray-600">{edu.major} · {edu.degree}</p>
                </div>
                <span className="text-xs text-white px-3 py-1 rounded-full font-medium" style={{ backgroundColor: theme.color }}>
                  {edu.edu_time?.[0]} - {edu.edu_time?.[1]}
                </span>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Project Experience */}
      {projectExperience.length > 0 && (
        <section className="resume-section mb-7">
          <h2 className="text-lg font-bold mb-4 uppercase tracking-wider" style={{ color: theme.color }}>
            Projects
          </h2>
          {projectExperience.map((proj, idx) => (
            <div key={idx} className="mb-5 relative pl-6">
              <div className="absolute left-0 top-2 w-2 h-2 rounded-full" style={{ backgroundColor: theme.color }}></div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-base font-bold">{proj.project_name}</h3>
                <span className="text-xs text-white px-3 py-1 rounded-full font-medium" style={{ backgroundColor: theme.color }}>
                  {proj.project_time?.[0]} - {proj.project_time?.[1]}
                </span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{proj.project_desc}</p>
            </div>
          ))}
        </section>
      )}

      <div className="grid grid-cols-2 gap-6">
        {/* Skills */}
        {skills.length > 0 && (
          <section>
            <h2 className="text-lg font-bold mb-3 uppercase tracking-wider" style={{ color: theme.color }}>
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 text-xs rounded-full font-bold"
                  style={{ backgroundColor: `${theme.tagColor}25`, color: theme.color }}
                >
                  {skill.skill_name}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Awards */}
        {awards.length > 0 && (
          <section>
            <h2 className="text-lg font-bold mb-3 uppercase tracking-wider" style={{ color: theme.color }}>
              Awards
            </h2>
            <div className="space-y-2">
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

export default Template21;
