---
title: '使用macserial获取iMac 2019机型信息'
tags:
  - macOS
  - Hackintosh
urlname: smbios-for-imac2019
id: 65
categories:
  - Hackintosh
date: 2019-04-03 21:15:00
updated: 2019-04-07 21:15:00
---

> Apple在近期发布了iMac 2019版本，最高可配i9+vega48，无T2芯片(美滋滋)，目前Clover Configurator尚未更新关于iMac 2019的smbios信息，本教程教大家如何使用macserial获取iMac 2019机型信息。
<!--more-->

### 获取macserial软件
> macserial是github上的<font color=#A52A2A >**acidanthera**</font>大佬开发，其release版本尚未添加iMac 2019信息，故需要编译安装。经过博主测试，需要修改build.tool脚本才能成功编译，故博主已将原项目<font color=#A52A2A >**fork**</font>，并修改build.tool脚本，使其能正常编译。

> 原项目地址:https://github.com/acidanthera/macserial

> 博主fork地址:https://github.com/bugprogrammer/macserial

#### 环境准备
##### Xcode
* App Store下载Xcode
* 终端输入如下命令并按提示安装
```
xcode-select --install
```

#### 获取macserial源码

终端下输入如下命令即可
```
cd ~/Desktop
git clone https://github.com/bugprogrammer/macserial.git
cd macserial
```
![](/images/ce1c2f16f103e8ba764ec2c731370177bc99aab1.jpg)

#### 编译

终端下输入如下命令即可，成功后会打开生成文件目录。
```
./build.tool
```
![](/images/f2f100fad5fc616b32ea4c7a596379b3dbbcae9d.jpg)

### 简单使用
#### 获取帮助
```
bin/macserial64 -h
```
![](/images/4ee5818801c68268aa98ad5c21dd7b808124c2e7.jpg)
#### 查看支持的所有机型
```
bin/macserial64 --list
```
![](/images/2485bc9325d68c7209721bff27f35e0283549b27.jpg)
![](/images/dc354eafcda927a3095934b78989dd4128f04b1c.jpg)

### 获取iMac 2019机型信息(以iMac 19,1为例)
#### 获取Serial Number以及Board Serial Number
```
bin/macserial64 --model iMac19,1
```
![](/images/ace46b89621b91d46e0236ca9547315eaae38e7b.jpg)
#### 通过源码获取其他信息
```
sed -n '424,429p' src/modelinfo.h
```
![](/images/5c207d8538d1a6a7ee6f5000500dbf718b845aab.jpg)

### 最终成品
![](/images/ce8b62d1cf5cc748a11a21b86cd234e48e5d5aa3.png)