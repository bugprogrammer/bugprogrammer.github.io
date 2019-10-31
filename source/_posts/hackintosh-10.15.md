---
title: 'macOS Catalina 10.15目前情况(持续更新)'
tags:
  - macOS Catalina 10.15
  - Hackintosh
  - OpenCore
urlname: hackintosh-10.15
id: 65
categories:
  - Hackintosh
date: 2019-06-04 08:40:00
updated: 2019-09-24 08:40:00
---

Apple的WWDC2019已经结束，为我们带来了macOS 10.15、MacPro等出色产品。博主连夜测试了10.15在PC机上的运行情况，现在梳理如下(持续更新)。<!--more-->

## BootLoader
OpenCore
## 完美程度
### 以下功能完美
* 独显、声卡、核显、有线网络、Siri
* 睡眠唤醒
* 原生电源
* AGPM
* 硬解
* USB

### 以下功能暂不可用
* Wifi
* 蓝牙

## 系统截图
![](/images/10.15-1.png)
![](/images/10.15-2.png)
![](/images/10.15-3.png)
![](/images/10.15-4.png)
![](/images/10.15-5.png)
![](/images/10.15-6.png)

## 第一次更新
跟进Clover测试，测试结果同OpenCore。

## 第二次更新
Wifi终于正常(BCM94352z)
![](/images/10.15-7.png)

### 关于wifi的说明
经过测试，目前在10.15下，AirportBrcmFixup.kext不可用，放入会内核崩溃，所以换用FakePCIID+FakePCIID_Broadcom_WiFi.kext方案。

## 第三次更新
蓝牙终于正常了。。。至此，10.15已基本完美。注意，蓝牙要使用BrcmBluetoothInjector.kext驱动。
![](/images/10.15-8.png)

## 总结
* 升级Clover版本到最新或使用OpenCore引导(可以自己编译)，编译教程见
https://www.bugprogrammer.me/2018/06/29/Build_Clover.html
* 自编译最新版Lilu以及Lilu插件(如：AppleALC等)
* Wifi使用FakePCIID+FakePCIID_Broadcom_WiFi.kext驱动。
* 蓝牙使用BrcmBluetoothInjector.kext驱动(博主已将其数据集成到FakeSMC)。

## 更新Z390-itx+vega56+bcm94352z支持10.15的Clover文件
已经上传到博主github的Hackintosh仓库，获取Clover方法见
https://www.bugprogrammer.me/2019/05/23/github-hackintosh.html

## 2019-06-07更新
截至目前，基于最新源码编译的AirportBrcmFixup 2.0.2版本已经可用。原作者Changelog如图。
![](/images/10.15-9.png)

## 2019-09-24更新
10.15下想要让蓝牙更稳定推荐使用 headkaze修改编译的OS-X-BrcmPatchRAM，GitHub地址如下：https://github.com/headkaze/OS-X-BrcmPatchRAM/releases
![](/images/10.15-10.png)
