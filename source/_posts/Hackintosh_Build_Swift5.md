---
title: '博主的Hackintosh Bootloader以及kexts编译程序GUI(Swift5)版本发布'
tags:
  - Hackintosh
urlname: Hackintosh_Build_Swift
id: 65
categories:
  - Hackintosh
date: 2020-01-16 22:27:00
updated: 2021-03-28 02:50:00
toc: true
---

> 之前博主开发的HackintoshBuild.sh脚本使用过程有些繁琐，故使用swift5重新开发GUI版本，部分代码(GUI)参考Pavo-IM大佬的ocbuilder项目，感谢Pavo-IM大佬。本项目可以看作HackintoshBuild.sh的进化版本。<!--more-->

# 开源地址
https://github.com/bugprogrammer/HackintoshBuild

# 使用前提
* 安装Xcode
* 安装命令行工具
```
xcode-select --install
```

# 使用截图
![](/images/buildswift-1.png)

# 目前功能
## v1.0
* 基础编译功能
* 选择存储路径

# 后续打算
* 发展成为Hackintosh综合工具

# 未来版本目前预计功能
* GUI一键获取博主维护的Hackintosh EFI仓库
* 支持版本自动更新
* 支持过时设备驱动一键安装(比如HD3000,感谢@黑果小兵提供HD3000驱动方案)
* 支持DW1820A一键驱动(感谢@黑果小兵提供dw1820a驱动方法以及脚本)
* 一键导入@xjn的显卡优化数据(感谢@xjn提供优化数据)
* 一键解锁10.15 read-only以及重建缓存

# 声明
* 本项目完全开源并且唯一托管平台为GitHub
* 博主很忙，更新不快，谢绝催更，感谢！！！
* 新功能需求请在评论区留言

# 2020-01-21更新
## v1.1版本更新
### 此版本由Bugprogrammer以及Arabaku合作完成
* 最低支持macOS版本为10.13
* 新增窗口管理
* 新增检查更新
* 新增HTTP代理设置
* 新增保存上次存储路径
* 新增bugprogrammer维护的常见机型EFI列表获取
* 新增解锁10.15.x read-only
* 新增重建缓存功能
* 新增开启未知来源安装软件

# 2020-02-04更新
## v1.2版本更新
### 感谢Arabaku(群友某莔)帮助解决部分bug
* 新增EFI分区挂载功能并显示当前引导分区
* 新增NVRAM信息读取功能
* 新增更换登录壁纸功能(可用来解决系统更新后，自定义桌面壁纸和登录壁纸不同步问题)

# 2020-02-08更新
## v1.3版本更新
### 感谢Arabaku的付出帮助
* 登录壁纸替换适配10.15.4 beta版本
* 新增http代理记忆
* 新增时光机器满速运行以及还原默认功能

# 2020-02-18更新
## v1.4版本更新
* 编译模块以及EFI获取模块新增日志存储
* EFI分区挂载模块新增磁盘名称显示以及刷新分区列表
* nvram读取模块新增刷新keys
* 新增系统详情功能,获取kexts,aml,efi文件情况,读取详细信息,获取本地Clover,OC版本号
* 新增白苹果ioreg信息读取
* 1.4版本起，支持自动检测更新
* UI适配(感谢Arabaku)
* 新增捐赠模块(全凭自愿)

# 2020-02-24更新
## v1.5版本更新
* UI继续优化，禁用全屏模式以及缩放
* bug清理

# 2020-03-20更新
## v1.6版本更新
### 编译模块
> 新增全选，新增初始环境判断，增强兼容性，修复低版本Xcode无法编译
### EFI获取模块
> 新增全选
### EFI挂载
> 全功能重构，新增Clover环境下，判断当前引导分区
### 新增关于本机，获取本机信息
### 新增Kexts下载
### 新增路径空格以及写权限判断
### 修复部分Clover用户闪退
注意：App一定要安装在应用程序文件夹

# 2020-03-27更新
## v1.7版本更新
* 修复nvram模块随机闪退
* nvram模块重构，新增values高亮格式化
* 适配系统亮色/暗色切换(无需退出软件)

# 2020-04-11更新
## v1.8版本更新
* 适配最新OC编译
* 提升nvram xml格式兼容性
* 新增PCI设备信息
* 新增显卡性能优化(感谢xjn提供数据)

# 2020-04-20更新
## v1.9版本更新
* 更新mtoc版本以适配最新OpenCore
* 新增镜像下载模块(官方服务器)

# 2020-05-15更新
## v2.0版本更新
* 重构PCI信息列表(基于pci.ids)
* 新增序列号生成
* 新增OpenCore版本一览(ChangeLog以及配置模板)
* 新增文件差异对比

# 2020-06-05更新
## v2.1版本更新
* 适配最新OpenCore编译
* 添加Z490 ELITE EFI
* 更新pci.ids

# 2020-09-07更新
## v3.0版本更新
* 支持 AMD CPUs
* 优化编译流程，修复找不到 xcodebuild 导致编译失败
* 修复 EFI 分区挂载在某些情况下显示错误
* 编译模块以及EFI获取模块新增log路径存储
* 编译模块新增环境详细校验
* 更换锁屏壁纸模块改用拖拽方案
* 镜像下载模块重构，显示下载进度，增强容错
* 文件对比模块重构(需要安装xcode)
* 新增Kexts下载模块
* 新增每日构建下载模块(利用azure pipeline每8小时自动编译Hackintosh全家桶)
* 新增快照检测
* 显卡优化更改为kext方案
* Big Sur下禁用AppleIntelInfo功能
* Kexts下载模块重构，新增进度显示
* PCI信息模块新增应用内更新pci.ids数据库
* 序列号生成模块新增应用内更新SMBIOS数据库

# 2020-10-18更新
## v3.1版本更新
* 适配MacKernelSDK，修复编译功能以及每日构建功能
* 编译模块新增VoodooI2C、VoodooPS2以及RTL8125

# 2020-11-11更新
## v3.2版本更新
* 适配macOS Big Sur RC2镜像下载

# 2020-11-22更新
## v3.3版本更新
* 适配macOS Big Sur 11.1 beta镜像下载
* 更换图标(感谢群友Cotton绘制图标)

# 2020-12-25更新
## v4.0版本更新
* 适配Apple Silicon Macs
* 新增"本机app适配Apple Silicon情况"模块
* 按照硬件架构区分可用功能
* UI适配Big Sur风格

# 2021-03-07更新
## v4.1版本更新
* 参照开源方案 https://github.com/DigiDNA/Silicon MIT License.重构"本机app适配Apple Silicon情况"模块
* Apple Silicon Macs关于本机不显示Board id、drm仿冒id、核显id等条目

# 2021-03-28更新
## v4.2版本更新
* 重构 OpenCore版本一览功能，自动获取原作者仓库信息，避免OpenCore更新数据滞后
