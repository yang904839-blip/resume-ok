import React from 'react';
import { useResumeStore } from '@/store';

const Template24: React.FC = () => {
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
      {/* Modern Card Layout */}
      <div className="space-y-5">
        {/* Header Card */}
        <div className="p-8 rounded-3xl shadow-lg" style={{ background: `linear-gradient(135deg, ${theme.color} 0%, ${theme.color}dd 100%)` }}>
          <h1 className="text-5xl font-bold mb-2 text-white">{profile?.name}</h1>
          <p className="text-xl text-white/90 mb-4">{profile?.positionTitle}</p>
          <div className="flex gap-6 text-sm text-white/80">
            {profile?.email && <span>✉ {profile.email}</span>}
            {profile?.phone && <span>📱 {profile?.mobile}</span>}
            {profile?.location && <span>📍 {profile?.workPlace}</span>}
          </div>
        </div>

        {/* About Me Card */}
        {aboutMe && (
          <div className="p-6 rounded-2xl shadow-md bg-gray-50 border-l-4" style={{ borderColor: theme.color }}>
            <h2 className="text-base font-bold mb-2" style={{ color: theme.color }}>关于我</h2>
            <p className="text-sm text-gray-700 leading-relaxed">{aboutMe}</p>
          </div>
        )}

        {/* Work Experience */}
        {workExperience.length > 0 && (
          <div>
            <h2 className="text-lg font-bold mb-3 px-2" style={{ color: theme.color }}>工作经历</h2>
            <div className="space-y-3">
              {workExperience.map((work, idx) => (
                <div key={idx} className="p-5 rounded-2xl shadow-md bg-white border border-gray-100">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-base font-bold">{work.department_name}</h3>
                      <p className="text-sm text-gray-600">{work.company_name}</p>
                    </div>
                    <span className="text-xs text-gray-500 px-3 py-1.5 rounded-lg bg-gray-100">
                      {work.work_time?.[0]} - {work.work_time?.[1]}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{work.work_desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div>
            <h2 className="text-lg font-bold mb-3 px-2" style={{ color: theme.color }}>教育背景</h2>
            <div className="space-y-3">
              {education.map((edu, idx) => (
                <div key={idx} className="p-5 rounded-2xl shadow-md bg-white border border-gray-100">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="text-base font-bold">{edu.school}</h3>
                      <p className="text-sm text-gray-600">{edu.major} · {edu.degree}</p>
                    </div>
                    <span className="text-xs text-gray-500 px-3 py-1.5 rounded-lg bg-gray-100">
                      {edu.edu_time?.[0]} - {edu.edu_time?.[1]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Project Experience */}
        {projectExperience.length > 0 && (
          <div>
            <h2 className="text-lg font-bold mb-3 px-2" style={{ color: theme.color }}>项目经验</h2>
            <div className="space-y-3">
              {projectExperience.map((proj, idx) => (
                <div key={idx} className="p-5 rounded-2xl shadow-md bg-white border border-gray-100">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-base font-bold">{proj.project_name}</h3>
                    <span className="text-xs text-gray-500 px-3 py-1.5 rounded-lg bg-gray-100">
                      {proj.project_time?.[0]} - {proj.project_time?.[1]}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{proj.project_desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills & Awards */}
        <div className="grid grid-cols-2 gap-5">
          {/* Skills */}
          {skills.length > 0 && (
            <div className="p-5 rounded-2xl shadow-md bg-white border border-gray-100">
              <h2 className="text-base font-bold mb-3" style={{ color: theme.color }}>技能</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 text-xs rounded-lg font-semibold"
                    style={{ backgroundColor: `${theme.tagColor}25`, color: theme.color }}
                  >
                    {skill.skill_name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Awards */}
          {awards.length > 0 && (
            <div className="p-5 rounded-2xl shadow-md bg-white border border-gray-100">
              <h2 className="text-base font-bold mb-3" style={{ color: theme.color }}>荣誉</h2>
              <div className="space-y-2">
                {awards.map((award, idx) => (
                  <div key={idx}>
                    <p className="text-sm font-semibold">{award.award_info}</p>
                    <p className="text-xs text-gray-600">{award.award_time}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Template24;
