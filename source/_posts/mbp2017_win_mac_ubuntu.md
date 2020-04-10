---
title: 'Macbook Pro 2017安装macOS+Windows+Ubuntu简要教程'
tags:
  - Macintosh
  - Linux
  - MacBook Pro
urlname: mbp2017_win_mac_ubuntu
id: 65
categories:
  - Macintosh
date: 2019-03-06 23:58:00
updated: 2019-03-06 23:58:00
toc: true
---

>各位访客想必已经发现本站https://www.bugprogrammer.me 已经一个月没有更新了，为了本站长期稳定运行下去，博主最近在做博客改版以及cdn、图床方案的测试，本站不会断更，也感谢大半年来各位访客的支持。言归正传，博主近期购入了MacBook Pro 2017，原因很简单，博主需要retina屏幕。黑苹果笔记本无法使用独显，目前的macOS版本下，核显+4K的配合会出现动画掉帧现象，即使是核显版本的mbp也难以幸免，所以想要retina+独显+macOS，只能购入mbp了。

> 博主发现mbp有一个神奇的地方，安装mac+win+linux超级麻烦，按普通pc方案，最后安装linux会出现问题，表现为安装完linux后，Windows会被破坏，无法进入(不是引导的问题，就是系统挂了！！！)，而macOS正常。博主Google了一下，发现很多教程都是老版本的mbp，区别很大。所以博主放出我自己的解决方案。
<!--more-->

## 注意事项
* mbp不同于普通PC，请严格按照博主的方案进行，否则会出现意想不到的问题。
* mbp2018是否适用博主不敢保证，因为2018款的mac新增了一个T2芯片，有报道说T2会阻止Linux启动。

## 安装顺序(重中之重)
<font color=#A52A2A >**macOS Mojave-->Ubuntu 18.04-->Windows 10**</font>

## 准备工作
macOS Mojave镜像、Windows 10镜像、Ubuntu18.04镜像、Windows PE、外接键鼠。

## 教程

### 安装macOS Mojave
正常安装即可，另外新买的mbp自带macOS系统，版本过老的话直接升级就可以。

### 分区
* 打开BootCamp(启动转换助理)，点击菜单栏上的操作，下载Windows支持软件，下载完毕后保存到U盘，如图。
![](/images/75a0d5124f3e6e152ffb49529f4580d1199f655e.jpg)
* 按照BootCamp的流程选择Windows 10镜像，确定Windows分区大小。
* 分区完成后会自动重启开始安装Windows 10，请注意此处要按Option建进入macOS，不要进入Windows分区。
* 打开macOS自带分区工具，此时我们会看到两个分区，一个macOS分区，一个BootCamp分区。点击macOS所在分区，点击+，新增分区，格式选择MS-DOS(FAT)，做为Ubuntu 18.04安装分区。<font color=#A52A2A >**至此，我们拥有3个分区，分别安装macOS，Windows、Ubuntu。**</font>

### 安装Ubuntu 18.04
#### 准备工作
* 下载Ubuntu 18.04修改版本(来自网络大神，已经集成mbp2017内置键盘，触摸板，touch bar驱动，安装方便)
https://goo.gl/4ddQMu
* 使用usbwriter将Ubuntu 18.04镜像写入U盘。

#### 开始安装
* 插入U盘，重启按住Option，选择Ubuntu 18.04安装盘，选择安装(注意：不可以选择试用，安装会出错)。
* 分区：找到之前分配的fat32格式分区，点击-，删除分区，这样会得到一部分空闲分区。按照自己习惯将空闲分区进行分配。博主的分配方案是：efi、boot、home、/、swap。
* 分区完成后，继续安装。

> 至此，我们在开机时按住Option键即可自由切换macOS和Ubuntu。

#### 安装Windows
> 因为我们已经自行创建了Ubuntu分区，所以已经不能使用BootCamp安装Windows 10。

* <font color=#A52A2A >**在macOS下将之前分配好的BootCamp分区格式化为hfs格式。(重中之重)**</font>
* 进入winpe，连接外接键鼠。
* winpe下打开分区工具，将刚才格式化为hfs格式的分区格式化为ntfs格式，供Windows 10使用。
* 打开winntsetup工具，将Windows安装到ntfs格式分区。

> 安装完成后重启发现无法进入Windows 10，请进行如下操作。

* 进入Ubuntu 18.04，打开终端，输入如下命令
```
sudo update-grub
```
* 重启进入Ubuntu启动项，会在grub菜单中看到Windows Boot Manager选项，回车选择，完成Windows 10安装。
* 进入Windows 10后，安装之前下载的Windows支持软件。

> 至此，三个系统已经安装完成，并且都可以启动成功。开机按住Option键，看到两个启动项。选择mac启动项进入macOS，选择Windows启动项进入grub界面，grub下有Ubuntu 18.04以及Windows Boot Manager两个选项。什么，切换系统不方便？？往下看！！！

### 安装refind，实现自动引导
* 下载refind并解压
https://sourceforge.net/projects/refind/
* 打开文件夹，执行refind-install脚本即可成功安装refind，如图。
![](/images/8632cec3cc44f7485e92c8727ba9e3a17a7fb808.jpg)
* 进入Windows 10，安装bootice软件。
* 使用bootice将refind设置为第一启动项。
* 重启即可看到refind引导界面。
* 按delete键隐藏不需要的启动项，保留macOS、Windows、Ubuntu即可。
* 什么？refind默认界面不好看？emmmm，那就换个主题吧！！Google大把教程！！！

> 至此，MacBook Pro 2017安装macOS+Windows+Ubuntu成功！！！