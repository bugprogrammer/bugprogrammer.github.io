---
title: '最简单的挂载EFI分区方案'
tags:
  - Hackintosh
urlname: mountEFI
id: 65
categories:
  - Hackintosh
date: 2019-12-03 19:00:00
updated: 2019-12-03 19:00:00
toc: true
---

>博主使用OC已经有一段时间，最近发现一个不爽点。OC配置本身不需要各种GUI工具，但是，每次挂载EFI都要打开类似Clover Configurator的工具挂载EFI，比较麻烦，所以博主分享一种点击即挂载并打开EFI分区的方案。<!--more-->

# 获取EFI分区的UUID
* 用Clover Configurator看一下负责引导的EFI分区的分区号，比如博主的是<font color=#A52A2A >disk0s1</font>。(详细过程略，相信大家都懂)
* 输入以下命令获取UUID。
```
sudo diskutil info disk0s1 | grep 'Partition UUID'
```
    ![](/images/mountEFI.png)

# 准备应用程序

* 打开系统自带的自动操作程序，依次点击应用程序->选取->运行shell脚本。
![](/images/unlock-1.png)
![](/images/unlock-2.png)
![](/images/unlock-3.png)

* 将以下脚本粘贴进去

  ```
#!/bin/bash

mountEFI=$(echo '你的密码' | sudo -S diskutil info 你的UUID | grep 'Device Node')
echo '你的密码' | sudo -S diskutil mount '/'${mountEFI#*/}
open /Volumes/EFI/EFI/OC
  ```
  ![](/images/mountEFI-1.png)

* 保存成app
![](/images/mountEFI-2.png)


> 至此，您已经成功制作EFI挂载工具，以后只要点击就可以直接挂载并打开！