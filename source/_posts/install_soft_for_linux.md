---
title: 'Ubuntu下利用deepin-wine安装软件简要方案'
tags:
  - Ubuntu
  - Linux
urlname: install_soft_for_linux
id: 65
categories:
  - Linux
date: 2019-03-17 23:52:00
updated: 2019-03-17 23:52:00
---

> 一直以来，Linux作为开发机比较给力，但是常用软件(如QQ、微信等)的缺乏使Linux在桌面端一直不火，用户量低于Windows以及macOS，今天分享一个Ubuntu下安装常用软件的方法。
<!--more-->

### 博主电脑环境
* Ubuntu 18.10 x64

### 教程
#### 安装deepin-wine
输入以下命令即可
```
git clone https://github.com/wszqkzqk/deepin-wine-ubuntu.git
cd deepin-wine-ubuntu
./install
```

#### 安装软件
* 下载软件(GUI下载或wget等均可)
http://mirrors.aliyun.com/deepin/pool/non-free/
* 使用如下命令安装软件
```
sudo dpkg -i xxx.deb
```
> 目前博主已经成功安装Tim、微信、百度网盘、迅雷精简版、foobar2000等。