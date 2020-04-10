---
title: '原版Whatevergreen实现核显最高频率(部分主板不支持),魔改版本停更'
tags:
  - macOS Catalina 10.15
  - Hackintosh
  - OpenCore
  - weg
urlname: fix-igpu-with-vit9696-weg
id: 65
categories:
  - Hackintosh
date: 2020-03-24 19:58:00
updated: 2020-03-24 19:58:00
toc: true
---

> Whatevergreen原作者更新了1.3.8版本，开始支持GuC Firmware载入，实现核显满血运行(部分主板不支持),效果完全等同于魔改版本，故魔改停更。现发布原版Whatevergreen实现核显满血教程。<!--more-->

### 教程
* 下载并替换以下kexts
<a href="https://downloads.bugprogrammer.me/Kexts/WhateverGreen-1.3.8-RELEASE.zip">WhateverGreen-1.3.8-RELEASE.zip</a>
<a href="https://downloads.bugprogrammer.me/Kexts/Lilu-1.4.3-RELEASE.zip">Lilu-1.4.3-RELEASE.zip</a>
* boot-args下加入igfxfw=2参数
* 重启生效

### 哪些主板不支持
> 已知z370不支持
#### 如何确定自己的主板是否支持加载GuC
* 按照以上教程操作
* -v重启，如出现下图则不支持
![](/images/guc.png)

### 运行效果
![](/images/weg.png)