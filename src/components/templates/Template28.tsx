import React from 'react';
import { useResumeStore } from '@/store';

const Template28: React.FC = () => {
  const { resumeData, theme } = useResumeStore();
  
  const profile = resumeData.profile || { name: "" };
  const education = resumeData.educationList || [];
  const workExperience = resumeData.workExpList || [];
  const projectExperience = resumeData.projectList || [];
  const skills = resumeData.skillList || [];
  const awards = resumeData.awardList || [];
  const aboutMe = resumeData.aboutme?.aboutme_desc || '';

  return (
    <div className="w-[210mm] min-h-[297mm] bg-gray-50 text-gray-900 p-16">
      <div className="bg-white p-10 shadow-sm">
        {/* Simple Header */}
        <header className="mb-10 text-center">
          <h1 className="text-3xl font-light mb-2">{profile?.name}</h1>
          <p className="text-base text-gray-600 mb-3">{profile?.positionTitle}</p>
          <div className="flex justify-center gap-3 text-xs text-gray-500">
            {profile?.email && <span>{profile.email}</span>}
            {profile?.phone && <span>|</span>}
            {profile?.phone && <span>{profile?.mobile}</span>}
            {profile?.location && <span>|</span>}
            {profile?.location && <span>{profile?.workPlace}</span>}
          </div>
        </header>

        {aboutMe && (
          <section className="resume-section mb-8 text-center">
            <p className="text-sm text-gray-700 leading-relaxed max-w-2xl mx-auto">{aboutMe}</p>
          </section>
        )}

        {workExperience.length > 0 && (
          <section className="resume-section mb-8">
            <h2 className="text-sm font-semibold mb-5 text-center text-gray-400 uppercase tracking-wider">Experience</h2>
            {workExperience.map((work, idx) => (
              <div key={idx} className="mb-6">
                <div className="text-center mb-2">
                  <h3 className="text-base font-medium">{work.department_name}</h3>
                  <p className="text-sm text-gray-600">{work.company_name}</p>
                  <p className="text-xs text-gray-400">{work.work_time?.[0]} - {work.work_time?.[1]}</p>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{work.work_desc}</p>
              </div>
            ))}
          </section>
        )}

        {education.length > 0 && (
          <section className="resume-section mb-8">
            <h2 className="text-sm font-semibold mb-5 text-center text-gray-400 uppercase tracking-wider">Education</h2>
            {education.map((edu, idx) => (
              <div key={idx} className="mb-5 text-center">
                <h3 className="text-base font-medium">{edu.school}</h3>
                <p className="text-sm text-gray-600">{edu.major} · {edu.degree}</p>
                <p className="text-xs text-gray-400">{edu.edu_time?.[0]} - {edu.edu_time?.[1]}</p>
              </div>
            ))}
          </section>
        )}

        {projectExperience.length > 0 && (
          <section className="resume-section mb-8">
            <h2 className="text-sm font-semibold mb-5 text-center text-gray-400 uppercase tracking-wider">Projects</h2>
            {projectExperience.map((proj, idx) => (
              <div key={idx} className="mb-6">
                <div className="text-center mb-2">
                  <h3 className="text-base font-medium">{proj.project_name}</h3>
                  <p className="text-xs text-gray-400">{proj.project_time?.[0]} - {proj.project_time?.[1]}</p>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{proj.project_desc}</p>
              </div>
            ))}
          </section>
        )}

        <div className="grid grid-cols-2 gap-8">
          {skills.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold mb-4 text-center text-gray-400 uppercase tracking-wider">Skills</h2>
              <div className="text-center">
                <p className="text-sm text-gray-700">{skills.map(s => s.name).join(' • ')}</p>
              </div>
            </section>
          )}

          {awards.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold mb-4 text-center text-gray-400 uppercase tracking-wider">Awards</h2>
              <div className="space-y-2">
                {awards.map((award, idx) => (
                  <div key={idx} className="text-center">
                    <p className="text-sm text-gray-700">{award.award_info}</p>
                    <p className="text-xs text-gray-500">{award.award_time}</p>
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

export default Template28;
