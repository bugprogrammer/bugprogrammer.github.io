---
title: 'ThinkPad S1 2018 Hackintosh记录+教程+完整EFI分享'
tags:
  - macOS
  - ThinkPad S1 2018
urlname: ThinkPad_Hackintosh_2018
id: 65
categories:
  - Hackintosh
date: 2018-09-01 21:12:00
---

>朋友购买了ThinkPad S1 2018版本，配置为i5-8250U+uhd620+8g ram+256g 联想定制ssd(NVME)+1080P屏幕。安装黑苹果大体顺利，现将大概过程分享，供同机型的朋友借鉴。<!--more-->

## 前言
* 因ThinkPad S1 2018使用的是intel无线网卡，大家都知道intel无线网卡在黑苹果下目前无解，所以替换了Bcm94352z。虽然Bcm94360是免驱的，但是博主不建议笔记本用户选用，因为Bcm94360和普通的ngff无线网卡相比宽了一块，所以笔记本有概率无法安装。
* 完美程度：显卡+声卡+双网卡+蓝牙完美驱动，USB正常，睡眠唤醒正常，显示器内建正常，HDMI外接屏幕正常，变频7档，小太阳正常，电池正常(感谢黑果小兵和宪武以及其他大牛的帮助)。触摸屏以及电容笔可用，但只能单点触摸。触摸板和小红点可用，但是不支持手势。
* 因为电脑是朋友的，所以截图不方便，因此本教程尽量多使用命令行方式，各位可以直接复制粘贴。
* 本教程需要你有一个macOS环境，可以是虚拟机。虚拟机安装macOS百度教程很多，请自学。
* 安装前要在Windows下准备好安装macOS所需分区。

## 教程
### 制作安装盘
 * 下载macOS High Sierra 10.13.6镜像，博主建议在App Store下载，下载成功后会保存在Application下。
 * 格式化U盘为Mac OS扩展日志式，U盘名称设置为mac，格式化后会生成两个分区，第一个是EFI分区，用来存放Clover引导，第二个用于写入镜像，格式化U盘如图。
![](/images/7eb9ec5bdd42a032dc9707bd8255427e82618323.jpg)
 * 写入镜像:终端输入如下命令并输入密码即可。
 ```
 sudo /Applications/Install\ macOS\ High\ Sierra.app/Contents/Resources/createinstallmedia --volume /Volumes/mac --applicationpath /Applications/Install\ macOS\ High\ Sierra.app
 ```

### 获取博主分享的Clover文件,保存在桌面
* 输入如下命令即可在桌面保存hackintosh文件夹，内含Clover文件夹
```
cd ~/Desktop && git clone https://github.com/bugprogrammer/hackintosh.git && cd hackintosh && git checkout ThinkPad-S1-2018 
```
 ![](/images/13d9520b827daa228ded32453ae6b69163965369.jpg)
 
### 挂载U盘EFI分区，放入Clover引导

使用Clover Configurator挂载EFI分区，将博主分享的EFI拷贝进去。
   ![](/images/360ffd8a61b894b90505d9f89e798ab259461fd1.jpg)
   ![](/images/f191d798eef6ca014e5f4f3d4df6e817c5dad4ae.jpg)
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
* 设置快捷键，将亮度调节快捷键修改成笔记本键盘相应键位，ThinkPad S1 2017为F5亮度增，F6亮度减。(需要外接键盘才能设置，设置完成后可以拔掉外接键盘)
    ![](/images/a7883fe77213f7236c7b3677e631aadf5737a2ee.jpg)
    
#### 显示器内建以及开启hidpi
终端输入如下命令执行一建Hidpi脚本并按下图选择即可(感谢xzhih大牛提供脚本)，重启之后，你会发现Hidpi和内建显示器成功完成。
```
sh -c "$(curl -fsSL https://raw.githubusercontent.com/xzhih/one-key-hidpi/master/hidpi.sh)"
```
  ![](/images/ee9bda948796e3d12b9ade6e3e82eab9a089a256.jpg)
  ![](/images/d14a98efc2249b2ec0ddd1ad0215f3b8058d31e2.jpg)

## 至此，ThinkPad S1 2018 黑苹果95完美