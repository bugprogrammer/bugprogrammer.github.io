---
title: 'macOS Catalina 10.15关于sidecar功能的说明'
tags:
  - macOS Catalina 10.15
  - Hackintosh
  - sidecar
urlname: about-sidecar
id: 65
categories:
  - Hackintosh
date: 2019-06-13 00:47:00
---

> macOS 10.15的一个重磅功能是sidecar。就是用iPad作为mac的扩展屏，博主测试了一下，挺好用的。但是在Hackintosh下，并不是随意就能启用sidecar。以下附上博主的启用sidecar教程。<!--more-->

## 注意事项
目前无核显PC尚未遇到成功案例，可能是黑苹果的bug，也可能是macOS 10.15 beta1的bug。

## 博主PC配置
Z390+9900K+Vega56

## 启用sidecar教程
* BIOS中设置主显卡为独显(PCIE)并且设置DVMT为128M，以便独显、核显并存。
* 修改SMBIOS为iMac 19,1。
![](/images/sidecar-1.png)
* 勾选Inject intel。
* 设置FakeID->IntelGFX为0x3e988086，ig-platform-id为0x3e980003(核显作为加速卡)。也可以设置FakeID->IntelGFX为0x3e928086，ig-platform-id为0x3e920003，博主测试均通过。
![](/images/sidecar-2.png)
![](/images/sidecar-3.png)
* 重启电脑测试sidecar。

## 至此sidecar已完美开启，H264以及H265硬解正常，博主测试FCP导出正常。注意：更换SMBIOS后要记得修改usbports中的机型信息。
![](/images/sidecar-4.png)
![](/images/sidecar-5.png)
![](/images/sidecar-6.png)
![](/images/sidecar-7.png)