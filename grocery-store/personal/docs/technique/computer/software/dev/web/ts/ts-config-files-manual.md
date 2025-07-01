# TS 配置文件手册 / TS Config Files Manual

TS 配置文件，即：`jsconfig.json` 和 `tsconfig.json`，前者是后者的子集。

对于未安装 `typescript` 依赖但希望引入 typescript 检查的项目，可用使用 `jsconfig.json` 配置；只有安装了 `typescript` 依赖的项目才可使用 `tsconfig.json`。

两种配置文件的不同之处在于 `tsconfig.json` 专为纯 TS 或 JS、TS 混合项目设置，可以控制 TS 编译选项，有仅 TS 支持的检查选项；而 `jsconfig.json` 专为纯 JS 项目设置，仅支持部分特性。
