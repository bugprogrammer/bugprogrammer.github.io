---
title: 'macOS下编译Clover教程'
tags:
  - macOS
  - Clover
urlname: Build_Clover
id: 65
categories:
  - Hackintosh
date: 2018-06-29 12:53:00
updated: 2018-06-29 12:53:00
toc: true
---

>随着macOS 10.14公测版本的发布，黑苹果用户对Clover新版本的需求提高，想要最新版本的Clover最直接的方法就是源码编译，方便快捷，教程如下。<!--more-->

### 安装相关环境
#### Xcode
* Mac App Store商店安装Xcode
* 终端下输入如下命令并按提示安装
```
xcode-select --install
```

#### python
* 官网下载安装即可 

#### 准备编译脚本Build_Clover.command
* 输入如下命令下载编译脚本并进入相应目录
```
git clone https://github.com/Micky1979/Build_Clover.git && cd Build_Clover
```
* 给予执行权限
```
chmod u+x Build_Clover.command
```
* 执行脚本，中途会自动下载Clover最新源码，请等待，下载源码过程以及成功进入菜单如图所示
```
./Build_Clover.command
```
    ![](/images/132e7a9ff24c9d81c184e861e8572ba886888101.jpg)
    ![](/images/2dcb06511dcffdf8ff0d64fdcc03012c50f12848.jpg)

#### Build_Clover.command菜单解释
* update Clover only (no building) 更新Clover源码不编译
* update Clover + force edk2 update (no building) 更新Clover源码和Build_Clover脚本文件，不编译 
* run my script on the source 执行自定义脚本
* build existing revision (no update, for testing only) 编译已存在版本，仅供测试使用
* build existing revision for release (no update, standard build) 编译已存在版本，不更新，常规编译
* build existing revision with custom macros enabled 启用宏的模式下编译
* enter Developers mode (only for devs) 进入开发模式
* Try Clover Configurator Pro.app 尝试启动Clover Configurator
* edit the configuration file 编辑配置文件
* Exit 退出菜单

### 编译Clover

脚本菜单中选择***build existing revision for release (no update, standard build)->Standard x64 only->Standard***开始编译，过程请等待。编译结束后会自动打开clover的pkg安装包所在目录。安装此pkg包即可升级到最新版本的Clover。
![](/images/e2b7cb1cda2263bc19eea7075aa49779ee181c63.jpg)
![](/images/22a2efa8dcb27fe042fb85af67fb328488a61c55.jpg)