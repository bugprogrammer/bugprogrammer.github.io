---
title: 'mi5开启全面屏手势教程(非原创，转自一个已经被miui论坛删除又幸运的被Chrome缓存下来的帖子)'
tags:
  - mi5
  - miui
  - Android
urlname: mi5-enable-gesture
id: 65
categories:
  - Android
date: 2018-06-22 22:48:00
---
### MI5用户，升级miui10，发现没有全面屏手势的同学可以来看看
<!--more-->

>我把我开启全面屏的过程写了一下，由于在过程中看到其他帖子写的太随便，不够详细，所以来写一个详细一些的，方便mi5用户体验全面屏手势，话说真的很好用啊，那些说不用root用第三方软件实现的手势不管是从美观程度和可用性都没原厂的好啊，刷完自己体会吧。

### 适用对象
* 已经获取root权限的mi5
* 已是开发版系统，并且在授权管理开启了root授权
* 稳定版用户，自行升级到开发版开启root权限，或者用其他办法获取root授权

### 简要流程
* 获取完整root权限
* 安装rec，挂载system分区
* 使用re文件管理器找到/system/build.prop文件，在文件尾部加入qemu.hw.mainkeys=0
* 重启手机，即可在设置中找到全面屏选项

### 详细流程
>默认使用win10系统，已安装mi5的驱动。

#### 获取完整root权限
* 手机开启usb调试模式
* <a href="https://www.miui.com/forum.php?mod=attachment&aid=MjIzNzU2ODl8YjIwMjgyNGJlNjI1OGQxZTY3OGFhZmNhOTUyOTI2MzR8MTUyOTY1Njg5NA%3D%3D&request=yes&_f=.rar">下载一键破译分区工具</a>
* 解压下载的文件，运行.bat文件，如图
![](/images/005YMNDBly1g0racrzmmlj307003ogli.jpg)
![](/images/005YMNDBly1g0racylveqj30i2081aas.jpg)

#### 安装rec，挂载system分区
* <a href="https://www.miui.com/forum.php?mod=attachment&aid=MjIzNzYwNDd8Yjg4YjdlOWNmYjQ4OWI0NmJmZWFlMTFmMzc4NmMwODJ8MTUyOTY1Njg5NA%3D%3D&request=yes&_f=.apk">下载twrp.apk</a>
* 手机安装下载的app（此app需要root权限，如果是开发版小米的root权限管理，去设置给他权限，其他root管理软件到对应的管理权限的地方，给它权限）
* 打开安装的app
 * 选择TWRP FLASH
 * 选择Select Device 找到 Xiaomi Mi 5 -- gemini 并选择它
 * 选最新的.img文件（例如xian在是：twrp-3.2.1-1-gemini.img） 
 * 他会提示是否要下载，点击okay
 * 下载好了之后点击FLASH TO RECOVERY按钮
 * 成功的话会提示：Flash completed Successfully!
 * 失败的话，多半是root权限问题，检查一下是否给了这个软件root权限
* 按住音量上键并重启手机，直到手机出现twrp的logo时放开音量上键 进入rec
* 点击挂载，选择system分区，返回，重启手机

#### 使用re管理器修改文件（此软件需要root权限）
* 下载一个re管理器，找到/system/build.prop这个文件（是文件不是文件夹）
* 以文本方式编辑，在文件最后加上 qemu.hw.mainkeys=0，保存
* 以文本方式查看一下它，看是否保存成功
* 如果失败多半是root权限或者挂载分区有问题，回到前面的步骤重试
* 如果保存成功，只需重启手机即可在设置中找到全面屏选项
![](/images/005YMNDBly1g0rad71il1j30fy0ppq3m.jpg)

#### 如果想关掉全面屏，只需将/system/build.prop 文件中的 qemu.hw.mainkeys=0 删去，重启即可

>写的尽量详细了，如在过程中有问题，可以回复