---
title: '博主的Hackintosh Bootloader以及kexts编译程序GUI(Swift5)版本发布'
tags:
  - Hackintosh
urlname: Hackintosh_Build_Swift
id: 65
categories:
  - Hackintosh
date: 2020-01-16 22:27:00
updated: 2020-01-21 21:00:00
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
