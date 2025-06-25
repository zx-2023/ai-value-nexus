import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 数据模型（统一字段命名，供前后端共享）
export interface Resume {
  id?: string;
  user_id?: string;
  name: string;
  phone: string;
  email: string;
  university: string;
  major: string;
  degree: 'bachelor' | 'master' | 'phd' | 'associate' | 'diploma';
  age: number;
  website?: string;
  city: string;
  avatar_url?: string;
  summary: string;
  created_at?: string;
  updated_at?: string;
}

export interface Education {
  id?: string;
  resume_id?: string;
  school: string;
  department: string;
  degree: 'bachelor' | 'master' | 'phd' | 'associate' | 'diploma';
  major: string;
  start_date: string;
  end_date: string;
  gpa?: string;
  score?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Project {
  id?: string;
  resume_id?: string;
  name: string;
  role: string;
  start_date: string;
  end_date: string;
  description: string;
}

export interface WorkExperience {
  id?: string;
  resume_id?: string;
  company: string;
  position: string;
  start_date: string;
  end_date: string;
  description: string;
}

export interface Skill {
  id?: string;
  resume_id?: string;
  name: string;
  level: '一般' | '熟练' | '精通';
  description?: string;
}

export interface Award {
  id?: string;
  resume_id?: string;
  title: string;
  date: string;
  description: string;
}

export interface ResumeSettings {
  templateId: string;
  primaryColor: string;
  fontSize: number;
  lineHeight: number;
  margins: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  showPhoto: boolean;
  colorTheme: string;
}

export interface ResumeState {
  // 主表数据
  resume: Resume;
  
  // 子表数据
  educations: Education[];
  projects: Project[];
  workExperiences: WorkExperience[];
  skills: Skill[];
  awards: Award[];
  
  // 设置相关
  settings: ResumeSettings;
  selectedTemplateId: string | null;
  isPreviewMode: boolean;
  isExporting: boolean;
  isSaving: boolean;
  hasUnsavedChanges: boolean;
  
  // 表单验证状态
  validationErrors: Record<string, string[]>;
}

const initialState: ResumeState = {
  resume: {
    name: '',
    phone: '',
    email: '',
    university: '',
    major: '',
    degree: 'bachelor',
    age: 22,
    website: '',
    city: '',
    avatar_url: '',
    summary: ''
  },
  educations: [],
  projects: [],
  workExperiences: [],
  skills: [],
  awards: [],
  settings: {
    templateId: 'template1',
    primaryColor: '#2563eb',
    fontSize: 14,
    lineHeight: 1.6,
    margins: {
      top: 20,
      right: 20,
      bottom: 20,
      left: 20
    },
    showPhoto: true,
    colorTheme: 'blue'
  },
  selectedTemplateId: null,
  isPreviewMode: false,
  isExporting: false,
  isSaving: false,
  hasUnsavedChanges: false,
  validationErrors: {}
};

const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    // Resume主表操作
    updateResume: (state, action: PayloadAction<Partial<Resume>>) => {
      state.resume = { ...state.resume, ...action.payload };
      state.hasUnsavedChanges = true;
    },
    
    // Education子表操作
    addEducation: (state, action: PayloadAction<Education>) => {
      const newEducation = {
        ...action.payload,
        id: `edu-${Date.now()}`,
        resume_id: state.resume.id
      };
      state.educations.push(newEducation);
      state.hasUnsavedChanges = true;
    },
    
    updateEducation: (state, action: PayloadAction<{ index: number; data: Partial<Education> }>) => {
      if (state.educations[action.payload.index]) {
        state.educations[action.payload.index] = {
          ...state.educations[action.payload.index],
          ...action.payload.data
        };
        state.hasUnsavedChanges = true;
      }
    },
    
    removeEducation: (state, action: PayloadAction<number>) => {
      state.educations.splice(action.payload, 1);
      state.hasUnsavedChanges = true;
    },
    
    // Project子表操作
    addProject: (state, action: PayloadAction<Project>) => {
      const newProject = {
        ...action.payload,
        id: `proj-${Date.now()}`,
        resume_id: state.resume.id
      };
      state.projects.push(newProject);
      state.hasUnsavedChanges = true;
    },
    
    updateProject: (state, action: PayloadAction<{ index: number; data: Partial<Project> }>) => {
      if (state.projects[action.payload.index]) {
        state.projects[action.payload.index] = {
          ...state.projects[action.payload.index],
          ...action.payload.data
        };
        state.hasUnsavedChanges = true;
      }
    },
    
    removeProject: (state, action: PayloadAction<number>) => {
      state.projects.splice(action.payload, 1);
      state.hasUnsavedChanges = true;
    },
    
    // WorkExperience子表操作
    addWorkExperience: (state, action: PayloadAction<WorkExperience>) => {
      const newWork = {
        ...action.payload,
        id: `work-${Date.now()}`,
        resume_id: state.resume.id
      };
      state.workExperiences.push(newWork);
      state.hasUnsavedChanges = true;
    },
    
    updateWorkExperience: (state, action: PayloadAction<{ index: number; data: Partial<WorkExperience> }>) => {
      if (state.workExperiences[action.payload.index]) {
        state.workExperiences[action.payload.index] = {
          ...state.workExperiences[action.payload.index],
          ...action.payload.data
        };
        state.hasUnsavedChanges = true;
      }
    },
    
    removeWorkExperience: (state, action: PayloadAction<number>) => {
      state.workExperiences.splice(action.payload, 1);
      state.hasUnsavedChanges = true;
    },
    
    // Skill子表操作
    addSkill: (state, action: PayloadAction<Skill>) => {
      const newSkill = {
        ...action.payload,
        id: `skill-${Date.now()}`,
        resume_id: state.resume.id
      };
      state.skills.push(newSkill);
      state.hasUnsavedChanges = true;
    },
    
    updateSkill: (state, action: PayloadAction<{ index: number; data: Partial<Skill> }>) => {
      if (state.skills[action.payload.index]) {
        state.skills[action.payload.index] = {
          ...state.skills[action.payload.index],
          ...action.payload.data
        };
        state.hasUnsavedChanges = true;
      }
    },
    
    removeSkill: (state, action: PayloadAction<number>) => {
      state.skills.splice(action.payload, 1);
      state.hasUnsavedChanges = true;
    },
    
    // Award子表操作
    addAward: (state, action: PayloadAction<Award>) => {
      const newAward = {
        ...action.payload,
        id: `award-${Date.now()}`,
        resume_id: state.resume.id
      };
      state.awards.push(newAward);
      state.hasUnsavedChanges = true;
    },
    
    updateAward: (state, action: PayloadAction<{ index: number; data: Partial<Award> }>) => {
      if (state.awards[action.payload.index]) {
        state.awards[action.payload.index] = {
          ...state.awards[action.payload.index],
          ...action.payload.data
        };
        state.hasUnsavedChanges = true;
      }
    },
    
    removeAward: (state, action: PayloadAction<number>) => {
      state.awards.splice(action.payload, 1);
      state.hasUnsavedChanges = true;
    },
    
    // 模板选择
    selectTemplate: (state, action: PayloadAction<string>) => {
      state.selectedTemplateId = action.payload;
      state.settings.templateId = action.payload;
    },
    
    // 设置相关
    updateSettings: (state, action: PayloadAction<Partial<ResumeSettings>>) => {
      state.settings = { ...state.settings, ...action.payload };
    },
    
    // 状态管理
    setSavingState: (state, action: PayloadAction<boolean>) => {
      state.isSaving = action.payload;
    },
    
    setPreviewMode: (state, action: PayloadAction<boolean>) => {
      state.isPreviewMode = action.payload;
    },
    
    setExportingState: (state, action: PayloadAction<boolean>) => {
      state.isExporting = action.payload;
    },
    
    markAsSaved: (state) => {
      state.hasUnsavedChanges = false;
    },
    
    // 验证错误
    setValidationErrors: (state, action: PayloadAction<Record<string, string[]>>) => {
      state.validationErrors = action.payload;
    },
    
    clearValidationErrors: (state) => {
      state.validationErrors = {};
    },
    
    // 重置状态
    resetResume: (state) => {
      return initialState;
    },
    
    // 加载完整简历数据
    loadResumeData: (state, action: PayloadAction<{
      resume: Resume;
      educations: Education[];
      projects: Project[];
      workExperiences: WorkExperience[];
      skills: Skill[];
      awards: Award[];
    }>) => {
      const { resume, educations, projects, workExperiences, skills, awards } = action.payload;
      state.resume = resume;
      state.educations = educations;
      state.projects = projects;
      state.workExperiences = workExperiences;
      state.skills = skills;
      state.awards = awards;
      state.hasUnsavedChanges = false;
    }
  }
});

export const {
  updateResume,
  addEducation,
  updateEducation,
  removeEducation,
  addProject,
  updateProject,
  removeProject,
  addWorkExperience,
  updateWorkExperience,
  removeWorkExperience,
  addSkill,
  updateSkill,
  removeSkill,
  addAward,
  updateAward,
  removeAward,
  selectTemplate,
  updateSettings,
  setSavingState,
  setPreviewMode,
  setExportingState,
  markAsSaved,
  setValidationErrors,
  clearValidationErrors,
  resetResume,
  loadResumeData
} = resumeSlice.actions;

export default resumeSlice.reducer;

// 选择器
export const selectResume = (state: { resume: ResumeState }) => state.resume.resume;
export const selectEducations = (state: { resume: ResumeState }) => state.resume.educations;
export const selectProjects = (state: { resume: ResumeState }) => state.resume.projects;
export const selectWorkExperiences = (state: { resume: ResumeState }) => state.resume.workExperiences;
export const selectSkills = (state: { resume: ResumeState }) => state.resume.skills;
export const selectAwards = (state: { resume: ResumeState }) => state.resume.awards;
export const selectSettings = (state: { resume: ResumeState }) => state.resume.settings;
export const selectHasUnsavedChanges = (state: { resume: ResumeState }) => state.resume.hasUnsavedChanges;
export const selectValidationErrors = (state: { resume: ResumeState }) => state.resume.validationErrors; 