---
title: '技嘉Z490 ELITE+i9 10900K+RX 5700 XT Hackintosh构建说明'
tags:
  - Hackintosh
urlname: Hackintosh_for_Z490_10900K
id: 65
categories:
  - Hackintosh
date: 2020-05-27 16:30:00
updated: 2020-06-11 01:30:00
toc: true
---

> Z490主板以及10代桌面处理器(吐槽下14nm+++++++++++++++)正式解禁开卖，博主升级电脑，购入Z490 ELITE+10900K套装(原价哦)，简单测试了下Hackintosh运行情况，现简要说明。<!--more-->

# 运行情况以及完美程度
## 正常工作
* 核显
* 独显
* 声卡
* WIFI
* 蓝牙
* sidecar
* 电源节能5项
* USB
* 睡眠唤醒
* USBPower充电
* DRM视频播放
* 原生NVRAM启动盘切换

## 无法工作
* RTL8125 2.5G有线网卡

## 小瑕疵
* 关于本机处理器只显示频率

# 构建过程
## 下载镜像(略)
## 进系统
### 系统版本低于10.15.5正式版
* OC config.plist中作如下设置
> Kernel->Emulate->Cpuid1Data(Data)->EB060800 00000000 00000000 00000000 
  Kernel->Emulate->Cpuid1Mask(Data)->FFFFFFFF 00000000 00000000 00000000
  Kernel->Quirks->AppleXcpmCfgLock(Boolean)->YES

* 加入SSDT-AWAC.aml并在config.plist中启用(OC中自带)

### 系统版本已经是10.15.5正式版
* OC config.plist中作如下设置
> Kernel->Quirks->AppleXcpmCfgLock(Boolean)->YES

* 加入SSDT-AWAC.aml并在config.plist中启用(OC中自带)

## 核显
* BIOS下开启核显(重要)
* OC config.plist中注入如下信息,注意IGPU路径要换成自己的
![](/images/Z490-1.png)
![](/images/Z490-2.png)

## 独显
### 基础驱动
* 加入WhateverGreen.kext
* boot-args加入agdpmod=pikera
![](/images/Z490-3.png)

### 性能优化
* OC config.plist中注入如下信息,注意GFX路径要换成自己的
![](/images/Z490-4.png)
![](/images/Z490-5.png)

## 声卡
* 加入AppleALC.kext，FakePCIID.kext，FakePCIID_Intel_HDMI_Audio.kext
* OC config.plist中注入如下信息,注意HDEF路径要换成自己的
![](/images/Z490-6.png)
![](/images/Z490-7.png)

## WIFI以及蓝牙
* 博主用的是BCM94352Z，和以前驱动方法完全相同，故不赘述。

## sidecar
* 核显正常驱动即可，无线连接sidecar有问题的，请重新登录icloud以及清空NVRAM。

## 电源节能5项
* 加入以下SSDT并在config中启用即可(以下ssdt已经修复节能变成4项的问题)
<a href="https://downloads.bugprogrammer.me/SSDT/SSDT-PLUG.aml">SSDT-PLUG.aml</a>

## USB
> 博主首先尝试了原始的USBPorts.kext方案，发现并不能解决睡眠即时唤醒的bug，所以博主使用了新方案。

* OC config.plist中做如下配置
![](/images/Z490-8.png)
* 定制USBPorts.kext(虽然不能解决睡眠即时唤醒，但是可以解决插入移动硬盘被识别为内置的bug)。
* 加入如下SSDT并在config.plist中启用
<a href="https://downloads.bugprogrammer.me/SSDT/SSDT-GPRW.aml">SSDT-GPRW.aml</a>
* OC config.plist中做如下配置
![](/images/Z490-9.png)

## 睡眠唤醒
* USB以及电源节能5项搞定以后，睡眠唤醒即正常。

## USBPower充电
* 在USBPorts.kext的info.plist注入如下信息即可
![](/images/Z490-10.png)

## DRM视频播放
* 加入并启用Whatevergreen.kext
* boot-args加入参数shikigva=80
![](/images/Z490-11.png)

## 原生NVRAM启动盘切换
* 与Z390完全一样，可以去掉SSDT-PMC。(原生NVRAM)

# 总结
> 过程写的较为简洁，萌新小伙伴需要看一些其他基础，本文目标是梳理一下Z490 Hackintosh构建的基本情况和驱动完善方法，后续进展会继续更新。
EFI Github地址: https://github.com/bugprogrammer/hackintosh/tree/Z490-AORUS-ELETE+10900K+RX5700XT

# 2020-05-31更新

## 核显
最新版本的macOS(10.15.5)以及Whatevergreen(1.4.0)已经支持Comet Lake新核显id。新id如下
* 0x9BC80003 => i5-10500及以下CPU所附带的UHD 630核显
* 0x9BC50003 => i5-10600K及以上CPU所附带的UHD 630核显

博主的i9-10900K正好适用0x9BC50003，故核显部分更新如下
![](/images/Z490-12.png)

# 2020-06-02更新

## 解锁msr lock(cfg lock)
> 博主之前测试发现传统的msr解锁方案(setup_var)不起作用，因为手头没有编程器，不敢硬刷BIOS，故暂时搁置。偶然在tonymacx86上看到了一个解锁工具，测试成功，教程如下。

* 下载CFGLock.efi工具
<a href="https://downloads.bugprogrammer.me/tools/CFGLock.efi">CFGLock.efi</a>

* 放入OC文件夹下的tools目录中并在config.plist中启用
![](/images/Z490-13.png)
![](/images/Z490-14.png)

* 重启，OC启动菜单选择CFGLock，并按提示操作即可(按y)，工具使用中出现如下交互提示
```
Brumbaers CFG Unlock
1. 05 003E 0011 /CFG Lock/ VarStore Name: CpuSetup

Exactly 1 CFG Variable found: CFG Lock
In VarStore "CpuSetup" GUID: B08F97FF-E6E8-4193 - A9-97-5E-9E-98-0A-DB-32 Offset: 003E Size: 1

Variable read: value 1
Do you want to toggle the value y/n ?
```

* 用HackintoshBuild检测cfg lock情况，成功解锁如下图
![](/images/Z490-15.png)

* config.plist中关闭cfg补丁
![](/images/Z490-16.png)

## 定制CPU名称(博主电脑只显示频率)
* 下载cpu-name.sh脚本(来自tonymacx86)
<a href="https://downloads.bugprogrammer.me/tools/cpu_name.sh">cpu-name.sh</a>

* 使用方法
```
cd xxx(脚本所在目录)
chmod +x cpu-name.sh
./cpu-name.sh "cpu名称"(例如：./cpu-name.sh "十核 Intel Core i9")
```
![](/images/Z490-17.png)

# 2020-06-04更新

## ACPI error(_TZ.TZ10._STA)
> 这个是技嘉主板通病。TZ10是一个温控模块，_STA方法是操作系统检查，如果找不到匹配操作系统(Darwin)就会出错。SSDT中定义如下。

```
Method (_STA, 0, NotSerialized)  // _STA: Status
{
    If (\_OSI ("Windows 2001"))
    {
        Store (0x04, Local0)
    }

    If (\_OSI ("Windows 2001.1"))
    {
        Store (0x05, Local0)
    }

    If (\_OSI ("FreeBSD"))
    {
        Store (0x06, Local0)
    }

    If (\_OSI ("HP-UX"))
    {
        Store (0x07, Local0)
    }

    If (\_OSI ("OpenVMS"))
    {
        Store (0x08, Local0)
    }

    If (\_OSI ("Windows 2001 SP1"))
    {
        Store (0x09, Local0)
    }

    If (\_OSI ("Windows 2001 SP2"))
    {
        Store (0x0A, Local0)
    }

    If (\_OSI ("Windows 2001 SP3"))
    {
        Store (0x0B, Local0)
    }

    If (\_OSI ("Windows 2006"))
    {
        Store (0x0C, Local0)
    }

    If (\_OSI ("Windows 2006 SP1"))
    {
        Store (0x0D, Local0)
    }

    If (\_OSI ("Windows 2009"))
    {
        Store (0x0E, Local0)
    }

    If (\_OSI ("Windows 2012"))
    {
        Store (0x0F, Local0)
    }

    If (\_OSI ("Windows 2013"))
    {
        Store (0x10, Local0)
    }

    If (\_OSI ("Windows 2015"))
    {
        Store (0x11, Local0)
    }

    If (\_OSI ("Windows 2016"))
    {
        Store (0x12, Local0)
    }

    If (\_OSI ("Windows 2017"))
    {
        Store (0x13, Local0)
    }

    If (\_OSI ("Windows 2017.2"))
    {
        Store (0x14, Local0)
    }

    If (\_OSI ("Windows 2018"))
    {
        Store (0x15, Local0)
    }

    If (\_OSI ("Windows 2018.2"))
    {
        Store (0x16, Local0)
    }

    If (LLessEqual (Local0, 0x0E))
    {
        Store (One, \GSA1.ZRD2)
    }

    Return (0x0B)
}
```
### 解决方案
* OC config.plist中做如下配置
![](/images/Z490-18.png)
* 加入如下SSDT并在config.plist中启用
<a href="https://downloads.bugprogrammer.me/SSDT/SSDT-OC-XOSI.aml">SSDT-OC-XOSI.aml</a>

# 2020-06-07更新

## 修复技嘉Hackintosh启动随机出现内存错误
* config.plist中做以下修改
> Booter->Quirks->DevirtualiseMmio->YES
  Booter->Quirks->ProtectUefiServices->NO
  NVRAM->Add->7C436110-AB2A-4BBB-A880-FE41995C9F82->slide=1(添加)

* 加入如下.efi文件并在config.plist中启用
<a href="https://downloads.bugprogrammer.me/efidriver/MemoryAllocation.efi">MemoryAllocation.efi</a>

# 2020-06-11更新
更新10.15.6要把之前的CPUID仿冒加回来。。。