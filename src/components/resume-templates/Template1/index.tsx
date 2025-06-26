
import { TemplateProps } from '../index';
import { generateColorShades } from '../index';

export const Template1 = ({ 
  resumeData, 
  primaryColor = '#3B82F6', 
  fontSize = 14,
  className = '' 
}: TemplateProps) => {
  const colors = generateColorShades(primaryColor);
  const { resume, educations, workExperiences, projects, skills, awards } = resumeData;

  const baseStyle = {
    fontSize: `${fontSize}px`,
    lineHeight: 1.6,
    color: colors.text,
    fontFamily: '"Microsoft YaHei", "PingFang SC", "Helvetica Neue", Arial, sans-serif'
  };

  return (
    <div className={`resume-template-1 bg-white ${className}`} style={baseStyle}>
      {/* A4 纸张比例容器 */}
      <div className="w-full max-w-[794px] mx-auto bg-white shadow-lg" style={{ aspectRatio: '210/297' }}>
        <div className="p-8 h-full flex flex-col">
          
          {/* 个人信息头部 */}
          <header className="mb-6 text-center border-b-2 pb-4" style={{ borderColor: colors.primary }}>
            <h1 className="text-3xl font-bold mb-2" style={{ color: colors.primary }}>
              {resume.name || '姓名'}
            </h1>
            <p className="text-xl text-gray-600 mb-3">
              职位标题
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
              {resume.email && (
                <span>📧 {resume.email}</span>
              )}
              {resume.phone && (
                <span>📱 {resume.phone}</span>
              )}
              {resume.city && (
                <span>📍 {resume.city}</span>
              )}
              {resume.website && (
                <span>🔗 {resume.website}</span>
              )}
            </div>
          </header>

          {/* 个人简介 */}
          {resume.summary && (
            <section className="mb-6">
              <h2 className="text-lg font-semibold mb-3 flex items-center" style={{ color: colors.primary }}>
                <span className="w-1 h-5 mr-3 rounded" style={{ backgroundColor: colors.primary }}></span>
                个人简介
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {resume.summary}
              </p>
            </section>
          )}

          {/* 工作经历 */}
          {workExperiences.length > 0 && (
            <section className="mb-6">
              <h2 className="text-lg font-semibold mb-3 flex items-center" style={{ color: colors.primary }}>
                <span className="w-1 h-5 mr-3 rounded" style={{ backgroundColor: colors.primary }}></span>
                工作经历
              </h2>
              <div className="space-y-4">
                {workExperiences.map((exp, index) => (
                  <div key={exp.id || index} className="border-l-2 pl-4" style={{ borderColor: colors.light }}>
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h3 className="font-semibold text-gray-800">{exp.position}</h3>
                        <p className="text-gray-600">{exp.company}</p>
                      </div>
                      <span className="text-sm text-gray-500 whitespace-nowrap ml-4">
                        {exp.start_date} - {exp.end_date}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-2">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 项目经历 */}
          {projects.length > 0 && (
            <section className="mb-6">
              <h2 className="text-lg font-semibold mb-3 flex items-center" style={{ color: colors.primary }}>
                <span className="w-1 h-5 mr-3 rounded" style={{ backgroundColor: colors.primary }}></span>
                项目经历
              </h2>
              <div className="space-y-4">
                {projects.map((project, index) => (
                  <div key={project.id || index} className="border-l-2 pl-4" style={{ borderColor: colors.light }}>
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h3 className="font-semibold text-gray-800">{project.name}</h3>
                        <p className="text-sm text-gray-600">{project.role}</p>
                      </div>
                      <span className="text-sm text-gray-500 whitespace-nowrap ml-4">
                        {project.start_date} - {project.end_date}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-2">{project.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 教育经历 */}
          {educations.length > 0 && (
            <section className="mb-6">
              <h2 className="text-lg font-semibold mb-3 flex items-center" style={{ color: colors.primary }}>
                <span className="w-1 h-5 mr-3 rounded" style={{ backgroundColor: colors.primary }}></span>
                教育经历
              </h2>
              <div className="space-y-3">
                {educations.map((edu, index) => (
                  <div key={edu.id || index} className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-800">{edu.school}</h3>
                      <p className="text-gray-600">{edu.degree} - {edu.major}</p>
                      {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
                    </div>
                    <span className="text-sm text-gray-500 whitespace-nowrap ml-4">
                      {edu.start_date} - {edu.end_date}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 技能 */}
          {skills.length > 0 && (
            <section className="mb-6">
              <h2 className="text-lg font-semibold mb-3 flex items-center" style={{ color: colors.primary }}>
                <span className="w-1 h-5 mr-3 rounded" style={{ backgroundColor: colors.primary }}></span>
                专业技能
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {skills.map((skill, index) => (
                  <div key={skill.id || index} className="flex justify-between items-center">
                    <span className="text-gray-800">{skill.name}</span>
                    <span className="text-sm text-gray-600">{skill.level}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 荣誉奖项 */}
          {awards.length > 0 && (
            <section className="mb-6">
              <h2 className="text-lg font-semibold mb-3 flex items-center" style={{ color: colors.primary }}>
                <span className="w-1 h-5 mr-3 rounded" style={{ backgroundColor: colors.primary }}></span>
                荣誉奖项
              </h2>
              <div className="space-y-2">
                {awards.map((award, index) => (
                  <div key={award.id || index} className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-800">{award.title}</h3>
                      {award.description && <p className="text-sm text-gray-700">{award.description}</p>}
                    </div>
                    <span className="text-sm text-gray-500 whitespace-nowrap ml-4">
                      {award.date}
                    </span>
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

export default Template1;
