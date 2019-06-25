---
title: 'macOS Mojave 10.14.1-10.14.3 USB降速解决方案(不需要另外安装10.14.0)'
tags:
  - macOS
  - USB
urlname: USBfix
id: 65
categories:
  - Hackintosh
date: 2019-01-02 23:43:00
---

>自从macOS Mojave 10.14.1发布以来，黑苹果方面出现了一个很讨厌的bug，USB降速。连接USB 3.0U盘或移动硬盘速度会显示为480MB/s,也就是USB2.0的速度。以往的解决方案大都需要安装10.14.0，比较麻烦。现在放出免安装10.14.0的USB解决方案。
<!--more-->

## Bug成因
自从macOS Mojave 10.14.1发布以来，传统的解除USB15端口数量限制补丁失效，导致USB端口数量超过15的主板发生USB识别混乱，USB 3.0无法识别。

## 准备工作
* 黑苹果常用工具，不赘述。
* FBPatcher。
* macOS Mojave 10.14.0安装U盘。 

## 解决方案前提
确保在10.14.0下USB正常。

## 解决方案主导思想
在10.14.0安装盘环境下提取数据，再进入系统实际定制。

## 解决方案
### 打补丁
* 下载usbinjectall.kext备用，链接如下：
https://bitbucket.org/RehabMan/os-x-usb-inject-all/downloads/
* 使用Clover Configurator挂载EFI分区，将下载的usbinjectall.kext放到/EFI/CLOVER/kexts/Other下,如图。
![](/images/3372fe32720d53f1857fb3ed519774a5850e299f.jpg)
* 使用Clover Configurator挂载EFI分区并打开config.plist文件，在左侧栏Kernel and Kext Patches下的KextsToPatch中打如下补丁，如图。
```
Name: com.apple.driver.usb.AppleUSBXHCI
Find: 83FB0F0F 83030500 00
Replace: 83FB0F90 90909090 90
Comment: disable port limit in XHCI kext (credit PMHeart)
MatchOS: 10.14.0
```
    ![](/images/41ee0b30b9d358d3378039ddf02ff2d0c77b80de.jpg)
* 重启电脑。

### macOS Mojave安装盘环境下提取USB端口数据(至关重要)

* 进入macOS Mojave 10.14.0安装盘。
* 菜单栏中点击实用工具->终端打开终端。
* **输入如下命令打开FBPatcher，如图。**
```
/Volumes/Mojave/Applications/FBPatcher.app/Contents/MacOS/FBPatcher
```
    ![](/images/4d5866e3824ba74a2812630027cd0500d57ec1d5.jpg)
* 分别用USB 2.0和USB 3.0设备将所有USB接口插一遍，插过的接口FBPatcher会显示绿色。如图即为USB端口数据。博主的USB端口数据为: HS02、HS03、HS04、HS05、HS06、HS08、HS09、HS11、HS14、SS01、SS02、SS03、SS04、SS05、SS06、SS08。
![](/images/415059d011b0ce186e9f924ba5bd77d1739f7b0e.jpg) ![](/images/69330f7f786b9701d3d68c649c9ea2c92accd1f1.jpg) ![](/images/54cfa702f587862d3a4b512ab350baea0b3526c5.jpg)
* 重启电脑。切记记录好USB端口数据，安装盘环境下不能截图的哦！**博主强烈建议拍照，方便以后定制。**

### 按照USB端口数据定制USB
* 进入系统，按照之前提取的USB端口数据，去掉无用端口，如图。
![](/images/473aa68c3554f81498757edf09dfde4a04ce6fe7.jpg)
* 检测剩余端口数，如果大于15就要做出取舍。比如博主的是16个USB端口，其中有一个是水冷端口。用于检测水冷状态，macOS下用不到，故去掉，如图。
![](/images/6d6f48ec4704cdf7174601a7c1888e0d265ad2f3.jpg)
* 蓝牙内建，Connector改为Internal，如图。
![](/images/f6e52fa2ac0823790ca311e2d0af7eee84a5c665.jpg)
* 导出USBPorts.kexts，如图。
![](/images/bc11e82cce9e832b9ea61105fe1585836075c882.jpg) ![](/images/7c7f8a9171c3948fed27d90cf244b451c00f3675.jpg)
* 将生成的USBPorts.kext放到EFI/CLOVER/Kexts/Other下。也可以打开USBPorts.kext的info.plist文件，将数据集成到FakeSMC下(集成方法在下面)。
* 删除EFI/CLOVER/Kexts/Other下的usbinjectall.kext文件，去掉之前打的解除15端口限制补丁。
* 重启，看看USB是不是满血复活啦！！！

## 特殊情况
>由于10.14.1版本开始USB识别异常，所以可能遇到以下特殊情况。**例如在安装盘环境提取数据时存在SS07端口，但是到系统中定制时却找不到SS07端口。**遇到这种情况可以先导出USBPorts.kext，打开info.plist，按照其他端口的格式手动添加SS07端口即可。手动添加方法见下文。

## USBPorts.kext下info.plist文件解析
### info.plist文件结构
![](/images/bf55f562be1c10dc8edce2ed287a4abc48a21477.jpg)
### info.plist与FBPatcher的数据对应关系
#### iMacPro1,1-XHC
本字段为机型记录，取决于所选SMBIOS，所以要注意，**定制完不要随意修改机型。**
#### HSxx(SSxx)
本字段为端口名称，对应FBPatcher中的Name字段，如图。
![](/images/4fadad769216ba06adca462bea0da0145e4692db.jpg)
#### UsbConnector
本字段为连接器属性，USB 2.0值为0，USB 3.0值为3，特殊端口(如蓝牙)值为255。UsbConnector对应FBPatcher中的Connetor字段，如图。
![](/images/6936796ffeddf09bd31e814e277652f922424663.jpg)
#### port
本字段为端口序号，对应FBPatcher中的Port，格式略有不同，**例如FBPatcher中Port为0x0E，则info.plist中port为0E000000，**如图。
![](/images/787226c04529b5dfa3a4c934117d91d9ffb51802.jpg)
#### port-count
本字段为端口数量，最后一个端口的port值即为port-count值，如图。
![](/images/a027dd63a8aaac33638012601958ec8287ad3aac.jpg)
### info.plist中手动添加端口数据
按照上文的对应关系添加数据即可。

## 将USBPorts.kext中的数据集成到FakeSMC.kext
* 分别打开USBPorts.kext以及FakeSMC.kext的info.plist文件，按照下图操作。
![](/images/1ed796e7c2425a801e60152c49a007402e8b5397.jpg)
* 删除USBPorts.kext。