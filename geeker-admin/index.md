# 快速上手

本文会帮助你从头启动、搭建此项目

## 环境准备

本地环境需要安装 [Node.js 22.x+](https://nodejs.org/)、[pnpm 10.x+](https://github.com/pnpm/pnpm/)、[Git](https://git-scm.com/)

## 工具配置

本项目推荐使用 VSCode 进行开发，项目里面已内置 VSCode 配置，包含推荐的插件和设置。

> 🌈 推荐安装以下插件：

- [Vue Language Features (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) ==> Vue3 官方插件
- [Vue 3 Snippets](https://marketplace.visualstudio.com/items?itemName=hollowtree.vue-snippets) ==> Vue3 代码提示
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) ==> 代码检查
- [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint) ==> CSS 代码检查 && 格式化
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) ==> 代码格式化
- [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) ==> 统一不同编辑器的编码风格
- [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker) ==> 校验单词拼写错误
- [Sass](https://marketplace.visualstudio.com/items?itemName=Syler.sass-indented) ==> Sass 样式编写
- [DotENV](https://marketplace.visualstudio.com/items?itemName=mikestead.dotenv) ==> 高亮 .env 文件

### .vscode > extensions.json

```json
{
	"recommendations": ["vue.volar", "hollowtree.vue-snippets", "dbaeumer.vscode-eslint", "stylelint.vscode-stylelint", "esbenp.prettier-vscode", "editorconfig.editorconfig", "streetsidesoftware.code-spell-checker", "syler.sass-indented", "mikestead.dotenv"]
}
```

:::warning

- 禁用 Vetur 插件。
- 请配置项目默认格式化程序为 Prettier。

:::

## 代码拉取

### 拉取代码：

```bash
# 克隆代码
git clone https://github.com/Geeker-Admin/Geeker-Admin.git
```

## 安装使用步骤

### 安装依赖：

```bash
# 使用 pnpm
pnpm install
```

### 运行项目：

```bash
# 以下两个命令都可以
pnpm dev
pnpm serve
```

### 打包项目：

```bash
# 开发环境
pnpm build:dev

# 测试环境
pnpm build:test

# 生产环境
pnpm build:pro
```

### 校验、格式化代码：

```bash
# eslint 检测代码
pnpm lint:eslint

# prettier 格式化代码
pnpm lint:prettier

# stylelint 格式化样式
pnpm lint:stylelint
```

### 提交代码：

```bash
# 提交代码（提交前会自动执行 lint:lint-staged 命令）
pnpm commit
```

## npm script 详解

```json
{
	"scripts": {
		// 本地运行(dev环境)
		"dev": "vite",
		// 本地运行(dev环境)
		"serve": "vite",
		// 构建打包
		"build": "vue-tsc && vite build --mode development",
		// 构建打包(test环境)
		"build:test": "vue-tsc && vite build --mode test",
		// 检查项目 ts 类型
		"type:check": "vue-tsc --noEmit --skipLibCheck",
		// 本地环境预览构建后的 dist
		"preview": "npm run build:dev && vite preview",
		// 执行 eslint 校验
		"lint:eslint": "eslint --fix --ext .js,.ts,.vue ./src",
		// 执行 prettier 格式化
		"lint:prettier": "prettier --write \"src/**/*.{js,ts,json,tsx,css,less,scss,vue,html,md}\"",
		// 执行 stylelint 格式化
		"lint:stylelint": "stylelint --cache --fix \"**/*.{vue,less,postcss,css,scss}\" --cache --cache-location node_modules/.cache/stylelint/",
		// 执行 lint-staged.config.js 文件下的命令
		"lint:lint-staged": "lint-staged",
		// 初始化 husky 配置
		"prepare": "husky",
		// 自动更新版本
		"release": "standard-version",
		// 提交代码(可自定义配置执行命令)
		"commit": "git add -A && czg && git push"
	}
}
```
