---
title: '教你制作macOS+Ubuntu+WindowsPE超级启动盘(仅支持UEFI)'
tags:
  - Hackintosh
urlname: make-super-usb
id: 65
categories:
  - Hackintosh
date: 2019-07-26 16:25:00
updated: 2019-07-30 16:25:00
toc: true
---

> 对于多系统用户，有没有觉得每一个系统一个U盘很麻烦而且浪费U盘，本文会教你如何制作macOS+Ubuntu+WindowsPE多系统启动盘。注意：建议使用博主分享的PE，其他PE文件结构或许不同，不确定能否成功。<!--more-->

# 准备工作
* USB 3.0U盘(不可小于16g，博主的是闪迪64gU盘)
* macOS 10.15 beta4原版镜像，进入如下网址，内有下载分享 
http://bbs.pcbeta.com/viewthread-1823322-1-1.html
* Ubuntu 19.04镜像，下载地址如下，可直接粘贴到迅雷
http://mirror.cogentco.com/pub/linux/ubuntu-releases/19.04/ubuntu-19.04-desktop-amd64.iso
* Windows 10 1809 PE，百毒盘地址如下(注意，此PE为博主自制PE，兼容PC以及mbp2017，无任何流氓行为，可放心使用)
链接: https://pan.baidu.com/s/1Qb9ieHzwDATaU-FhFuDUJQ  密码: 15ns
* 一个配置好的可引导Hackintosh的Clover

# 写入macOS镜像并放入Clover
## 分区
将U盘格式化成为Hfs格式，卷标为mac，如图。
![](/images/superusb-1.png)

## 将Install macOS Catalina Beta.app拷贝到Application下

## 终端输入如下命令写入镜像
```
sudo /Applications/Install\ macOS\ Catalina\ Beta.app/Contents/Resources/createinstallmedia --volume /Volumes/mac --applicationpath /Applications/Install\ macOS\ Catalina\ Beta.app
```
![](/images/superusb-2.png)

## 挂载U盘EFI分区，将Clover拷贝进去

# 为Ubuntu以及Windows PE准备分区
* 打开磁盘工具，添加分区，格式为HFs，名称为other。将分区Install macOS Catalina Beta的大小修改为8G，如图。
![](/images/superusb-3.png)
* 进入Windows打开diskgenius，删掉那个最大的HFs分区。
![](/images/superusb-4.png)
* 在空闲区域添加三个Fat32格式的分区，名称分别为Ubuntu，WinPE，Data。其中Ubuntu大小为4G，WinPE大小为3G，Data为剩余空间。
![](/images/superusb-5.png)

# 拷贝Ubuntu以及WinPE的文件
将Ubuntu以及WinPE的镜像解压，直接把镜像根目录所有文件拷贝到对应分区。
![](/images/superusb-6.png)

# 引导设置
## Ubuntu
* 在U盘EFI分区新建grub文件夹，和CLOVER文件夹同级。
* 打开Ubuntu分区，将boot/grub文件夹下的grub.cfg文件以及EFI/BOOT文件夹下的Bootx64.efi和grubx64.efi两个文件拷贝到刚刚新建的grub文件夹下。
![](/images/superusb-7.png)

## WinPE
打开WinPE分区，将efi/microsoft/boot文件夹下的cdboot.efi文件重命名为cdboot-bak.efi，并将efi/boot文件夹下的bootx64.efi文件拷贝到efi/microsoft/boot文件夹下。并重命名为cdboot.efi。
![](/images/superusb-8.png)

# 至此，你的macOS+Ubuntu+WinPE超级启动盘制作完成。
# 成品
![](/images/superusb-9.png)

# 2019-7-30更新
## 重要注意事项

**<font color=#A52A2A >如果要把这个启动盘用于白苹果，记得挂载U盘EFI分区，将Boot->Bootx64.efi文件以及Clover->Cloverx64.efi文件的后缀(.efi)去掉，这样做的目的是干掉U盘的Clover启动项。以防止白苹果误进入Clover，这很重要，白苹果使用Clover会彻底黑屏变砖。白苹果可以按option键选择进入macOS安装盘、Ubuntu安装盘或WinPE启动盘，如果以后安装黑苹果，完全可以再把文件名改回来或者使用本地硬盘中的Clover引导启动盘。</font>**