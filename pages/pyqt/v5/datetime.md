---
prev:
  text: 'PyQt5 简介'
  link: '/pyqt/v5/'
next:
  text: '第一个程序'
  link: '/pyqt/v5/firstProgram'
---
# PyQt5 date and time

本章教程展示了如何使用 PyQt5 的日期和时间。

## QDate, QTime, QDateTime
PyQt5 有 `QDate`, `QDateTime`, `QTime`类来处理日期和时间。`QDate`是一个用于处理公历中日历日期的类。它具有确定日期、比较日期或操作日期的方法。`QTime`使用时钟时间，提供了比较时间、确定时间和其他各种时间操作方法方法的类。`QDateTime`是一个将`QDate`和`QTime`对象组合成一个对象的类。

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

## UTC time
我们的星球是一个绕着轴旋转的球体。地球向东方旋转，所以太阳在不同的时间在不同的地点升起。地球大约24小时自转一次，因此世界被划分为24个时区。每个时区都有不同的当地时间，但当地时间通常会被夏令时制修改。

我们需要一个全球时间，统一的全球时间有助于避免时区和夏令时的混淆。选择UTC(世界协调时间)作为主要时间标准。UTC用于航空、天气预报、飞行计划、空中交通管制许可和地图。与当地时间不同，UTC不随季节的变化而变化。
``` python
#!/usr/bin/python

from PyQt5.QtCore import QDateTime, Qt

now = QDateTime.currentDateTime()

print('Local datetime: ', now.toString(Qt.ISODate))
print('Universal datetime: ', now.toUTC().toString(Qt.ISODate))

print(f'The offset from UTC is: {now.offsetFromUtc()} seconds')
```
The example determines the current universal and local date and time.
```python
print('Local datetime: ', now.toString(Qt.ISODate))
```
The currentDateTime method returns the current date and time expressed as local time. We can use the toLocalTime to convert a universal time into a local time.
```python
print('Universal datetime: ', now.toUTC().toString(Qt.ISODate))
```
We get the universal time with the toUTC method from the date time object.
```python
print(f'The offset from UTC is: {now.offsetFromUtc()} seconds')
```
The offsetFromUtc gives the difference between universal time and local time in seconds.
```shell
$ ./utc_local.py 
Local datetime:  2020-05-16T09:56:23
Universal datetime:  2020-05-16T07:56:23Z
The offset from UTC is: 7200 seconds
```

## Number of days
The number of days in a particular month is returned by the daysInMonth method and the number of days in a year by the daysInYear method.

```python
#!/usr/bin/python

from PyQt5.QtCore import QDate, Qt

now = QDate.currentDate()

d = QDate(1945, 5, 7)

print(f'Days in month: {d.daysInMonth()}')
print(f'Days in year: {d.daysInYear()}')
```
The example prints the number of days in a month and year for the chosen date.

``` shell
$ ./n_of_days.py 
Days in month: 31
Days in year: 365
```
This is the output.

Difference in days
The daysTo method returns the number of days from a date to another date.

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
The example calculates the number of days passed from the last XMas and the number of days until the next XMas.

```shell
$ ./xmas.py 
144 days have passed since last XMas
There are 222 days until next XMas
```
This is the output.

Datetime arithmetic
We often need to add or subtract days, seconds, or years to a datetime value.

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
The example determines the current datetime and add or subtract days, seconds, months, and years.

```shell
$ ./arithmetic.py 
Today: 2020-05-16T10:11:56
Adding 12 days: 2020-05-28T10:11:56
Subtracting 22 days: 2020-04-24T10:11:56
Adding 50 seconds: 2020-05-16T10:12:46
Adding 3 months: 2020-08-16T10:11:56
Adding 12 years: 2032-05-16T10:11:56
```
This is the example output.

## Daylight saving time
Daylight saving time (DST) is the practice of advancing clocks during summer months so that evening daylight lasts longer. The time is adjusted forward one hour in the beginning of spring and adjusted backward in the autumn to standard time.

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
The example checks if the datetime is in the daylight saving time.
```python
print(f'Time zone: {now.timeZoneAbbreviation()}')
```
The timeZoneAbbreviation method returns the time zone abbreviation for the datetime.

```python
if now.isDaylightTime():
...
```
The isDaylightTime returns if the datetime falls in daylight saving time.

``` shell
$ ./daylight_saving.py 
Time zone: CEST
The current date falls into DST time
```
The current date falls into DST time The program was executed in Bratislava, which is a city in Central Europe, during summer. Central European Summer Time (CEST) is 2 hours ahead of universtal time. This time zone is a daylight saving time time zone and is used in Europe and Antarctica. The standard time, which is used in winter, is Central European Time (CET).

## Unix epoch
An epoch is an instant in time chosen as the origin of a particular era. For example in western Christian countries the time epoch starts from day 0, when Jesus was born. Another example is the French Republican Calendar which was used for twelve years. The epoch was the beginning of the Republican Era which was proclaimed on September 22, 1792, the day the First Republic was declared and the monarchy abolished.

Computers have their epochs too. One of the most popular is the Unix epoch. The Unix epoch is the time 00:00:00 UTC on 1 January 1970 (or 1970- 01-01T00:00:00Z ISO 8601). The date and time in a computer is determined according to the number of seconds or clock ticks that have elapsed since the defined epoch for that computer or platform.

Unix time is the number of seconds elapsed since Unix epoch.
``` shell
$ date +%s
1589617100
```
Unix date command can be used to get the Unix time. At this particular moment, 1589617100 seconds have passed since the Unix epoch.

```python
#!/usr/bin/python3

from PyQt5.QtCore import QDateTime, Qt

now = QDateTime.currentDateTime()

unix_time = now.toSecsSinceEpoch() 
print(unix_time)

d = QDateTime.fromSecsSinceEpoch(unix_time)
print(d.toString(Qt.ISODate))
```
The example prints the Unix time and converts it back to the QDateTime.
```python
now = QDateTime.currentDateTime()
```
First, we retrieve the current date and time.

```python
unix_time = now.toSecsSinceEpoch()
```
The toSecsSinceEpoch returns the Unix time.

```python
d = QDateTime.fromSecsSinceEpoch(unix_time)
```
With the fromSecsSinceEpoch we convert the Unix time to QDateTime.

```shell
$ ./unix_time.py 
1589617144
2020-05-16T10:19:04
```
This is the output.

## Julian day
Julian day refers to a continuous count of days since the beginning of the Julian Period. It is used primarily by astronomers. It should not be confused with the Julian calendar. The Julian Period started in 4713 BC. The Julian day number 0 is assigned to the day starting at noon on January 1, 4713 BC.

The Julian Day Number (JDN) is the number of days elapsed since the beginning of this period. The Julian Date (JD) of any instant is the Julian day number for the preceding noon plus the fraction of the day since that instant. (Qt does not compute this fraction.) Apart from astronomy, Julian dates are often used by military and mainframe programs.

```python
#!/usr/bin/python

from PyQt5.QtCore import QDate, Qt

now = QDate.currentDate()

print('Gregorian date for today:', now.toString(Qt.ISODate))
print('Julian day for today:', now.toJulianDay())
```
In the example, we compute the Gregorian date and the Julian day for today.
```python
print('Julian day for today:', now.toJulianDay())
```
The Julian day is returned with the toJulianDay method.
```shell
$ ./julian_day.py 
Gregorian date for today: 2020-05-16
Julian day for today: 2458986
```
This is the output.

## Historical battles
With Julian day it is possible to do calculations that span centuries.

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
The example counts the number of days passed since two historical events.
```python
borodino_battle = QDate(1812, 9, 7)
slavkov_battle = QDate(1805, 12, 2)
```
We have two dates of battles of the Napoleonic era.
```python
j_today = now.toJulianDay()
j_borodino = borodino_battle.toJulianDay()
j_slavkov = slavkov_battle.toJulianDay()
```
We compute the Julian days for today and for the Battles of Slavkov and Borodino.
```python
d1 = j_today - j_slavkov
d2 = j_today - j_borodino
```
We compute the number of days passed since the two battles.

```shell
$ ./battles.py 
Days since Slavkov battle: 78328
Days since Borodino battle: 75857
```
When we run this script, 78328 days have passed since the Slavkov battle, and 75857 since the Borodino battle.

In this part of the PyQt5 tutorial, we have worked with date and time.