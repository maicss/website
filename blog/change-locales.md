---
date: 2022/10/11
description: Configuring Locales
image: post-image.jpeg
prev:
  text: Blog 首页
  link: /blog/
next:
  text: comment test page
  link: /blog/comment-test
---
# Configuring Locales

Some commands used in my daily life

---
## The Easy Way

 - Install debconf (i.e. run apt-get update then apt-get install debconf，as root)
 - Run dpkg-reconfigure locales as root
 
## The Hard Way
Edit `/etc/locale.gen` as root。

If `/etc/locale.gen` does not exist，create it。

Run `/usr/sbin/locale-gen` as root

A sample `/etc/locale.gen`
```
# This file lists locales that you wish to have built. You can find a list
# of valid supported locales at /usr/share/i18n/SUPPORTED. Other
# combinations are possible, but may not be well tested. If you change
# this file, you need to rerun locale-gen.
#
# XXX GENERATED XXX
#
# NOTE!!! If you change this file by hand, and want to continue
# maintaining manually, remove the above line. Otherwise, use the command
# "dpkg-reconfigure locales" to manipulate this file. You can manually
# change this file without affecting the use of debconf, however, since it
# does read in your changes.

en_US.UTF-8 UTF-8
```
## pve pvm resize disk
`pct resize <VMID> rootfs <LXC_disk_size>`