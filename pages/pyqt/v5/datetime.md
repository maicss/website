# PyQt5 的日期和时间

本章教程展示了如何使用 PyQt5 的日期和时间。

## QDate，QTime，QDateTime
PyQt5 有 `QDate`，`QDateTime`，`QTime` 类来处理日期和时间。`QDate` 是一个用于处理公历中日历日期的类。它具有确定日期、比较日期或操作日期的方法。`QTime` 使用时钟时间，提供了比较时间、确定时间和其他各种时间操作方法方法的类。`QDateTime` 是一个将 `QDate` 和 `QTime` 对象组合成一个对象的类。

## 当前日期和时间
PyQt5 有 `currentDate`，`currentTime` 和 `currentDateTime` 等方法确定日期和时间。

```python
#!/usr/bin/python
# current_date_time.py

from PyQt5.QtCore import QDate, QTime, QDateTime, Qt

now = QDate.currentDate()

print(now.toString(Qt.ISODate))
print(now.toString(Qt.DefaultLocaleLongDate))

datetime = QDateTime.currentDateTime()

print(datetime.toString())

time = QTime.currentTime()

print(time.toString(Qt.DefaultLocaleLongDate))
```

上面的代码打印了不同格式的当前的日期和时间。

```python
now = QDate.currentDate()
```
`currentDate` 方法返回了当前日期。

```python
print(now.toString(Qt.ISODate))
print(now.toString(Qt.DefaultLocaleLongDate))
```
给 `toString` 传入不同的参数：`Qt.ISODate` and `Qt.DefaultLocaleLongDate`，获取不同格式的日期。
```python
datetime = QDateTime.currentDateTime()
```
`currentDateTime` 返回了当前日期和时间。
```python
time = QTime.currentTime()
```
`currentTime` 方法返回了当前时间。
``` sh
$ ./current_date_time.py 
2020-05-16
Saturday, May 16, 2020
Sat May 16 09:53:37 2020
9:53:37 AM CEST
```

## 世界协调时 (UTC 时间)
我们的星球是一个绕着轴旋转的球体。地球向东方旋转，所以太阳在不同的时间在不同的地点升起。地球大约 24 小时自转一次，因此世界被划分为 24 个时区。每个时区都有不同的当地时间，但当地时间通常会被夏令时制修改。

我们需要一个协调世界时，统一的协调世界时有助于避免时区和夏令时的混淆。选择 UTC (世界协调时间) 作为主要时间标准。UTC 用于航空、天气预报、飞行计划、空中交通管制许可和地图。与当地时间不同，UTC 不随季节的变化而变化。
``` python
#!/usr/bin/python

from PyQt5.QtCore import QDateTime, Qt

now = QDateTime.currentDateTime()

print('Local datetime: ', now.toString(Qt.ISODate))
print('Universal datetime: ', now.toUTC().toString(Qt.ISODate))

print(f'The offset from UTC is: {now.offsetFromUtc()} seconds')
```
The example determines the current universal and local date and time。
```python
print('Local datetime: ', now.toString(Qt.ISODate))
```
`currentDateTime` 方法返回本地的日期和时间。我们可以使用 `toLocalTime` 将协调世界时转换为本地时间。
```python
print('Universal datetime: ', now.toUTC().toString(Qt.ISODate))
```
使用 `toUTC` 方法从日期时间对象获得协调世界时。
```python
print(f'The offset from UTC is: {now.offsetFromUtc()} seconds')
```
`offsetFromUtc` 以秒为单位给出协调世界时和本地时间之间的差值。
```shell
$ ./utc_local.py 
Local datetime:  2020-05-16T09:56:23
Universal datetime:  2020-05-16T07:56:23Z
The offset from UTC is: 7200 seconds
```

## 获得天数
`daysInMonth` 可以得到一个月份中的天数，`daysInYear` 可以得到一年中的天数。

```python
#!/usr/bin/python

from PyQt5.QtCore import QDate, Qt

now = QDate.currentDate()

d = QDate(1945, 5, 7)

print(f'Days in month: {d.daysInMonth()}')
print(f'Days in year: {d.daysInYear()}')
```
上面的示例打印了特定日期的月份天数和年份天数。

``` shell
$ ./n_of_days.py 
Days in month: 31
Days in year: 365
```

## 天数差
`daysTo` 方法可以获得两个日期的天数差。

``` python
#!/usr/bin/python

from PyQt5.QtCore import QDate

xmas1 = QDate(2019, 12, 24)
xmas2 = QDate(2020, 12, 24)

now = QDate.currentDate()

dayspassed = xmas1.daysTo(now)
print(f'{dayspassed} days have passed since last XMas')

nofdays = now.daysTo(xmas2)
print(f'There are {nofdays} days until next XMas')
```
该示例计算从一个 `XMas` 到下一个 `XMas` 的天数。

```shell
$ ./xmas.py 
144 days have passed since last XMas
There are 222 days until next XMas
```

## Datetime 的计算
我们常常需要对一个日期进行天、秒或者年的算术运算操作。

``` python
#!/usr/bin/python

from PyQt5.QtCore import QDateTime, Qt

now = QDateTime.currentDateTime()

print(f'Today:', now.toString(Qt.ISODate))
print(f'Adding 12 days: {now.addDays(12).toString(Qt.ISODate)}')
print(f'Subtracting 22 days: {now.addDays(-22).toString(Qt.ISODate)}')

print(f'Adding 50 seconds: {now.addSecs(50).toString(Qt.ISODate)}')
print(f'Adding 3 months: {now.addMonths(3).toString(Qt.ISODate)}')
print(f'Adding 12 years: {now.addYears(12).toString(Qt.ISODate)}')
```
对特定时间的天、秒和年的算术运算。

```shell
$ ./arithmetic.py 
Today: 2020-05-16T10:11:56
Adding 12 days: 2020-05-28T10:11:56
Subtracting 22 days: 2020-04-24T10:11:56
Adding 50 seconds: 2020-05-16T10:12:46
Adding 3 months: 2020-08-16T10:11:56
Adding 12 years: 2032-05-16T10:11:56
```

## 夏令时 (DST-Daylight saving time)
夏令时 (DST) 是一种在夏季月份牺牲正常的日出时间，而将时间调快的做法。这样晚上的日光就会持续更长时间。时间在春天开始时向前调整一小时，在秋季之后再调整到标准时间。

```python
#!/usr/bin/python

from PyQt5.QtCore import QDateTime, QTimeZone, Qt

now = QDateTime.currentDateTime()

print(f'Time zone: {now.timeZoneAbbreviation()}')

if now.isDaylightTime():
    print(f'The current date falls into DST time')
else:
    print(f'The current date does not fall into DST time')
```
检查一个日期是否时夏令时。
```python
print(f'Time zone: {now.timeZoneAbbreviation()}')
```
`timeZoneAbbreviation` 方法获取时间的时区缩写。

```python
if now.isDaylightTime():
...
```
`isDaylightTime` 方法返回时间是不是在夏令时的时间区间内。

``` shell
$ ./daylight_saving.py 
Time zone: CEST
The current date falls into DST time
```
当前日期属于夏令时。该计划于夏季在中欧城市布拉迪斯拉发执行。中欧夏令时 (CEST) 比世界协调时早 2 小时。这个时区是一个夏令时时区，在欧洲和南极洲使用。冬季使用的标准时间是中欧时间 (CET)。

## Unix 时间 (epoch)
纪元一个特定时代的起源的一个瞬间。例如，在西方基督教国家，时间纪元从耶稣出生的那天开始。另一个例子是使用了12年的法国共和历法。这个时代是共和时代的开始，于1792年9月22日宣布，这一天第一共和国宣布成立，君主制废除。

电脑也有自己的时代。其中最流行的是 Unix 纪元。Unix 纪元是1970年1月1日的 00:00:00 UTC(1970- 01-01T00:00:00Z ISO 8601) 代表的时间。计算机中的日期和时间是根据自该计算机或平台的定义纪元以来经过的秒数来确定的。

Unix 时间是指从 Unix 纪元开始经过的秒数。
``` shell
$ date +%s
1589617100
```
Unix `date` 命令可用于获取 Unix 时间。在这个特殊的时刻，从 Unix 时间到现在已经过去了1589617100秒。

```python
#!/usr/bin/python3

from PyQt5.QtCore import QDateTime, Qt

now = QDateTime.currentDateTime()

unix_time = now.toSecsSinceEpoch() 
print(unix_time)

d = QDateTime.fromSecsSinceEpoch(unix_time)
print(d.toString(Qt.ISODate))
```
从 Unix 时间转换到 `QDateTime`。
```python
now = QDateTime.currentDateTime()
```
首先获取当前的日期和时间。

```python
unix_time = now.toSecsSinceEpoch()
```
`toSecsSinceEpoch` 返回 Unix 时间。

```python
d = QDateTime.fromSecsSinceEpoch(unix_time)
```
`fromSecsSinceEpoch` 把 Unix 时间转换成 `QDateTime`。

```shell
$ ./unix_time.py 
1589617144
2020-05-16T10:19:04
```

## 儒略日
儒略历指的是自儒略历开始以来连续计算的天数。天文学家使用。不要儒略历混淆。儒略日开始于公元前4713年。儒略日的第0天是公元前4713年1月1日的中午。

儒略历日数 (JDN) 是自该时间段开始以来经过的天数。任何时刻的儒略历日期 (JD) 是前一个正午的儒略历数加上从该时刻开始的一天的分数 (Qt 不计算这个分数)。除了天文学，儒略历也经常被军事和主机程序使用。

```python
#!/usr/bin/python

from PyQt5.QtCore import QDate, Qt

now = QDate.currentDate()

print('Gregorian date for today:', now.toString(Qt.ISODate))
print('Julian day for today:', now.toJulianDay())
```
获取今天的公历日期和儒略历日期。
```python
print('Julian day for today:', now.toJulianDay())
```
`toJulianDay` 方法获取儒略日。
```shell
$ ./julian_day.py 
Gregorian date for today: 2020-05-16
Julian day for today: 2458986
```

## 历史战役
用儒略历可以做出横跨几个世纪的计算。

```python
#!/usr/bin/python

from PyQt5.QtCore import QDate, Qt

borodino_battle = QDate(1812, 9, 7)
slavkov_battle = QDate(1805, 12, 2)

now = QDate.currentDate()

j_today = now.toJulianDay()
j_borodino = borodino_battle.toJulianDay()
j_slavkov = slavkov_battle.toJulianDay()

d1 = j_today - j_slavkov
d2 = j_today - j_borodino

print(f'Days since Slavkov battle: {d1}')
print(f'Days since Borodino battle: {d2}')
```
获取两个历史事件之间的天数。
```python
borodino_battle = QDate(1812, 9, 7)
slavkov_battle = QDate(1805, 12, 2)
```
两次拿破仑战役的日期。
```python
j_today = now.toJulianDay()
j_borodino = borodino_battle.toJulianDay()
j_slavkov = slavkov_battle.toJulianDay()
```
斯拉夫科夫战役和波罗底诺战役的儒略历日期。
```python
d1 = j_today - j_slavkov
d2 = j_today - j_borodino
```
两个日期距离今天的天数差。

```shell
$ ./battles.py 
Days since Slavkov battle: 78328
Days since Borodino battle: 75857
```
执行这个脚本，会得到距离斯拉夫科夫战役已经过去了78328天，距离波罗底诺战役已经过去了75857天。
