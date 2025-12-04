import type { ResumeConfig } from '@/types';

/** 默认简历数据 */
export const DEFAULT_RESUME_DATA: ResumeConfig = {
  avatar: {
    src: undefined,
    hidden: false,
    shape: 'circle',
  },
  profile: {
    name: '姓名',
    email: 'example@email.com',
    mobile: '138****8888',
    github: 'https://github.com/username',
    zhihu: 'https://zhihu.com/people/username',
    workExpYear: '3年',
    workPlace: '北京',
    positionTitle: '前端工程师',
  },
  educationList: [
    {
      edu_time: ['2016.09', '2020.06'],
      school: '某某大学',
      major: '计算机科学与技术',
      academic_degree: '本科',
    },
  ],
  awardList: [
    {
      award_info: '英语 CET-6',
      award_time: '2018',
    },
    {
      award_info: '优秀毕业生',
      award_time: '2020',
    },
  ],
  workExpList: [
    {
      company_name: '某某科技有限公司',
      department_name: '前端开发部',
      work_time: ['2020.07', null],
      work_desc: '负责公司核心产品的前端开发工作，参与多个重要项目的技术选型和架构设计。',
    },
  ],
  skillList: [
    {
      skill_name: 'JavaScript / TypeScript',
      skill_desc: '熟练掌握 ES6+ 特性，TypeScript 项目经验丰富',
      skill_level: 90,
    },
    {
      skill_name: 'React / Vue',
      skill_desc: '熟练使用 React 全家桶，了解 Vue3 生态',
      skill_level: 85,
    },
    {
      skill_name: 'Node.js',
      skill_desc: '有 Node.js 后端开发经验',
      skill_level: 75,
    },
  ],
  projectList: [
    {
      project_name: '企业管理系统',
      project_role: '前端负责人',
      project_time: '2022.01 - 2023.12',
      project_desc: '面向企业用户的综合管理平台，包含权限管理、数据分析等功能。',
      project_content: '1. 负责前端架构设计和技术选型\n2. 实现了模块化的组件库\n3. 优化了页面加载性能，提升用户体验',
    },
  ],
  workList: [],
  aboutme: {
    aboutme_desc: '热爱前端开发，追求技术卓越。具有良好的代码习惯和团队协作能力，能够独立完成复杂项目的开发工作。',
  },
  template: 'template1',
};

/** 标题名称映射 */
export const DEFAULT_TITLE_MAP = {
  'zh-CN': {
    educationList: '教育背景',
    workExpList: '工作经历',
    projectList: '项目经历',
    skillList: '专业技能',
    awardList: '荣誉奖项',
    workList: '个人作品',
    aboutme: '自我介绍',
  },
  'en-US': {
    educationList: 'Education',
    workExpList: 'Work Experience',
    projectList: 'Projects',
    skillList: 'Skills',
    awardList: 'Awards',
    workList: 'Works',
    aboutme: 'About Me',
  },
};
