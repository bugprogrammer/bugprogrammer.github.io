---
title: 'Linux内核简介及编译教程'
tags:
  - Linux_Kernel
  - Ubuntu
urlname: Linux_Kernel_Build
id: 65
categories:
  - Linux
date: 2018-09-01 22:20:00
---
> 博主去年双11购入AMD Vega显卡(为了黑苹果免驱以及硬解)，发现Linux下无法驱动Vega显卡，4K显示器分辨率被锁定为1920x2160的奇葩分辨率，无法接受。于是Google了一下发现当时的内核(Linux 4.12)并不支持AMD Vega显卡，于是打算编译内核升级到最新版本，毕竟Linux的舒适使用对博主十分重要。现在分享一下Linux Kernel的编译教程。<!--more-->
> <br /><b>注意：由于时间久远，博主的Linux已经升级Ubuntu 18.04，自带内核版本为Linux 4.15，所以演示平台为Ubuntu 18.04，编译的内核版本为Linux 4.18.5。另外，本文中部分图片来源网络。因为经典体系架构图现画比较麻烦。</b>

### Linux内核简介
#### Linux Kernel Map
![](/images/6b49439752bdd908e832187bbbfe555dcd56864e.jpg)
#### Linux 系统体系结构
如下图所示，Linux体系结构，从大的方面可以分为用户空间(User Space)和内核空间(Kernel Space)两部分。

![](/images/299f340bcfb4ac1703fdb841e613bcaf57862165.jpg)

* 用户空间中包含了C库，用户的应用程序。在某些体系结构图中还包含了shell，当然shell脚本也是Linux体系中不可缺少的一部分。
* 内核空间包括硬件平台、平台依赖代码、内核、系统调用接口。
* 在任何一个现代操作系统中，都是分层的。为什么需要分层呢？
>从程序员的角度分析，将linux底层和应用分开，做应用的做应用，做底层的做底层，各干各的。经济学的基本原理是，分工产生效率。<br />
从安全性的角度分析，是为了保护内核。现代CPU通常都实现了不同的工作模式。
<br />以ARM为例：ARM实现了7种工作模式，不同模式下CPU可以执行的指令或者访问的寄存器不同：(1)用户模式 usr (2)系统模式 sys(3)管理模式 svc(4)快速中断 fiq(5)外部中断 irq(6)数据访问终止 abt(7)未定义指令异常。如果任何一个上层应用都可以调用寄存器，那样肯定是无法稳定执行的。而且因为出现了这个问题，出现了一个新的学科“现代操作系统”，如果大家感兴趣可以看一下“现代操作系统”相关文章或者书籍。<br />
以X86为例：X86实现了4个不同级别的权限，Ring0—Ring3 ;Ring0下可以执行特权指令，可以访问IO设备；Ring3则有很多的限制。如果分析一下Android的，这方面做的更加“丧心病狂”，Android所有的APK应用程序，都是在Java虚拟机上面运行，应用程序更加远离底层。<br />
另外，用户空间和内核空间是程序执行的两种不同状态，我们可以通过“系统调用”和“硬件中断”来完成用户空间到内核空间的转移。

#### Linux Kernel体系结构
如下图所示，是Linux内核结构图。

![](/images/97909a09aa119314a15a18235b9eb288ba7ad448.jpg)

##### SCI层（System Call Interface）
这一层是给应用用户空间提供一套标准的系统调用函数来访问Linux。前面分析Linux体系结构的时候，介绍过任何一类现代操作系统都不会允许上层应用直接访问底层，在Linux中，内核提供了一套标准接口，上层应用就可以通过这一套标准接口来访问底层。

##### PM（Procees Management）
这一部分包括具体创建进程（fork、exec）,停止进程（kill、exit）,并控制他们之间的通信（signal等）。还包括进程调度，控制活动进程如何共享CPU。这一部分是Linux已经做好的，在写驱动的时候，只需要调用对应的函数即可实现这些功能，例如创建进程、进程通信等等。

##### MM（Memory Management） 

内存管理的主要作用是控制多个进程安全的共享内存区域。

##### VFS（Virtual File Systems） 

虚拟文件系统，隐藏各种文件系统的具体细节，为文件操作提供统一的接口。在Linux中“一切皆文件”，这些文件就是通过VFS来实现的。Linux提供了一个大的通用模型，使这个模型包含了所有文件系统功能的集合。如下图所示，是一个虚拟文件系统的结构图。

![](/images/5a07b3a364feae45f4bd211f19d963e1977eff58.jpg)

##### DD（Device Drivers）

设备驱动，Linux驱动一般分为网络设备、块设备、字符设备、杂项设备，需要我们编写的只有字符设备，杂项设备是不容易归类的一种驱动，杂项设备和字符设备有很多重合的地方。

##### PD（Physical Devices）

这一部分提供丰富的网络协议支持。

### Linux Kernel源码
#### 官网 
<b>www.kernel.org</b>

#### 目录结构
* arch：根据cpu体系结构不同而分的代码
* block：部分块设备驱动程序
* crypto：加密，压缩，CRC校验算法
* documentation：内核文档
* drivers：设备驱动程序
* fs(虚拟文件系统vfs):文件系统
* include：内核所需的头文件，(与平台无关的头文件在include/linux中)
* lib：库文件代码(与平台相关的)
* mm：实现内存管理，与硬件体系结构无关的(与硬件体系结构相关的在arch中)
* net：网络协议的代码
* samples：一些内核编程的范例
* scripts：配置内核的脚本
* security：SElinux的模块
* sound：音频设备的驱动程序
* usr：cpio命令实现，用于制作根文件系统的命令(文件系统与内核放到一块的命令)
* virt：内核虚拟机

### Linux Kernel编译
#### 下载Linux Kernel源码并拷贝到/usr/src目录
输入如下命令即可
```
wget https://cdn.kernel.org/pub/linux/kernel/v4.x/linux-4.18.5.tar.xz && cp -f linux-4.18.5.tar.xz /usr/src
```
#### 解压Linux Kernel
输入如下命令即可
```
cd /usr/src && tar -xvf linux-4.18.5.tar.xz && cd linux-4.18.5
```
#### Ubuntu 18.04下，要执行以下命令安装软件包
```
sudo apt install fortune
```
#### 配置编译参数
执行以下命令，会弹出一个带有GUI的配置界面，一般情况下默认参数就好，光标移动到Save保存即可，如图：
```
make menuconfig
```
![](/images/bc6c5ce369b72802e5c97d5a38ef3b2b50ad6455.jpg)

#### 编译内核
```
make -j12
```
<b>注意：-j参数后面加本机CPU线程数可以加快编译速度，博主的8700K是6核心12线程，所以-j12。</b>

![](/images/39a28f2943c8062679567b03687c28c54354b5c9.jpg)

#### 安装内核
```
make modules_install
make install
```
#### 更新grub引导
```
update-grub2
```
至此升级内核成功，重启电脑。

#### 确认升级是否成功
重启后，执行如下命令查看内核版本，和编译版本相同即为成功
```
uname -r
```
![](/images/7de8222416d47ef89b548125c35e3b5f3238508f.jpg)