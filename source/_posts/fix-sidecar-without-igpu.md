---
title: '无核显开启sidecar方法'
tags:
  - sidecar
  - Hackintosh
urlname: fix-sidecar-without-igpu
id: 65
categories:
  - Hackintosh
date: 2019-11-24 15:36:00
updated: 2019-11-24 15:36:00
---

>之前<font color=#A52A2A >@fang2018</font>发布了一个相关教程，地址如下:<font color=#A52A2A >https://fangf.cc/2019/10/14/noneigpusidecar/</font>, 现在随着Whatevergreen的更新，之前的方法已经不再适用。现在发布新教程。
<!--more-->

# 无核显开启sidecar教程
* smbios设置成iMac19,1或iMac18,3(绝对不能用iMac Pro 1,1或Mac Pro 7,1)
* Lilu使用v1.3.9版本(https://github.com/acidanthera/Lilu)
* Whatevergreen使用v1.3.5版本(https://github.com/acidanthera/WhateverGreen 或 https://github.com/bugprogrammer/WhateverGreen 均可)
* boot-args加入shikigva=16
* 重启

# 至此，您的sidecar功能已经可用。