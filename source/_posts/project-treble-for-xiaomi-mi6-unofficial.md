---
title: 小米6第三方Project Treble实现
tags:
  - Android
  - Project Treble
urlname: project-treble-for-xiaomi-mi6-unofficial
id: 20
categories:
  - Android Rom
date: 2018-05-08 00:13:41
---

### 关于Project Treble

>为了解决Android碎片化问题，减少技术支持层面的拖累，Google终于开窍了，在推广最新Android 8.x（又称Android O）时提出了“Project Treble”计划<!--more-->。

>在Project Treble计划出现以前，Android手机的更新都是这种节奏：Android新版本发布，处理器厂商会拿到第一手资源，进行底层的适配和修改后发送给采购该处理器的手机厂商，而后者会根据自己的需要继续修改系统。

>而Project Treble计划则改变了这个流程，谷歌将原本由芯片厂商负责的代码修改工作纳入到Android项目中，绕过芯片厂而直接将打包好处理器适配性的系统发送给手机厂商，从而大大节省时间和研发难度，让手机厂商升级系统的门槛变得更低。同时也使第三方Rom(如Lineage)的适配变得容易。

>对谷歌来说，让所有的Android手机都能像其亲儿子“Pixel”系列一样，可以直接接收自己的推送更新才是终极目标(为Google打Call)。

### 国内Project Treble支持现状

>由于众所周知的原因，国内的山寨"安卓"和国际上正版的"Android"根本不是一个世界，广大国产手机还有好多机型尚未吃上Android 8.x，无从谈起Project Treble，少数预装8.x的机型并没有跟进Project Treble这个Android史上最大的底层变化，所以非官方Project Treble应运而生。

### 相关名词

* Recovery
>Android设备的还原模式，类似于Windows上臭名远扬的Ghost。。。可以执行刷写，清除等操作。建议使用twrp。recovery实际是一个精简的Linux系统加上Google开发的GUI，和Android OS同级。

* Bootloader
>BootLoader是在操作系统内核运行之前运行。可以初始化硬件设备、建立内存空间映射图，从而将系统的软硬件环境带到一个合适状态，以便为最终调用操作系统内核准备好正确的环境。在嵌入式系统中，通常并没有像BIOS那样的固件程序（注，有的嵌入式CPU也会内嵌一段短小的启动程序），因此整个系统的加载启动任务就完全由BootLoader来完成。在一个基于ARM7TDMI core的嵌入式系统中，系统在上电或复位时通常都从地址0x00000000处开始执行，而在这个地址处安排的通常就是系统的BootLoader程序。为了安全起见，Android的BootLoader通常是锁定的，因此想要刷写rom必须解锁，不同手机解锁方式不同，也有的手机无法解锁。

* Adb
>全称Android Debug Bridge，起到连接桥的作用。

* GSI
>Project Treble的通用镜像。

### 教程

* <a href="http://bigota.d.miui.com/tools/MiFlash2017-12-12-0-ex.zip">下载并安装Android必备驱动(可以用小米线刷工具)</a>

* <a href="http://adbshell.com/upload/adb.zip">下载adb工具包并且把路径粘贴到path中方便调用。</a>

* <a href="https://tx5.androidfilehost.com/dl/IZNJy7Ho94g2VDXuXEqsKQ/1525938076/818070582850499029/twrp-3.2.1-0-sagit-blankaf-3.img">下载支持Project Treble的Recovery</a>

* <a href="https://tx5.androidfilehost.com/dl/aXZKVCDmTMQjF14uBMfdOQ/1525938364/890129502657591482/ProjectTrouble-MI6-sagit-treble-v2-BETA.zip">下载Project Treble卡刷包</a>

* <a href="https://tx5.androidfilehost.com/dl/T0mVmfhLtO7_CtV2jWwS3A/1525938498/673956719939836698/system-arm64-aonly-gapps-su.img">下载GSI镜像</a>

* 刷入Recovery:将Recovery文件拷贝到磁盘根目录,假设在D盘，并改一个简单的名字，假设改成recovery.img。手机进入Fastboot模式(电源+音量-)，打开cmd或powershell，输入如下命令即可:
```
fastboot flash recovery d:\recovery.img
```
* 刷入Project Treble卡刷包：卡刷包拷入手机根目录，手机进入Recovery模式(电源+音量+)清除Dalvik/Cache/System/Data/Vendor 等分区，点击安装，找到卡刷包刷入。

* 刷入GSI镜像：手机进入Fastboot模式(电源+音量-)，将GSI拷贝到D盘并重命名为system.img，打开cmd或powershell，输入如下命令即可，完成后重启手机即可。
```
fastboot flash system d:\system.img
```
* 检测是否成功：查看手机型号为Phh-Treble with GApps则为成功。酷安下载Treble Check，第一项打钩表示成功。如图即为成功：
![](/images/005YMNDBly1g0ratgqs3lj304p08c3yu.jpg)
![](/images/005YMNDBly1g0ratnz3fjj304p08cjs4.jpg)