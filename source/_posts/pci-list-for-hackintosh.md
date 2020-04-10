---
title: 'macOS 10.14.6 beta下填充PCI列表的简要教程'
tags:
  - Hackintosh
urlname: pci-list-for-hackintosh
id: 65
categories:
  - Hackintosh
date: 2019-05-21 01:01:00
updated: 2019-05-21 01:01:00
toc: true
---

> 不知各位爱好者是否发现了一些朋友的黑苹果系统中,关于本机里的pci列表下有详细的设备信息。以前实现这个比较麻烦，需要ssdt。现在已经有简便方案。<!--more-->

### 注意
目前白苹果上并没有显示PCI列表，所以，各位是否实现全靠自愿。
### 所需软件
* <a href='http://headsoft.com.au/download/mac/Hackintool.zip'>Hackintool</a>
* Clover Configurator

### 教程
* 打开Clover Configurator，依次点击<font color=#A52A2A >***Boot.log->Generate log->Save boot.log to desktop***</font>，如图。生成在桌面的文件名称为bootlog.txt。
![](/images/pcilist-1.png)

#### 下面以NVME SSD SM961为例进行讲解
* 打开Hackintool，记住SM961的设备id，如图即为0xA804。
![](/images/pcilist-2.png)
* 打开之前保存的bootlog.txt文件，搜索A804，我们会发现这一行数据中有一个形如xx:xx.xx的字符串，这个就是pciaddr,记下它，稍后会用到。如图：pciaddr为<font color=#A52A2A >***04:00.00***</font>
![](/images/pcilist-3.png)
* 使用Clover Configurator打开config.plist,依次点击Devices->Arbitrary,按图示填写数据即可显示PCI列表。<font color=#A52A2A >***注意：PciAddr一栏填写刚才查询出来的pciaddr，即***04:00.00***,Comment一栏随便填。右侧属性栏中的Key值至少有两个参数***AAPL,slot-name***以及***model***，Value随便填，Value Type选STRING***。</font>
![](/images/pcilist-4.png)
![](/images/pcilist-5.png)

### 一个特殊情况(声卡)
由于我们在注入声卡属性时会覆盖layout-id，导致声卡无声。所以如果要注入声卡属性，要在clover下做如下设置。
* <font color=#A52A2A >***Devices->Audio->inject->No***<font>
* <font color=#A52A2A >***Boot->alcid=layout-id***<font>
![](/images/pcilist-6.png)
![](/images/pcilist-7.png)

### 至此，您已经成功显示PCI列表