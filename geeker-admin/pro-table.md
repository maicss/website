# Pro Table

Pro Table 是本项目 fork 之后着重开发的组件。

之前功能的文档：https://juejin.cn/post/7166068828202336263

## Features：

- 表格内容自适应屏幕宽高，溢出内容表格内部滚动（flex 布局）
- 表格搜索、重置、分页查询 Hooks 封装 （页面使用不会存在任何搜索、重置、分页查询逻辑）
- 表格数据操作 Hooks 封装 （单条数据删除、批量删除、重置密码、状态切换等操作）
- 表格数据多选 Hooks 封装 （支持现跨页勾选数据）
- 表格数据导入组件、导出 Hooks 封装
- 表格搜索区域使用 Grid 布局重构，支持自定义响应式配置
- 表格分页组件封装（Pagination）支持静态数据分页
- 表格数据刷新、列显隐、搜索区域显隐设置
- 表格配置 columns 支持动态更新（1.2.0 版本可用）
- 表格支持行拖拽排序、单选框设置（1.2.0 版本可用）
- 表格配置支持多级 prop（示例 ==> prop: user.detail.name）
- 单元格内容格式化、tag 标签显示（有字典 enum 会根据字典 enum 自动格式化）
- 支持多级表头、表头内容自定义渲染（支持作用域插槽、tsx 语法、h 函数）
- 支持单元格内容自定义渲染（支持作用域插槽、tsx 语法、h 函数）
- 配合 TreeFilter、SelectFilter 组件使用更佳（项目中有使用示例

---

- 支持多语言
- 支持根据检索条件高亮搜索结果
- 表格头部 分为三个区域 toolbarLeft（原来的 tableHeader），toolbarMiddle 和 toolbarRight（原来的 toolButton），toolbarMiddle 是一个 render 函数，目前工作的项目里，偶尔有说明文本需要使用到。toolbarLeft 和 toolbarRight 都支持配置，并保持行为统一
- 支持有异步依赖的表单初始值。比如某个表单项的初始值需要调用接口才能初始化，然后根据初始化的值再次调用表格接口。
