---
prev:
  text: 'PyQt 教程首页'
  link: '/pyqt/'
---
# 简介

本教程的目的是带领你入门 PyQt5。教程内所有代码都在 Linux 上测试通过。[PyQt4 教程](http://zetcode.com/gui/pyqt4/)是 PyQt4 的教程，PyQt4 是一个 Python (同时支持 2 和 3) 版的 Qt 库。

## 关于 PyQt5

PyQt5 是 Digia 的一套 Qt5 应用框架与 python 的结合，同时支持 2.x 和 3.x。本教程使用的是 3.x。Qt 库由 Riverbank Computing 开发，是最强大的 GUI 库之一，官方网站：www.riverbankcomputing.co.uk/news。

PyQt5 是由一系列 Python 模块组成。超过 620 个类，6000 函数和方法。能在诸如 Unix、Windows 和 Mac OS 等主流操作系统上运行。PyQt5 有两种证书，GPL 和商业证书。

PyQt5 类分为很多模块，主要模块有：

* QtCore 包含了核心的非 GUI 的功能。主要和时间、文件与文件夹、各种数据、流、URLs、mime 类文件、进程与线程一起使用。
* QtGui 包含了窗口系统、事件处理、2D 图像、基本绘画、字体和文字类。
* QtWidgets
* QtMultimedia
* QtBluetooth
* QtNetwork
* QtPositioning
* Enginio
* QtWebSockets
* QtWebKit
* QtWebKitWidgets
* QtXml
* QtSvg
* QtSql
* QtTest

QtWidgets 类包含了一系列创建桌面应用的 UI 元素。QtMultimedia 包含了处理多媒体的内容和调用摄像头 API 的类。QtBluetooth 模块包含了查找和连接蓝牙的类。QtNetwork 包含了网络编程的类，这些工具能让 TCP/IP 和 UDP 开发变得更加方便和可靠。QtPositioning 包含了定位的类，可以使用卫星、WiFi 甚至文本。Engine 包含了通过客户端进入和管理 Qt Cloud 的类。QtWebSockets 包含了 WebSocket 协议的类。QtWebKit 包含了一个基 WebKit2 的 web 浏览器。QtWebKitWidgets 包含了基于 QtWidgets 的 WebKit1 的类。QtXml 包含了处理 xml 的类，提供了 SAX 和 DOM API 的工具。QtSvg 提供了显示 SVG 内容的类，Scalable Vector Graphics \(SVG\) 是一种是一种基于可扩展标记语言 (XML)，用于描述二维矢量图形的图形格式 (这句话来自于维基百科)。QtSql 提供了处理数据库的工具。QtTest 提供了测试 PyQt5 应用的工具。

## PyQt4 和 PyQt5 的区别

**PyQt5 不兼容 PyQt4**。PyQt5 有一些巨大的改进。但是，迁移并不是很难，两者的区别如下：

* 重新组合模块，一些模块已经被废弃\(QtScript\)，有些被分为两个子模块\(QtGui，QtWebKit\)。
* 添加了新的模块，比如 QtBluetooth，QtPositioning，和 Enginio。
* 废弃了 SINGAL\(\) 和 SLOT\(\) 的调用方式，使用了新的信号和 xx 处理方式。
* 不再支持被标记为废弃的或不建议使用的 API。

## Python 语言的介绍

> 这个部分建议看百科，这里写的很简略。如果你还不太熟悉 Python，建议先去官网看看文档。

Python is a general-purpose，dynamic，object-oriented programming language。The design purpose of the Python language emphasizes programmer productivity and code readability。Python was initially developed by Guido van Rossum。It was first released in 1991。Python was inspired by ABC，Haskell，Java，Lisp，Icon，and Perl programming languages。Python is a high-level，general purpose，multiplatform，interpreted language。Python is a minimalistic language。One of its most visible features is that it does not use semicolons nor brackets。It uses indentation instead。There are two main branches of Python currently：Python 2.x and Python 3.x。Python 3.x breaks backward compatibility with previous releases of Python。It was created to correct some design flaws of the language and make the language more clean。The most recent version of Python 2.x is 2.7.9，and of Python 3.x is 3.4.2。Python is maintained by a large group of volunteers worldwide。Python is open source software。Python is an ideal start for those who want to learn programming。

Python programming language supports several programming styles。It does not force a programmer to a specific paradigm。Python supports object-oriented and procedural programming。There is also a limited support for functional programming。

Python 语言的官方网站是 python.org

Perl，Python，和 Ruby 都是使用最广泛的脚本语言，它们有很多共同的特点，也是相互的竞争对手。
