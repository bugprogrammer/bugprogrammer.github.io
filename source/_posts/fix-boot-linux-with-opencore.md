---
title: '修复OpenCore在较新主板上引导Linux失败'
tags:
  - macOS Catalina 10.15
  - Hackintosh
  - OpenCore
  - Linux
urlname: fix-boot-linux-with-opencore
id: 65
categories:
  - Hackintosh
date: 2020-04-03 16:05:00
updated: 2020-04-03 16:05:00
toc: true
---

>自从OpenCore推出以来，一直存在一个bug，在较新主板上引导Linux会失败，无法加载内核，现在已经可以解决。<!--more-->

# 解决方案
* 编译最新OpenCore(建议使用HackintoshBuild工具)或从以下链接下载
<a href="https://downloads.bugprogrammer.me/OpenCore/OpenCore-0.5.7-RELEASE.zip">OpenCore-0.5.7-RELEASE.zip</a>

* 替换bootx64.efi OpenCore.efi OpenRuntime.efi

* 修改config.plist
Booter->Quirks->SyncRuntimePermissions->Yes
![](/images/Linux.png)

# 注意
最近有人提到新版本OC启动Windows会失败(集中在Skylake平台)，博主没有遇到，请小伙伴们注意下，博主会抽空跟进最新情况。相关issue如下:
https://github.com/acidanthera/bugtracker/issues/491
