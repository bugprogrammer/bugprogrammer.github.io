---
title: '关于macOS 10.14.4 18E2034镜像的说明'
tags:
  - macOS
  - Hackintosh
urlname: about-macos-10.14.4-18E2034
id: 65
categories:
  - Hackintosh
date: 2019-03-27 15:01:00
updated: 2019-03-27 15:01:00
---

> macOS 10.14.4 18E2034是一个特供镜像，博主猜测是iMac 2019的预装镜像(参测而已，因为经测试发现9900K型号仍然不识别，所以。。。)
<!--more-->

### 下载
#### 新建一个空壳镜像
```
mkdir -p /Applications/Install\ macOS\ Mojave.app/Contents/SharedSupport/
```
#### 获取镜像下载脚本
```
curl https://www.tonymacx86.com/attachments/createinstaller-10-14-4-sb-sh-zip.395290/ -o createInstaller-10.14.4-SB.sh.zip
unzip createInstaller-10.14.4-SB.sh.zip
```
![](/images/e75ea7c233265be8aa47e9548df8c03ba93c6402.jpg)
#### 修改脚本
> 由于下载可能失败,为了避免每次失败后都要重建空壳镜像，我们把脚本中的cp命令加上强制属性-f

![](/images/3c35e1b7a49496a405706479ca6efab82865281b.jpg)

#### 下载镜像
```
./createInstaller-10.14.4-SB.sh
```
![](/images/a72f6742ed9dbd856a1872f1033e3a9b1a256f56.jpg)
![](/images/690c70a7ce3805cef14a2e66b0203bccecb7eed7.jpg)

### 博主的测试以及特供镜像的变化
* <font color=#A52A2A >**仍然不显示9900K型号。**</font>
* <font color=#A52A2A >**z390仍然要EmuVariableUefi-64.efi，否则睡眠、关机都变成重启。**</font>
* AppleGraphicsPowerManagement.kext新增了两个机型，如图。
![](/images/d8799656284986686c88dc71e6b0388fb7a773c3.jpg)
![](/images/9b9ed14414971bea8690c7ba3dd4b8d4ca632a85.jpg)
*  AMDRadeonX5000GLDriver.bundle新增<font color=#A52A2A >**Vega48**</font>和<font color=#A52A2A >**Vega64X**</font>信息
![](/images/e5dd1ea1e2ba4126ba28dd30334b2da8e6c245ed.jpg)
![](/images/9ac7e58ca2616f651daa617ec5defd17d1a1ab45.jpg)