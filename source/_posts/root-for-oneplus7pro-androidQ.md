---
title: '一加7 Pro Android Q root教程'
tags:
  - Android Q
  - OnePlus 7 Pro
urlname: root-for-oneplus7pro-androidQ
id: 65
categories:
  - Android
date: 2019-08-18 22:21:00
updated: 2019-08-18 22:21:00
toc: true
---

> 博主近日把自己的一加7 Pro升级到了Android Q beta，发现暂时无法刷入twrp-recovery，也就意味着root有一点点的麻烦，今天博主发布个人测试可行的root方案。博主是在Mac下操作，Windows以及Linux同理。<!--more-->

# 环境搭建
## Xcode
* Mac App Store安装Xcode。
* 终端下输入如下命令并按提示安装。
```
xcode-select --install
```

## HomeBrew
终端下执行如下命令即可。
```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

## adb
终端下执行如下命令即可(也许需要科学上网，请自行解决)
```
cd ~/Download
wget https://dl.google.com/android/repository/platform-tools-latest-darwin.zip
unzip platform-tools-latest-darwin.zip
echo 'export PATH=/Users/wbx/Downloads/platform-tools:$PATH' >> ~/.zshrc
source ~/.zshrc
```
![](/images/root-1.png)
![](/images/root-2.png)

## Python3以及pip3
终端执行如下命令安装Python3
```
brew install python3
```
终端输入如下命令安装pip3
```
curl https://bootstrap.pypa.io/get-pip.py | python3
```

## protobuf模块
终端执行如下命令安装protobuf模块
```
brew install protobuf
pip3 install protobuf
```
> 至此，环境搭建已经全部完成。

# 检测环境搭建正确性
终端输入以下命令，结果如图则正确
```
python3 -V
pip3 -V
adb version
protoc --version
```
![](/images/root-3.png)

# root权限获取教程
* 下载并解压手机当前使用的系统镜像，比如博主的是Android Q Developer Preview 4 for OnePlus 7 Pro。链接如下。
https://oxygenos.oneplus.net/OnePlus7ProOxygen_13.X.04_OTA_004_all_1908020003_726196c3b79b4f85.zip

* 下载并解压镜像解包工具。
https://gist.github.com/ius/42bd02a5df2226633a342ab7a9c60f15/archive/48ffe1eee59af9a7da883d9ec7902d1507428dc4.zip

* 将解包工具中的两个.py文件放到我们解压的镜像目录。
![](/images/root-4.png)

* 执行如下命令解包，当看到boot.img解包完成后按Ctrl+C终止命令。
```
cd /Users/wbx/Downloads/OnePlus7ProOxygen_13.X.04_OTA_004_all_1908020003_726196c3b79b4f85
python3 payload_dumper.py payload.bin
```
    ![](/images/root-5.png)
    ![](/images/root-6.png)

* 数据线连接手机，手机开启USB调试模式，将解包生成的boot.img文件拷贝到手机根目录(由于macOS下无法直接将文件拷贝到Android，所以采用adb命令方案)
```
adb push boot.img /sdcard 
```
    ![](/images/root-7.png)

* 手机端安装Magisk Manager App，可以在酷安下载。
* 按照图示，给boot.img打补丁
![](/images/root-8.png)

* 将打好补丁的magisk_patched.img传回电脑桌面
```
adb pull /sdcard/Download/magisk_patched.img ~/Desktop
```
    ![](/images/root-9.png)

* 将桌面上的magisk_patched.img文件刷入到手机的boot分区，Root完成。
```
adb reboot-bootloader
fastboot flash boot ~/Desktop/magisk_patched.img
```
    ![](/images/root-10.png)

# 至此您已经Root成功
![](/images/root-11.png)

# OTA更新后如何保留Root权限
OTA更新安装完成后，不要重启。按照图示操作后再重启即可保留Root权限
![](/images/root-12.png)