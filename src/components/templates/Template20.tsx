import React from 'react';
import { useResumeStore } from '@/store';

const Template20: React.FC = () => {
  const { resumeData, theme } = useResumeStore();
  
  const profile = resumeData.profile || { name: "" };
  const education = resumeData.educationList || [];
  const workExperience = resumeData.workExpList || [];
  const projectExperience = resumeData.projectList || [];
  const skills = resumeData.skillList || [];
  const awards = resumeData.awardList || [];
  const aboutMe = resumeData.aboutme?.aboutme_desc || '';

  return (
    <div className="w-[210mm] min-h-[297mm] bg-gray-900 text-white p-10">
      {/* Header */}
      <header className="mb-8 pb-6 border-b border-gray-700">
        <h1 className="text-5xl font-bold mb-2" style={{ color: theme.color }}>{profile?.name}</h1>
        <p className="text-2xl text-gray-300 mb-4">{profile?.positionTitle}</p>
        <div className="flex gap-6 text-sm text-gray-400">
          {profile?.email && <span>{profile.email}</span>}
          {profile?.phone && <span>{profile?.mobile}</span>}
          {profile?.location && <span>{profile?.workPlace}</span>}
        </div>
      </header>

      {/* About Me */}
      {aboutMe && (
        <section className="resume-section mb-7">
          <h2 className="text-xl font-bold mb-3 pb-2 border-b border-gray-700" style={{ color: theme.color }}>
            关于我
          </h2>
          <p className="text-sm text-gray-300 leading-relaxed">{aboutMe}</p>
        </section>
      )}

      {/* Work Experience */}
      {workExperience.length > 0 && (
        <section className="resume-section mb-7">
          <h2 className="text-xl font-bold mb-4 pb-2 border-b border-gray-700" style={{ color: theme.color }}>
            工作经历
          </h2>
          {workExperience.map((work, idx) => (
            <div key={idx} className="mb-5 p-4 rounded-lg bg-gray-800/50 border border-gray-700">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-base font-semibold text-white">{work.department_name}</h3>
                  <p className="text-sm text-gray-400">{work.company_name}</p>
                </div>
                <span className="text-xs text-gray-500 px-2 py-1 rounded bg-gray-800">{work.work_time?.[0]} - {work.work_time?.[1]}</span>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-line">{work.work_desc}</p>
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="resume-section mb-7">
          <h2 className="text-xl font-bold mb-4 pb-2 border-b border-gray-700" style={{ color: theme.color }}>
            教育背景
          </h2>
          {education.map((edu, idx) => (
            <div key={idx} className="mb-3 p-4 rounded-lg bg-gray-800/50 border border-gray-700">
              <div className="flex justify-between items-start mb-1">
                <div>
                  <h3 className="text-base font-semibold text-white">{edu.school}</h3>
                  <p className="text-sm text-gray-400">{edu.major} · {edu.degree}</p>
                </div>
                <span className="text-xs text-gray-500 px-2 py-1 rounded bg-gray-800">{edu.edu_time?.[0]} - {edu.edu_time?.[1]}</span>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Project Experience */}
      {projectExperience.length > 0 && (
        <section className="resume-section mb-7">
          <h2 className="text-xl font-bold mb-4 pb-2 border-b border-gray-700" style={{ color: theme.color }}>
            项目经验
          </h2>
          {projectExperience.map((proj, idx) => (
            <div key={idx} className="mb-5 p-4 rounded-lg bg-gray-800/50 border border-gray-700">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-base font-semibold text-white">{proj.project_name}</h3>
                <span className="text-xs text-gray-500 px-2 py-1 rounded bg-gray-800">{proj.project_time?.[0]} - {proj.project_time?.[1]}</span>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-line">{proj.project_desc}</p>
            </div>
          ))}
        </section>
      )}

      <div className="grid grid-cols-2 gap-6">
        {/* Skills */}
        {skills.length > 0 && (
          <section>
            <h2 className="text-xl font-bold mb-3 pb-2 border-b border-gray-700" style={{ color: theme.color }}>
              技能
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 text-xs rounded-lg font-medium border"
                  style={{ borderColor: theme.color, color: theme.color }}
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
            <h2 className="text-xl font-bold mb-3 pb-2 border-b border-gray-700" style={{ color: theme.color }}>
              荣誉
            </h2>
            <div className="space-y-2">
              {awards.map((award, idx) => (
                <div key={idx}>
                  <p className="text-sm font-semibold text-white">{award.award_info}</p>
                  <p className="text-xs text-gray-400">{award.award_time}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Template20;
