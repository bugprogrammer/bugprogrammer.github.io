---
title: 'OpenWrt获取IPv6详细教程'
tags:
  - OpenWrt
  - ipv6
urlname: about-openwrt-ipv6
id: 65
categories:
  - OpenWrt
date: 2021-05-06 21:00:00
updated: 2021-05-06 21:00:00
toc: true
---

> 前几天博主无意间登录光猫发现已经有了IPv6地址并且可以访问ipv6网站，但是自用的openwrt路由器却无法获取到IPv6地址，查阅资料发现大量资料已经过时，博主现在分享自己的解决方案。

# 编译支持IPv6的OpenWrt固件
> 博主用的是Lean的openwrt源码编译，GitHub地址如下：https://github.com/coolsnowwolf/lede。 具体编译教程原作者写得十分清楚，博主只讲关于IPv6的配置参数。
## make menuconfig配置(IPv6相关)
* Extra Packages->ipv6helper选中
* Network->odhcp6c选中
* Network->odhcpd-ipv6only选中

> 以上3项做完后即可按照原作者教程编译固件。

# OpenWrt设置
* 找到网络->DHCP/DNS->高级设置->禁止解析 IPv6 DNS 记录，把默认带的打勾去掉(没错，OpenWrt的脑残默认设置，不解析IPv6！！！)

> 经过以上的编译以及设置，需要我们做的已经全部完成，正常情况下你已经可以享受IPv6了，什么？能获取到IPv6地址但不能上网？别急，往下看！！！

# 可以获取到IPv6地址但是不能上网的解决方案(重点)

* 给运营商打电话，让客服把光猫改成桥接，要来PPPoE用户名以及密码，路由器端拨号。(没错，就这么简单)

> 至此，你已经可以完美享受IPv6了。

# 放上两个IPv6的测试网站，用来测试IPv6情况
* https://v6t.ipip.net/
* https://www.test-ipv6.com/