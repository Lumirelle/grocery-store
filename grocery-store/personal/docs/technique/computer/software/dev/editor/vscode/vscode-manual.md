# VSCode 手册 / VS Code Manual

## 🕸️ JS/TS 项目 / For JS/TS Project

如果你的 JS/TS 项目里没有提供 TS Config Files（`jsconfig.json` 或 `tsconfig.json`），VSCode 会把项目中的 `.js` 和 `.ts` 文件当作一个个独立的脚本，而不是项目的组成，因此：

一定要记得给你的 JS/TS 项目设置好 TS Config Files。

我猜想，应该是因为 JS 语言本身定位就是一门**脚本**语言，因此，把它们默认当作独立脚本，检查到 TS Config Files 才当作项目组成对待，我觉得是一种合理的模式。
