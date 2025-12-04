import React from 'react';
import { useTranslation } from 'react-i18next';
import { useResumeStore } from '@/store';
import { DEFAULT_TITLE_MAP } from '@/data/constants';

const Template2: React.FC = () => {
  const { t } = useTranslation();
  const { resumeData, theme, locale } = useResumeStore();
  const titleMap = DEFAULT_TITLE_MAP[locale];

  const profile = resumeData.profile || {};
  const educationList = resumeData.educationList || [];
  const workExpList = resumeData.workExpList || [];
  const projectList = resumeData.projectList || [];
  const skillList = resumeData.skillList || [];
  const awardList = resumeData.awardList || [];
  const aboutme = resumeData.aboutme || {};

  return (
    <div
      className="resume-template-content bg-white shadow-2xl rounded-2xl overflow-hidden mx-auto flex"
      style={{ width: '210mm', minHeight: '297mm' }}
    >
      {/* Left Sidebar */}
      <div
        className="w-1/3 p-8 text-white"
        style={{
          background: `linear-gradient(180deg, ${theme.color} 0%, ${adjustColor(theme.color, -40)} 100%)`,
        }}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 break-words">{profile.name}</h1>
          <p className="text-lg opacity-90">{profile.positionTitle}</p>
        </div>

        {/* Contact Info */}
        <div className="mb-8 space-y-3 text-sm">
          {profile.mobile && (
            <div>
              <div className="font-semibold mb-1 opacity-80">电话</div>
              <div className="break-all">{profile.mobile}</div>
            </div>
          )}
          {profile.email && (
            <div>
              <div className="font-semibold mb-1 opacity-80">邮箱</div>
              <div className="break-all">{profile.email}</div>
            </div>
          )}
          {profile.workPlace && (
            <div>
              <div className="font-semibold mb-1 opacity-80">期望地点</div>
              <div>{profile.workPlace}</div>
            </div>
          )}
          {profile.workExpYear && (
            <div>
              <div className="font-semibold mb-1 opacity-80">工作经验</div>
              <div>{profile.workExpYear}</div>
            </div>
          )}
          {profile.github && (
            <div>
              <div className="font-semibold mb-1 opacity-80">GitHub</div>
              <div className="break-all text-xs">{profile.github}</div>
            </div>
          )}
        </div>

        {/* Skills */}
        {skillList.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 border-b border-white/30 pb-2">
              {titleMap.skillList}
            </h2>
            <div className="space-y-4">
              {skillList.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-1 text-sm">
                    <span className="font-medium">{skill.skill_name}</span>
                    <span className="text-xs opacity-80">{skill.skill_level}%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-1.5">
                    <div
                      className="bg-white h-full rounded-full transition-all duration-500"
                      style={{ width: `${skill.skill_level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Awards */}
        {awardList.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-4 border-b border-white/30 pb-2">
              {titleMap.awardList}
            </h2>
            <div className="space-y-3 text-sm">
              {awardList.map((award, index) => (
                <div key={index}>
                  <div className="font-medium">{award.award_info}</div>
                  <div className="text-xs opacity-80">{award.award_time}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Content */}
      <div className="flex-1 p-8">
        {/* About Me */}
        {aboutme.aboutme_desc && (
          <section className="resume-section mb-8">
            <h2 className="text-2xl font-bold mb-3" style={{ color: theme.color }}>
              {titleMap.aboutme}
            </h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-sm">
              {aboutme.aboutme_desc}
            </p>
          </section>
        )}

        {/* Education */}
        {educationList.length > 0 && (
          <section className="resume-section mb-8">
            <h2 className="text-2xl font-bold mb-3" style={{ color: theme.color }}>
              {titleMap.educationList}
            </h2>
            <div className="space-y-4">
              {educationList.map((edu, index) => (
                <div key={index} className="border-l-2 pl-4" style={{ borderColor: theme.tagColor }}>
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-gray-900">{edu.school}</h3>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                      {edu.edu_time[0]} - {edu.edu_time[1]}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {edu.major} · {edu.academic_degree}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Work Experience */}
        {workExpList.length > 0 && (
          <section className="resume-section mb-8">
            <h2 className="text-2xl font-bold mb-3" style={{ color: theme.color }}>
              {titleMap.workExpList}
            </h2>
            <div className="space-y-5">
              {workExpList.map((work, index) => (
                <div key={index} className="border-l-2 pl-4" style={{ borderColor: theme.tagColor }}>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-semibold text-gray-900">{work.company_name}</h3>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                      {work.work_time?.[0]} - {work.work_time?.[1] === null ? t('work.current') : work.work_time?.[1]}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{work.department_name}</p>
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {work.work_desc}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projectList.length > 0 && (
          <section className="resume-section mb-8">
            <h2 className="text-2xl font-bold mb-3" style={{ color: theme.color }}>
              {titleMap.projectList}
            </h2>
            <div className="space-y-5">
              {projectList.map((project, index) => (
                <div key={index} className="border-l-2 pl-4" style={{ borderColor: theme.tagColor }}>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-semibold text-gray-900">{project.project_name}</h3>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                      {project.project_time}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{project.project_role}</p>
                  {project.project_desc && (
                    <p className="text-sm text-gray-700 mb-2">{project.project_desc}</p>
                  )}
                  {project.project_content && (
                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {project.project_content}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

function adjustColor(color: string, amount: number): string {
  const clamp = (val: number) => Math.min(Math.max(val, 0), 255);
  const num = parseInt(color.replace('#', ''), 16);
  const r = clamp((num >> 16) + amount);
  const g = clamp(((num >> 8) & 0x00ff) + amount);
  const b = clamp((num & 0x0000ff) + amount);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

export default Template2;
