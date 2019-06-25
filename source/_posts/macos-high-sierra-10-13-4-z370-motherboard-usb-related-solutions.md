---
title: macOS High Sierra 10.13.4下Z370主板USB相关解决方案
tags:
  - Hackintosh
  - usb
  - z370
urlname: macos-high-sierra-10-13-4-z370-motherboard-usb-related-solutions
id: 28
categories:
  - Hackintosh
date: 2018-05-09 20:32:05
---

>有些使用z370主板安装macOS的朋友可能遇到USB方面的问题，一些朋友的表现为部分USB失灵，还有一部分可能遇到usb3.0设备插在 3.0接口处不识别，今天放上本人的解决方案<!--more-->。

### 在clover加入以下补丁并重启测试USB情况查看USB是否完整识别，3.0设备插在usb3.0上是否可用。 
![](/images/005YMNDBly1g0ra9pmr9mj30sg01fwen.jpg)

### 添加补丁后遇到USB3.0移动硬盘插在usb3.0接口上识别为内置硬盘(桌面不显示黄盘)的解决方案：

下载最新版<a href="https://bitbucket.org/RehabMan/os-x-usb-inject-all/downloads/RehabMan-USBInjectAll-2018-0420.zip">usbinjectall.kext</a>,并解压拷贝到efi/clover/kexts/other下。

### usb引起睡眠之后瞬间唤醒的解决方案(按照步骤2添加usbinjectall.kext后有概率遇到,此解决方案包括但不限于以上情况)：

#### 方案1(DSDT打补丁)：

特点：无需排查导致bug的具体usb口是哪个。同时会使usb唤醒失效，无法用键鼠唤醒，故不推荐！！！
* 下载<a href="https://bitbucket.org/RehabMan/acpica/downloads/iasl.zip">iasl</a>用来反编译dsdt,把iasl编译器拷贝到/usr/bin目录,方便调用。
* 下载<a href="https://bitbucket.org/RehabMan/os-x-maciasl-patchmatic/downloads/RehabMan-MaciASL-2018-0507.zip">MaciASL</a>，我提供的版本自带RehabMan dsdt补丁库。
* 提取DSDT：开机clover引导界面处按F4自动提取，路径EFI/Clover/ACPI/origin下。把DSDT.aml拷贝到桌面。
* 反编译DSDT：终端输入cd ~/Desktop进入桌面目录，再输入iasl -da -dl *.aml反编译DSDT，成功后会在桌面生成DSDT.dsl 文件。
* 给DSDT打补丁：用MaciASL打开DSDT.dsl,点击patch，在左侧补丁栏选择USB3 _PRW 0x6D Skylake(instant wake),再点击 Apply完成，如图： ![](/images/005YMNDBly1g0ra9y5srvj30sg0dbwgu.jpg)
* 编译、排错、保存：打完补丁后点击Complie编译，如果有错请暂时依照网络资源排错。关于DSDT排错，本人后续会详细更新， 敬请期待！排错完成后点击File-&gt;Save As保存DSDT，格式为ACPI Machine Language Binary(aml)。
* 将dsdt拷贝到efi/clover/acpi/patched下并重启生效。

#### 方案2(修改usbinjectall.kext)

特点：需要排查导致bug的具体usb接口，但不会导致usb唤醒失效，可以用键鼠唤醒，故强烈推荐。
* 排查引起bug的USB：一般为蓝牙或摄像头等特殊接口。可以拔掉相应排线重启测试，若拔掉后不再瞬间唤醒，则接口确定，比如 本人的是连接蓝牙排线的usb所导致。
* Windows下进入设备管理器，确定usb设备id，如图则为8086_a2af。
![](/images/005YMNDBly1g0raapm4ahj30j707jmyl.jpg)
* 确定导致bug的usb编号：下载并打开<a href="https://us.softpedia-secure-download.com/dl/cd6af705d256e781d022b220f14acd38/5af2e088/400138300/mac/System-Utilities/IORegistryExplorer.zip">IORegistryExplorer</a>,找到XHC分支，在XHC分支中找到导致bug的usb所连接的设备(比如我 的是蓝牙)，此设备对应的HS号即为所需编号，如图则为HS10(注意HS10下面的BCM20702A0就是我的蓝牙，也就是说HS10导致的睡眠 瞬间唤醒)： ![](/images/005YMNDBly1g0raay9umlj30sg0g07ax.jpg)
* 将usbinjectall.kext拷贝到桌面，并下载<a href="https://www.fatcatsoftware.com/plisteditpro/PlistEditPro.zip">PlistEdit Pro</a>。
* 修改usbinjectall.kext：右击usbinjectall.kext，用PlistEdit Pro打开info.plist。找到IOKitPersonalities-&gt; ConfigurationData-&gt;Configuration分支，在下面选择自己usb的id(Windows下找的那个，我的是8086_a2af)分支，进入后打开 ports可以看到一堆HS编号，打开自己的HS编号(步骤3找到的那个，我的是HS10)，将UsbConnector属性值改成255(255为特殊端口) 并保存，如图： ![](/images/005YMNDBly1g0rabd1qt4j30sg0mz13x.jpg)
* 将修改好的usbinjectall.kext拷贝到efi/clover/kexts/other下重建缓存并重启。