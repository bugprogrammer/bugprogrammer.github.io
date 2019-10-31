---
title: PHP+Nginx+MySQL搭建网站简易教程(以Centos7为例)
tags:
  - Centos
  - MySQL
  - Nginx
  - PHP
  - SSL
urlname: phpnginxmysql
id: 96
categories:
  - Linux
date: 2018-05-19 02:42:33
updated: 2018-05-19 02:42:33
---

### 准备工作
* 一台vps
* 一个域名并做好域名解析(本人在godaddy 购买的),解析之后ping域名，如果返回的是vps的ip，则域名解析成功。如图：
 ![](/images/005YMNDBly1g0raflgpljj30nu03emyp.jpg)
* 一个SSL证书，个人网站免费的Let's Encrypt即可(申请过程后面讲)。<!--more-->

### 安装PHP7.0及其扩展
* 更新yum源
```
rpm -Uvh https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm rpm -Uvh https://mirror.webtatic.com/yum/el7/webtatic-release.rpm
```
* 安装PHP7.0(php70w-common,php70w-fpm,php70w-mysqlnd必须必须安装)
```
yum install php70w-common php70w-fpm php70w-opcache php70w-gd php70w-mysqlnd php70w-mbstring php70w-pecl-redis php70w-pecl-memcached php70w-devel
```
* 版本验证
```
php -v
```
* 查看显示，如图则成功。
 ![](/images/005YMNDBly1g0rafz02acj30vc04ujtk.jpg)

### 安装MySQL
* 安装wget(顺便吐槽CentOS)
```
yum install wget
```
* 下载MySQL源包
```
wget http://dev.mysql.com/get/mysql57-community-release-el7-8.noarch.rpm
```
* 安装MySQL源包
```
yum localinstall mysql57-community-release-el7-8.noarch.rpm
```
* yum安装MySQL
```
yum install mysql-community-server
```
* 启动MySQL服务(如不报错则为成功)
```
systemctl start mysqld
```

### 修改Mysql root密码
>mysql安装完成之后，在/var/log/mysqld.log文件中给root生成了一个默认密码。通过下面的方式找到root默认密码，然后登录mysql进行修改。

* 输入如下命令
```
grep 'temporary password' /var/log/mysqld.log
```
    返回的字符串就是默认生成的密码。如图：
    ![](/images/005YMNDBly1g0ragcl5pkj315801st9j.jpg)
* 输入以下命令并输入默认密码进入MySQL
```
mysql -uroot -p
```
* 输入以下命令修改密码
```
set password for root@localhost = password('新密码');
```
* 刷新权限
```
flush privileges；
```

### 编译安装Nginx

#### 选择编译安装Nginx的理由
   >因为nginx功能强大，模块众多，所以自己需要了解究竟需要什么模块，实现那些功能，这就需要我们自己定制Nginx，编译安装满足高自定义性，故采用编译安装。

#### 编译教程
* 下载Nginx源码
```
wget http://nginx.org/download/nginx-1.14.0.tar.gz
```
* 解压并进入nginx目录，如图则正确
```
tar -zxvf nginx-1.14.0.tar.gz && cd nginx-1.14.0 && ls
```
    ![](/images/005YMNDBly1g0ragsj5m4j30xk01u3z2.jpg)
* 安装所需环境
```
yum -y install gcc pcre pcre-devel zlib zlib-devel openssl openssl-devel
```
* 生成MakeFile,如图则成功(--with-http_v2_module为http 2.0模块，--with-http_ssl_module为SSL模块，尤为重要)
```
./configure --prefix=/usr/local/nginx --with-http_stub_status_module --with-http_ssl_module --with-stream --with-stream_ssl_module --with-http_v2_module --with-threads
```
    ![](/images/005YMNDBly1g0rah8cr7ij30sg0fa43p.jpg)
* 编译及安装
```
make && make install
```

* 启动nginx

    输入如下命令并在浏览器输入ip或域名，如看到nginx主页，恭喜安装成功啦！
```
/usr/local/nginx/sbin/nginx
```

### Nginx基础使用

#### Nginx相关文件路径
   * 主文件：/usr/local/nginx/sbin/nginx
   * 配置文件：/usr/local/nginx/conf/nginx.conf</span>
   * 日志文件：
   /usr/local/nginx/logs/error.log (错误日志)<br />       /usr/local/nginx/logs/access.log (成功文件)

#### Nginx相关操作
   >启动
```
/usr/local/nginx/sbin/nginx
```
   >重启
```
/usr/local/nginx/sbin/nginx -s restart
```
   >关闭
```
/usr/local/nginx/sbin/nginx -s stop
```
   >查看配置文件
```
nano /usr/local/nginx/conf/nginx.conf
```
   >查看出错日志
```
nano /usr/local/nginx/logs/error.log
```

#### nginx.conf简单解读(写法很多)
```
server {
    listen       80; #监听80端口，接收http请求
    server_name  bugprogrammer.tk; #就是网站地址
    root /var/www/phpmyadmin; # 准备存放代码工程的路径
    #路由到网站根目录bugprogrammer.me时候的处理
    location / {
        index index.php; #跳转到bugprogrammer.tk/index.php
        autoindex on;
    }   

    #当请求网站下php文件的时候，反向代理到php-fpm
    location ~ \.php$ {
        include /usr/local/etc/nginx/fastcgi.conf; #加载nginx的fastcgi模块
        fastcgi_intercept_errors on;
        fastcgi_pass   127.0.0.1:9000; #nginx fastcgi进程监听的IP地址和端口
    }
}
```
### php-fpm+Nginx整合配置

#### 修改nginx.conf
   取消首行user以及php-fpm模块前的注释,并修改网站目录(注意主服务和php-fpm都要修改)，如图：

  ![](/images/005YMNDBly1g0rai09k5kj30jk03qglp.jpg)

 ![](/images/005YMNDBly1g0raial5exj30ui05swfz.jpg)

#### 在网站目录(上图为phpmyadmin目录)新建一个index.php文件，并粘贴如下代码(伟大的Hello World！！！)
```
<html>
 <head>
  <title>PHP 测试</title>
 </head>
 <body>
 <?php echo '<p>Hello World</p>'; ?>
 </body>
</html>
```
#### 启动php-fpm
```
service php-fpm start
```
>启动Nginx(见Nginx相关操作)并在浏览器输入域名或ip测试，如下及成功。

![](/images/QQ20180519-0034182x.png)

### 建立网站(以phpmyadmin为例)

* 下载phpmyadmin最新版并解压到网站目录下，如图：

 ![](/images/005YMNDBly1g0rainsehgj31e60noh23.jpg)

* 重启nginx并测试网站

### 相关错误以及解决方案

#### 常见错误1，如图
![](/images/005YMNDBly1g0raixovo5j328s070wfz.jpg)

   >这个错误的原因是phpmyadmin找不到sesson的存放路径，所以在浏览器允许session的情况下需要调整php的配置文件php.ini

##### 解决方案

* 打开php.ini(路径为)，并添加如下参数
```
session.save_path = "/var/lib/php/session"
```
* 创建sesson存储目录，给予读写权限，并调整所属用户即可解决
```
mkdir /var/lib/php/session && chmod -R 777 /var/lib/php/session && chown -R nobody:nobody /var/lib/php/session
```

#### 常见错误2，如图
![](/images/005YMNDBly1g0rajw7itcj30r40xswhw.jpg)

##### 解决方案

进入phpmyadmin目录下将config.sample.inc.php文件改名为config.inc.php并打开，将$cfg['Servers'][$i]['host'] = 'localhost'改为
$cfg['Servers'][$i]['host'] = '127.0.0.1'并保存，命令及图解如下：

```
cd /var/www/phpmyadmin && mv config.sample.inc.php config.inc.php && nano config.inc.php
```
![](/images/005YMNDBly1g0rakbiwkaj30jg05wta5.jpg)

#### 常见错误3，如图
 ![](/images/005YMNDBly1g0rakk9axdj31vu02wwer.jpg)

##### 解决方案

同(2)打开config.inc.php，找到$cfg['blowfish_secret'] = '',在引号中填写短语密码，推荐填写UUID，如图：
![](/images/005YMNDBly1g0ralsvm28j30p20163yt.jpg)

#### 常见错误4，如图
![](/images/005YMNDBly1g0ram4443kj31vs02ggmb.jpg)

##### 解决方案

创建tmp文件夹并给予读写权限即可
```
mkdir tmp && chmod 777 tmp
```
### 阶段成果

![](/images/005YMNDBly1g0rame2gaaj30p00oggnx.jpg) ![](/images/005YMNDBly1g0ramml3d3j329m1ke7n3.jpg)

### 后续优化(前提是按照我的教程编译安装的Nginx,注意SSL和HTTP 2.0模块)

#### 升级https

* 关闭Nginx
```
/usr/local/nginx/sbin/nginx -s stop
```
* 获得Let's Encrypt官方客户端并进入相应目录(如果没有安装git请先yum install git)
```
git clone https://github.com/letsencrypt/letsencrypt && cd letsencrypt
```
* 申请SSL证书,请按要求填写域名，邮箱，最后一张图代表成功，申请后路径在/etc/letsencrypt/live/域名/,一共4个文件
```
./certbot-auto certonly
```
    ![](/images/005YMNDBly1g0ramzrwdsj312w0leaft.jpg)
    ![](/images/005YMNDBly1g0randesxaj30v40ay41x.jpg)
    ![](/images/005YMNDBly1g0rano5p6uj314s05kq51.jpg)

* 修改Nginx.conf，添加SSL支持。
```
server {
    listen 443 ssl;
    server_name 域名;
    …
    ssl on;
    ssl_certificate /etc/letsencrypt/live/域名/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/域名/privkey.pem;

    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_prefer_server_ciphers on;
    ssl_ciphers ‘EECDH+AESGCM:EDH+AESGCM:AES256+EECDH:AES256+EDH’;
    …
}
```

* 启动Nginx，分别用http://域名和https://域名测试网站，如果https可以进入，http不能进入，你就成功一半了。
* 实现http自动跳转到https

    新建如下server即可
```
server {
    listen 80;
    server_name 域名;
    return 301 https://$host$request_uri;
}
```
   * 用http://域名测试网站，如果能自动跳转https则成功。

    ![](/images/005YMNDBly1g0raofxm8bj30ea01omx6.jpg)

#### (更新)SSL通配符版本申请
> 一个天大的好消息，Let's Encrypt已经发布了通配符版本SSL证书。顾名思义，通配符SSL证书不再需要为每一个二级域名重复申请SSL证书，以域名bugprogrammer.tk为例，只需要申请*.bugprogrammer.tk以及bugprogrammer.tk即可用于根域名以及所有二级域名，非常方便。申请教程如下。

* 获取最新版Let's Encrypt客户端
```
wget https://get.acme.sh
```
* 申请通配符SSL证书，按要求输入邮箱，同意条款等操作，如图。
```
./certbot-auto certonly  -d *.bugprogrammer.tk -d bugprogrammer.tk --manual --preferred-challenges dns --server https://acme-v02.api.letsencrypt.org/directory
```
    ![](/images/005YMNDBly1g0raor0tq6j31nm0wqqbh.jpg)

* ***至关重要的步骤，***按如下图操作，在域名DNS设置处添加***TXT***类型解析，如下图即为：***name:_acmechallenge
value:UYgQnnncMwZ9Z_Ja1mtkbTmayZP_5IDQcXgWIWlyY8w。***
添加解析后回车继续。因为我们同时申请了*.bugprogrammer.tk以及bugprogrammer.tk，所以会出现两个解析要求。
![](/images/005YMNDBly1g0raoz7dk9j314o0fg0ud.jpg)
![](/images/005YMNDBly1g0rap7mas5j327k076q4a.jpg)

* 如下图即为成功
![](/images/005YMNDBly1g0rapgxju2j31320eqdhv.jpg)

#### 升级http2

   * 打开nginx.conf，在listen 443 ssl后面加上http2并重启nginx

 ![](/images/005YMNDBly1g0rapq9gdnj30dg0360st.jpg)
   * 打开https://myssl.com/http2_check.html， 输入域名检测是否成功，成功如图：

![](/images/005YMNDBly1g0raq4onyqj313q0letb4.jpg)