---
title: '为个人网站升级TLS 1.3以及HSTS'
tags:
  - Debian
  - Nginx
  - OpenSSL
  - TLS 1.3
  - HSTS
urlname: update-website-tls1.3-and-HSTS
id: 65
categories:
  - WEB 
date: 2019-01-14 23:11:00
---

# 理论相关
## TLS
### TLS简介
SSL(Secure Sockets Layer) 安全套接层，是一种安全协议，经历了 SSL 1.0、2.0、3.0 版本后发展成了标准安全协议——TLS (Transport Layer Security) 传输层安全性协议。TLS 有 1.0 (RFC 2246)、1.1(RFC 4346)、1.2(RFC 5246)、1.3(RFC 8446) 版本。
<!--more-->

TLS 在实现上分为 记录层 和 握手层 两层，其中握手层又含四个子协议: 握手协议 (handshake protocol)、更改加密规范协议 (change cipher spec protocol)、应用数据协议 (application data protocol) 和警告协议 (alert protocol)。TLS模型图如下。
![](/images/e3226956001fc65b220becb4f07e6d5896d5576c.jpg)

### TLS 1.3与TLS 1.2对比
互联网工程任务组（IETF）是负责定义TLS协议的组，该协议经历了多次迭代。先前版本的TLS，TLS 1.2，在RFC 5246中定义， 并且在过去八年中已被大多数Web浏览器使用。在2018年3月21日，经过28次草案后，TLS 1.3已经完成。截至2018年8月，TLS 1.3的最终版本现已发布（RFC 8446）。

Cloudflare等公司已经向其客户提供TLS 1.3。Filippo Valsorda就TLS 1.2和TLS 1.3之间的差异进行了很好的讨论。简而言之，TLS 1.3与TLS 1.2的主要优点是速度更快，安全性更高。

### TLS 1.3速度优势
在Web性能方面，TLS和加密连接总是增加了一些开销。HTTP / 2肯定有助于解决这个问题，但TLS 1.3通过TLS错误启动和零往返时间（0-RTT）等功能帮助加速加密连接。

简单地说，使用TLS 1.2，需要两次往返才能完成TLS handshake。使用1.3时，它只需要一次往返， 从而将加密延迟减少一半。这会使这些加密连接感觉比以前更快一点。TLS1.3与TLS1.2握手示意图如下。
![](/images/5292977ab3e0d37b5d6151eaea384f9ed1a9cbfb.jpg)

### TLS 1.3浏览器支持
最新版本的Chrome以及FireFox都已经默认支持TLS 1.3，Safari在macOS High Sierra中已经默认支持TLS 1.3。

## HSTS
### 什么是HSTS
HSTS的全称是HTTP Strict-Transport-Security，它是一个Web安全策略机制（web security policy mechanism）。
HSTS最早于2015年被纳入到ThoughtWorks技术雷达，并且在2016年的最新一期技术雷达里，它直接从“评估（Trial）”阶段进入到了“采用（Adopt）”阶段，这意味着ThoughtWorks强烈主张业界积极采用这项安全防御措施，并且ThoughtWorks已经将其应用于自己的项目。

### HSTS核心思想
HSTS最为核心的是一个HTTP响应头（HTTP Response Header）。正是它可以让浏览器得知，在接下来的一段时间内，当前域名只能通过HTTPS进行访问，并且在浏览器发现当前连接不安全的情况下，强制拒绝用户的后续访问要求。
HSTS Header的语法如下：
<font color=#A52A2A >**Strict-Transport-Security: <max-age=>[; includeSubDomains][; preload]**</font>
* max-age是必选参数，是一个以秒为单位的数值，它代表着HSTS Header的过期时间，通常设置为1年，即31536000秒。
* includeSubDomains是可选参数，如果包含它，则意味着当前域名及其子域名均开启HSTS保护。
* preload是可选参数，只有当你申请将自己的域名加入到浏览器内置列表的时候才需要使用到它。

# 升级TLS 1.3以及HSTS教程(服务器操作系统为Debian 4.9.51-1)
## TLS 1.3
### 关闭以及备份现有Nginx
输入如下命令即可<font color=#A52A2A >**(提前将nginx加入path路径)：**</font>
```
nginx -s stop && cd /usr/local && mv nginx nginx-bak
```
### 下载相关源码以及安装依赖环境
#### 下载以及解压Nginx
```
wget http://nginx.org/download/nginx-1.15.8.tar.gz && tar -zxvf nginx-1.15.8.tar.gz
```
####  下载以及解压OpenSSL
```
wget https://www.openssl.org/source/openssl-1.1.1a.tar.gz && tar -zxvf openssl-1.1.1a.tar.gz
```
#### 安装相关依赖
```
apt install -y build-essential libpcre3 libpcre3-dev zlib1g-dev liblua5.1-dev libluajit-5.1-dev libgeoip-dev google-perftools libgoogle-perftools-dev
```
### 为Nginx以及OpenSSL打补丁
#### OpenSSL
```
pushd openssl-1.1.1a
curl https://raw.githubusercontent.com/hakasenyang/openssl-patch/master/openssl-equal-1.1.1a_ciphers.patch | patch -p1
curl https://raw.githubusercontent.com/hakasenyang/openssl-patch/master/openssl-1.1.1a-chacha_draft.patch | patch -p1
popd
```
![](/images/7861cbd6d2e658e3fb1628798923a98d84efb734.jpg)
#### Nginx
```
pushd nginx-1.15.8
curl https://raw.githubusercontent.com/kn007/patch/d6bd9f7e345a0afc88e050a4dd991a57b7fb39be/nginx.patch | patch -p1
curl https://raw.githubusercontent.com/hakasenyang/openssl-patch/master/nginx_strict-sni.patch | patch -p1
```
![](/images/4127f890f459ac54b5800d261ff63189bad02935.jpg)

### 编译安装Nginx
#### 使用以下命令生成MakeFile，注意<font color=#A52A2A >**--with-openssl=openssl路径**</font>
```
./configure --prefix=/usr/local/nginx --with-http_stub_status_module --with-http_ssl_module --with-stream --with-stream_ssl_module --with-http_v2_module --with-threads --with-http_v2_hpack_enc --with-http_spdy_module --with-openssl=~/openssl-1.1.1a
```
![](/images/c5818c8b270c7024d304550a890b82ddc8ba6b47.jpg)
![](/images/6612e5162967ca8cff51c9dd073908fef0679ee4.jpg)

#### 编译以及安装Nginx
输入如下命令即可，如下图即安装成功。
```
make && make install
```
![](/images/6e84eea0f6826046fac6a01c3b5124f62767a48e.jpg)
![](/images/56d6c1e98542e50be4d53ffd22fdc534d3fcbd42.jpg)

### 配置Nginx以启用TLS 1.3
#### 输入以下命令，拷贝之前备份的nginx.conf。
```
cp -f /usr/local/nginx-bak/conf/nginx.conf /usr/local/nginx/conf
```
#### 输入以下命令打开nginx.conf并按照图示修改即可启用TLS 1.3<font color=#A52A2A >**(注意：去掉所有的ssl on字段，否则会报警告)**</font>
```
nano conf/nginx.conf
```
![](/images/0cfd3fc3550ab131aba2b99804e661543bb6f0dd.jpg)

## HSTS
### 打开nginx.conf并按照图示修改即可启用HSTS
![](/images/026bfbbbf9a0845751844171c64f0e7c4de7e25d.jpg)

# 测试
### 输入以下命令，输出如图即可确定nginx.conf文件没有错误
```
nginx -t
```
![](/images/43e2e95073a651a5fd9c08f3a25758bed67f94c8.jpg)

### 启动Nginx，无输出即正常
```
nginx
```

### 登录https://www.ssllabs.com， 输入域名，如下图即支持，说明TLS 1.3以及HSTS升级成功！！！
![](/images/29aeab3e42aab95a3207b974fe0d44af8e693d1b.jpg)