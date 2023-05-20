---
title: '关于DRM视频播放以及sidecar和DRM共存的解决方案'
tags:
  - Hackintosh
urlname: about-DRM
id: 65
categories:
  - Hackintosh
date: 2019-12-11 20:16:00
updated: 2019-12-11 20:16:00
toc: true
---

> macOS Catalina 10.15发布后，不少小伙伴发现DRM视频播放出现bug。博主研究测试，得以<font color=#A52A2A >部分</font>解决。现发布播放DRM视频以及sidecar和DRM共存的解决方案。<!--more-->

# 目前支持Hackintosh DRM的独显(核显DRM不可用)
Vega 56、Vega 64、VII、RX 5700、RX 5700 XT，可以使用完整DRM。<font color=#A52A2A >本文前提是使用以上显卡的任意一款</font>

# 播放DRM视频的解决方案
## 无核显用户
无核显用户只需要把smbios设置为iMac Pro 1,1即可。

## 有核显用户
* Lilu使用v1.4.1版本(https://github.com/acidanthera/Lilu)， 目前需要手动编译。
* Whatevergreen使用v1.3.6版本(https://github.com/acidanthera/WhateverGreen 或 https://github.com/bugprogrammer/WhateverGreen 均可)，目前需要手动编译。
* boot-args加入shikigva=80。
* 重启。

# sidecar和DRM共存的解决方案
> 前提：intel酷睿 6、7、8、9代带有核显的CPU+目前支持Hackintosh DRM的独显(上文有写)。本文以<font color=#A52A2A >9900K+5700XT</font>为例。

* BIOS开启核显并设置DVMT为128M，主显卡为独显。
* SMBIOS设置为iMac 19,1。
* 注入如下缓冲帧信息。
    ![](/images/DRM-1.png)
* Lilu使用v1.4.1版本(https://github.com/acidanthera/Lilu)，目前需要手动编译。
* Whatevergreen使用v1.3.6版本(https://github.com/acidanthera/WhateverGreen 或 https://github.com/bugprogrammer/WhateverGreen 均可)，目前需要手动编译。
* boot-args加入shikigva=80。
* 重启。

# <font color=#A52A2A >至此，在配置支持的前提下，sidecar和DRM可以共存。核显硬解以及独显DRM均完美。</font>