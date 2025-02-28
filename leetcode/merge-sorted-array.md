# 88. 合并两个有序数组

## 描述
给两个按 非递减顺序 排列的整数数组 `nums1` 和 `nums2`，另有两个整数 `m` 和 `n` ，分别表示 `nums1` 和 `nums2` 中的元素数目。

请你 合并 `nums2` 到 `nums1` 中，使合并后的数组同样按 非递减顺序 排列。

注意：最终，合并后数组不应由函数返回，而是存储在数组 `nums1` 中。为了应对这种情况，`nums1` 的初始长度为 `m + n`，其中前 `m` 个元素表示应合并的元素，后 `n` 个元素为 0 ，应忽略。`nums2` 的长度为 `n` 。

> 注意后面的0，这里明显暗示是需要用到后面提供的0

## 解题

```js

/**
 * @desc 两层循环，时间久，复杂度是m*n，内存是m，复杂度最大，
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function(nums1, m, nums2, n) {
    nums1.splice(m, n)
    for (let n1 = 0;n1 < n;n1++) {
        let m1=0;
        while(nums1[m1] <= nums2[n1] && m1 < m) {
            m1++
        }
        nums1.splice(m1, 0, nums2[n1])
    }
};

// 双指针
var merge2 = function(nums1, m, nums2, n) {
    let m1 = 0, n1 = 0
    const newArr = new Array(m+n).fill(0)
    var cur
    while (m1 < m || n1 < n) {
        if (m1 === m) {
            cur = nums2[n1] 
            n1 ++
        } else if (n1 === n) {
            cur = nums1[m1]
            m1 ++
        } else if (nums1[m1] < nums2[n1]) {
            cur = nums1[m1] 
            m1 ++
        } else {
            cur = nums2[n1]
            n1 ++
        }
        newArr[m1 + n1 - 1] = cur
    }

    // 可能是因为运行环境的问题，线上这样的赋值测试是失败的。要循环一遍，按照下标重新赋值。
    nums1 = newArr
}

// 逆向双指针，不需要像上面的再新建一个临时arr来保存数据
const merge3 = (nums1, m, nums2, n) => {
    let m1 = m-1; n1 = n-1
    let tail = m+n-1
    let cur

    while (m1 >-1 || n1 > -1) {
        if (m1 === -1) {
            cur = nums2[n1]
            n1 --
        } else if (n1 === -1){
            cur = nums1[m1]
            m1 --
        } else if (nums2[n1] > nums1[m1]) {
            cur = nums2[n1]
            n1 --
        } else {
            cur = nums1[m1]
            m1 --
        }
        nums1[tail] = cur
        tail --
    }
    console.log(nums1)
}

// 语义化最好
const merge4 = (nums1, m, nums2, n) => {
    nums1.splice(m, n, ...nums2)
    nums1.sort((a, b) => a-b)
}


merge([1,2,7,0,0,0], 3, [4, 5, 8], 3)
```