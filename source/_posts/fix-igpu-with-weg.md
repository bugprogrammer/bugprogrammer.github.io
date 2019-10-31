---
title: '博主魔改版Whatevergreen解析，还你正常核显频率(1.2g)'
tags:
  - macOS Catalina 10.15
  - Hackintosh
  - OpenCore
  - weg
urlname: fix-igpu-with-weg
id: 65
categories:
  - Hackintosh
date: 2019-10-03 12:24:00
updated: 2019-10-03 12:24:00
---

# 前言
这篇文章是给台式机用户看的，高度依赖Whatevergreen缓冲帧补丁的小伙伴请绕行。<!--more-->

# 事件起因
前几天细心的群友发现了一个bug，在加入Whatevergreen的情况下，核显频率会稳定在0.5g左右，远低于正常值1.2g，经排查，发现是Whatevergreen导致的问题。

# 为什么不选择删除Whatevergreen
博主已经测试过删掉Whatevergreen的情况，并不完美，体现如下。

* AGDP patch时灵时不灵
博主测试了加入AGDP patch解决dp花屏的方案，时灵时不灵，在系统更新，安装器，recovery等环境下100%失效，OpenCore以及Clover都已经实测，时灵时不灵。

* 核显型号名称要手动注入
Whatevergreen内置型号识别功能，id和型号对应，比如3E980003->Intel UHD Graphics 630。所以删掉Whatevergreen会导致核显型号显示错误，要手动注入Device->model属性。

* 重命名补丁要手动添加
Whatevergreen内置change GFX0 to IGPU,change PEGP to GFX0,change HECI to IMEI,change MEI to IMEI等补丁，去掉后这些要手动添加。

# 博主修改的Whatevergreen改了哪些内容
* 删除igfx(核显)相关补丁。
* 删除Nvidia相关补丁。
* 删除Shiki相关功能。
* 保留AGDP补丁。
* 保留基础重命名补丁。
* 保留型号对应识别功能。
* 保留紫线移除补丁。

# 如何使用博主修改的Whatevergreen
* Bios主显卡设置成独显，DVMT 128M。
* 移除change GFX0 to IGPU,change PEGP to GFX0,change HECI to IMEI,change MEI to IMEI等补丁。
* 移除显卡相关的SSDT。
* 加入Whatevergreen(Lilu要求1.3.8)。

# 修改版Whatevergreen Github地址如下
https://github.com/bugprogrammer/WhateverGreen

# 性能测试
如图，核显性能测试如下
![](/images/weg.png)