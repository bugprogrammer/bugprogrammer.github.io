---
title: '解锁macOS10.15的系统分区'
tags:
  - Hackintosh
urlname: unlockSystem
id: 65
categories:
  - Hackintosh
date: 2019-07-13 20:21:00
updated: 2019-07-15 20:21:00
toc: true
---

>macOS 10.15的一个显著变化就是Apple锁定了系统分区，导致L/E以及S/L/E无法拷贝文件。Kext Utility无法重建缓存。也间接影响了HomeBrew的使用，下面教大家如何解锁系统分区。<!--more-->

# 准备应用程序

* 打开系统自带的自动操作程序，依次点击应用程序->选取->运行shell脚本。
![](/images/unlock-1.png)
![](/images/unlock-2.png)
![](/images/unlock-3.png)

* 将以下脚本粘贴进去

  ```
  #! /bin/bash

  echo '你的电脑密码'|sudo -S mount -uw / && killall Finder
  ```
  ![](/images/unlock-4.png)

* 保存成app
![](/images/unlock-5.png)

# 添加开机自启
打开偏好设置->用户与群组->登录项，将unlockSystem.app添加到启动项，并点击隐藏。
![](/images/unlock-6.png)

> 至此，您已经成功解锁系统分区，可以尝试SLE/LE写入以及重建缓存操作了，博主亲测成功哦！