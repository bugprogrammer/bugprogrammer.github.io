---
title: Windows 10下忘记密码的解决方案(本地账户，微软账户通杀)
tags:
  - cmd
  - sethc
  - Windows10
urlname: reset-password-for-windows-10
id: 134
categories:
  - Windows Desktop
date: 2018-05-27 12:13:23
---

### 原理

>我们知道Windows下连按5次shift会弹出粘滞键，他的程序名称是sethc.exe。经测试在Windows登录界面处输入密码之前按5次shift键也可以启动sethc.exe。所以只要把cmd.exe重命名为sethc.exe就可以在登录之前打开cmd以便我们为所欲为。<!--more-->

### PE破解密码的缺陷
如果电脑安装了双Windows系统，如win7+win10，pe破解可能失效。
### 教程
* 准备好windows 10安装U盘。
* U盘启动，点击下一步-&gt;修复计算机-&gt;疑难解答-&gt;命令提示符(一定要在安装盘下进入，系统下直接进入高级模式会要求输入密码)，如图
![](/images/005YMNDBly1g0raufjiqgj30sg0lcq30.jpg)
如出现下图则说明你不是通过安装盘进入的高级模式。
![](/images/005YMNDBly1g0rauu65rxj30sg0lcwes.jpg)
* 导航进入系统盘符，注意不一定是C盘，用dir命令查看盘符下的文件已确定是不是系统盘。如</span>
```
C:
cd Windows/System32
```
* 输入以下命令将cmd重命名，3、4步骤如图</span>
```
ren sethc.exe AAA.exe
ren cmd.exe sethc.exe
```
![](/images/005YMNDBly1g0rav9bi0fj30sg0lcjrp.jpg)
* 重启到登录界面按5次shift进入命令提示符(此时窗口名称为sethc.exe)
* 输入如下命令启用Windows内置的Administrator用户，并重置Administrator的密码。如果之前用的是微软账户就可以不重置密码，默认无密码。
```
net user Administrator /active:yes 
net user Administrator 新密码
```
![](/images/Snipaste_2018-05-27_21-41-45.png)
* 用Administrator登录系统，将之前忘记密码的用户修改密码，如果是微软账户就上官网重置密码。
![](/images/005YMNDBly1g0ravn4bmhj30ia0h613m.jpg)
* 进入原用户测试。
* 进入文件资源管理器，将Windows/System32下的sethc.exe重命名为cmd.exe，AAA.exe重命名为sethc.exe。
* 如果想禁用Administrator请执行以下命令。
```
net user Administrator /active:no
```