# 在线简历制作工具 Resume Builder

一个现代化、高颜值的在线简历制作网站，基于 React + TypeScript + Vite + TailwindCSS 构建。

## ✨ 特性

- 🎨 **现代化设计** - 采用毛玻璃效果、渐变色、流畅动画等现代设计元素
- 📝 **实时编辑** - 所见即所得，实时预览简历效果
- 🎭 **多模板支持** - 提供3种精美简历模板，满足不同场景需求
- 🎨 **主题定制** - 自由调整主题色和标签色，打造个性化简历
- 💾 **数据持久化** - 自动保存编辑内容到本地存储
- 📤 **导入导出** - 支持 JSON 配置导入导出
- 🔗 **链接分享** - 生成分享链接，快速分享简历
- 📄 **PDF 下载** - 一键下载高质量 PDF 简历
- 🌍 **国际化** - 支持中英文切换
- 📱 **响应式设计** - 适配不同屏幕尺寸

## 🚀 快速开始

### 安装依赖

```bash
npm install
# 或
pnpm install
# 或
yarn install
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000 查看应用

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

## 📦 技术栈

- **前端框架**: React 18
- **开发语言**: TypeScript
- **构建工具**: Vite
- **样式方案**: TailwindCSS
- **状态管理**: Zustand
- **国际化**: react-i18next
- **UI 组件**: Headless UI + Heroicons
- **拖拽排序**: @dnd-kit
- **颜色选择**: react-colorful
- **PDF 生成**: jsPDF + html2canvas
- **数据压缩**: lz-string
- **通知提示**: react-hot-toast

## 📁 项目结构

```
src/
├── components/          # 组件
│   ├── editors/        # 编辑器组件
│   ├── templates/      # 简历模板
│   ├── Header.tsx      # 头部组件
│   ├── Sidebar.tsx     # 侧边栏组件
│   └── ResumePreview.tsx # 简历预览组件
├── data/               # 数据
│   └── constants.ts    # 常量定义
├── locales/            # 国际化
│   ├── zh-CN.ts       # 中文
│   ├── en-US.ts       # 英文
│   └── index.ts       # 配置
├── store/              # 状态管理
│   └── index.ts       # Zustand store
├── types/              # 类型定义
│   └── index.ts       # TypeScript 类型
├── utils/              # 工具函数
│   ├── index.ts       # 通用工具
│   └── pdf.ts         # PDF 相关
├── App.tsx            # 主应用组件
├── main.tsx           # 入口文件
└── index.css          # 全局样式
```

## 🎯 功能说明

### 编辑模式

- **个人信息**: 姓名、职位、联系方式等基本信息
- **教育背景**: 学校、专业、学历、时间段
- **工作经历**: 公司、部门、工作描述、时间段
- **项目经历**: 项目名称、角色、描述、主要工作
- **专业技能**: 技能名称、掌握程度、技能描述
- **荣誉奖项**: 奖项内容、获奖时间
- **自我介绍**: 个人简介

### 主题设置

- 主题色调整
- 标签颜色调整
- 实时预览效果

### 模板选择

1. **Template1 (经典模板)** - 传统布局，适合大多数场景
2. **Template2 (简约模板)** - 侧边栏设计，信息清晰
3. **Template3 (现代模板)** - 卡片式布局，充满设计感

### 数据管理

- 自动保存到浏览器本地存储
- 导出 JSON 配置文件
- 导入 JSON 配置文件
- 生成分享链接（URL 参数）
- 下载 PDF 简历

## 🎨 设计特色

- **毛玻璃效果** (Glassmorphism): 使用 backdrop-filter 实现半透明背景
- **渐变色背景**: 柔和的渐变色营造舒适的视觉体验
- **流畅动画**: 使用 Tailwind 动画和过渡效果
- **卡片设计**: 模块化的卡片布局，层次分明
- **响应式布局**: 适配各种屏幕尺寸

## 🔧 配置说明

### 数据格式

简历数据采用 JSON 格式存储，主要包含以下字段：

```typescript
{
  profile: {},        // 个人信息
  educationList: [],  // 教育背景
  workExpList: [],    // 工作经历
  projectList: [],    // 项目经历
  skillList: [],      // 专业技能
  awardList: [],      // 荣誉奖项
  aboutme: {},        // 自我介绍
  theme: {}          // 主题配置
}
```

### 主题配置

```typescript
{
  color: '#0ea5e9',      // 主题色
  tagColor: '#8bc34a'    // 标签色
}
```

## 📝 开发计划

- [ ] 添加更多简历模板
- [ ] 支持头像上传和裁剪
- [ ] 添加拖拽排序功能
- [ ] 支持 Markdown 格式输入
- [ ] 云端存储功能
- [ ] 简历模板市场

## 📄 License

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 💬 反馈

如有问题或建议，请提交 [Issue](https://github.com/yourusername/resume-builder/issues)
