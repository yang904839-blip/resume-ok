import React from 'react';
import { useResumeStore } from '@/store';

const Template29: React.FC = () => {
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
      {/* Grid-based Minimalist Layout */}
      <div className="grid grid-cols-4 gap-6">
        {/* Left Labels Column */}
        <div className="col-span-1 text-right pt-2">
          <div className="sticky top-0 space-y-12">
            <div className="text-xs uppercase tracking-widest text-gray-400">Profile</div>
            {workExperience.length > 0 && <div className="text-xs uppercase tracking-widest text-gray-400">Work</div>}
            {education.length > 0 && <div className="text-xs uppercase tracking-widest text-gray-400">Education</div>}
            {projectExperience.length > 0 && <div className="text-xs uppercase tracking-widest text-gray-400">Projects</div>}
            {skills.length > 0 && <div className="text-xs uppercase tracking-widest text-gray-400">Skills</div>}
          </div>
        </div>

        {/* Right Content Column */}
        <div className="col-span-3">
          {/* Header */}
          <section className="resume-section mb-12">
            <h1 className="text-3xl font-light mb-2">{profile?.name}</h1>
            <p className="text-base text-gray-600 mb-3">{profile?.positionTitle}</p>
            <div className="flex gap-3 text-xs text-gray-500">
              {profile?.email && <span>{profile.email}</span>}
              {profile?.phone && <span>·</span>}
              {profile?.phone && <span>{profile?.mobile}</span>}
              {profile?.location && <span>·</span>}
              {profile?.location && <span>{profile?.workPlace}</span>}
            </div>
            {aboutMe && <p className="text-sm text-gray-700 leading-relaxed mt-4">{aboutMe}</p>}
          </section>

          {/* Work Experience */}
          {workExperience.length > 0 && (
            <section className="resume-section mb-12">
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

          {/* Education */}
          {education.length > 0 && (
            <section className="resume-section mb-12">
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

          {/* Project Experience */}
          {projectExperience.length > 0 && (
            <section className="resume-section mb-12">
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

          {/* Skills */}
          {skills.length > 0 && (
            <section className="resume-section mb-12">
              <p className="text-sm text-gray-700">{skills.map(s => s.name).join(', ')}</p>
            </section>
          )}

          {/* Awards */}
          {awards.length > 0 && (
            <section>
              {awards.map((award, idx) => (
                <p key={idx} className="text-sm text-gray-700 mb-1">{award.award_info} ({award.award_time})</p>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default Template29;
