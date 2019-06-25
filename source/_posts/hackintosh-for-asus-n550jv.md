---
title: 'ASUS N550JV Hackintosh记录+教程+完整EFI分享'
tags:
  - macOS
  - ASUS N550JV
urlname: hackintosh-for-asus-n550jv
id: 65
categories:
  - Hackintosh
date: 2019-01-29 22:09:00
---

>朋友的asus-n550jv笔记本，配置为i7-4700HQ+hd4600+gt750M(已屏蔽)+8g ram+256g ssd(sata)+1T hdd+1080P屏幕。安装黑苹果大体顺利，现将大概过程分享，供同机型的朋友借鉴。<!--more-->

## 前言
* asus-n550jv原机自带ar9485无线网卡，驱动不完美，所以更换无线网卡为bcm94352hmb。
* 完美程度：显卡+声卡+双网卡+蓝牙完美驱动，USB正常，睡眠唤醒正常，显示器内建正常，<font color=#A52A2A >**HDMI外接屏幕无条件测试，**</font>变频12档，小太阳正常，电池正常(感谢黑果小兵和宪武以及其他大牛的帮助)。键盘背光调节正常，<font color=#A52A2A >**触摸板空白。**</font>
* 因为电脑是朋友的，所以截图不方便，因此本教程尽量多使用命令行方式，各位可以直接复制粘贴。<font color=#A52A2A >**一部分图片是在博主电脑截图的。**</font>
* 本教程需要你有一个macOS环境，可以是虚拟机。虚拟机安装macOS百度教程很多，请自学。
* 安装前要在Windows下准备好安装macOS所需分区。

## 教程
### 制作安装盘
 * 下载macOS Mojave 10.14.3镜像，博主建议在App Store下载，下载成功后会保存在Application下。
 * 格式化U盘为Mac OS扩展日志式，U盘名称设置为mac，格式化后会生成两个分区，第一个是EFI分区，用来存放Clover引导，第二个用于写入镜像，格式化U盘如图。
![](/images/9e40ae2bc90d3a5d217d5c603bddcc6a067e7da3.jpg)
 * 写入镜像:终端输入如下命令并输入密码即可。
 ```
 sudo /Applications/Install\ macOS\ Mojave.app/Contents/Resources/createinstallmedia --volume /Volumes/mac --applicationpath /Applications/Install\ macOS\ Mojave.app
 ```

### 获取博主分享的Clover文件,保存在桌面
* 输入如下命令即可在桌面保存hackintosh文件夹，内含Clover文件夹
```
cd ~/Desktop && git clone https://github.com/bugprogrammer/hackintosh.git && cd hackintosh && git checkout asus-n550jv-bcm94352hmb 
```
 ![](/images/b33c82ed0209fa970c9094c3ee8f034313e1a7bd.jpg)
 
### 挂载U盘EFI分区，放入Clover引导

使用Clover Configurator挂载EFI分区，将博主分享的EFI拷贝进去。
   ![](/images/0aae5eb850ea4d2b3f73db2ec30fae9eb9ec2e8d.jpg)
   ![](/images/fe03e90e9aad66d294b924163010f84754c00400.jpg)
### 安装系统
 * U盘启动，进入安装盘
 * 选择语言为简体中文，磁盘工具下抹盘为APFS
 * 点击安装macOS，选择刚才准备好的分区，安装系统
 * 安装系统有两个阶段，中途会重启，属于正常现象

### 系统完善
> 因为有些操作是在系统内完成的，所以只有一个efi不可能安装完成就完美，所以进入系统后要完善系统。

 #### 蓝牙
 
挂载EFI分区，终端下输入如下命令重启即可
```
sudo cp -Rf /Volumes/EFI/EFI/CLOVER/kexts/Other/BrcmFirmwareData.kext /Library/Extensions
sudo cp -Rf /Volumes/EFI/EFI/CLOVER/kexts/Other/BrcmPatchRAM2.kext /Library/Extensions
sudo chmod -Rf 755 /System/Library/Extensions
sudo chown -Rf 0:0 /System/Library/Extensions
sudo chmod -Rf 755 /Library/Extensions
sudo chown -Rf 0:0 /Library/Extensions
sudo rm -Rf /System/Library/PrelinkedKernels/*
sudo rm -Rf /System/Library/Caches/com.apple.kext.caches/*
sudo touch -f /System/Library/Extensions
sudo touch -f /Library/Extensions
sudo kextcache -Boot -U /
```

#### 电池
 
挂载EFI分区，终端下输入如下命令重启即可
```
sudo cp -Rf /Volumes/EFI/EFI/CLOVER/kexts/Other/ACPIBatteryManager.kext  /Library/Extensions
sudo chmod -Rf 755 /System/Library/Extensions
sudo chown -Rf 0:0 /System/Library/Extensions
sudo chmod -Rf 755 /Library/Extensions
sudo chown -Rf 0:0 /Library/Extensions
sudo rm -Rf /System/Library/PrelinkedKernels/*
sudo rm -Rf /System/Library/Caches/com.apple.kext.caches/*
sudo touch -f /System/Library/Extensions
sudo touch -f /Library/Extensions
sudo kextcache -Boot -U /
```
#### 小太阳
* 挂载EFI分区，终端下输入如下命令重启
```
sudo cp -Rf /Volumes/EFI/EFI/CLOVER/kexts/Other/AppleBacklightInjector.kext  /Library/Extensions
sudo chmod -Rf 755 /System/Library/Extensions
sudo chown -Rf 0:0 /System/Library/Extensions
sudo chmod -Rf 755 /Library/Extensions
sudo chown -Rf 0:0 /Library/Extensions
sudo rm -Rf /System/Library/PrelinkedKernels/*
sudo rm -Rf /System/Library/Caches/com.apple.kext.caches/*
sudo touch -f /System/Library/Extensions
sudo touch -f /Library/Extensions
sudo kextcache -Boot -U /
```
* 设置快捷键，将亮度调节快捷键修改成笔记本键盘相应键位，ASUS-N550JV为F5亮度减，F6亮度增。(需要外接键盘才能设置，设置完成后可以拔掉外接键盘)
    ![](/images/f202487644f2be79b6fde537243e318c8797ae88.jpg)
    

## 至此，ASUS-N550JV 黑苹果95完美