---
title: 'Hackintosh for ASRock Z390 Phantom Gaming-ITX/ac+i9-9900K相关问题解决方案'
tags:
  - macOS
  - acrock z390
  - i9-9900K
urlname: Z390+9900K_Hackintosh
id: 65
categories:
  - Hackintosh
date: 2018-11-05 23:42:00
---

## 前言
> 你没看错，的确是Z390+9900K黑苹果，博主第一时间海淘测试(价钱不说了),大概率国内首发Z390+9900K黑苹果常见问题解决方案。

<!--more-->

## 常见问题
### 关机变重启以及睡眠变重启(还没进入睡眠状态就重启)
#### 问题成因
> 由于Apple并没有推出搭载Z390芯片组的产品，所以macOS现有版本不能原生支持Z390的nvram。

#### 解决思路
> 软件模拟nvram

#### 解决方案
* 按照教程https://www.bugprogrammer.me/2018/06/29/Build_Clover.html 编译最新版本Clover并安装到系统根目录，安装时务必勾选EmuVariableUefi-64.efi以及RC scripts补丁，如下图。
![](/images/bcd6ee3a667abb6122e6e0f2949780f24239ff9c.jpg)
![](/images/4815b4ff57c6a9c13e0f241338e2efe20a873e89.jpg)
* 将cloverx64.efi拷贝到EFI分区下的EFI/CLOVER路径下并覆盖，将EmuVariableUefi-64.efi拷贝到EFI分区下的EFI/CLOVER/drivers64UEFI路径下。
* 使用Clover Configurator挂载EFI分区并打开config.plist文件，找到Boot->Arguments并勾选<font color=#A52A2A >**slide=0**</font>选项，如图。
![](/images/6dbccfd2934608daf91c88c82fe855fe784b3cb5.jpg)
* 重启电脑并观察EFI分区下有没有生成nvram.plist文件，如果有，恭喜你成功了，愉快的睡眠，关机吧！！！
![](/images/bf3550f928cc2f9c09b4fc7070df84263589c525.jpg)

### 睡眠正常，唤醒时重启
#### 问题成因
> 主板xmp选项影响，内存频率影响。

#### 解决思路
> 主板BIOS调节

#### 解决方案一
* 关闭BIOS中的xmp选项

#### 解决方案二
* 开启BIOS中的xmp选项，手动调节频率，从高往低调节。比如博主的3600内存条，开启xmp选项，然后从3600调节到3400再调节到3200终于正常。
![](/images/38f6aec51417d2b04576b9abe8e904082f29350d.jpg)

### 声卡无法驱动
#### 原因排查(通过AppleALC的debug版本进行排查)
* 将EFI/CLOVER/kexts/Other下的Lilu.kext以及AppleALC.kext替换成debug版本。
* 使用Clover Configurator打开EFI/CLOVER下的config.plist，在boot标签里加入-alcdbg参数，如图。
![](/images/bb6d9bc06e1eb89f5ea6c707c7d39faa8ac2b3ec.jpg)
* 重启电脑。
* 终端输入如下命令,并观察输出日志。
```
log show --predicate 'process == "kernel" AND (eventMessage CONTAINS "AppleALC" OR eventMessage CONTAINS "Lilu")' --style syslog --source
```
* 博主电脑报出如下错误，说明声卡的codec revision不被AppleALC支持，至此声卡无法驱动原因排查完毕。
![](/images/4cef17af216f23a89f170a13c6e9f733afc8662f.jpg)

#### 解决方案一(Voodoohda方案)
下载Voodoohda.kext放入EFI/CLOVER/Other下即可(会有爆音，不建议采用此方法)。
https://sourceforge.net/projects/voodoohda/files/VoodooHDA-2.8.8.pkg.zip/download

#### 解决方案二(cloveralc方案)
* 下载cloveralc脚本备用。
```
git clone https://github.com/toleda/audio_CloverALC.git
```
* 下载FakePCIID备用。
 https://bitbucket.org/RehabMan/os-x-fake-pci-id/downloads/
* 在macOS High Sierra 10.13.6的镜像里找到原版的AppleHDA.kext备用。
* 将FakePCIID.kext以及FakePCIID_Intel_HDMI_Audio.kext放入EFI/CLOVER/kexts/Other下。
* 将10.13.6的AppleHDA替换到10.14的System/Library/Extensions下并用kext Utility工具重建缓存(10.14专属步骤，10.13.6用户跳过)。
* 打开下载的cloveralc脚本，文件名为audio_cloverALC-130.sh，在下图位置加入如下代码(10.14专属步骤，10.13.6用户跳过)。
![](/images/70dadbce56ef011d83c82ff33b079b76590faff6.jpg)
* 使用Clover Congifurator注入音频id，博主声卡id为1。
![](/images/26262cd97b32e9f3975e92cb6d5cfd8751ee1fc8.jpg)
![](/images/95bb5d05a4647695006c3ecce1ed54ac805ff67f.jpg)
* 确定以上操作无误后，重启电脑。
* 挂载EFI分区，执行audio_cloverALC-130.sh脚本，按脚本要求执行，脚本运行完成后使用kext Utility工具重建缓存后重启电脑。
![](/images/8d8ac20f0c6831edc44c24c8cf2c7f9674dd646c.jpg)
* 愉快的使用声卡吧！！！

#### 解决方案三(AppleALC方案，博主认为最佳方案，推荐)
* macOS商店下载安装Xcode。
* 下载AppleALC源码。
```
git clone https://github.com/acidanthera/AppleALC.git
```
* 下载Lilu.kext的debug版本，并拷贝到AppleALC源码文件夹。
https://github.com/acidanthera/Lilu/releases
![](/images/5af8451dbb09aa96fcd3e0a19d621e7d5f6358fd.jpg)
* 打开IORegistryExplorer工具，搜索HDA，找到IOHDACodecRevisionID值，如图即为0x100101，转成10进制为1048833。
![](/images/8c4b32a8f1c52d2042862c30a18402e8543bea48.jpg)
* 打开AppleALC源码文件夹下的Resources文件夹，删掉其他声卡型号的文件夹，只保留当前主板的声卡型号文件夹，即保留alc1220文件夹。
![](/images/4c625d128f744047375a9258316d9b2c91d988f3.jpg)
* 打开PinConfigs.kext的info.plist，删除其他声卡信息，只保留当前主板的声卡信息，即alc1220。
![](/images/5116d7b08b15be2b52486a9000fff0d635779f1d.jpg)
* 进入ALC1220文件夹，打开info.plist，修改Revisions值为之前IORegistryExplorer查到的IOHDACodecRevision值的10进制数，即1048833。
![](/images/a0ec8957c76bfcae2efd370694d34b97607c9ce8.jpg)
* Xcode打开AppleALC.xcodeproj，编译生成AppleALC.kext，编译教程请Google。本教程主要教授修改思路。
* 将修改的AppleALC.kext放到EFI/CLOVER/kexts/Other下，Kext Utility重建缓存，重启电脑。
* 愉快的使用声卡吧！！！

## 2018-11-27更新
### 睡眠正常，唤醒变重启
#### 新版解决方案
更新最新版本BIOS即可，新版本BIOS解决了这个问题，已经无需调整XMP。目前最新版版本号为1.29，什么？更新完进不去了？卡引导？往下看！！！
### 更新BIOS后无法进入系统(目前华擎主板中招，解决方案仅限华擎)
#### 解决方案
* 降级回老版本BIOS，目的是可以进入系统。
* 使用Clover Configurator挂载EFI分区并打开config.plist文件。在ACPI->Patches下添加以下补丁即可。如图。
```
Comment: Fix AsRock Z390 BIOS DSDT Device(RTC) bug
Find: A00A9353 54415301
Replace: A00A910A FF0BFFFF 
```
 ![](/images/b41603cdf0f9c80d869d8ac478cdd65a092cf648.jpg)
* 放心升级新版本BIOS吧，畅通无阻！！！

### 10.14.1和10.14.2 USB 3.0降速为480Mbps
#### 原因排查
将usb3.0设备插入usb3.0接口，下载并打开FBPatcher，我们发现所有接口都是HSxx，并没有SSxx，所以usb3.0降速为480Mbps。
#### 解决方案
* 划出一个小分区安装10.14.0并搞定usb驱动(10.14.0 usb也不正常的不在本文讨论范围内,本文仅讨论10.14.0 usb正常但是升级到10.14.1 usb降速的情况)
* 按照<font color=#A52A2A >**@黑果小兵**</font>的教程 **https://blog.daliansky.net/Intel-FB-Patcher-tutorial-and-insertion-pose.html** 定制usbports.kext(感谢<font color=#A52A2A >**黑果小兵</font>**提供教程,另外注意要在<font color=#A52A2A >**10.14.0**</font>下定制,至关重要)。
* 进入10.14.1或10.14.2，你会发现usb满血复活。

## 2018-12-24更新
### 声卡驱动
AppleALC官方已经更新了1.3.4版本，直接使用即可，已经无需修改revisionid再自行编译了。下载地址如下：
https://github.com/acidanthera/AppleALC/releases