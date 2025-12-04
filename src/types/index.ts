/** 简历配置内容 */
export type ResumeConfig = {
  /** 头像 */
  avatar?: {
    src?: string;
    shape?: 'circle' | 'square';
    size?: string;
    hidden?: boolean;
  };

  /** 个人信息 */
  profile?: {
    name: string;
    mobile?: string;
    email?: string;
    github?: string;
    zhihu?: string;
    workExpYear?: string;
    workPlace?: string;
    positionTitle?: string;
  };

  /** 标题名称映射 */
  titleNameMap?: {
    educationList?: string;
    workExpList?: string;
    projectList?: string;
    skillList?: string;
    awardList?: string;
    workList?: string;
    aboutme?: string;
  };

  /** 教育背景 */
  educationList?: Array<{
    edu_time: [string | undefined, string | number];
    school: string;
    major?: string;
    academic_degree?: string;
  }>;

  /** 工作经历 */
  workExpList?: Array<{
    company_name: string;
    department_name: string;
    work_time?: [string | undefined, string | number];
    work_desc: string;
  }>;

  /** 项目经历 */
  projectList?: Array<{
    project_name: string;
    project_role: string;
    project_desc?: string;
    project_content?: string;
    project_time?: string;
  }>;

  /** 个人技能 */
  skillList?: Array<{
    skill_name?: string;
    skill_level?: number;
    skill_desc?: string;
  }>;

  /** 更多信息 */
  awardList?: Array<{
    award_info: string;
    award_time?: string;
  }>;

  /** 作品 */
  workList?: Array<{
    work_name?: string;
    work_desc?: string;
    visit_link?: string;
  }>;

  /** 自我介绍 */
  aboutme?: {
    aboutme_desc: string;
  };

  /** 国际化 */
  locales?: {
    [key: string]: ResumeConfig;
  };

  template?: 'template1' | 'template2' | 'template3' | 'template4' | 'template5' | 
             'template6' | 'template7' | 'template8' | 'template9' | 'template10' |
             'template11' | 'template12' | 'template13' | 'template14' | 'template15' |
             'template16' | 'template17' | 'template18' | 'template19' | 'template20' |
             'template21' | 'template22' | 'template23' | 'template24' | 'template25' |
             'template26' | 'template27' | 'template28' | 'template29' | 'template30' |
             'template31' | 'template32' | 'template33' | 'template34' | 'template35' |
             'template36' | 'template37' | 'template38' | 'template39' | 'template40';
};

/** 主题配置 */
export type ThemeConfig = {
  color: string;
  tagColor: string;
};

/** 应用状态 */
export type AppConfig = {
  theme: ThemeConfig;
  template: 'template1' | 'template2' | 'template3' | 'template4' | 'template5' | 
            'template6' | 'template7' | 'template8' | 'template9' | 'template10' |
            'template11' | 'template12' | 'template13' | 'template14' | 'template15' |
            'template16' | 'template17' | 'template18' | 'template19' | 'template20' |
            'template21' | 'template22' | 'template23' | 'template24' | 'template25' |
            'template26' | 'template27' | 'template28' | 'template29' | 'template30' |
            'template31' | 'template32' | 'template33' | 'template34' | 'template35' |
            'template36' | 'template37' | 'template38' | 'template39' | 'template40';
  locale: 'zh-CN' | 'en-US';
  mode: 'view' | 'edit';
};
