import React from 'react';
import { useResumeStore } from '@/store';

const Template11: React.FC = () => {
  const { resumeData, theme } = useResumeStore();
  
  const profile = resumeData.profile || { name: "" };
  const education = resumeData.educationList || [];
  const workExperience = resumeData.workExpList || [];
  const projectExperience = resumeData.projectList || [];
  const skills = resumeData.skillList || [];
  const awards = resumeData.awardList || [];
  const aboutMe = resumeData.aboutme?.aboutme_desc || '';

  return (
    <div className="w-[210mm] min-h-[297mm] bg-white text-gray-900 p-12 font-serif">
      {/* Header with Classic Blue Theme */}
      <header className="border-b-4 pb-6 mb-8" style={{ borderColor: theme.color }}>
        <h1 className="text-5xl font-bold mb-2" style={{ color: theme.color }}>{profile?.name}</h1>
        <p className="text-xl text-gray-600 mb-4">{profile?.title}</p>
        <div className="flex flex-wrap gap-6 text-sm text-gray-700">
          {profile?.email && <span>✉ {profile.email}</span>}
          {profile?.phone && <span>☎ {profile.phone}</span>}
          {profile?.location && <span>📍 {profile.location}</span>}
        </div>
      </header>

      {/* About Me */}
      {aboutMe && (
        <section className="resume-section mb-8">
          <h2 className="text-2xl font-bold mb-3 pb-2 border-b-2" style={{ color: theme.color, borderColor: theme.color }}>
            个人简介
          </h2>
          <p className="text-gray-700 leading-relaxed">{aboutMe}</p>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="resume-section mb-8">
          <h2 className="text-2xl font-bold mb-3 pb-2 border-b-2" style={{ color: theme.color, borderColor: theme.color }}>
            教育背景
          </h2>
          {education.map((edu, idx) => (
            <div key={idx} className="mb-4">
              <div className="flex justify-between items-start mb-1">
                <div>
                  <h3 className="text-lg font-semibold">{edu.school}</h3>
                  <p className="text-gray-600">{edu.major} - {edu.degree}</p>
                </div>
                <span className="text-sm text-gray-500">{edu.edu_time?.[0]} - {edu.edu_time?.[1]}</span>
              </div>
              {edu.major && <p className="text-sm text-gray-700 mt-2">{edu.major}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Work Experience */}
      {workExperience.length > 0 && (
        <section className="resume-section mb-8">
          <h2 className="text-2xl font-bold mb-3 pb-2 border-b-2" style={{ color: theme.color, borderColor: theme.color }}>
            工作经历
          </h2>
          {workExperience.map((work, idx) => (
            <div key={idx} className="mb-5">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-semibold">{work.department_name}</h3>
                  <p className="text-gray-600">{work.company_name}</p>
                </div>
                <span className="text-sm text-gray-500">{work.work_time?.[0]} - {work.work_time?.[1]}</span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{work.work_desc}</p>
            </div>
          ))}
        </section>
      )}

      {/* Project Experience */}
      {projectExperience.length > 0 && (
        <section className="resume-section mb-8">
          <h2 className="text-2xl font-bold mb-3 pb-2 border-b-2" style={{ color: theme.color, borderColor: theme.color }}>
            项目经验
          </h2>
          {projectExperience.map((proj, idx) => (
            <div key={idx} className="mb-5">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold">{proj.project_name}</h3>
                <span className="text-sm text-gray-500">{proj.project_time?.[0]} - {proj.project_time?.[1]}</span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{proj.project_desc}</p>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="resume-section mb-8">
          <h2 className="text-2xl font-bold mb-3 pb-2 border-b-2" style={{ color: theme.color, borderColor: theme.color }}>
            专业技能
          </h2>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill, idx) => (
              <span
                key={idx}
                className="px-4 py-1.5 rounded-full text-sm font-medium"
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
          <h2 className="text-2xl font-bold mb-3 pb-2 border-b-2" style={{ color: theme.color, borderColor: theme.color }}>
            获奖荣誉
          </h2>
          {awards.map((award, idx) => (
            <div key={idx} className="mb-3">
              <div className="flex justify-between items-start">
                <h3 className="text-base font-semibold">{award.award_info}</h3>
                <span className="text-sm text-gray-500">{award.award_time}</span>
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default Template11;
