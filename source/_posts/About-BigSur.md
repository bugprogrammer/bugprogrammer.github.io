---
title: '关于macOS Big Sur Hackintosh简要说明'
tags:
  - Hackintosh
urlname: about-BigSur
id: 65
categories:
  - Hackintosh
date: 2020-07-09 00:54:00
updated: 2020-07-12 01:20:00
toc: true
---

> 博主很忙，昨晚才详细测试macOS Big Sur Hackintosh相关情况(全新直接安装)，本文会一直更新到正式版本发布。<!--more-->

# OpenCore配置
> 在这里，博主只讲解和Catalina不同的地方

* OpenCore以及Lilu及其插件更新到最新版本(源码编译)，请自行编译(每个人需要的kext不同，博主提供无意义)。可以使用以下工具编译
https://github.com/bugprogrammer/HackintoshBuild/releases/tag/2.1
* boot-args加入vsmcgen=1参数
![](/images/bigsur-1.png)
* csr-active-config设置为E70B0000
![](/images/bigsur-2.png)
* booter-fileset-basesystem以及booter-fileset-kernel相关项目全部删除
* 禁用核显或者id设置0x12345678

> 至此,您已经可以愉快的安装Big Sur，但是安装完成后Recovery无法进入，博主暂未解决。。。

# 删除快照，重获权限
博主按照pcbeta网友licheng的思路编写了一个脚本，可以很简单的删除快照，请在USB安装环境中的终端执行。中途要输入分区名(如Macintosh HD)和挂载点(如disk0s2)
<a href="https://downloads.bugprogrammer.me/shell/deletesnapshot.sh">deletesnapshot.sh</a>
![](/images/bigsur-3.png)

# 未完待续。。。

# 2020-07-09更新
## Recovery进入

* 关闭核显或设置id为0x12345678
* 按照如图设置即可
![](/images/bigsur-4.png)



