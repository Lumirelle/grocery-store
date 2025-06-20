# README for Vue-SCSS-BEM

## 😋 Why use CSS var instead of SCSS var directly

1. 运行时可变，不同作用域内可覆盖 / Changeable at runtime, and can be overridden in different scope

   SCSS 变量只存在于编译时期，运行时不可变，不够灵活。像主题切换、响应式设计等，都需要 CSS 变量的支持。

   同时 CSS 变量可以在不同作用域内被覆盖，支持基于状态的设计。

   主题切换：

   ```scss
   // 支持多主题
   :root {
     color-scheme: light;

     --cs-color-primary: #2bacb2;
     --cs-bg-color: white;
   }

   html.dark {
     color-scheme: dark;

     --cs-color-primary: #45b6bb;
     --cs-bg-color: #1a1a1a;
   }

   // 根据主题自动切换
   .alert {
     background: var(--cs-bg-color);
     color: var(--cs-color-primary);
   }
   ```

   响应式设计：

   ```scss
   :root {
     --cs-font-size-base: 14px;
   }

   @media (max-width: 768px) {
     :root {
       --cs-font-size-base: 12px; // 响应式调整
     }
   }

   .text {
     font-size: var(--cs-font-size-base); // 自动响应
   }
   ```

   基于状态的设计：

   ```scss
   .alert {
     --cs-alert-bg-opacity: 1;
     background: rgba(var(--cs-color-primary-rgb), var(--cs-alert-bg-opacity));

     &:hover {
       --cs-alert-bg-opacity: 0.8; // 不同状态不同作用域，覆盖透明度变量的值
     }

     &.is-disabled {
       --cs-alert-bg-opacity: 0.5;
     }
   }
   ```

2. 在浏览器开发者工具中可见 / Visible in the devtools of browser
3. 原生支持，向后兼容和渐进增强 / Native support, backward compatibility and progressive enhancement

## 🤣 Why using prefix `_` in filename

`_` 前缀标识该 SCSS 类似于库文件，供其它 SCSS 文件使用，会被 SCSS 编译器忽略编译。

## 🥰 Comments in SCSS

1. `/* */`：CSS注释，在输出的 CSS 文件中仍会保留
2. `//`：SCSS 特有的注释，不在输出的 CSS 文件中保留
3. `///`：SCSS 的文档注释
