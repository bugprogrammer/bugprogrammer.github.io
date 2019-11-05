---
title: '关于RX5700XT的驱动方法以及bug解决方案'
tags:
  - RX5700
  - Hackintosh
urlname: about-RX5700XT
id: 65
categories:
  - Hackintosh
date: 2019-11-2 23:02:00
updated: 2019-11-2 23:02:00
---

>AMD Navi显卡在macOS Catalina 10.15.1 beta2中已经正式免驱，博主购入测试，现公布新显卡的驱动方法以及bug解决方案。<!--more-->

# Windows
使用DDU卸载原驱动并下载安装官方的RX5700XT的驱动即可。

# Linux
> Linux 5.3起正式加入Navi显卡支持，所以我们要做的就是把Linux内核版本升级到5.3+即可。现提供两种升级内核方法。<font color=#A52A2A >注意，因为当前Linux内核版本低于5.3，所以显示器插入RX5700XT启动Linux会黑屏，博主建议显示器连接核显或使用其它亮机卡操作。</font>

## 方法一(推荐)
利用所使用的Linux发行版本的内置包管理器升级内核。以博主使用的Manjaro为例讲解。使用Manjaro内置的pacman升级内核。

* 查找可用内核
```
sudo pacman -Ss linux-headers
```

* 升级内核
```
sudo pacman -S linuxXY linuxXY-headers (XY表示内核版本号，比如要升级到Linux 5.3，则为sudo pacman -S linux53 linux53-headers)
```

## 方法二
下载Linux 5.3源码编译，具体教程见 https://www.bugprogrammer.me/2018/09/01/Linux_Kernel_Build.html

## 升级后可能会丢失无线网卡以及蓝牙驱动，重新安装即可，以博主的bcm94352z为例
```
sudo pacman -S linux-headers
sudo pacman -S broadcom-wl-dkms
```
重启电脑，wifi蓝牙满血复活。

# macOS
macOS Catalina 10.15.1 beta2起支持navi显卡，所以只要升级系统到macOS Catalina 10.15.1 beta2即可。

## 一些bug的解决方案

### 加入whatevergreen黑屏
在boot-args加入如下参数：agdpmod=pikera即可。
* Clover设置如下：
![](/images/5700-1.png)
* OpenCore设置如下：
![](/images/5700-2.png)

### 全新安装以及Recovery模式画面错位问题的曲线救国方案
* 下载博主提供的修复文件并解压到<font color=#A52A2A >桌面</font>
https://pan.baidu.com/s/1TRHSydsheliT0vZZmqi6gw

* 下载官方的macOS Catalina 10.15.1正式版镜像，将Install macOS Catalina.app放到<font color=#A52A2A >应用程序文件夹</font>

#### 全新安装画面错位修复
* 执行如下命令修改镜像
```
sudo cp -f /Users/wbx/Desktop/fix\ 5700/* /Applications/Install\ macOS\ Catalina.app/Contents/SharedSupport/
```
  ![](/images/5700-3.png)

* 将修改过的镜像写入U盘，全新安装修复完成。

#### Recovery画面错位修复
* 执行如下命令找到Recovery的分区号
```
sudo diskutil list
```
  ![](/images/5700-4.png)
> 如图，disk2s3即为Recovery的分区号

* 执行如下命令挂载Recovery分区
```
sudo diskutil mount /dev/disk2s3
```
  ![](/images/5700-5.png)

* 执行如下命令修改Recovery分区
```
sudo cp -f ~/Desktop/fix\ 5700/* /Volumes/Recovery/9D839C6C-F3C0-45A0-9DCF-36CFDF99282E/
```
  ![](/images/5700-6.png)

  > 注意：/Volumes/Recovery下的9D839C6C-F3C0-45A0-9DCF-36CFDF99282E文件夹名称有可能每个人都不一样，注意替换成自己的文件夹名称。

* 至此，Recovery分区画面错位修复完成。

### 关于更新时画面错乱
因为更新是自动化过程，所以无需修复，只需要等待Apple更新修复bug即可。保留这个bug有助于我们第一时间得知Apple何时修复了画面错位的bug。所以本文对此不做讲解，本文主要解决全新安装以及Recovery环境的画面错位问题。

# <font color=#A52A2A >未完待续。。。</font>