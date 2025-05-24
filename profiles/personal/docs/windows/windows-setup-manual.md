# Windows 配置手册 / Windows Setup Manual

## 😁 安装或重装系统

### 方法一：使用 U 盘启动器安装或重装系统

使用 Ventoy 制作 U 盘启动器，安装或重装 Windows 系统

> 注意：Ventoy 默认跳过了 Windows 系统的设备检测和联网激活，如你不小心联网，可以通过拔掉网线再登录的方式实现本地账户登录。

- 插入 U 盘，下载并安装 [Ventoy](https://www.ventoy.net/cn/download.html)，安装过程遵循[官方说明](https://www.ventoy.net/cn/doc_start.html)
- 下载并安装 BT 工具[qBittorrent 增强版](https://github.com/c0re100/qBittorrent-Enhanced-Edition/releases)
- 设置 Tracker <https://fastly.jsdelivr.net/gh/XIU2/TrackersListCollection/all.txt>
- 使用 BT 工具下载 Windows ISO（推荐专业版），并放入 U 盘（如你正在使用 VPN，推荐切换到直连模式）

  - [Windows 11 ISO](https://next.itellyou.cn/Original/#cbp=Product?ID=42e87ac8-9cd6-eb11-bdf8-e0d4e850c9c6)
  - [Windows 10 ISO](https://next.itellyou.cn/Original/#cbp=Product?ID=f905b2d9-11e7-4ee3-8b52-407a8befe8d1)
  - [其他](https://next.itellyou.cn/Original/#)

- （可选）在 U 盘中准备必要的软件及配置
- 通过 U 盘启动，选择 Ventoy 中的 Windows ISO 文件，启动执行引导程序，选择安装专业版系统，等待系统安装完毕

### 方法二：重置电脑来重装系统

在系统设置选择 “系统 > 恢复 > 恢复选项 > 重置此电脑”，仅支持重装系统。

要想跳过联网权限，需要在重装完毕进入新系统的初始化设置页面后，使用 “Shift + F10” 进入 cmd，随后输入如下命令：

```shell
cd OOBE
BypassNRO.cmd
```

系统会自动重启，此后便可以跳过联网激活。

## 😘 初始化配置

按顺序搞掉恼人的垃圾捆绑系统软件，装上自己喜欢的工具。😍

### 步骤一：卸载垃圾捆绑软件，替换恼人的 Windows Defender

- 卸载系统捆绑软件（如：Office365、微软电脑管家等）
- 关闭 Windows Defender 的所有防病毒功能
- 安装火绒并重启系统

  | 软件名称 | 来源/安装                       |
  | -------- | ------------------------------- |
  | 火绒     | <https://www.huorong.cn/person> |

- 使用 Windows 11 轻松设置关闭防火墙、调整系统设置（Windows 10 可用）并重启

  | 软件名称            | 来源/安装                                          |
  | ------------------- | -------------------------------------------------- |
  | Windows 11 轻松设置 | <https://www.bilibili.com/opus/904672369138729017> |

### 步骤二：搭梯子

- 安装 Clash for Windows，搭梯子！

  | 软件名称          | 来源/安装                                                     |
  | ----------------- | ------------------------------------------------------------- |
  | Clash for Windows | <https://github.com/clashdownload/Clash_for_Windows/releases> |

### 步骤三：安装个人配置

- 准备运行环境并重启电脑

  | 软件名称         | 来源/安装                                                  |
  | ---------------- | ---------------------------------------------------------- |
  | Windows Terminal | <https://apps.microsoft.com/detail/9n0dx20hk701>           |
  | PowerShell 7     | <https://github.com/PowerShell/PowerShell/releases/latest> |
  | Oh My Posh       | `winget install JanDeDobbeleer.OhMyPosh`                   |
  | gsudo            | `winget install gerardog.gsudo`                            |
  | FNM              | `winget install schniz.fnm`                                |

- 修改系统环境变量 PATH 并重启

  如果安装的是较新版的 Windows 11，请务必将 gsudo 放于 PATH 的最前面，防止被系统内置的垃圾残缺 sudo 命令覆盖。

- 安装我的个人配置

  ```shell
  # 启动 FNM 环境
  fnm env --use-on-cd --corepack-enabled --shell powershell | Out-String | Invoke-Expression

  # 安装个人配置
  npm i lumirelle-profiles -g
  sudo pi
  ```

### 步骤四：安装软件

- 按顺序安装并配置如下基建软件：

  | 软件名称                                                            | 来源/安装                                                                  |
  | ------------------------------------------------------------------- | -------------------------------------------------------------------------- |
  | Brave                                                               | <https://brave.com/download/>                                              |
  | uTools                                                              | <https://www.u-tools.cn/download/>                                         |
  | Auto Dark Mode                                                      | <https://apps.microsoft.com/detail/xp8jk4hzbvf435>                         |
  | NanaZip                                                             | <https://www.microsoft.com/store/apps/9N8G7TSCL18R>                        |
  | KeePass 2 (Plugins：ColoredPassword + HaveIBeenPwned + KeePassHttp) | <https://keepass.info/download.html>                                       |
  | Visual Studio Code                                                  | <https://code.visualstudio.com/Download>                                   |
  | Cursor                                                              | <https://www.cursor.com/cn/downloads>                                      |
  | IDM                                                                 | <https://www.internetdownloadmanager.com/download.html>                    |
  | Git                                                                 | <https://git-scm.com/download/win>                                         |
  | Visual C++ Redistributable                                          | <https://learn.microsoft.com/zh-cn/cpp/windows/latest-supported-vc-redist> |
  | Context Menu Manager                                                | <https://github.com/BluePointLilac/ContextMenuManager/releases>            |
  | DISM++                                                              | <https://github.com/Chuyu-Team/Dism-Multi-language/releases>               |
  | Driver Store Explorer                                               | <https://github.com/lostindark/DriverStoreExplorer/releases>               |
  | Revo Uninstaller                                                    | <https://www.revouninstaller.com/zh/revo-uninstaller-free-download/>       |

- 按顺序安装如下工具软件：

  | 软件名称         | 来源/安装                                              |
  | ---------------- | ------------------------------------------------------ |
  | 微信             | <https://pc.weixin.qq.com/>                            |
  | QQ               | <https://im.qq.com/pcqq/index.shtml>                   |
  | Telegram         | <https://desktop.telegram.org/>                        |
  | LX Music Desktop | <https://github.com/lyswhut/lx-music-desktop/releases> |
  | NVIDIA App       | <https://www.nvidia.cn/software/nvidia-app/>           |
  | Steam            | <https://store.steampowered.com/about>                 |
  | Epic Games       | <https://store.epicgames.com/zh-CN/download>           |
  | PixPin           | <https://pixpin.cn/>                                   |
  | PotPlayer        | <https://apps.microsoft.com/detail/xp8bsbgqw2dks0>     |
  | OBS Studio       | <https://obsproject.com/download>                      |

- 按顺序安装如下开发环境：

  | 软件名称          | 来源/安装                                                              |
  | ----------------- | ---------------------------------------------------------------------- |
  | Mingw-w64         | <https://github.com/niXman/mingw-builds-binaries/releases/latest>      |
  | Neovim            | `winget install Neovim.Neovim`                                         |
  | LazyVim           | <https://www.lazyvim.org/installation>                                 |
  | JDK               | <https://www.oracle.com/cn/java/technologies/downloads/#graalvmjava21> |
  | Miniconda         | <https://www.anaconda.com/download/success#miniconda>                  |
  | Visual Studio     | <https://visualstudio.microsoft.com/zh-hans/downloads/>                |
  | JetBrains Toolbox | <https://www.jetbrains.com/zh-cn/lp/toolbox/>                          |
  | JetBrains IDEA    | 使用 JetBrains Toolbox 安装                                            |
  | WSL               | `wsl --install`                                                        |

- （可选）安装配置其他软件

  | 软件名称             | 来源/安装                                                          |
  | -------------------- | ------------------------------------------------------------------ |
  | Ventoy               | <https://github.com/ventoy/Ventoy/releases>                        |
  | qBittorrent Enhanced | <https://github.com/c0re100/qBittorrent-Enhanced-Edition/releases> |
  | Crystal Disk Info    | <https://crystalmark.info/en/software/crystaldiskinfo/>            |
  | Google Earth Pro     | /                                                                  |
  | KeyboardSplitter     | <https://github.com/djlastnight/KeyboardSplitterXbox/releases>     |
  | noMeiryoUI           | <https://github.com/Tatsu-syo/noMeiryoUI/releases>                 |

### 步骤五：配置浏览器

- 安装实用扩展（注意：`篡改猴` 扩展需要您启用开发者模式）

  | 扩展名称      | 来源/安装（空白同上） |
  | ------------- | --------------------- |
  | 篡改猴        | Chrome 扩展商店       |
  | ChromeKeePass |                       |
  | Dark Reader   |                       |
  | 沉浸式翻译    |                       |
  | Grammarly     |                       |

  - 安装开发扩展（注意：`篡改猴` 扩展需要您启用开发者模式）

  | 扩展名称                         | 来源/安装（空白同上）                 |
  | -------------------------------- | ------------------------------------- |
  | Vue.js devtools                  | Chrome 扩展商店                       |
  | Vue.js devtools （Legacy）       |                                       |
  | Cookie Editor                    | Key：ookdjilphngeeeghgngjabigmpepanpl |
  | SEO META in 1 CLICK              |                                       |
  | Designer Tools                   |                                       |
  | Refined Github                   |                                       |
  | File Icons for GitHub and GitLab |                                       |

### 步骤六：配置系统设置

- （可选）使用 HEU KMS Activator 激活 Windows

  | 软件名称          | 来源/安装                                             |
  | ----------------- | ----------------------------------------------------- |
  | HEU KMS Activator | <https://github.com/zbezj/HEU_KMS_Activator/releases> |

- 登录 Microsoft 账号，同步系统数据，调整系统设置

## 🙌 维护

- 程序只允许安装在如下路径：

  - `C:/Program Files/`
  - `C:/Program Files (x86)/`
  - `C:/Program Files Portable/`
  - `C:/Users/Lumirelle/AppData/Local/Programs/`

- 定期使用 Revo Uninstaller 卸载无用软件
- 定期使用 DISM++ 清理系统
- 定期断电关机重启
