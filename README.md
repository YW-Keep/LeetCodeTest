# LeetCodeTest
## 第一题 在数组中 找到两个相加等于目标值的数的位置
###  思路：以值为key 位置为value去寻找，如果找到 那么返回这两个数。
## 第二题 从小位到大位数的链表相加
### 思路：考虑进位即可（循环相加）。
## 第三题 获取不重复字符最长子串，返回长度
### 思路：便利string 记录当前的字符串如果重复了则截取后面的字符串，比较记录最大数。
## 第四题 获取2个数组的中位数
### 思路：二分夹逼（每次获取数组的中间偏左，把小的全部剔除位数相对移动），其实这是一个获取2个数组（按顺序合并后），获取某个位置的问题
## 第五题 获取最长回文子串
### 思路：Manacher 算法，简单的说就是记录中心最大右边距，如果在边距内就可以通过对称性排除多余的计算次数，其实还有个经典问题取最长回文子序列，那么就要从两边剔除的方式来计算了
## 第十一题 水池蓄水问题
### 思路：先设置宽最大，然后移动较小的边进行计算
## 第十五题 三数相加问题（数组中三个数相加为零）
### 思路：先排序，然后确定一个数，前后指针遍历余下的数来确定三个数相加为零
## 第十七题 手机按键（找寻所有可能的字符组合）
### 思路：没有特别好的方式 遍历map映射拼接
## 第十九题 去除链表末尾第几个元素
### 思路：快慢指针，慢指针跳过一个数据赋值即可（注意特殊情况）
## 第二十题 匹配三组括号
### 思路：用栈的思想，左括号入栈，右括号则栈内出栈匹配
## 第二十一题 链表合并
### 思路：没什么难度吧，遍历合并就好了（已经排序过了的）
## 第二十二题 括号插入(几组括号排序)
### 思路：其实和二叉树递归很像，通过左边或者右边进行递归就可以了。
## 第二十三题 合并K个排序链表变成一个排序链表
### 思路：三个思路 1.存入数组中排序再创建新的数组 2.每次判断然后归并最小的 不断循环 3.分治归并思想 两两归并
## 第三十一题 寻找下一个排序
### 思路：主要是找到后小前大的位置，然后交换位置，最后对后半段的数据进行排序（头尾交换法~）
## 第三十二题 寻找括号字符串中最长的正确的括号长度
### 思路：1. 用数组记录每个（  堆栈的位置  2. 记录（ 与）的个数，当相等时 进行判断 （这需要左右遍历两次）
## 第三十三题 旋转排序数组取值
### 思路： 还是二分法因为有一半肯定是排序好的，所以要判断哪一半，然后在排序的一半中判断筛选
## 第三十四题 找到所在值的位置
### 思路：还是二分法找到2边的值
## 第三十九题 找到数组中所有组成目标值的组合（数字可以复用）
### 思路：深度遍历，递归寻找
## 第四十二题 水池蓄水问题
### 思路：左右2个指针，进行遍历每一栏计算。
## 第四十六题 寻找所有数组组合
### 思路：和三十六题一样深度遍历递归即可
## 第四十八题 图片旋转
### 思路：土思路一圈圈旋转，相对好点的就是先进行轴对称，再反转一次就可以了
## 第四十九题 寻找相同组成的字符串
### 思路：字符串排序，然后作为key，相应的字符串作为值放入数组中
## 第五十三题 寻找最大子串和
### 思路：思路很重要，其实很简单如果是小于0的子串则截断（最后加负数才会小于0），最大子串肯定在其截断的数组中。在遍历过程中记录最大值就可以了
## 第五十六题 合并区间
### 思路：区间按照最小值排序，最后在遍历合并就可以了（swift自己的排序还是很方便的 哈哈）
## 第六十二题 机器人走到重点路径数
### 思路：数学题排列组合
## 第六十四题 数字矩阵最短路径问题
### 思路：动态规划（下面一个数字一定是从上面或者左边来的）
## 第七十题 走一步或两步爬楼梯问题
### 思路：动态规划入门题（这一步一定是前面2步或者前面一步跨过来的）
## 第七十二题 字符串对比编辑最小
### 思路：动态规划（2个字符串第一个字符对比，如果不一样一定是其中一个少一个或者2个都少一个变化而来）
## 第七十五题 颜色排序
### 思路：2个指针一个头指针一个尾指针，遍历一遍就可以了。
## 第七十六题 寻找最小的包含所有元素的子串
### 思路：遍历目标记录个数，再遍历原先的string记录个数，如果目标个数达到则判断是不是最小，剔除一个元素继续遍历。（一样的思路Java的代码能过swift 过不去很尴尬）
## 第七十八题 获取所有子集合
### 思路：动态规划。
## 第七十九题 查询字母表中连接出的string
### 思路：回溯算法，深度优先遍历。
## 第八十四题 柱状图中最大的矩形
### 思路：主要是堆栈升序存贮位置值，遇到降序先计算值，最后升序进行遍历计算，找到最大值（代码很简单，逻辑思想不容易理解）
## 第九十四题 中序遍历二叉树
### 思路：递归遍历
## 第九十六题 不同的二叉查找树
### 思路：动态规划
## 第九十八题 验证二叉搜索树
### 思路：中序遍历二叉树,再进行判断即可
## 第一百零一题 对称二叉树
### 思路：递归遍历
## 第一百零二题 二叉树的层序遍历
### 思路：队列保存
## 第一百零四题 二叉树的最大深度
### 思路：递归遍历
## 第一百零五题 从前序与中序遍历序列构造二叉树
### 思路：前序遍历起点是跟在中序遍历中找到它分割
## 第一百十四题 二叉树转换链表
### 思路：思路要把右边的树挂到左边（前序遍历的最后一个数，即最右边的数上）循环做 （也可以前序遍历，再生成替换）
## 第一百二十一题 买卖股票的最佳时机
### 思路：动态规划

## 第一百二十四题 二叉树中的最大路径和

### 思路：其实这题也可以用动态规划的思路思考。一个节点的最大路径肯定是加上不为零的左路径与不为零的右路径 加上自己。 但是你要给父类用的时候 只能加左路径与右路径中的最大值的那个（或着都不加~）

## 第一百二十八题 最长连续序列
### 思路：哈希表（字典存储）然后获取判断
## 第一百三十六题 只出现一次的数字
### 思路：实现 异或操作符 两个一样的数两次后为0

## 第一百三十九题 只出现一次的数字

### 思路：动态规划，已知一个字符串可以被分割，加上一个能分割的字符串 整个字符串肯定能被分割

## 第一百四十八题 链表排序

### 思路：因为空间复杂度是常数，而时间复杂度是 O(n log n) 所以第一个想法就是分治归并的思想，果然可以

## 169. 求众数

### 思路：因为超过二分之一 所以中位数肯定是它，所以只要排序就好了。

## 199. 打家劫舍

### 思路：动态规划

## 206. 反转链表

### 思路：递归和非递归两种版本

## 215. 数组中的第K个最大元素

### 思路：二分法（其实就是快排思路，但是这里直接快排再取可能太慢了）

## 226. 翻转二叉树

### 思路：递归

## 234. 回文链表

### 思路：回文就要想到获取一半，如何获取一般，第一个最先想到的是数组，堆栈，但是需要空间复杂度为0 所以需要考虑到快慢指针 获取一般后需要逆转链表

## 238. 除自身以外数组的乘积

### 思路：首先想到的是除法 额。不允许除法（估计怕0报错吧） 然后在想想，因为要除以本身，所以想到的是左右两边遍历（记录2遍的累乘数组），然后 后面说 不要额外空间，然后想到一个数累乘记录 直接乘上去就好了。

## 239. 除自身以外数组的乘积

### 思路：开始思考动态规划，发现有点繁琐，然后看到了双向队列，应该是最优解了吧，主要问题在于1.怎么去除移除框内的元素 2.怎么加入一个元素  

## 240. 搜索二维矩阵 II

### 思路：因为按顺序排列 所以减少不必要的 判断 （其实二分法 应该更快） 

## 279. 完全平方数

### 思路：动态规划  backupArray[i] =  min(backupArray[i], backupArray[i - j*j] + 1) 

## 283. 移动零

### 思路： 把数字前移 前面的都判断过 这样移动次数少了 

## 287. 寻找重复数

### 思路： 暴力查找 时间复杂度 O(n2) 字典存储 空间复杂度O(n) 归并排序 破坏数组结构  只能二分查找了 这个时间复杂度是nlog(n) 还有一种循环快慢指针的方式 时间复杂度是n  简单介绍下思路，如果没有重复的数是不会出现循环的，因为有重复的数会导致数字圈这样，快慢指针会相遇，相遇时快指针比慢指针多走了没进循环前的距离,而进循环的点就是重复点，这时候会在还差这个距离到重复点的地方快慢指针相遇，这时候再一个指针与慢指针一起跑就好了，会正好在重复点相遇，时间复杂度就是N 