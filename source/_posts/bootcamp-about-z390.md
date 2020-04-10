---
title: 'ASRock Z390 Phantom Gaming-ITX使用BootCamp切换双系统注意事项'
tags:
  - macOS Catalina 10.15
  - Hackintosh
  - OpenCore
  - BootCamp
urlname: bootcamp-about-z390
id: 65
categories:
  - Hackintosh
date: 2020-04-04 17:23:00
updated: 2020-04-04 17:23:00
toc: true
---

>博主为了方便使用Linux一直是以grub作为主引导器(grub->OC)，最近OC解决了Linux引导问题，所以换回OC作为主引导器。摸索了一下，实现了原生NVRAM+BootCamp双系统切换。<!--more-->

# 实现教程
## 原生NVRAM
* 加入并在config.plist里启用如下SSDT
<a href="https://downloads.bugprogrammer.me/SSDT/SSDT-PMC.aml">SSDT-PMC.aml</a>

* 修改config.plist
 * NVRAM->LegacyEnable->No
 * NVRAM->LegacyOverwrite->No
 * NVRAM->WriteFlash->Yes
 * Booter->Quirks->DisableVariableWrite->No

## BootCamp切换
* 修改config.plist
 * PlatformInfo->Generic->AdviseWindows->Yes
 * UEFI->RequestBootVarRouting->Yes

* Windows下安装BootCamp软件，重启。
* 如果D盘消失，请使用傲梅分区助理取消D盘隐藏。(<font color=#A52A2A >**注意：一定要使用傲梅分区助理，博主测试其他分区工具重启后D盘会再次消失**</font>)

## 隐藏OC引导界面
* 修改config.plist
 * Misc->Boot->ShowPicker->No

# 至此，你已经可以使用BootCamp切换双系统，体验类似白苹果。