import { TemplateProps } from '../index';
import { generateColorShades } from '../index';

export const Template1 = ({ 
  resumeData, 
  primaryColor = '#3B82F6', 
  fontSize = 14,
  className = '' 
}: TemplateProps) => {
  const colors = generateColorShades(primaryColor);
  const { personalInfo, education, experience, projects, skills, honors } = resumeData;

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
              {personalInfo.name || '姓名'}
            </h1>
            <p className="text-xl text-gray-600 mb-3">
              {personalInfo.title || '职位标题'}
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
              {personalInfo.email && (
                <span>📧 {personalInfo.email}</span>
              )}
              {personalInfo.phone && (
                <span>📱 {personalInfo.phone}</span>
              )}
              {personalInfo.address && (
                <span>📍 {personalInfo.address}</span>
              )}
              {personalInfo.github && (
                <span>🔗 {personalInfo.github}</span>
              )}
            </div>
          </header>

          {/* 个人简介 */}
          {personalInfo.summary && (
            <section className="mb-6">
              <h2 className="text-lg font-semibold mb-3 flex items-center" style={{ color: colors.primary }}>
                <span className="w-1 h-5 mr-3 rounded" style={{ backgroundColor: colors.primary }}></span>
                个人简介
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {personalInfo.summary}
              </p>
            </section>
          )}

          {/* 工作经历 */}
          {experience.length > 0 && (
            <section className="mb-6">
              <h2 className="text-lg font-semibold mb-3 flex items-center" style={{ color: colors.primary }}>
                <span className="w-1 h-5 mr-3 rounded" style={{ backgroundColor: colors.primary }}></span>
                工作经历
              </h2>
              <div className="space-y-4">
                {experience.map((exp, index) => (
                  <div key={exp.id || index} className="border-l-2 pl-4" style={{ borderColor: colors.light }}>
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h3 className="font-semibold text-gray-800">{exp.position}</h3>
                        <p className="text-gray-600">{exp.company}</p>
                      </div>
                      <span className="text-sm text-gray-500 whitespace-nowrap ml-4">
                        {exp.startDate} - {exp.isCurrent ? '至今' : exp.endDate}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{exp.location}</p>
                    <p className="text-gray-700 mb-2">{exp.description}</p>
                    {exp.achievements.length > 0 && (
                      <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                        {exp.achievements.map((achievement, idx) => (
                          <li key={idx}>{achievement}</li>
                        ))}
                      </ul>
                    )}
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
                        {project.startDate} - {project.endDate}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-2">{project.description}</p>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {project.technologies.map((tech, idx) => (
                        <span 
                          key={idx} 
                          className="px-2 py-1 text-xs rounded text-white"
                          style={{ backgroundColor: colors.primary }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    {project.achievements.length > 0 && (
                      <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                        {project.achievements.map((achievement, idx) => (
                          <li key={idx}>{achievement}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 教育经历 */}
          {education.length > 0 && (
            <section className="mb-6">
              <h2 className="text-lg font-semibold mb-3 flex items-center" style={{ color: colors.primary }}>
                <span className="w-1 h-5 mr-3 rounded" style={{ backgroundColor: colors.primary }}></span>
                教育经历
              </h2>
              <div className="space-y-3">
                {education.map((edu, index) => (
                  <div key={edu.id || index} className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-800">{edu.school}</h3>
                      <p className="text-gray-600">{edu.degree} - {edu.major}</p>
                      {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
                      {edu.description && <p className="text-sm text-gray-700">{edu.description}</p>}
                    </div>
                    <span className="text-sm text-gray-500 whitespace-nowrap ml-4">
                      {edu.startDate} - {edu.endDate}
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
                 {Object.entries(
                   skills.reduce((acc, skill) => {
                     if (!acc[skill.category]) acc[skill.category] = [];
                     acc[skill.category].push(skill);
                     return acc;
                   }, {} as Record<string, any[]>)
                 ).map(([category, categorySkills]) => (
                  <div key={category}>
                    <h3 className="font-medium text-gray-800 mb-2">{category}</h3>
                    <div className="flex flex-wrap gap-1">
                      {categorySkills.map((skill, idx) => (
                        <span 
                          key={idx}
                          className="px-2 py-1 text-xs rounded bg-gray-100 text-gray-700"
                        >
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 荣誉奖项 */}
          {honors.length > 0 && (
            <section className="mb-6">
              <h2 className="text-lg font-semibold mb-3 flex items-center" style={{ color: colors.primary }}>
                <span className="w-1 h-5 mr-3 rounded" style={{ backgroundColor: colors.primary }}></span>
                荣誉奖项
              </h2>
              <div className="space-y-2">
                {honors.map((honor, index) => (
                  <div key={honor.id || index} className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-800">{honor.title}</h3>
                      <p className="text-gray-600">{honor.organization}</p>
                      {honor.description && <p className="text-sm text-gray-700">{honor.description}</p>}
                    </div>
                    <span className="text-sm text-gray-500 whitespace-nowrap ml-4">
                      {honor.date}
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