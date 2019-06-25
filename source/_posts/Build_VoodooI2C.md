---
title: 'macOS下编译VoodooI2C教程'
tags:
  - macOS
  - VoodooI2C
urlname: Build_VoodooI2C
id: 100
categories:
  - Hackintosh
date: 2018-12-01 14:29:00
---

>自从macOS Mojave 10.14发布以来，VoodooI2C在博主的笔记本上就一直闹毛病。最新的release版本2.1.4在10.14下已经可用，睡眠唤醒后也正常，但是有一个bug很让博主头痛，那就是长时间使用笔记本可能会突然出现内核恐慌而死机或重启。查了下github上的issum，不止博主一人遇到。尝试编译新提交的VoodooI2C源码，测试了一天，成功解决博主笔记本的问题。由于VoodooI2C和其他kext(比如Lilu及其插件)相比，编译难度稍大，故而现在发布VoodooI2C编译教程，供朋友们参考。<!--more-->

### 安装相关环境
#### Xcode
* Mac App Store商店安装Xcode。
* 终端下输入如下命令并按提示安装。
```
xcode-select --install
```

#### git
macOS自带。

### 同步VoodooI2C源码
>由于VoodooI2C不同模块分属于不同仓库，所以要分多次同步源码。

#### VoodooI2C主项目
终端输入如下命令，完成后桌面会生成VoodooI2C文件夹。
```
cd ~/Desktop 
git clone https://github.com/alexandred/VoodooI2C.git
```
#### VoodooGPIO部分
>我们打开桌面上的VoodooI2C文件夹，进入Dependencies->VoodooGPIO，会发现里面是空的，所以要同步VoodooGPIO部分源码。

终端输入如下命令，完成后Dependencies->VoodooGPIO下会生成相应文件，如图。
```
cd ~/Desktop/VoodooI2C/Dependencies 
git clone https://github.com/coolstar/VoodooGPIO.git
```
![](/images/0b6a7d1fb590fa78b90a5da64b8b4422d772cbaf.jpg)

#### VoodooI2CELAN VoodooI2CFTE VoodooI2CHID VoodooI2CSynaptics VoodooI2CUPDDEngine五部分

>我们打开桌面上的VoodooI2C文件夹，进入VoodooI2C Satellites，会发现里面的里面的5个文件夹都是空的。所以要同步这5部分源码。

终端输入如下命令，完成后VoodooI2C Satellites里的5个文件夹下会生成相应文件，如图。
```
cd ~/Desktop/VoodooI2C/VoodooI2C\ Satellites
git clone https://github.com/kprinssu/VoodooI2CELAN.git
git clone https://github.com/prizraksarvar/VoodooI2CFTE.git
git clone https://github.com/alexandred/VoodooI2CHID.git
git clone https://github.com/alexandred/VoodooI2CSynaptics.git
git clone https://github.com/blankmac/VoodooI2CUPDDEngine.git
```
![](/images/efea67887d106bd7cdb07f8632b4aa2775ccf461.jpg)
![](/images/076fe240f8ae0f7ae139516cb424daa673402ad0.jpg)
![](/images/136dfd624f23fc9558399c2838d33972f284114d.jpg)
![](/images/a43b9ac9832f2de321afd09c1bed16c76db98f72.jpg)
![](/images/70cf449f26192ac698ec34a825d1a10eae85d51c.jpg)

至此，源码同步完成，桌面上的VoodooI2C文件夹就是完整的VoodooI2C源码。

### 编译源码(这一节讲编译流程，相关错误解决方案在下一节)
* 用xcode打开源码文件夹根目录的VoodooI2C.xcworkspace文件.
* 点击xcode左侧所有的Update to recommended settings警告，弹出框按提示操作，如图。
![](/images/f9e31b416d4e0e3aae2713e4179f96db06b06ccb.jpg)
* 点击Product->Archive，正常情况下会编译成功，弹框提示输出路径，选择并输出即可,如图。
![](/images/9cedcbc68b08583136ff1b3516e64da0d3ac853f.jpg)
![](/images/dcbee1d5a094c5c8b4d45f71e75665ea47162abc.jpg)
![](/images/6e92d382389ce86b6eb2970de040093a928ee566.jpg)
![](/images/f1c31149e6af98479134e71c7741de7069956ff0.jpg)

<font color=#A52A2A >**（什么？出错了？往下看！！！）**</font>

### 常见错误解决方案(语言叙述有难度，请看视频)
#### 视频教程
{% dplayer "url=https://download.bugprogrammer.me/I2C.mov" "loop=yes" "theme=#FADFA3" "autoplay=false" %}