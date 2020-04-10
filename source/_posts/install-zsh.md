---
title: '美化你的shell,macOS下安装zsh和neofetch教程(Unix/Linux也适用)'
tags:
  - shell
  - zsh
urlname: install-zsh
id: 65
categories:
  - Hackintosh
date: 2018-05-11 19:25:00
updated: 2018-05-11 19:25:00
toc: true
---

最近在使用Hackintosh，发现macOS自带的shell并不好用，所以安装了被誉为终极shell的zsh，方法整理如下：<!--more--> 
### 确认包管理器
>unix以及类unix(如Linux及其发行版)下都有对应的包管理器,常见的包管理器如下：macOS下为HomeBrew，Debian/Ubuntu为apt，Fedora为yum或dnf，Centos为yum，Archlinux为pacman等。

### macOS安装HomeBrew以及wget(其他系统用户跳过此步骤)

#### HomeBrew
由于macOS下没有自带HomeBrew，故需要手动安装。首先安装xcode，然后终端运行如下命令即可安装HomeBrew。

```
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```
#### 使用方法
* 更新：brew update 
* 安装软件包：brew install "PackegeName" 
* 搜索软件包：brew search "PackegeName"
* 卸载软件包：brew remove "PackegeName" 

#### wget：
```
brew install wget
```
### 安装zsh 

#### macOS：
```
brew install zsh
```
#### Debian/Ubuntu: 
```
apt install zsh
```
#### Fedora: 
```
dnf install zsh
```
#### Centos: 
```
yum update && yum install zsh
```
#### Archlinux: 
```
pacman -S zsh
```
### 将系统默认shell更换为zsh
```
chsh -s /bin/zsh
```
### 安装neofetch同安装zsh，只需要更换软件包名名称为neofetch。 
### 配置zsh 
使用oh-my-zsh可以很方便的配置zsh,并生成.zshrc配置文件方便修改 输入以下命令安装oh-my-zsh
```
sh -c "$(wget https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh -O -)"
```
安装成功后输入nano .zshrc打开.zshrc文件添加neofetch,修改ZSH_THEME="random"，意为每次打开终端即启动neofetch，zsh主题随机，也就是每次打开终端都会改变一个主题，修改如图： ![](/images/c7fd2a6d2692642c94a9a78c42f04ee4ef71b410.jpg) 重启电脑就会看到效果。

### 用描述文件美化终端(不同系统，不同桌面环境会有所不同,需要自己摸索了，下面以macOS为例) 
打开终端，点击右键打开显示检查器，选择一个样式双击打开描述文件，按自己的喜好设置文字风格，样式，透明度，模糊程度，窗口大小等，成品图如下： ![](/images/e7005ea1415345c95c83b5c0f1cbd21b124c8245.jpg)