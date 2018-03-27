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
