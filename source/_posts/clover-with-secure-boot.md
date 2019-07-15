---
title: '什么？这辣鸡BIOS竟然不能关闭Secure Boot？教你在开启Secure Boot的情况下安装macOS'
tags:
  - Secure Boot
  - Hackintosh
urlname: clover-with-secure-boot
id: 65
categories:
  - Hackintosh
date: 2019-07-06 02:49:00
---

# 相关理论
## BIOS
BIOS是英文"Basic Input Output System"的缩略语，直译过来后中文名称就是"基本输入输出系统"。其实，它是一组固化到计算机内主板上一个ROM芯片上的程序，它保存着计算机最重要的基本输入输出的程序、系统设置信息、开机后自检程序和系统自启动程序。 其主要功能是为计算机提供最底层的、最直接的硬件设置和控制。<!--more-->

## UEFI
UEFI，全称“统一的可扩展固件接口”(Unified Extensible Firmware Interface)， 是一种详细描述全新类型接口的标准。这种接口用于操作系统自动从预启动的操作环境，加载到一种操作系统上，从而使开机程序化繁为简，节省时间。

## Secure Boot
Secure Boot只是UEFI的一个部分。两者的关系是局部与整体的关系。Secure Boot的目的，是防止恶意软件侵入。它的做法就是采用密钥。UEFI规定，主板出厂的时候，可以内置一些可靠的公钥。然后，任何想要在这块主板上加载的操作系统或者硬件驱动程序，都必须通过这些公钥的认证。也就是说，这些软件必须用对应的私钥签署过，否则主板拒绝加载。由于恶意软件不可能通过认证，因此就没有办法感染Boot。

# 在开启Secure Boot的情况下使用Clover启动macOS以及其他操作系统(如Linux)

## 准备工作(Windows下操作)

* 下载并解压Super-UEFIinSecureBoot-Disk(感谢ValdikSS开发工具)。
https://github.com/ValdikSS/Super-UEFIinSecureBoot-Disk/releases/download/3/Super-UEFIinSecureBoot-Disk_minimal_v3.zip

* 下载etcher
https://github.com/balena-io/etcher/releases/download/v1.5.51/balenaEtcher-Portable-1.5.51.exe

* 准备一个U盘并备份文件，用etcher将Super-UEFIinSecureBoot-Disk写入U盘。
![](/images/secure-boot-1.png)

## 实现教程

> 现在请在BIOS中开启Secure Boot选项并且重启进入Windows操作。

### 注册证书
使用做好的U盘启动电脑，按照图示完成证书注册。(出现黑色的grub2界面表示注册成功)
![](/images/secure-boot-2.png)

### 集成Clover
* 将CLOVER文件夹拷贝到U盘的EFI文件夹下，与BOOT以及grub文件夹同级。
![](/images/secure-boot-3.png)

* 打开Clover文件夹将Cloverx64.efi文件重命名为grubx64_real.efi。
![](/images/secure-boot-4.png)

* 打开BOOT文件夹备份grubx64_real.efi文件，并将Clover文件夹下的grubx64_real.efi文件拷贝到BOOT文件夹下。
![](/images/secure-boot-5.png)

* 重启电脑，并用U盘引导。

# 是时候看看成果了！
![](/images/secure-boot-6.png)

# 最后别忘了将USB的引导移到硬盘中。

# 关于后续更新Clover的问题
下载新版本的Clover，将cloverx64.efi重命名为grubx64_real.efi并覆盖EFI中Clover文件夹与BOOT文件夹中的同名文件。