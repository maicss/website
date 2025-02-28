# 移除元素

## 描述

给你一个数组 `nums` 和一个值 `val`，你需要 原地 移除所有数值等于 val 的元素。元素的顺序可能发生改变。然后返回 `nums` 中与 `val` 不同的元素的数量。

假设 `nums` 中不等于 `val` 的元素数量为 `k`，要通过此题，您需要执行以下操作：

更改 `nums` 数组，使 `nums` 的前 `k` 个元素包含不等于 `val` 的元素。`nums` 的其余元素和 `nums` 的大小并不重要。
返回 `k`。

## 解答

```js
/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function(nums, val) {
    for (let i=0;i<nums.length;) {
        if (nums[i] === val) {
            nums.splice(i, 1)
        } else {
            i++
        }
    }
    return nums.length
};

// 指针


```

## 总结

删除数组元素可以达到目标。但是题目里说不在乎元素顺序和返回`k`，并且前`k`个不包含`val`，是在暗示交换数组的数据。

