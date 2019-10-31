---
title: 'OpenCore黑苹果方案以及ASRock Z390 Phantom Gaming-ITX/ac+i9-9900K OpenCore配置文件分享'
tags:
  - Hackintosh
  - OpenCore
urlname: opencore-hackintosh
id: 65
categories:
  - Hackintosh
date: 2019-05-29 00:21:00
updated: 2019-05-29 00:21:00
---

# OpenCore简介
OpenCore是由**<font color=#A52A2A >vit9696</font>**等8位大佬开发的全新黑苹果引导工具。用于在PC上启动macOS操作系统。博主用了一天时间已经成功启动博主电脑上的macOS，现在做简单分享。<!--more-->

# OpenCore编译
* APP Store安装Xcode。
* 终端执行如下命令，并点击最右侧的同意按钮安装命令行工具。
```
xcode-select --install
```
* 在如下链接里下载编译脚本**<font color=#A52A2A >buildopencore，</font>**感谢pcbeta网友**<font color=#A52A2A >云朵有点甜</font>**编写脚本。
http://bbs.pcbeta.com/viewthread-1814957-1-1.html
* 解压并执行脚本,如图。编译后桌面生成OpenCore文件夹。
```
chmod u+x ./buildopencore
./buildopencore
```
    ![](/images/opencore-1.png)![](/images/opencore-2.png)![](/images/opencore-3.png)**<font color=#A52A2A >注意：Docs文件夹里有官方文档以及plist文件示例。</font>**
    
# OpenCore使用简要教程
## 文件夹结构(虚线框内的不是必须项目，视需求而定)
![](/images/opencore-4.png)
## config.plist文件解析(只介绍博主用到的)
### ACPI
#### Add
添加aml文件，比如DSDT.aml。
#### Block
相当于Clover中的Drop Tables。用于屏蔽一些OEM Tables。如Drop DMAR。
#### Patch
相当于Clover中的DSDT部件更名，例如：change HDAS to HDEF。
#### ACPI部分整体图解
![](/images/opencore-5.png)

### DeviceProperties
#### Add
用于注入设备属性，比如声卡layout-id，核显帧补丁等。相当于Clover的Devices->Properties。
![](/images/opencore-6.png)

### kernel
#### Add
用于注入kext路径。
#### Patch
相当于Clover的KextsToPatch
#### Kernel部分整体图解
![](/images/opencore-7.png)
### NVRAM(由于博主表达能力欠佳，这一部分请参考官方文档)
![](/images/opencore-8.png)
### PlatformInfo
相当于Clover中的SMBIOS，使用OpenCore Configurator注入即可。
![](/images/opencore-9.png)
### UEFI
#### Drivers
用于注入用于启动的驱动信息，例如ApfsDriverLoader.efi等。
![](/images/opencore-10.png)

# 使用OpenCore引导博主电脑简要说明
## 博主电脑配置信息
ASRock Z390 Phantom Gaming-ITX/ac+i9-9900K+Vega56
## 目前完美程度
以太网卡+声卡+独显+核显+wifi+蓝牙+USB正常。睡眠唤醒正常。关机正常。原生电源以及AGPM正常，硬解正常。雷电只能当typec使用。
## OC文件夹结构
![](/images/opencore-11.png)
## SMBIOS
iMac Pro 2017
## 以太网卡、wifi、蓝牙、独显、USB
同Clover。
## 声卡
* Lilu、AppleALC拷到L/E下。
* DeviceProperties下注入声卡layout-id。
* 重建缓存。
![](/images/opencore-12.png)

## 核显
DeviceProperties下注入核显信息。
![](/images/opencore-13.png)

## 原生电源
加入SSDT-XCPM-SBpr00.aml即可加载两个X86(博主会分享OC配置文件)。

## AGPM
同Clover。

## 关机变重启以及睡眠变重启解决方案
使用OsxAptioFix2Drv-free2000.efi替换其他启动文件即可。

# 博主电脑OpenCore配置文件分享
博主已将OC文件推送至博主的Hackintosh仓库，详情以及用法见如下链接。
https://www.bugprogrammer.me/2019/05/23/github-hackintosh.html

# 2019-05-31更新
## 一个小发现
OpenCore可以直接正确识别9代CPU型号，比如我的9900K显示为3.6 GHz Intel Core i9(Clover默认显示为i7)。