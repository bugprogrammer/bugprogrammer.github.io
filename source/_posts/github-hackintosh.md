---
title: '博主github Hackintosh仓库公开以及使用方法'
tags:
  - Hackintosh
urlname: github-hackintosh
id: 65
categories:
  - Hackintosh
date: 2019-05-23 13:50:00
updated: 2019-05-23 13:50:00
toc: true
---

为了方便大家安装macOS，博主将测试过的机型的Clover文件整理并发布至github，地址为**https://github.com/bugprogrammer/hackintosh** **<font color=#A52A2A >注意:仓库中所有机型都是博主亲自安装并测试过的机型。**</font><!--more-->

> 由于部分用户认为git操作较为麻烦，需要学习。所以博主提供了自动化脚本方案，几乎自动获取Clover。脚本支持Windows、macOS、Ubuntu。

## 脚本使用方法
### Windows
#### 安装git
* 点击如下链接下载git。
https://github.com/git-for-windows/git/releases/download/v2.22.0.windows.1/Git-2.22.0-64-bit.exe
* 按默认设置安装即可。

#### 执行脚本
打开git-bash **<font color=#A52A2A >(注意一定要用git-bash)，执行如下命令即可</font>**
```
bash -c "$(curl -fsSL https://raw.githubusercontent.com/bugprogrammer/hackintosh/master/get-clover.sh)"
```
### macOS
终端输入如下命令即可 **<font color=#A52A2A >(注意脚本中绿字提示)</font>**
```
bash -c "$(curl -fsSL https://raw.githubusercontent.com/bugprogrammer/hackintosh/master/get-clover.sh)"
```
### Ubuntu
终端输入如下命令即可
```
bash -c "$(curl -fsSL https://raw.githubusercontent.com/bugprogrammer/hackintosh/master/get-clover.sh)"
```

## 脚本使用截图(以macOS为例)
![](/images/git-hackintosh-1.png)
![](/images/git-hackintosh-2.png)
![](/images/git-hackintosh-3.png)
![](/images/git-hackintosh-4.png)