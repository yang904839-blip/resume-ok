import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ResumeConfig, ThemeConfig, AppConfig } from '@/types';
import { DEFAULT_RESUME_DATA } from '@/data/constants';

type ResumeStore = {
  resumeData: ResumeConfig;
  theme: ThemeConfig;
  template: AppConfig['template'];
  locale: AppConfig['locale'];
  mode: AppConfig['mode'];
  
  setResumeData: (data: Partial<ResumeConfig>) => void;
  setTheme: (theme: Partial<ThemeConfig>) => void;
  setTemplate: (template: AppConfig['template']) => void;
  setLocale: (locale: AppConfig['locale']) => void;
  setMode: (mode: AppConfig['mode']) => void;
  resetResumeData: () => void;
  importData: (data: ResumeConfig, theme?: ThemeConfig) => void;
  loadTestData: () => void;
};

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set, get) => ({
      resumeData: DEFAULT_RESUME_DATA,
      theme: {
        color: '#0ea5e9',
        tagColor: '#8bc34a',
      },
      template: 'template1',
      locale: 'zh-CN',
      mode: 'edit',

      setResumeData: (data) =>
        set((state) => ({
          resumeData: { ...state.resumeData, ...data },
        })),

      setTheme: (theme) =>
        set((state) => ({
          theme: { ...state.theme, ...theme },
        })),

      setTemplate: (template) => set({ template }),

      setLocale: (locale) => set({ locale }),

      setMode: (mode) => set({ mode }),

      resetResumeData: () =>
        set({
          resumeData: DEFAULT_RESUME_DATA,
          theme: {
            color: '#0ea5e9',
            tagColor: '#8bc34a',
          },
        }),

      importData: (data, theme) =>
        set({
          resumeData: data,
          ...(theme && { theme }),
        }),

      loadTestData: () =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            educationList: [
              {
                edu_time: ['2016.09', '2020.06'],
                school: '清华大学',
                major: '计算机科学与技术',
                academic_degree: '本科',
              },
              {
                edu_time: ['2020.09', '2023.06'],
                school: '北京大学',
                major: '软件工程',
                academic_degree: '硕士',
              },
            ],
            workExpList: [
              {
                company_name: '字节跳动科技有限公司',
                department_name: '前端开发部',
                work_time: ['2023.07', null],
                work_desc: '负责抖音核心业务的前端开发工作，参与多个重要项目的技术选型和架构设计。主导了性能优化项目，使页面加载速度提升50%。带领团队完成了多个关键功能模块的开发，包括视频编辑器、直播间互动系统等。',
              },
              {
                company_name: '腾讯科技（深圳）有限公司',
                department_name: '微信事业群',
                work_time: ['2021.07', '2023.06'],
                work_desc: '参与微信小程序平台的开发和维护工作，负责开发者工具的功能迭代。优化了编译构建流程，提升了开发效率30%。参与了多个重要特性的设计和实现，如云开发、实时音视频等功能。',
              },
              {
                company_name: '阿里巴巴集团',
                department_name: '淘宝前端团队',
                work_time: ['2020.07', '2021.06'],
                work_desc: '负责淘宝APP内商品详情页的开发和优化工作。实现了图片懒加载、虚拟列表等性能优化方案，提升了用户体验。参与了双11大促期间的技术保障工作，确保系统稳定运行。',
              },
            ],
            projectList: [
              {
                project_name: '企业级中台管理系统',
                project_role: '前端架构师',
                project_time: '2023.01 - 2024.12',
                project_desc: '面向大型企业的综合性管理平台，整合了人力资源、财务、供应链等多个业务模块。',
                project_content: '1. 负责整体前端架构设计，采用微前端方案实现模块化开发\n2. 搭建了基于React的组件库和脚手架工具，提升团队开发效率\n3. 实现了权限管理系统，支持精细化的功能和数据权限控制\n4. 优化了首屏加载性能，通过代码分割和预加载技术使首屏时间缩短至1.5s\n5. 建立了完善的监控体系，实时追踪系统性能和错误',
              },
              {
                project_name: '在线教育平台',
                project_role: '前端负责人',
                project_time: '2022.03 - 2022.12',
                project_desc: '在线视频课程平台，支持直播、录播、互动答题等多种教学形式。',
                project_content: '1. 使用React + TypeScript构建SPA应用，实现流畅的用户体验\n2. 集成WebRTC技术实现低延迟的音视频通信功能\n3. 开发了白板工具，支持多人协作和实时同步\n4. 实现了完善的用户行为分析系统，为产品优化提供数据支持\n5. 优化了视频播放器，支持多种格式和清晰度自适应切换',
              },
              {
                project_name: '智能客服系统',
                project_role: '核心开发',
                project_time: '2021.06 - 2022.02',
                project_desc: '基于AI的智能客服解决方案，集成了自然语言处理和知识图谱技术。',
                project_content: '1. 开发了对话管理界面，支持多轮对话和上下文理解\n2. 实现了实时消息推送功能，使用WebSocket保持长连接\n3. 构建了知识库管理系统，支持富文本编辑和多媒体内容\n4. 优化了聊天界面的渲染性能，支持大量历史消息的流畅滚动\n5. 集成了数据可视化组件，展示客服工作量和满意度等指标',
              },
              {
                project_name: '移动端商城应用',
                project_role: '前端开发',
                project_time: '2020.08 - 2021.05',
                project_desc: '跨平台电商应用，使用React Native开发，支持iOS和Android平台。',
                project_content: '1. 参与整体架构设计，实现了代码复用率达到85%\n2. 开发了商品搜索和筛选功能，优化了大列表的渲染性能\n3. 实现了购物车和订单管理模块，支持多种支付方式\n4. 集成了第三方地图SDK，实现了门店导航和配送追踪功能\n5. 进行了充分的性能优化，应用启动时间控制在2秒以内',
              },
            ],
            skillList: [
              {
                skill_name: 'JavaScript / TypeScript',
                skill_desc: '精通ES6+特性，5年TypeScript项目经验，熟悉类型系统和高级特性',
                skill_level: 95,
              },
              {
                skill_name: 'React / Vue',
                skill_desc: '精通React生态（Hooks、Redux、React Router等），熟悉Vue3组合式API',
                skill_level: 95,
              },
              {
                skill_name: 'Node.js',
                skill_desc: '熟练使用Express、Koa框架，有全栈开发经验',
                skill_level: 85,
              },
              {
                skill_name: '工程化工具',
                skill_desc: '熟练使用Webpack、Vite、Rollup等构建工具，了解前端工程化最佳实践',
                skill_level: 90,
              },
              {
                skill_name: '微前端架构',
                skill_desc: '有qiankun、Module Federation等微前端方案的实践经验',
                skill_level: 80,
              },
              {
                skill_name: '性能优化',
                skill_desc: '熟悉前端性能优化技巧，有大型项目性能优化经验',
                skill_level: 88,
              },
            ],
            awardList: [
              {
                award_info: '公司年度最佳员工',
                award_time: '2023',
              },
              {
                award_info: '技术创新奖 - 前端性能优化项目',
                award_time: '2023',
              },
              {
                award_info: '开源贡献者 - React生态项目',
                award_time: '2022',
              },
              {
                award_info: '优秀团队负责人',
                award_time: '2022',
              },
              {
                award_info: '前端技术分享-最受欢迎讲师',
                award_time: '2021',
              },
            ],
            aboutme: {
              aboutme_desc: '资深前端工程师，5年以上大厂工作经验，精通React、TypeScript等主流技术栈。有丰富的大型项目架构设计和性能优化经验，擅长解决复杂的技术难题。热衷于技术分享和开源贡献，在GitHub上维护多个star数过千的开源项目。具备优秀的团队协作能力和技术领导力，曾带领团队完成多个核心项目的开发。持续关注前端技术发展，对新技术保持敏锐的洞察力和学习热情。',
            },
          },
        })),
    }),
    {
      name: 'resume-storage',
    }
  )
);
