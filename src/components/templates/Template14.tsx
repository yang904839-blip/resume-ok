import React from 'react';
import { useResumeStore } from '@/store';

const Template14: React.FC = () => {
  const { resumeData, theme } = useResumeStore();
  
  const profile = resumeData.profile || { name: "" };
  const education = resumeData.educationList || [];
  const workExperience = resumeData.workExpList || [];
  const projectExperience = resumeData.projectList || [];
  const skills = resumeData.skillList || [];
  const awards = resumeData.awardList || [];
  const aboutMe = resumeData.aboutme?.aboutme_desc || '';

  return (
    <div className="w-[210mm] min-h-[297mm] bg-white text-gray-900 p-12">
      {/* Header with Accent Bar */}
      <header className="mb-8">
        <div className="h-2 mb-6" style={{ backgroundColor: theme.color }}></div>
        <h1 className="text-5xl font-bold mb-2">{profile?.name}</h1>
        <p className="text-2xl text-gray-600 mb-4">{profile?.positionTitle}</p>
        <div className="flex gap-6 text-sm text-gray-700">
          {profile?.email && <span>{profile.email}</span>}
          {profile?.mobile && <span>{profile?.mobile}</span>}
          {profile?.workPlace && <span>{profile?.workPlace}</span>}
        </div>
      </header>

      {/* About Me */}
      {aboutMe && (
        <section className="resume-section mb-8">
          <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
            <span className="w-1 h-6" style={{ backgroundColor: theme.color }}></span>
            个人简介
          </h2>
          <p className="text-gray-700 leading-relaxed">{aboutMe}</p>
        </section>
      )}

      {/* Work Experience */}
      {workExperience.length > 0 && (
        <section className="resume-section mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="w-1 h-6" style={{ backgroundColor: theme.color }}></span>
            工作经历
          </h2>
          {workExperience.map((work, idx) => (
            <div key={idx} className="mb-5 pl-4 border-l-2" style={{ borderColor: `${theme.color}40` }}>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-semibold" style={{ color: theme.color }}>{work.department_name}</h3>
                  <p className="text-gray-600">{work.company_name}</p>
                </div>
                <span className="text-sm text-gray-500">{work.work_time?.[0]} - {work.work_time?.[1]}</span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{work.work_desc}</p>
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="resume-section mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="w-1 h-6" style={{ backgroundColor: theme.color }}></span>
            教育背景
          </h2>
          {education.map((edu, idx) => (
            <div key={idx} className="mb-4 pl-4 border-l-2" style={{ borderColor: `${theme.color}40` }}>
              <div className="flex justify-between items-start mb-1">
                <div>
                  <h3 className="text-lg font-semibold">{edu.school}</h3>
                  <p className="text-gray-600">{edu.major} · {edu.degree}</p>
                </div>
                <span className="text-sm text-gray-500">{edu.edu_time?.[0]} - {edu.edu_time?.[1]}</span>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Project Experience */}
      {projectExperience.length > 0 && (
        <section className="resume-section mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="w-1 h-6" style={{ backgroundColor: theme.color }}></span>
            项目经验
          </h2>
          {projectExperience.map((proj, idx) => (
            <div key={idx} className="mb-5 pl-4 border-l-2" style={{ borderColor: `${theme.color}40` }}>
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold" style={{ color: theme.color }}>{proj.project_name}</h3>
                <span className="text-sm text-gray-500">{proj.project_time?.[0]} - {proj.project_time?.[1]}</span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{proj.project_desc}</p>
            </div>
          ))}
        </section>
      )}

      <div className="grid grid-cols-2 gap-8">
        {/* Skills */}
        {skills.length > 0 && (
          <section>
            <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
              <span className="w-1 h-6" style={{ backgroundColor: theme.color }}></span>
              技能
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 text-sm rounded"
                  style={{ backgroundColor: `${theme.tagColor}20`, color: theme.color }}
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
            <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
              <span className="w-1 h-6" style={{ backgroundColor: theme.color }}></span>
              获奖荣誉
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

export default Template14;
