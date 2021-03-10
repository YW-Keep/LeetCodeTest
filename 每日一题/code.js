// 167. 两数之和 II - 输入有序数组  双指针
/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(numbers, target) {
    let start = 0, end = numbers.length-1
    while(start < end) {
        let sum = numbers[start] + numbers[end]
        if(sum > target) {
            end--
        } else if(sum < target) {
            start++
        } else {
            return [start +1, end+1]
        }
    }
    return[]

};

// 95. 不同的二叉搜索树 II 递归
/** 
 * @param {number} n
 * @return {TreeNode[]}
 */
var generateTrees = function (n) {
    function buildTree(start, end) {
      let ans = [];
      if (start > end) return [null];
      for (let i = start; i <= end; i++) {
        let leftNodes = buildTree(start, i - 1);
        let rightNodes = buildTree(i + 1, end);
        for (const leftNode of leftNodes) {
          for (const rightNode of rightNodes) {
            let cur = new TreeNode(i);
            cur.left = leftNode;
            cur.right = rightNode;
            ans.push(cur);
          }
        }
      }
      return ans;
    }
    if (n === 0) return [];
    return buildTree(1, n);
  };

// 剑指 Offer 11. 旋转数组的最小数字 二分法
/**
 * @param {number[]} numbers
 * @return {number}
 */
var minArray = function(numbers) {
  let i = 0,j = numbers.length - 1
  while(i < j) {
      let mid = Math.floor((i + j)/2)
      if(numbers[mid] < numbers[j]) {
          j = mid
      } else if(numbers[mid] > numbers[j]) {
          i = mid + 1
      }  else {
          j--
      }
  }
  return numbers[i]
};

// 64. 最小路径和 动态规划
/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function(grid) {
  let backup = new Array(grid[0].length).fill(Number.MAX_VALUE)
  backup[0] = 0
  for (let i = 0; i < grid.length; i++) {
    let nums = grid[i]
    backup[0] +=  nums[0]
    for (let j = 1; j < nums.length; j++) {
      backup[j] =  Math.min(backup[j-1],backup[j]) + nums[j]
    }
  }
  return backup[backup.length -1]
};
// 392. 判断子序列 基础题
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isSubsequence = function(s, t) {
  if(s.length == 0) {return true}
  let i = 0;
  for (let j = 0; j < t.length; j++) {
    if(t[j] == s[i]) {
      i++
      if(i == s.length) {
        return true
      }
    }
  }
  return false
};

// 104. 二叉树的最大深度 二叉树层序遍历
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function(root) {
  if(!root) { return 0} 
  let arr = [root],res = 0
  while(arr.length > 0) {
    res++;
    let newArr = []
    for (let i = 0; i < arr.length; i++) {
      let node = arr[i]
      if(node.left) {
        newArr.push(node.left)
      } 
      if(node.right) {
        newArr.push(node.right)
      }
    }
    arr = newArr
  }
  return res;
};

// 343. 整数拆分 基础题
/** 
 * @param {number} n
 * @return {number}
 */
var integerBreak = function(n) {
  if(n == 2) {return 1}
  if(n == 3) {return 2}
  let num = Math.floor(n/3)
  let res  = Math.pow(3,num)
  let remainder = n%3
  if(remainder == 1) {
    res = res/3*4
  } else if(remainder == 2) {
    res = res*2
  }
  return res
};

// 114. 二叉树展开为链表 循环
/**
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 */
var flatten = function(root) {
  let node = root;
  while(node != null) {
    if(node.left != null) {
      let rNode = node.left
      while(rNode.right != null) {
        rNode = rNode.right
      } 
      rNode.right = node.right;
      node.right = node.left;
      node.left = null
    }
    node = node.right
  }
};

// 415. 字符串相加  基础逻辑
/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var addStrings = function(num1, num2) {
  let l1 = num1.length - 1, l2 = num2.length - 1,add = 0,res = ''
  while(l1 >=0 || l2 >= 0 || add > 0) {
    let num = add + (l1 >= 0 ? Number.parseInt(num1[l1]) : 0) + (l2 >= 0 ? Number.parseInt(num2[l2]) : 0)
    add =  Math.floor(num/10)
    num = num%10;
    res = num.toString() + res;
    l1--;
    l2--;
  }
  return res;
};

// 面试题 08.03. 魔术索引 基础思考
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMagicIndex = function(nums) {
  for (let i = 0;i < nums.length;i++) {
    if(nums[i] == i) {
      return i
    } else if(nums[i] > i) {
      i = nums[i] - 1
    }
  }
  return -1
};

// 32. 最长有效括号  队列
/**
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function(s) {
  let backup = [-1],max = 0
  for (let i = 0; i < s.length; i++) {
    let char  = s[i]
    if(char  == '(') {
      backup.push(i)
    } else {
      backup.pop();
      if(backup.length == 0) {
        backup.push(i)
      }
      max = Math.max(max,i - backup[backup.length -1])
    }
  }
  return max
};

// 207. 课程表 深度遍历
/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function(numCourses, prerequisites) {
  let mark = new Array(numCourses).fill(0)
  let backup = new Array()
  for (let i = 0; i < numCourses; i++) {
    backup.push(new Array())
  }
  for (let i = 0; i < prerequisites.length; i++) {
    backup[prerequisites[i][0]].push(prerequisites[i][1])  
  }
  console.log(backup)
  for (let i = 0; i < backup.length; i++) {
    for (let j = 0; j < backup[i].length; j++) {
      if(!check(backup[i][j])) {
        return false
      }
    }
  }
  return true

  function check(index) {
    if(backup[index].length == 0) {
      return true
    }
    if(mark[index] == -1) {
      return true
    }
    if(mark[index] == 1) {
      return false
    }
    mark[index] = 1
    for (let k = 0; k < backup[index].length; k++) {
      if(!check(backup[index][k])) {
        return false;
      }
    }
    // 回朔
    mark[index] = -1
    return true
  }
};

// 337. 打家劫舍 III 递归
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var rob = function(root) {
 // 分为不含节点与含节点 2种情况 0是包含当前节点，1是不包含当前节点的
 let res = dfs(root)
 return Math.max(res[0],res[1])

 function dfs(node) {
   if(!node) {
     return [0,0]
   }
   let left = dfs(node.left)
   let right = dfs(node.right)
   return[left[1] + right[1] + node.val, Math.max(left[0],left[1]) + Math.max(right[0],right[1])]
 }
};

// 100. 相同的树  递归基础题
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function(p, q) {
  if(!p  && !q) {return true}
  if(!p || !q) {return false}
  return p.val == q.val && isSameTree(p.left,q.left) && isSameTree(p.right,q.right) 
};

// 99. 恢复二叉搜索树 二叉树的中序遍历
/**
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 */

var recoverTree = function(root) {
  const stack = [];
  let x = null, y = null, pred = null;

  while (stack.length || root !== null) {
    while (root !== null) {
      stack.push(root);
      root = root.left;
    }
    root = stack.pop();
    if (pred !== null && root.val < pred.val) {
      y = root;
      if (x === null) {
          x = pred;
      }
      else break;
    }
    pred = root;
    root = root.right;
  }
  swap(x, y);

  function swap (x, y) {
    let temp = x.val;
    x.val = y.val;
    y.val = temp;
  }
};

// 696. 计数二进制子串  整合
/**
 * @param {string} s
 * @return {number}
 */
var countBinarySubstrings = function(s) {
  let backup = 0,start = '0',now = 0,result = 0
  for (let i = 0; i < s.length; i++) {
    if(start == s[i]) {
      now++
    } else {
      result += Math.min(backup,now)
      backup = now
      start = s[i]
      now = 1
    }
  }
  result += Math.min(backup,now)
  return result
};

// 130. 被围绕的区域 连通
/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solve = function(board) {
  class UF {
      constructor(num) {
          this.count = num;
          this.size = Array(num)
          this.parent = Array(num)
          for (let i = 0; i < num; i++) {
              this.parent[i] = i;
              this.size[i] = 1;
          }
      }
      union(p,q) {
          let rootP = this.find(p)
          let rootQ = this.find(q)
          if(rootP == rootQ) {
              return
          }
          if (this.size[rootP] > this.size[rootQ]) {
              this.parent[rootQ] = rootP;
              this.size[rootP] += this.size[rootQ];
          } else {
              this.parent[rootP] = rootQ;
              this.size[rootQ] += this.size[rootP];
          }
          this.count--
      }
      connected(p,q) {
          let rootP = this.find(p)
          let rootQ = this.find(q)
          return rootP == rootQ
      }
      find(x) {
          while(this.parent[x] != x) {
              // 进行路径压缩
              this.parent[x] = this.parent[this.parent[x]];
              x = this.parent[x];
          }
          return x;
      }
  }
  if(board.length == 0) {return}
  let m = board.length,n = board[0].length
  let uf = new UF(m*n+1),dummy = m*n
  for (let i = 0; i < m; i++) {
      if(board[i][0] == 'O') {
          uf.union(i*n,dummy)
      }
      if(board[i][n-1] == 'O') {
          uf.union(i*n + n-1,dummy)
      }
  }
  for (let i = 0; i < n; i++) {
      if(board[0][i]== 'O') {
          uf.union(i,dummy)
      }
      if(board[m-1][i]== 'O') {
          uf.union(n * (m - 1) + i,dummy)
      }
  }
  let d = [[1,0],[0,1],[0,-1],[-1,0]]
  for (let i = 1; i < m-1; i++) {
      for (let j = 1; j < n-1; j++) {
          if(board[i][j] == 'O') {
              for (let k = 0; k < 4; k++) {
                  let x = i + d[k][0],y = j + d[k][1]
                  if(board[x][y] == 'O') {
                      uf.union(x * n + y, i * n + j);
                  }
              }
          }
          
      }
  }
  for (let i = 1; i < m-1; i++) {
      for (let j = 1; j < n-1; j++) {
          if (!uf.connected(dummy, i * n + j)) {
              board[i][j] = 'X'
          }
      }
  }
  return board;
};

// 93. 复原IP地址 回朔算法
/**
 * @param {string} s
 * @return {string[]}
 */
var restoreIpAddresses = function(s) {
  let res = []
  dfs([],0)
  return res
  
  function dfs(subRes,start) {
    if(subRes.length == 4) {
      if(start == s.length) {
        res.push(subRes.join('.'))
      }
      return
    }
    for (let len = 1; len <= 3; len++) {
      if(start + len -1 >= s.length) {
        return
      }
      if (len != 1 && s[start] == '0') {
        return
      }
      let str = s.substring(start,start + len)
      if(len == 3  && Number.parseInt(str) > 255) {
        return
      }
      subRes.push(str);
      dfs(subRes,start +len)
      subRes.pop()
    }
  }
};

// 133. 克隆图  因为值唯一 所以backup记录就好 栈调用
/**
 * // Definition for a Node.
 * function Node(val, neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * };
 */

/**
 * @param {Node} node
 * @return {Node}
 */
var cloneGraph = function(node) {
  if(!node) {return null}
  let backup = new Map()
  let newNode = new Node(node.val,[])
  let stack = [node]
  backup.set(node.val,newNode)
  while(stack.length) {
    let _node = stack.pop()
    let _newNode = backup.get(_node.val)
    for (let i = 0; i < _node.neighbors.length; i++) {
      let subNode = _node.neighbors[i]
      let _subNewNode = backup.get(subNode.val)
      if(!_subNewNode) {
        stack.push(subNode)
        _subNewNode = new Node(subNode.val,[]);
        backup.set(subNode.val,_subNewNode)
      }
      _newNode.neighbors.push(_subNewNode)
    }
  }
  return newNode; 
};
// 43.字符串相乘 每个相乘再累加
/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var multiply = function(num1, num2) {
  if(num1 == '0' || num2 == '0') {
    return '0'
  }
  let m = num1.length,n = num2.length,arr = new Array(m +n).fill(0)
  for (let i = m -1; i >= 0; i--) {
    let x = Number.parseInt(num1[i])
    for (let j = n -1; j >= 0; j --) {
      let y = Number.parseInt(num2[j])
      arr[i+j+1] += x*y
    }
  }
  for (let i = m +n -1; i > 0; i--) {
    arr[i -1] += Math.floor(arr[i]/10)
    arr[i] %=10 
  }
  if(arr[0] == 0) {
    arr.shift()
  } 
  return arr.join('')
};

// 20. 有效的括号
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
  var key = {
      "(" : ")",
      "[" : "]",
      "{" : "}"
  };
  var queue = Array();
  for(i=0;i<s.length;i++) {
      var arr  = s[i];
      if (key[arr] != null) {
          queue.push(arr);
      } else {
         var last = queue.pop();
         if (key[last] != arr) {
             return false;
         }
      }
  }
  if (queue.length == 0) {
      return true;
  } else {
      return false;
  }
};

// 1450. 在既定时间做作业的学生人数 基础逻辑
/**
 * @param {number[]} startTime
 * @param {number[]} endTime
 * @param {number} queryTime
 * @return {number}
 */
var busyStudent = function(startTime, endTime, queryTime) {
  let res = 0
  for (let i = 0; i < startTime.length; i++) {
    if ( startTime[i] <= queryTime && queryTime <= endTime[i]) {
      res++
    }
  }
  return res

};

// 733. 图像渲染 栈存储 循环
/**
 * @param {number[][]} image
 * @param {number} sr
 * @param {number} sc
 * @param {number} newColor
 * @return {number[][]}
 */
var floodFill = function(image, sr, sc, newColor) {
  let old = image[sr][sc]
  if(old == newColor) {return image}
  let backup = [[sr,sc]]
  let m = image.length,n =image[0].length
  while(backup.length > 0) {
    let node = backup.shift()
    let i = node[0],j = node[1]
    image[i][j] = newColor;
    if(i - 1 >= 0 && image[i-1][j] == old) {
      backup.push([i - 1,j])
    }
    if(i + 1 < m && image[i+1][j] == old) {
      backup.push([i + 1,j])
    }
    if(j - 1 >= 0 && image[i][j-1] == old) {
      backup.push([i,j -1])
    }
    if(j + 1 < n && image[i][j+1] == old) {
      backup.push([i,j+1])
    }
  }
  return image;
};

// 110. 平衡二叉树 可以用-1代表报错
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isBalanced = function(root) {

  return getDeep(root) != -1
  function getDeep(node) {
    if(!node) {
      return 0
    }
    let left = getDeep(node.left)
    if(left == -1) {return -1}
    let right = getDeep(node.right)
    if(right == -1) {return -1}
    if(Math.abs(left -right) > 1) {
      return -1
    }
    return Math.max(left,right) +1;
  }
};

// 109. 有序链表转换二叉搜索树 链表转数组
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {ListNode} head
 * @return {TreeNode}
 */
var sortedListToBST = function(head) {
  let backup = []
  let next =  head;
  while(next) {
    backup.push(next.val)
    next =  next.next
  }
  return arrToBST(backup)
  
  function arrToBST(arr) {
    if(arr.length == 0) {
      return null
    }
    let num = Math.floor(arr.length/2)
    let node = new TreeNode(arr[num])
    node.left = arrToBST(arr.slice(0,num))
    node.right = arrToBST(arr.slice(num+1))
    return node
  }
};
// 647. 回文子串 Manacher 算法
/**
 * @param {string} s
 * @return {number}
 */
var countSubstrings = function(s) {
  let n = s.length;
  let t = ['$', '#'];
  for (let i = 0; i < n; ++i) {
      t.push(s[i]);
      t.push('#');
  }
  n = t.length;
  t.push('!');

  let f = new Array(n).fill(0);
  let iMax = 0, rMax = 0, ans = 0;
  for (let i = 2; i < n; i++) {
      f[i] = i < rMax ? Math.min(rMax - i + 1, f[2 * iMax - i]) : 1;
      while (t[i + f[i]] == t[i - f[i]]) {
          f[i]++;
      }
      if (i + f[i] - 1 > rMax) {
          iMax = i;
          rMax = i + f[i] - 1;
      }
      ans += Math.floor(f[i] / 2);
  }

  return ans;
};

// 529. 扫雷游戏 dfs
/**
 * @param {character[][]} board
 * @param {number[]} click
 * @return {character[][]}
 */
var updateBoard = function(board, click) {
  let dx = [0,1,0,-1,1,1,-1,-1];
  let dy = [1,0,-1,0,1,-1,1,-1];
  let x = click[0],y = click[1]

  if(board[x][y] == 'M') {
    board[x][y] = 'X';
  } else {
    dfs(x,y)
  }
  return board


  function dfs(x,y) {
    let count = 0
    for (let i = 0; i < 8; i++) {
      let tx = x + dx[i]
      let ty = y + dy[i]
      if(tx < 0 || tx >= board.length || ty < 0 || ty >= board[0].length) {
        continue
      }
      if(board[tx][ty] == 'M') {
        count++
      }
    }
    if(count > 0) {
      board[x][y] = count.toString()
    } else {
      board[x][y] = 'B'
      for (let i = 0; i < 8; i++) {
        let tx = x + dx[i]
        let ty = y + dy[i]
        if(tx < 0 || tx >= board.length || ty < 0 || ty >= board[0].length || board[tx][ty] != 'E') {
          continue
        }
        dfs(tx,ty)
      }
    }
  }
};

// 111. 二叉树的最小深度  循环 递归都可以
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var minDepth = function(root) {
  if(!root) {return 0}
  let res = 0,backup = [root]
  while(backup.length > 0) {
    res++
    let newBackup = [] 
    for (let i = 0; i < backup.length; i++) {
      let node = backup[i];
      if(!node.left && !node.right) {
        return res
      } 
      if(node.left) {
        newBackup.push(node.left)
      }
      if(node.right) {
        newBackup.push(node.right)
      }
    }
    backup = newBackup;
  }
  return res

};

// 679. 24 点游戏 穷举 4个里面选2个数有 12种可能 然后操作4  三个里挑2个有6中（有顺序的）再四个操作 在2个有顺序的  再四个操作
// 12x4x6x4x2x4 = 9216种 所以最多也就这么多  递归两个数变成一个数
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var judgePoint24 = function(nums) {
    const len = nums.length;
  if (len == 1) { // 递归的出口，剩一个数，处理一下精度丢失的问题
    const diff = nums[0] - 24;
    return Math.abs(diff) < 0.00001;
  }
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      const copyNums = nums.slice(); // 拷贝一份原数组
      copyNums.splice(j, 1); // 先删除索引大的数字
      copyNums.splice(i, 1); // 这样才不会影响索引小的数字的位置

      let n1 = nums[i];
      let n2 = nums[j];
      let isValid = false; // 
      
      isValid = isValid || judgePoint24(copyNums.concat(n1 + n2));
      // 减与被减
      isValid = isValid || judgePoint24(copyNums.concat(n1 - n2));
      isValid = isValid || judgePoint24(copyNums.concat(n2 - n1));
      // 乘
      isValid = isValid || judgePoint24(copyNums.concat(n1 * n2));
      if (n2 !== 0) { // 除
        isValid = isValid || judgePoint24(copyNums.concat(n1 / n2));
      }
      if (n1 !== 0) { // 被除
        isValid = isValid || judgePoint24(copyNums.concat(n2 / n1));
      }
      if (isValid) return true; 
    }
  }
  return false;
};

// 459. 重复的子字符串  其实问题就变成了 s + s  能不能从1开始到s.length 中找个一个点正好s是s+s的子串
var repeatedSubstringPattern = function(s) {
  return (s + s).indexOf(s, 1) != s.length;
};

// 201. 数字范围按位与  因为是与所以 有0 就是0 所以只要计算开始结束2位的公共头
/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var rangeBitwiseAnd = function(m, n) {
  let shift = 0
  while(m < n) {
    m = m >> 1
    n = n >> 1
    shift += 1
  }
  return m << shift

};

// 491. 递增子序列 递归去重 递归结束后再添加
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var findSubsequences = function(nums) {
  let res = []
  dfs(0,[]);
  return res;

  function dfs(i,backup) {
    if(i == nums.length ) {
      if(backup.length > 1) {
        res.push(backup.concat())
      }
      return;
    }
    if(backup.length == 0 || backup[backup.length -1 ] <= nums[i]) {
      backup.push(nums[i])
      dfs(i+1,backup)
      backup.pop()
    } 
    if(backup.length == 0 || backup[backup.length -1] != nums[i]) {
      dfs(i+1,backup)
    }
  }
};

// 17. 电话号码的字母组合  可以遍历 也可以回朔
/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {

  if(digits.length == 0) {
       return []
   }
  let backup ={
    '2':['a','b','c'],
    '3':['d','e','f'],
    '4':['g','h','i'],
    '5':['j','k','l'],
    '6':['m','n','o'],
    '7':['p','q','r','s'],
    '8':['t','u','v'],
    '9':['w','x','y','z'],
  }
  let res = [],temp = []
  dfs(0)
  return res;

  function dfs(num) {
    if(num == digits.length) {
      res.push(temp.join(''))
      return;
    } 
    
    let arr = backup[digits[num]]
    for (let i = 0; i < arr.length; i++) {
      temp.push(arr[i])
      dfs(num+1)
      temp.pop()
    }
  }
};

// 332. 重新安排行程 Hierholzer 算法

/**
 * @param {string[][]} tickets
 * @return {string[]}
 */
var findItinerary = function(tickets) {
  let graph = getGraph(tickets)
  let ans = []
  dfs('JFK')
  return ans.reverse()
};
function dfs(cur){
  if(!graph.has(cur)) return
  const neighbors = graph.get(cur)
  while(neighbors.length) dfs(graph, neighbors.shift(), ans)
  ans.push(cur)
}
function getGraph(tickets){
  const map = new Map()
  for(let i = 0;i < tickets.length;i++){
      const from = tickets[i][0]
      const to = tickets[i][1]
      if(!map.has(from)) map.set(from, [])
      if(!map.has(to)) map.set(to, [])
      map.get(from).push(to)
  }
  for(let [key, value] of map){
      value.sort((a, b) => a < b ? -1 : a > b ? 1 : 0)
  }
  return map
}

// 657. 机器人能否返回原点 基础逻辑
/**
 * @param {string} moves
 * @return {boolean}
 */
var judgeCircle = function(moves) {
  let x = 0,y = 0
  for (let i = 0; i < moves.length; i++) {
    let char  = moves[i]
    switch (char) {
      case 'R':
        x++
        break;
      case 'L':
        x--
        break;
      case 'U':
        y++
        break;
      case 'D':
        y--
        break;
      default:
        break;
    }
  }
  return x == 0 && y == 0
};

// 557. 反转字符串中的单词 III 基础题
/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function(s) {
  const ret = [];
  const length = s.length;
  let i = 0;
  while (i < length) {
      let start = i;
      while (i < length && s.charAt(i) != ' ') {
          i++;
      }
      for (let p = start; p < i; p++) {
          ret.push(s.charAt(start + i - 1 - p));
      }
      while (i < length && s.charAt(i) == ' ') {
          i++;
          ret.push(' ');
      }
  }
  return ret.join('');
};


// 841. 钥匙和房间 遍历
/**
 * @param {number[][]} rooms
 * @return {boolean}
 */
var canVisitAllRooms = function(rooms) {
  let num = 0
  let backup = new Array(rooms.length).fill(false)
  let arr = [0];
  while(arr.length > 0) {
    let i = arr.pop()
    if(!backup[i]) {
      num++
      if (num == rooms.length) {
        return true
      }
      arr = arr.concat(rooms[i])
      backup[i] = true;
    }
  }
  return false
};

// 214. 最短回文串 KMP 算法 
/**
 * @param {string} s
 * @return {string}
 */
const shortestPalindrome = (s) => {
  const rev_s = s.split('').reverse().join('');
  const str = s + "#" + rev_s;
  const next = new Array(str.length).fill(0);
  // 抽出来，方便学习记忆，这是我写的模板
  const kmp = (next, str) => {
    next[0] = 0;
    let len = 0;
    let i = 1;
    while (i < str.length) {
      if (str[i] == str[len]) {
        len++;
        next[i] = len;
        i++;
      } else {
        if (len == 0) {
          next[i] = 0;
          i++;
        } else {
          len = next[len - 1];
        }
      }
    }
  };
  kmp(next, str);
  const maxLen = next[str.length - 1]; // 最长回文前缀的长
  const add = s.substring(maxLen).split('').reverse().join('');
  return add + s;
};

// 486. 预测赢家 动态规划
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var PredictTheWinner = function(nums) {
  let count = nums.length
  let backup = new Array(count).fill(new Array(count).concat())
  for (let i = 0; i < count; i++) {
    backup[i][i] = nums[i]
  }
  for (let i = count - 2; i > -1; i--) {
    for (let j = i + 1; j < count; j++) {
      backup[i][j] = Math.max(nums[i] - backup[i + 1][j],nums[j] - backup[i][j - 1])
    }
  }
  return backup[0][count -1] >= 0;
};

// 剑指 Offer 20. 表示数值的字符串 正则
/**
 * @param {string} s
 * @return {boolean}
 */
var isNumber = function(s) {
  return /^[+-]?(\d+(\.\d*)?|(\.\d+))(e[+-]?\d+)?$/i.test(s.trim());
};

// 51. N 皇后  遍历  可以回朔 我这里没有回朔
/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function (n) {
  let result = [];
  backStart(0, []);
  return result;

  function backStart(k, arr) {
    if (k >= n) {
        let ar = [];
        arr.forEach(e => {//讲我们要的数据转换为需要的格式
            let str = '..............................';
            str=str.substring(0,n);
            str = `${str.substring(0, e)}Q${str.substring(e + 1)}`
            ar.push(str);
        })
        result.push(ar);
    } else {
        for (let i = 0; i < n; i++) {
            arr[k] = i;
            if (isBack(k, arr)) {
                backStart(k + 1, arr)
            }
        }
    }
  }
  function isBack(k, arr) {
    for (let i = 0; i < k; i++) {
        if (k - i == Math.abs(arr[i] - arr[k]) || arr[k] == arr[i]) {
            return false;
        }
    }
    return true;
  }
};

// 257. 二叉树的所有路径 回朔
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {string[]}
 */
var binaryTreePaths = function(root) {
  let res = []
  let backArray = []
  if(root) {
    dfs(root)
  }
  return res;

  function dfs(node) {
    backArray.push(node.val);
    if(!node.left && !node.right) {
      res.push(backArray.join('->'))
    }
    if(node.left) {
      dfs(node.left)
    }
    if(node.right) {
      dfs(node.right);
    }
    backArray.pop()
  }
};

// 60. 第k个排列 按位计算 
var getPermutation = (n, k) => { 
  let nums = [];
  let factorial = 1;               

  for (let i = 1; i <= n; i++) {
    nums.push(i);                  
    factorial = factorial * i;   
  }

  k--;   
  let resStr = '';

  while (nums.length > 0) {              
    factorial = factorial / nums.length; 
    const index = k / factorial | 0;   
    resStr += nums[index];               
    nums.splice(index, 1);             
    k = k % factorial;                 
  }
  return resStr;
};

// 107. 二叉树的层次遍历 II 二叉树层序遍历
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrderBottom = function(root) {
  if(!root) {return []}
  let backup = [root],res = [];
  while(backup.length > 0) {
    let inArray = []
    let newBackup = []
    for (let i = 0; i < backup.length; i++) {
      let node = backup[i]
      inArray.push(node.val);
      if(node.left) {
        newBackup.push(node.left)
      }     
      if(node.right) {
        newBackup.push(node.right)
      }  
    }
    res.unshift(inArray)
    backup = newBackup
  } 
  return res
};

// 347. 前 K 个高频元素 字典排序
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */

var topKFrequent = function(nums, k) {
  var myMap = new Map();
  for (let index = 0; index < nums.length; index++) {
      const element = nums[index];
      myMap.set(element,(myMap.get(element)|| 0) +1)
  }

  var reslut = Array();
  for(var key of myMap) {
      reslut.push(key[0]);
  }
  var sortArray = reslut.sort(copare);
  function copare(x,y) {
      return myMap.get(y) - myMap.get(x);
  }
  return sortArray.slice(0,k);
};

// 77. 组合 遍历
/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function(n, k) {
  if(n < k) {return []}
  let res = []
  dfs([],1);
  return res;

  function dfs(arr,i) {
    if(arr.length == k) {
      res.push(arr)
       return
    }
    if(i > n) {
      return
    }
    dfs(arr.concat(),i+1);
    arr.push(i) 
    dfs(arr.concat(),i+1);
  }
};

// 39. 组合总和 遍历看清楚是否能重复使用
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function(candidates, target) {
  let res = []
  dfs([],0,0);
  return res;
  function dfs(arr,i,sum) {
    if(sum == target) {
      res.push(arr)
    }
    if(i >= candidates.length || sum >= target) {
      return
    }
    dfs(arr.concat(),i+1,sum);
    arr.push(candidates[i]) 
    dfs(arr.concat(),i,sum + candidates[i]);
  }
};

// 40. 组合总和 II 排序 去重
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function(candidates, target) {
  candidates.sort()
  let backup = new Map(),res =[]
  dfs([],0,0);
  return res;
  function dfs(arr,i,sum) {
    if(sum == target) {
      let key = arr.join(',')
      if(!backup.get(key)) {
        res.push(arr)
        backup.set(key,'1')
      }
    }
    if(i >= candidates.length || sum >= target) {
      return
    }
    dfs(arr.concat(),i+1,sum);
    arr.push(candidates[i]) 
    dfs(arr.concat(),i+1,sum + candidates[i]);
  }
};

// 94. 二叉树的中序遍历
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function(root) {
  let res = []
  if(root) {
    dfs(root)
  }
  return res
  function dfs(node) {
    if(node.left) {
      dfs(node.left)
    }
    res.push(node.val)
    if(node.right) {
      dfs(node.right)
    }
  }
};

// 637. 二叉树的层平均值
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var averageOfLevels = function(root) {
  if(!root) {
    return []
  }
  let backup = [root],res =[]
  while(backup.length > 0) {
    let sum = 0,newBackup = []
    for (let i = 0; i < backup.length; i++) {     
      let node = backup[i]
      sum += node.val
      if(node.left) (newBackup.push(node.left))
      if(node.right)(newBackup.push(node.right))
    }
    sum = sum/backup.length
    res.push(sum)
    backup = newBackup;
  }
  return res
};

// 216. 组合总和 III  dfs
/**
 * @param {number} k
 * @param {number} n
 * @return {number[][]}
 */
var combinationSum3 = function(k, n) {
  let res = []
  dfs(1,[],0)
  return res
  function  dfs(i,arr,sum) {
     if(arr.length == k && sum == n) {
       res.push(arr)
     }
     if(arr.length >= k  || i > 9 || (arr.length + (10-i)) < k) {
       return
     }
     dfs(i+1,arr.concat(),sum)
     arr.push(i)
     dfs(i+1,arr.concat(),sum + i)
   } 
};

// 79. 单词搜索  遍历
/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function(board, word) {
  let h = board.length, w = board[0].length;
  let directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];
  let visited = new Array(h);
  for (let i = 0; i < visited.length; ++i) {
      visited[i] = new Array(w).fill(false);
  }
  for (let i = 0; i < h; i++) {
      for (let j = 0; j < w; j++) {
          const flag = check(i, j, word, 0);
          if (flag) {
              return true;
          }
      }
  }
  function check(i, j, s, k) {
    if (board[i][j] != s.charAt(k)) {
        return false;
    } else if (k == s.length - 1) {
        return true;
    }
    visited[i][j] = true;
    let result = false;
    for (const [dx, dy] of directions) {
        let newi = i + dx, newj = j + dy;
        if (newi >= 0 && newi < h && newj >= 0 && newj < w) {
            if (!visited[newi][newj]) {
                const flag = check(newi, newj, s, k + 1);
                if (flag) {
                    result = true;
                    break;
                }
            }
        }
    }
    visited[i][j] = false;
    return result;
 } 
  return false;
};

// 1556. 千位分隔数  基础题
/**
 * @param {number} n
 * @return {string}
 */
var thousandSeparator = function(n) {
  if(n == 0) {return '0'}
  let res = '', backup = 0,num = n
  while(num > 0) {
    let last = num%10;
    num = Math.floor(num/10)
    res = last + res
    backup++
    if(num > 0 && backup%3 == 0) {
      res = '.' + res
    }
  }  
  return res
};

// 226. 翻转二叉树 递归
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var invertTree = function(root) {
  if(!root) {
    return root;
  }
  let left =  invertTree(root.right);
  let right = invertTree(root.left);
  root.left = left;
  root.right = right;
  return root;
};

// 1561. 你可以获得的最大硬币数目 排序
/**
 * @param {number[]} piles
 * @return {number}
 */
var maxCoins = function(piles) {
  piles.sort((a, b) => b - a)
  let num  = Math.floor(piles.length/3),res = 0
  for (let i = 0; i < num; i++) {
    res += piles[i*2 + 1]
  }
  return res
};

// 47. 全排列 II  回朔算法
/**
 * @param {number[]} nums
 * @return {number[][]}
 */

var permuteUnique = function(nums) {
  const ans = [];
  const vis = new Array(nums.length).fill(false);
  nums.sort((x, y) => x - y);
  backtrack([]);
  return ans;

  function backtrack(perm) {
    if(perm.length == nums.length) {
      ans.push(perm.slice())
      return
    }
    for (let i = 0; i < nums.length; i++) {
      if(vis[i] || (i > 0 && nums[i] == nums[i-1] && !vis[i-1])) {
        continue;
      }
      perm.push(nums[i])
      vis[i] = true
      backtrack(perm);
      vis[i] = false
      perm.pop()
    }
  }
};

// 404. 左叶子之和 递归
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var sumOfLeftLeaves = function(root) {
  let res = 0
  if(!root) {return  res}
  if(root.left) {
    if(!root.left.left && !root.left.right) {
      res += root.left.val
    } else {
      res += sumOfLeftLeaves(root.left)
    }
  }
  res += sumOfLeftLeaves(root.right)
  return res
};

// 78. 子集 回朔
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
  let res = []
  dfs([],0)
  function dfs(arr,i) {
    if(i == nums.length) {
      res.push(arr.slice())
      return
    }
    dfs(arr,i+1)
    arr.push(nums[i])
    dfs(arr,i+1)
    arr.pop()
  }
  return res;
};

// 538. 把二叉搜索树转换为累加树  反中序遍历
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var convertBST = function(root) {
  let sum = 0
  dfs(root);
  return root

  function dfs(node) {
    if(!node) {return}
    dfs(node.right)
    sum += node.val
    node.val = sum
    dfs(node.left)
  }

};

// 968. 监控二叉树  找到状态方程 递归
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var minCameraCover = function(root) {
  const dfs = (root) => {
      if (!root) {
          return [Math.floor(Number.MAX_SAFE_INTEGER / 2), 0, 0];
      }
      const [la, lb, lc] = dfs(root.left);
      const [ra, rb, rc] = dfs(root.right);
      const a = lc + rc + 1;
      const b = Math.min(a, Math.min(la + rb, ra + lb));
      const c = Math.min(a, lb + rb);
      return [a, b, c];
  }

  return dfs(root)[1];
};

// 617. 合并二叉树  简单递归
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} t1
 * @param {TreeNode} t2
 * @return {TreeNode}
 */
var mergeTrees = function(t1, t2) {
  if(!t1) {
    return t2
  }
  if(!t2) {
    return t1
  }
  let newRoot = new TreeNode(t1.val + t2.val)
  newRoot.left =  mergeTrees(t1.left,t2.left)
  newRoot.right = mergeTrees(t1.right,t2.right)
  return newRoot
};
// 501. 二叉搜索树中的众数  递归
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var findMode = function(root) {
  if(!root) {
    return [];
  }
  let res = [], num = root.val -1,numCount = 0,maxCount = 0
  dfs(root)
  if(numCount > maxCount) {
    maxCount = numCount 
    res = [num]
  } else if (numCount == maxCount) {
    res.push(num)
  }
  return res;

  function dfs(node)  {
    if(!node) {return }
    dfs(node.left)
    if(node.val == num) {
      numCount++
    } else {
      if(numCount > maxCount) {
        maxCount = numCount 
        res = [num]
      } else if (numCount == maxCount) {
        res.push(num)
      }
      numCount = 1
      num = node.val
    }
    dfs(node.right)
  }
};

//  106. 从中序与后序遍历序列构造二叉树 递归
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
var buildTree = function(inorder, postorder) {
  if(postorder.length == 0) {return null};
  let root =  new TreeNode(postorder[postorder.length -1]);
  let num = inorder.indexOf(root.val);
  let left = inorder.slice(0,num);
  let right = inorder.slice(num+1);
  root.left = buildTree(inorder.slice(0,num),postorder.slice(0,num));
  root.right = buildTree(inorder.slice(num+1),postorder.slice(num,inorder.length-1))
  return root;
};


// 235. 二叉搜索树的最近公共祖先 基础递归

/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
  if(!root || !p || !q) {
    return null
  }  
  if(p.val > q.val) {
    return lowestCommonAncestor(root,q,p)
  }
  if(p.val <= root.val && q.val >= root.val) {
    return root
  }  else if (root.val < p.val) {
    return lowestCommonAncestor(root.right,p,q)
  } else {
    return lowestCommonAncestor(root.left,p,q)
  }
};

// 113. 路径总和 II  回朔
/** 
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} sum
 * @return {number[][]}
 */
var pathSum = function(root, sum) {
  let backup= [],result = []

  dfs(root,0)
  return result

  function dfs(node, num) {
    if(!node) {
      return
    }
    backup.push(node.val) 
    num += node.val
    if(!node.left && !node.right && num == sum) {
      result.push(backup.concat())
    }
    dfs(node.left,num)
    dfs(node.right,num)
    backup.pop()
  }
};

// 145. 二叉树的后序遍历 递归
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var postorderTraversal = function(root) {
  let result = []
  dfs(root)
  return result
  function dfs(node) {
    if(!node) {
      return
    }
    dfs(node.left)
    dfs(node.right)
    result.push(node.val)
  }
};
// 701. 二叉搜索树中的插入操作  递归 找位置
/**
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode}
 */
var insertIntoBST = function(root, val) {
  if(!root) {
    return new TreeNode(val)
  }
  dfs(root);
  return root;

  function dfs(node) {
    if(node.val > val) {
      if(node.left) {
        dfs(node.left) 
      } else {
        node.left = new TreeNode(val)
      }
    } else {
      if(node.right) {
        dfs(node.right)
      } else {
        node.right = new TreeNode(val)
      }
    }
  } 
};

// 141. 环形链表 快慢指针
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {
  if(!head || !head.next) {
    return false
  }
  let slow = head
  let fast = head.next;
  while(slow != fast) {
    if(!fast || !fast.next) {
      return false
    }
    slow = slow.next
    fast = fast.next.next

  }
  return true
};

// 142. 环形链表 II 与I 基本相同
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function(head) {
  if (head === null) {
      return null;
  }
  let slow = head, fast = head;
  while (fast !== null) {
      slow = slow.next;
      if (fast.next !== null) {
          fast = fast.next.next;
      } else {
          return null;
      }
      if (fast === slow) {
        break;
      }
  }
  let ptr = head;
  while (ptr !== slow) {
      ptr = ptr.next;
      slow = slow.next;
  }
  return ptr;
};

// 530. 二叉搜索树的最小绝对差 二叉树中序遍历
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var getMinimumDifference = function(root) {
  let res = Infinity;
  let back = null;
  dfs(root);
  function dfs(node) {
      if(node == null) {return};
      dfs(node.left);
      if(back != null) {
          res = Math.min(res,node.val - back.val);
      }
      back = node;
      dfs(node.right);
  }
  return res;
};

// 416. 分割等和子集 动态规划
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function(nums) {
  const n = nums.length;
  if (n < 2) {
      return false;
  }
  let sum = 0, maxNum = 0;
  for (const num of nums) {
      sum += num;
      maxNum = maxNum > num ? maxNum : num;
  }
  if (sum & 1) {
      return false;
  }
  const target = Math.floor(sum / 2);
  if (maxNum > target) {
      return false;
  }
  const dp = new Array(target + 1).fill(false);
  dp[0] = true;
  for (const num of nums) {
      for (let j = target; j >= num; --j) {
          dp[j] |= dp[j - num];
      }
  }
  return dp[target];
};

// 24. 两两交换链表中的节点 
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function(head) {
  let root = new ListNode(1);
  root.next = head;
  let node = root;
  while(node.next && node.next.next) {
    let tem  = node.next
    node.next = node.next.next
    tem.next =  tem.next.next
    node.next.next = tem
    node = node.next.next
  }
  return root.next
};

// 1002. 查找常用字符 统计合并最小值
/**
 * @param {string[]} A
 * @return {string[]}
 */
var commonChars = function(A) {
  var backArray = new Array(26).fill(100);
  for(let str of A) {
      var newBack = new Array(26).fill(0);
      for (let index = 0; index < str.length; index++) {
          var num = str.substr(index,1).charCodeAt() - 97;
          newBack[num] +=1;
      }
      for (let index = 0; index < backArray.length; index++) {
          backArray[index] = Math.min(backArray[index],newBack[index]);
      }
  }
  var result = [];
  for (let index = 0; index < backArray.length; index++) {
      var num = backArray[index];
      while(num > 0) {
          result.push(String.fromCharCode(97+index));
          num--;
      }
  }
  return result;
};


// 116. 填充每个节点的下一个右侧节点指针 二叉树层序遍历
/**
 * @param {Node} root
 * @return {Node}
 */
var connect = function(root) {
  if(!root) {
    return root
  }
  let backup = [root]
  while(backup.length > 0) {
    let next = null,newBackup = []
    for (let i = 0; i < backup.length; i++) {
      let node = backup[i]
      if(node.left) {
        newBackup.push(node.left)
      } 
      if(node.right) {
        newBackup.push(node.right)
      }
      if(next) {
        next.next = node;
      }
      next = node;
    }
    backup =newBackup;
  }
  return root
};

// 977. 有序数组的平方 双指针
/**
 * @param {number[]} A
 * @return {number[]}
 */
var sortedSquares = function(A) {
  let negative = -1;
  for (let i = 0; i < A.length; i++) {
    if(A[i] < 0) {
      negative = i
    } else {
      break;
    }
  }
  let res = [], i = negative,j =negative +1
  while(i >= 0  || j < A.length) {
    if(i < 0) {
      res.push(A[j]*A[j])
      j++
    } else if(j >= A.length) {
      res.push(A[i]*A[i])
      i--
    } else if(A[i]*A[i] < A[j]*A[j]) {
      res.push(A[i]*A[i])
      i--
    } else {
      res.push(A[j]*A[j])
      j++
    }
  }
  return res
};


// 19. 删除链表的倒数第N个节点 双指针
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
  let begain = new ListNode(1);
  begain.next = head;
  let fast = begain,slow = begain
  for (let i = 0; i < n; i++) {
    fast = fast.next;
  }
  while(fast.next) {
    fast = fast.next
    slow = slow.next
  }
  slow.next = slow.next.next
  return begain.next
    
};

// 844. 比较含退格的字符串 基础题
/**
 * @param {string} S
 * @param {string} T
 * @return {boolean}
 */
var backspaceCompare = function(S, T) {
  let newS = getrealStr(S)
  let newT = getrealStr(T)
  return newS == newT

  function getrealStr(str) {
    let res = []
    for (let i = 0; i < str.length; i++) {
      let char = str[i]
      if(char == '#') {
        res.pop()
      } else {
        res.push(char)
      }
    }
    return res.join('');
  }
};

// 143. 重排链表  数组存储
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {void} Do not return anything, modify head in-place instead.
 */
var reorderList = function(head) {
  if(!head) {return head}
  let backup = [],node = head;
  while(node.next) {
    backup.push(node.next);
    node = node.next
  }
  let isHead = false
  node = head
  while(backup.length > 0) {
    let inNode = null
    if(isHead) {
      inNode = backup.shift()
    } else {
      inNode = backup.pop()
    }
    inNode.next = null
    node.next = inNode
    node = node.next
    isHead = !isHead
  }
  return head;
};

// 925. 长按键入 双指针
/**
 * @param {string} name
 * @param {string} typed
 * @return {boolean}
 */
var isLongPressedName = function(name, typed) {
  let i = 0,j = 0
  while(i < name.length || j < typed.length) {
    if(name[i] == typed[j]) {
      i++
      j++
    } else if(typed[j] == typed[j-1]) {
      j++
    } else {
      return false
    }
  }
  return i == name.length
};

// 763. 划分字母区间  map记录
/**
 * @param {string} S
 * @return {number[]}
 */
var partitionLabels = function(S) {
  let backup = new Map()
  for (let i = 0; i < S.length; i++) {
    backup.set(S[i],i)
  }
  let res = [], start = -1, max = 0
  for (let i = 0; i < S.length; i++) {
    max = Math.max(max,backup.get(S[i]))
    if(max == i) {
      res.push(i - start)
      start = i
    }
  }
  return res;
};

// 234. 回文链表  双指针
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function(head) {
  const vals = [];
  while (head !== null) {
      vals.push(head.val);
      head = head.next;
  }
  for (let i = 0, j = vals.length - 1; i < j; ++i, --j) {
      if (vals[i] !== vals[j]) {
          return false;
      }
  }
  return true;
};

// 1024. 视频拼接 动态规划，贪心算法更好
/**
 * @param {number[][]} clips
 * @param {number} T
 * @return {number}
 */
var videoStitching = function(clips, T) {
  let backup = new Array(T).fill(0)
  for (let i = 0; i < clips.length; i++) {
    let clip = clips[i]
    if(clip[0] < T) {
      backup[clip[0]] = Math.max(backup[clip[0]],clip[1])
    }
  }
  let last = 0,pre = 0,ret = 0
  for (let i = 0; i < T; i++) {
    last = Math.max(last,backup[i])
    if(i == last) {
      return -1
    }
    if(i == pre) {
      ret++
      pre = last;
    }
  }
  return ret
};

// 845. 数组中的最长山脉  先找到山峰 再计算
/**
 * @param {number[]} A
 * @return {number}
 */
var longestMountain = function (A) {
  let res = 0
  for(let i=1;i<A.length-1;i++) {
      if(A[i] > A[i-1] && A[i] > A[i+1]) {
          let len = i
          let count = 1
          while(A[len] > A[len-1] && len > 0) {
              count++
              len--
          }
          len = i
          while(A[len] > A[len+1] && len < A.length) {
              count++
              len++
          }
          res = res > count ? res : count
      }
  }
  return res
};

// 1365. 有多少小于当前数字的数字 基础题
/**
 * @param {number[]} A
 * @return {number}
 */
var smallerNumbersThanCurrent = function(nums) {
  const cnt = new Array(101).fill(0);
  const n = nums.length;
  for (let i = 0; i < n; ++i) {
      cnt[nums[i]] += 1;
  }
  for (let i = 1; i <= 100; ++i) {
      cnt[i] += cnt[i - 1];
  }
  const ret = [];
  for (let i = 0; i < n; ++i) {
      ret.push(nums[i] ? cnt[nums[i] - 1] : 0);
  }
  return ret;
};

// 144. 二叉树的前序遍历 基础逻辑
/** 
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal = function(root) {
  let res = []
  if(!root) {
    return res
  }
  let backup = [],node = root
  while(backup.length > 0 || node) {
    while(node != null) {
      res.push(node.val)
      backup.push(node)
      node = node.left
    }
    node = backup.pop()
    node = node.right
  }
  return res
};


// 1207. 独一无二的出现次数  基础题
/**
 * @param {number[]} arr
 * @return {boolean}
 */
var uniqueOccurrences = function(arr) {
  let backMap = new Map()
  for (let num of arr) {
     backMap.set(num,(backMap.get(num)||0) + 1);
  }
  let backMap2 = new Map();
  for(let item of backMap) {
      if(backMap2.get(item[1])) {
          return false;
      } 
      backMap2.set(item[1],1)
  }
  return true;
};

// 129. 求根到叶子节点数字之和
/**
 * @param {TreeNode} root
 * @return {number}
 */
var sumNumbers = function(root) {
  let backup = [],res = 0
  if(!root) {
    return 0
  }
  dfs(root)
  return res
  function dfs(node) {
    backup.push(node.val)
    if(!node.left && !node.right) {
      res += Number.parseInt(backup.join(''))
    }
    if(node.left) {
      dfs(node.left)
    }
    if(node.right) {
      dfs(node.right)
    }
    backup.pop()
  }
};

// 463. 岛屿的周长  基本逻辑
/**
 * @param {number[][]} grid
 * @return {number}
 */
var islandPerimeter = function(grid) {
  let res = 0
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if(grid[i][j] == 1) {
        res += 4;
        if( 0 <= (i-1) &&grid[i-1][j] == 1) {
          res--
        }
        if(grid.length > (i+1) &&grid[i+1][j] == 1) {
          res--
        }
        if( (j-1) >= 0 &&grid[i][j-1] == 1) {
          res--
        }
        if((j+1) < grid[i].length && grid[i][j+1] ==1) {
          res--
        }
      }
    }
  }
  return res
};

// 349. 两个数组的交集  基础题
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function(nums1, nums2) {
  let backup1 = new Map()
  for (let num  of nums1) {
    backup1.set(num,1)
  }
  let resBack = new Map(),res = []
  for (let num of nums2) {
    if(backup1.get(num)) {
      resBack.set(num,1)
    }
  }
  for (let item of resBack) {
    res.push(item[0])
  }
  return res
};

// LCP 07. 传递信息 动态规划
let numWays = (n, relation, k)=> {
  let dp = new Array(k+1).fill(0).map(()=>new Array(n+1).fill(0))
  dp[0][0] = 1
  for(let i=1; i<= k; i++){
      for(let r of relation){
          dp[i][r[1]] += dp[i - 1][r[0]]
      }
  }
  return dp[k][n - 1]
};

// 剑指 Offer 29. 顺时针打印矩阵  基础题
var spiralOrder = function(matrix) {
  if (matrix.length == 0) return [];
  const res = [];

  let top = 0;
  let bottom = matrix.length - 1;
  let left = 0;
  let right = matrix[0].length - 1;

  while (top <= bottom && left <= right) {
    for (let i = left; i <= right; i++) {
      res.push(matrix[top][i]);
    }
    top++;
    for (let i = top; i <= bottom; i++) {
      res.push(matrix[i][right]);
    }
    right--;

    if (top > bottom || left > right) break;

    for (let i = right; i >= left; i--) {
      res.push(matrix[bottom][i]);
    }
    bottom--;
    for (let i = bottom; i >= top; i--) {
      res.push(matrix[i][left]);
    }
    left++;
  }
  return res;
};

// 941. 有效的山脉数组 基础题
/**
 * @param {number[]} A
 * @return {boolean}
 */
var validMountainArray = function(A) {
  let N = A.length ,i = 0
  while(i+1 < N && A[i] < A[i+1]) {
    i++
  }
  if(i == 0 || i == N-1) {
    return false
  }
  while(i+1 < N && A[i] > A[i+1]) {
    i++
  }
  return i == (N-1)
};
// 57. 插入区间 逻辑题
/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
var insert = function(intervals, newInterval) {
  const res = [];
  let i = 0;
  const len = intervals.length;

  while (i < len && intervals[i][1] < newInterval[0]) { 
    res.push([intervals[i][0], intervals[i][1]]);
    i++;
  }
  while (i < len && intervals[i][0] <= newInterval[1]) { 
    newInterval[0] = Math.min(intervals[i][0], newInterval[0]); 
    newInterval[1] = Math.max(intervals[i][1], newInterval[1]); 
    i++;
  }
  res.push([newInterval[0], newInterval[1]]); 

  while (i < len) {               
    res.push([intervals[i][0], intervals[i][1]]);
    i++;
  }
  
  return res;
}
// 1603. 设计停车系统 基础题
/**
 * @param {number} big
 * @param {number} medium
 * @param {number} small
 */
var ParkingSystem = function(big, medium, small) {
  this.small = small
  this.medium = medium
  this.big = big
};

/** 
* @param {number} carType
* @return {boolean}
*/
ParkingSystem.prototype.addCar = function(carType) {
 switch(carType){
     case 1:
          this.big--
          return this.big >=0
      break;
     case 2:
          this.medium--
          return this.medium >=0
      break;
     case 3:
          this.small--
          return this.small >=0
      break; 
 }
};


// 1356. 根据数字二进制下 1 的数目排序 基础题
function sortByBits(arr) {
  function countBits(n) {
    let count = 0;
    while (n != 0) {
      count += (n & 1);
      n >>= 1;
    }
    return count;
  }

  arr.sort((a, b) => {
    return countBits(a) - countBits(b) || a - b;
  });
  return arr;
}

// 122. 买卖股票的最佳时机 II 贪心算法
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    let ans = 0;
    for (let i = 0; i < prices.length -1; i++) {
      ans += Math.max(prices[i+1] - prices[i],0);
    }
    return ans
};


// 973. 最接近原点的 K 个点  基础题
var kClosest = function(points, K) {
  return points.map(ele => {
      return {
          after: ele[0] * ele[0] + ele[1] * ele[1],
          before: ele
      }
  }).sort((a, b) => {
      return a.after - b.after
  }).slice(0, K).map(ele => ele.before);
};

// 1491. 去掉最低工资和最高工资后的工资平均值 基础题

/**
 * @param {number[]} salary
 * @return {number}
 */
var average = function(salary) {
  let max = salary[0]
  let min = salary[1]
  let sum = 0
  for (let i = 0; i < salary.length; i++) {
    sum +=salary[i]
    max = Math.max(max,salary[i])
    min = Math.min(min,salary[i])
  }
  return (sum - max -min)/(salary.length -2)
};

// 31. 下一个排列  基础题
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var nextPermutation = function(nums) {
  let i = nums.length - 2
  while(i>= 0 && nums[i] >= nums[i+1]) {
    i--
  }
  if(i >= 0) {
    let j = nums.length -1 
    while(j>= 0 && nums[i] >= nums[j]) {
      j--;
    }
    swap(i,j)
  }
  reverse(i+1,nums.length)

  function reverse(i) {
    let left = i ,right = nums.length -1 
    while(left <right) {
      swap(left,right)
      left++
      right--
    }

  }
  function swap(i, j) {
    let t = nums[i];
    nums[i] = nums[j];
    nums[j] = t;
  }
};

// 1486. 数组异或操作
/**
 * @param {number} n
 * @param {number} start
 * @return {number}
 */
var xorOperation = function(n, start) {

};

// 1486. 数组异或操作 基础题
/**
 * @param {number} n
 * @param {number} start
 * @return {number}
 */
var xorOperation = function(n, start) {
  let ans = 0
  for (let i = 0; i < n; i++) {
    ans ^=(start + i*2)
  }
  return ans;
};

// 922. 按奇偶排序数组 II 基础题
/**
 * @param {number[]} A
 * @return {number[]}
 */
var sortArrayByParityII = function(A) {
  let res =  Array(A.length)
  let i = 0,j = 1;
  for (let index = 0; index < A.length; index++) {
    let num = A[index]
    if(num%2 == 0) {
      res[i] = num
      i += 2
    } else {
      res[j] = num
      j += 2
    }
  }
  return res
};

// 328. 奇偶链表  基础逻辑题 遍历
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var oddEvenList = function(head) {
  let newhead1 = new ListNode(0)
  let newhead2 = new ListNode(0)
  let i = newhead1,j = newhead2, num = 0
  let next = head
  while(next) {
    let node =  next
     next = next.next;
     node.next = null
    if(num %2 == 0) {
      i.next = node;
      i = i.next
    } else {
      j.next = node
      j = j.next
    }
    num++
  }
  i.next = newhead2.next
  newhead2.next = null
  return newhead1.next;
};

// 1122. 数组的相对排序 基础题
/**
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @return {number[]}
 */
var relativeSortArray = function(arr1, arr2) {

  let backup = new Map()
  for (let i = 0; i < arr2.length; i++) {
    backup.set(arr2[i],i)
  }
  arr1.sort((a,b) =>{
    if(backup.get(a) != null && backup.get(b) != null) {
      return backup.get(a) - backup.get(b)
    } else if(backup.get(a)!= null) {
      return -1
    } else if(backup.get(b)!= null) {
      return 1
    } else {
      return a - b 
    }
  })
  return arr1
};
 
//  402. 移掉K位数字 贪心算法
/** 
 * @param {string} num
 * @param {number} k
 * @return {string}
 */
var removeKdigits = function(num, k) {
  const stk = [];
  for (const digit of num) {
      while (stk.length > 0 && stk[stk.length - 1] > digit && k) {
          stk.pop();
          k -= 1;
      }
      stk.push(digit);
  }

  for (; k > 0; --k) {
      stk.pop();
  }

  let ans = "";
  let isLeadingZero = true;
  for (const digit of stk) {
      if (isLeadingZero && digit === '0') {
          continue;
      }
      isLeadingZero = false;
      ans += digit;
  }
  return ans === "" ? "0" : ans;
};

// 406. 根据身高重建队列 高到低然后一个个按照位置添加即可
/**
 * @param {number[][]} people
 * @return {number[][]}
 */
var reconstructQueue = function(people) {
  let ans=[];
  if(!people||!people.length){return []}
  people.sort((a,b)=>{
      if(a[0]===b[0]){
          return a[1]-b[1]
      }else{
          return b[0]-a[0]
      }
  })
  people.forEach(item=>{
      ans.splice(item[1],0,item)
  })
  return ans;
};

// 1030. 距离顺序排列矩阵单元格 BFS
/**
 * @param {number} R
 * @param {number} C
 * @param {number} r0
 * @param {number} c0
 * @return {number[][]}
 */
var allCellsDistOrder = function (R, C, r0, c0) {
  const res = [];
  const visited = new Array(R);
  for (let i = 0; i < R; i++) {
      visited[i] = new Array(C).fill(false);
  }

  const queue = [[r0, c0]];
  visited[r0][c0] = true;

  while (queue.length) {
      const cur = queue.shift();
      const x = cur[0], y = cur[1];
      res.push(cur);

      if (x - 1 >= 0 && !visited[x - 1][y]) {
          queue.push([x - 1, y]);
          visited[x - 1][y] = true;
      }
      if (y - 1 >= 0 && !visited[x][y - 1]) {
          queue.push([x, y - 1]);
          visited[x][y - 1] = true;
      }
      if (x + 1 < R && !visited[x + 1][y]) {
          queue.push([x + 1, y]);
          visited[x + 1][y] = true;
      }
      if (y + 1 < C && !visited[x][y + 1]) {
          queue.push([x, y + 1]);
          visited[x][y + 1] = true;
      }
  }
  return res;
};


// 134. 加油站 逻辑题
/**
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */
var canCompleteCircuit = function(gas, cost) {
  const n = gas.length;
  let i = 0;
  while (i < n) {
      let sumOfGas = 0, sumOfCost = 0;
      let cnt = 0;
      while (cnt < n) {
          const j = (i + cnt) % n;
          sumOfGas += gas[j];
          sumOfCost += cost[j];
          if (sumOfCost > sumOfGas) {
              break;
          }
          cnt++;
      }
      if (cnt === n) {
          return i;
      } else {
          i = i + cnt + 1;
      }
  }
  return -1;
};

// 283. 移动零 双指针
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function(nums) {
  let i = 0,j= 0,n = nums.length
  while(j < n) {
    if(nums[j] != 0) {
      swap(i,j)
      i++
    }
    j++
  }

  function swap(a,b) {
    let temp = nums[a]
    nums[a] = nums[b]
    nums[b] = temp
  }
};
// 147. 对链表进行插入排序 基础逻辑
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var insertionSortList = function(head) {
  if (head === null) {
      return head;
  }
  const dummyHead = new ListNode(0);
  dummyHead.next = head;
  let lastSorted = head, curr = head.next;
  while (curr !== null) {
      if (lastSorted.val <= curr.val) {
          lastSorted = lastSorted.next;
      } else {
          let prev = dummyHead;
          while (prev.next.val <= curr.val) {
              prev = prev.next;
          }
          lastSorted.next = curr.next;
          curr.next = prev.next;
          prev.next = curr;
      }
      curr = lastSorted.next;
  }
  return dummyHead.next;
};

// 148. 排序链表 递归
var sortList = function(head) {
  return toSortList(head, null);

  function toSortList (head, tail) {
    if (head === null) {
        return head;
    }
    if (head.next === tail) {
        head.next = null;
        return head;
    }
    let slow = head, fast = head;
    while (fast !== tail) {
        slow = slow.next;
        fast = fast.next;
        if (fast !== tail) {
            fast = fast.next;
        }
    }
    const mid = slow;
    return merge(toSortList(head, mid), toSortList(mid, tail));
  }

  function merge (head1, head2) {
    const dummyHead = new ListNode(0);
    let temp = dummyHead, temp1 = head1, temp2 = head2;
    while (temp1 !== null && temp2 !== null) {
        if (temp1.val <= temp2.val) {
            temp.next = temp1;
            temp1 = temp1.next;
        } else {
            temp.next = temp2;
            temp2 = temp2.next;
        }
        temp = temp.next;
    }
    if (temp1 !== null) {
        temp.next = temp1;
    } else if (temp2 !== null) {
        temp.next = temp2;
    }
    return dummyHead.next;
  }
};

// 242. 有效的字母异位词 map 记录
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
  if(s.length != t.length) {return false};
  let backup = new Map();
  for (let index = 0; index < s.length; index++) {
      let key  = s[index];
      backup.set(key,backup.get(key)== null ? 1: backup.get(key) + 1)
  }
  for (let index = 0; index < t.length; index++) {
      let key  = t[index];
      let num = backup.get(key)
      if(num == null) {
          return false;
      } else if( num == 1) {
          backup.delete(key);
      }else {
          backup.set(key,num - 1);
      }
  }
  return true;
};


// 452. 用最少数量的箭引爆气球  排序+ 贪心算法
/**
 * @param {number[][]} points
 * @return {number}
 */
var findMinArrowShots = function(points) {
  if (!points.length ) {
      return 0;
  }

  points.sort((a, b) => a[1] - b[1]);
  let pos = points[0][1]
  let ans = 1;
  for (let balloon of points) {
      if (balloon[0] > pos) {
          pos = balloon[1];
          ans++;
      }
  }
  return ans;
};

// 222. 完全二叉树的节点个数  递归
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var countNodes = function(root) {
  if(!root) {
    return 0
  }
  return countNodes(root.left) + countNodes(root.right) + 1
};

// 1370. 上升下降字符串 基础逻辑来回遍历
/**
 * @param {string} s
 * @return {string}
 */
var sortString = function(s) {
  const num = new Array(26).fill(0);
  for (let ch of s) {
      num[ch.charCodeAt() - 'a'.charCodeAt()]++;
  }

  let ret = '';
  while (ret.length < s.length) {
      for (let i = 0; i < 26; i++) {
          if (num[i]) {
              ret += String.fromCharCode(i + 'a'.charCodeAt());
              num[i]--;
          }
      }
      for (let i = 25; i >= 0; i--) {
          if (num[i]) {
              ret += String.fromCharCode(i + 'a'.charCodeAt());
              num[i]--;
          }
      }
  }
  return ret;
};
// 164. 最大间距  排序 可以用 桶排序
/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumGap = function(nums) {
    let n = nums.length;
    if(n < 2) return 0;
    nums = nums.sort((a,b) => a - b);
    let max = -1;
    for(let j = 1;j < n;j++){
        let val = nums[j] - nums[j-1];
        if(val > max){
            max = val;
        }
    }
    return max;
};

// 454. 四数相加 II 分两组计算 
var fourSumCount = function(A, B, C, D) {
  const countAB = new Map();
  A.forEach(u => B.forEach(v => countAB.set(u + v, (countAB.get(u + v) || 0) + 1)));
  let ans = 0; 
  for (let u of C) {
      for (let v of D) {
          if (countAB.has(-u - v)) {
              ans += countAB.get(-u - v);
          }
      }
  }
  return ans;
};

// 893. 特殊等价字符串组 基础逻辑
var numSpecialEquivGroups = function(A) {
  let arr = [];
  for(let i=0; i<A.length; i++) {
      let curOdd = [],
          curEven = [];
      for(let j=0; j<A[i].length; j++) {
          if(j%2 === 0) {
              curEven.push(A[i][j]);
          } else {
              curOdd.push(A[i][j]);
          }
      }
      curOdd.sort((a, b) => a.localeCompare(b))
      curEven.sort((a, b) => a.localeCompare(b))
      arr.push(curEven.join('')+curOdd.join(''))
  }
  return [...new Set(arr)].length
};

// 976. 三角形的最大周长 基础题  贪心
/**
 * @param {number[]} A
 * @return {number}
 */
var largestPerimeter = function(A) {
  A.sort((a, b) => a - b);
  for (let i = A.length - 1; i >= 2; --i) {
      if (A[i - 2] + A[i - 1] > A[i]) {
          return A[i - 2] + A[i - 1] + A[i];
      }
  }
  return 0;
};

// 767. 重构字符串 贪心算法
/**
 * @param {string} S
 * @return {string}
 */
var reorganizeString = function(S) {
    if (S.length < 2) {
        return S;
    }
    const counts = new Array(26).fill(0);
    let maxCount = 0;
    const length = S.length;
    for (let i = 0; i < length; i++) {
        const c = S.charAt(i);
        counts[getIdx(c)]++;
        maxCount = Math.max(maxCount, counts[getIdx(c)]);
    }
    if (maxCount > Math.floor((length + 1) / 2)) {
        return "";
    }
    const reorganizeArray = new Array(length);
    let evenIndex = 0, oddIndex = 1;
    const halfLength = Math.floor(length / 2);
    for (let i = 0; i < 26; i++) {
        const c = getAlpha('a'.charCodeAt() + i);
        while (counts[i] > 0 && counts[i] <= halfLength && oddIndex < length) {
            reorganizeArray[oddIndex] = c;
            counts[i]--;
            oddIndex += 2;
        }
        while (counts[i] > 0) {
            reorganizeArray[evenIndex] = c;
            counts[i]--;
            evenIndex += 2;
        }
    }
    return reorganizeArray.join('');

    function getIdx(c) {
      return c.charCodeAt() - 'a'.charCodeAt()
    } 
    function getAlpha(c) {
      return String.fromCharCode(c)
    }
};

// 34. 在排序数组中查找元素的第一个和最后一个位置 二分查找
var searchRange = function(nums, target) {
  let ans = [-1, -1];
  const leftIdx = binarySearch(nums, target, true);
  const rightIdx = binarySearch(nums, target, false) - 1;
  if (leftIdx <= rightIdx && rightIdx < nums.length && nums[leftIdx] === target && nums[rightIdx] === target) {
      ans = [leftIdx, rightIdx];
  } 
  return ans;

  function binarySearch (nums, target, lower)  {
    let left = 0, right = nums.length - 1, ans = nums.length;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (nums[mid] > target || (lower && nums[mid] >= target)) {
            right = mid - 1;
            ans = mid;
        } else {
            left = mid + 1;
        }
    }
    return ans;
  }
};

// 999. 可以被一步捕获的棋子数 基础题 
var numRookCaptures = function(board) {
  let cnt = 0, st = 0, ed = 0;
  const dx = [0, 1, 0, -1];
  const dy = [1, 0, -1, 0];

  for (let i = 0; i < 8; ++i) {
      for (let j = 0; j < 8; ++j) {
          if (board[i][j] == 'R') {
              st = i;
              ed = j;
              break;
          }
      }
  }
  for (let i = 0; i < 4; ++i) {
      for (let step = 0;; ++step) {
          const tx = st + step * dx[i];
          const ty = ed + step * dy[i];
          if (tx < 0 || tx >= 8 || ty < 0 || ty >= 8 || board[tx][ty] == 'B') {
              break;
          }
          if (board[tx][ty] == 'p') {
              cnt++;
              break;
          }
      }
  }
  return cnt;
};
// 204. 计数质数 基础题
/**
 * @param {number} n
 * @return {number}
 */
var countPrimes = function(n) {
  const isPrime = new Array(n).fill(1);
  const primes = [];
  for (let i = 2; i < n; ++i) {
      if (isPrime[i]) {
          primes.push(i);
      }
      for (let j = 0; j < primes.length && i * primes[j] < n; ++j) {
          isPrime[i * primes[j]] = 0;
          if (i % primes[j] === 0) {
              break;
          }
      }
  }
  return primes.length;
};
 
// 659. 分割数组为连续子序列 贪心
var isPossible = function(nums) {
  const countMap = new Map();
  const endMap = new Map();
  for (const x of nums) {
      const count = (countMap.get(x) || 0) + 1;
      countMap.set(x, count);
  }
  for (const x of nums) {
      const count = countMap.get(x) || 0;
      if (count > 0) {
          const prevEndCount = endMap.get(x - 1) || 0;
          if (prevEndCount > 0) {
              countMap.set(x, count - 1);
              endMap.set(x - 1, prevEndCount - 1);
              endMap.set(x, (endMap.get(x, 0) || 0) + 1);
          } else {
              const count1 = countMap.get(x + 1, 0);
              const count2 = countMap.get(x + 2, 0);
              if (count1 > 0 && count2 > 0) {
                  countMap.set(x, count - 1);
                  countMap.set(x + 1, count1 - 1);
                  countMap.set(x + 2, count2 - 1);
                  endMap.set(x + 2, (endMap.get(x + 2) || 0) + 1);
              } else {
                  return false;
              }
          }
      }
  }
  return true;
};

// 118. 杨辉三角 基础题
/**
 * @param {number} numRows
 * @return {number[][]}
 */
var generate = function(numRows) {
  if(numRows == 0) {
    return []
  } 
  let backup = [1],start = 1,res = [[1]]
  while (start < numRows) {
    let newBackup  = [1]
    for (let i = 1; i < backup.length; i++) {
      newBackup.push(backup[i -1]+backup[i])
    }
    newBackup.push(1);
    res.push(newBackup)
    backup = newBackup;
    start++;
  }
  return res
};
// 621. 任务调度器 贪心
/**
 * @param {character[]} tasks
 * @param {number} n
 * @return {number}
 */
var leastInterval = function(tasks, n) {
  let newBack = new Map()
  for (let i = 0; i < tasks.length; i++) {
    let key = tasks[i];
    newBack.set(key,(newBack.get(key) || 0)+1)
  }
  let maxNum = 0,maxCount = 1;
  for(let item of newBack) {
    let num = item[1]
    if(num >  maxNum) {
      maxNum = num;
      maxCount = 1
    } else if(num == maxNum) {
      maxCount++
    } 
  }
  return Math.max((maxNum -1)*(n+1)+ maxCount,tasks.length)

};

// 861. 翻转矩阵后的得分  贪心算法
/**
 * @param {number[][]} A
 * @return {number}
 */
var matrixScore = function(A) {
  const m = A.length, n = A[0].length;
  let ret = m * (1 << (n - 1));

  for (let j = 1; j < n; j++) {
      let nOnes = 0;
      for (let i = 0; i < m; i++) {
          if (A[i][0] === 1) {
              nOnes += A[i][j];
          } else {
              nOnes += (1 - A[i][j]); 
          }
      }
      const k = Math.max(nOnes, m - nOnes);
      ret += k * (1 << (n - j - 1));
  }
  return ret;
};

// 842. 将数组拆分成斐波那契序列  回朔 剪枝
var splitIntoFibonacci = function(S) {
  const list = new Array().fill(0);
  backtrack(list, S, S.length, 0, 0, 0);
  return list;
};

const backtrack = (list, S, length, index, sum, prev) => {
  if (index === length) {
      return list.length >= 3;
  }
  let currLong = 0;
  for (let i = index; i < length; i++) {
      if (i > index && S[index] === '0') {
          break;
      }
      currLong = currLong * 10 + S[i].charCodeAt() - '0'.charCodeAt();
      if (currLong > Math.pow(2, 31) - 1) {
          break;
      }
      let curr = currLong;
      if (list.length >= 2) {
          if (curr < sum) {
              continue;
          } else if (curr > sum) {
              break;
          }
      }
      list.push(curr);
      if (backtrack(list, S, length, i + 1, prev + curr, curr)) {
          return true;
      } else {
          list.splice(list.length - 1, 1);
      }
  }
  return false;
}

// 62. 不同路径 组合
/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function(m, n) {
  let ans = 1;
  for (let x = n, y = 1; y < m; ++x, ++y) {
      ans = Math.floor(ans * x / y);
  }
  return ans;
};

// 860. 柠檬水找零  基础题
/**
 * @param {number[]} bills
 * @return {boolean}
 */
var lemonadeChange = function(bills) {
  let num1 = 0,num2 = 0
  for (let i = 0; i < bills.length; i++) {
    const bill = bills[i];
    if(bill == 5) {
      num1++;
    } else if(bill == 10) {
      if(num1 > 0) {
        num1--
        num2++
      } else {
        return false
      }
    } else if(bill == 20) {
      if(num2 > 0 && num1 > 0) {
        num1--;
        num2--;
      } else if(num1 > 2) {
        num1 = num1 -3
      } else {
        return false
      }
    } else {
      return false
    }
    
  }
  return true
};

// 649. Dota2 参议院 循环队列
/**
 * @param {string} senate
 * @return {string}
 */
var predictPartyVictory = function(senate) {
  const n = senate.length
  let Rarray = [],Darray = []
  for (let i = 0; i < senate.length; i++) {
    if(senate[i] == 'R') {
      Rarray.push(i)
    } else {
      Darray.push(i)
    }
  }
  while(Rarray.length  && Darray.length) {
    if(Rarray[0] < Darray[0]) {
      Rarray.push(Rarray[0] + n)
    } else {
      Darray.push(Darray[0] + n)
    }
    Darray.shift()
    Rarray.shift()
  }
  return Rarray.length ? "Radiant" : "Dire"
};

// 217. 存在重复元素 map映射
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function(nums) {
  let map = new Map()
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i]
    if(!map.get(num)) {
      map.set(num,true)
    } else {
      return true
    }
  }
  return false
};

// 49. 字母异位词分组 排序  或者哈希
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
  const map = new Map();
  for (let str of strs) {
      let array = Array.from(str);
      array.sort();
      let key = array.toString();
      let list = map.get(key) ? map.get(key) : new Array();
      list.push(str);
      map.set(key, list);
  }
  return Array.from(map.values());
};

// 376. 摆动序列  动态规划
/**
 * @param {number[]} nums
 * @return {number}
 */
var wiggleMaxLength = function(nums) {
  const n = nums.length;
  if(n < 2) return n
  const up = new Array(n).fill(0)
  const down = new Array(n).fill(0)
  up[0] = down[0] = 1
  for (let i = 1; i < n; i++) {
    if(nums[i] > nums[i-1]) {
      up[i] = Math.max(up[i -1],down[i-1]+1)
      down[i] = down[i-1]
    } else if(nums[i] < nums[i-1]){
      up[i] = up[i -1]
      down[i] = Math.max(down[i-1],up[i-1]+1)
    } else {
      up[i] = up[i -1]
      down[i] = down[i-1]
    }
  }
  return Math.max(up[n -1],down[n-1])
};

// 738. 单调递增的数字  贪心算法
/**
 * @param {number} N
 * @return {number}
 */
var monotoneIncreasingDigits = function(N) {
  const strN = N.toString().split('').map(v => +v);
  let i = 1;
  while (i < strN.length && strN[i - 1] <= strN[i]) {
      i += 1;
  }
  if (i < strN.length) {
      while (i > 0 && strN[i - 1] > strN[i]) {
          strN[i - 1] -= 1;
          i -= 1;
      }
      for (i += 1; i < strN.length; ++i) {
          strN[i] = 9;
      }
  }
  return parseInt(strN.join(''));
};

// 290. 单词规律  双映射
/**
 * @param {string} pattern
 * @param {string} s
 * @return {boolean}
 */
var wordPattern = function(pattern, s) {
  const word2ch = new Map();
  const ch2word = new Map();
  const words = s.split(' ');
  if (pattern.length !== words.length) {
      return false;
  }
  for (const [i, word] of words.entries()) {
      const ch = pattern[i];
      if (word2ch.has(word) && word2ch.get(word) != ch || ch2word.has(ch) && ch2word.get(ch) !== word) {
          return false;
      }
      word2ch.set(word, ch);
      ch2word.set(ch, word);
  }
  return true;
};

// 714. 买卖股票的最佳时机含手续  动态规划
/**
 * @param {number[]} prices
 * @param {number} fee
 * @return {number}
 */
var maxProfit = function(prices, fee) {
  if(prices.length == 0) {
    return 0
  }
  let buy = -1*prices[0]
  let sell = 0
  for (let i = 1; i < prices.length; i++) {
    let newSell =  Math.max(sell,buy + prices[i] - fee)
    let newBuy = Math.max(buy,sell - prices[i])
    sell = newSell
    buy = newBuy
  }
  return sell;
};

// 389. 找不同  基础题
/**
 * @param {string} s
 * @param {string} t
 * @return {character}
 */
var findTheDifference = function(s, t) {
  let num = 0;
  for (let index = 0; index < t.length - 1; index++) {
      num = num + t[index].charCodeAt()  - s[index].charCodeAt();
  }
  num += t[t.length -1].charCodeAt();
  return String.fromCharCode(num);
};


// 48. 旋转图像 先水平翻转 再对角线翻转
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function(matrix) {
  const n = matrix.length;
  // 水平翻转
  for (let i = 0; i < Math.floor(n / 2); i++) {
      for (let j = 0; j < n; j++) {
          [matrix[i][j], matrix[n - i - 1][j]] = [matrix[n - i - 1][j], matrix[i][j]];
      }
  }
  // 主对角线翻转
  for (let i = 0; i < n; i++) {
      for (let j = 0; j < i; j++) {
          [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
      }
  }
};

// 316. 去除重复字母  贪心 + 栈
/**
 * @param {string} s
 * @return {string}
 */
var removeDuplicateLetters = function(s) {
  const vis = new Array(26).fill(0);
  const num = _.countBy(s);
  
  const sb = new Array();
  for (let i = 0; i < s.length; i++) {
      const ch = s[i];
      if (!vis[ch.charCodeAt() - 'a'.charCodeAt()]) {
          while (sb.length > 0 && sb[sb.length - 1] > ch) {
              if (num[sb[sb.length - 1]] > 0) {
                  vis[sb[sb.length - 1].charCodeAt() - 'a'.charCodeAt()] = 0;
                  sb.pop();
              } else {
                  break;
              }
          }
          vis[ch.charCodeAt() - 'a'.charCodeAt()] = 1;
          sb.push(ch);
      }
      num[ch]--;
  }
  return sb.join('');
};

// 746. 使用最小花费爬楼梯 动态规划
/**
 * @param {number[]} cost
 * @return {number}
 */
var minCostClimbingStairs = function(cost) {
  const n = cost.length;
  let prev = 0, curr = 0;
  for (let i = 2; i <= n; i++) {
      let next = Math.min(curr + cost[i - 1], prev + cost[i - 2]);
      prev = curr;
      curr = next;
  }
  return curr;
};

// 103. 二叉树的锯齿形层序遍历  层序遍历
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var zigzagLevelOrder = function(root) {
  if(!root) {
    return []
  }
  let backup = [root],result = [], isObey = true
  while(backup.length > 0) {
    let  sub = [],newBackup = []
    for (let i = 0; i < backup.length; i++) {
      let node = backup[i]
      if(isObey) {
        sub.push(node.val)
      } else {
        sub.unshift(node.val)
      }
      if(node.left) {
        newBackup.push(node.left)
      }
      if(node.right) {
        newBackup.push(node.right)
      }
    }
    result.push(sub)
    isObey = !isObey
    backup = newBackup;
  }
  return result;
};

// 387. 字符串中的第一个唯一字符  基础题
/**
 * @param {string} s
 * @return {number}
 */
var firstUniqChar = function(s) {
  let backup =  new Map()
  for (let i = 0; i < s.length; i++) {
    const key =  s[i]
    backup.set(key,(backup.get(key)||0) + 1)
  }
  for (let i = 0; i < s.length; i++) {
    const key =  s[i]
    if(backup.get(key)== 1) {
      return i
    }
  }
  return -1
};

// 135. 分发糖果 贪心 两遍遍历
/**
 * @param {number[]} ratings
 * @return {number}
 */
var candy = function(ratings) {
  let leftArr = []
  for (let i = 0; i < ratings.length; i++) {
    if(i > 0 && ratings[i] > ratings[i-1]) {
      leftArr.push(leftArr[i-1] +1)
    } else {
      leftArr.push(1)
    }   
  }
  let right = 0,res = 0
  for (let i = ratings.length -1; i > -1 ;i--) {
    if(i< ratings.length -1 && ratings[i] > ratings[i+1]) {
      right++
    } else {
      right = 1;
    }
    res += Math.max(right,leftArr[i])
  }
  return res;
};
// 455. 分发饼干 排序 贪心算法
/**
 * @param {number[]} g
 * @param {number[]} s
 * @return {number}
 */
var findContentChildren = function(g, s) {
  g.sort((a,b) => a -b)
  s.sort((a,b) => a -b)
  let i = 0, j = 0,count = 0
  while(i<g.length && j < s.length) {
    if(s[j] >= g[i]) {
      i++;
      j++;
      count++;
    } else {
      j++
    }
  }
  return count;
};


// 1299. 将每个元素替换为右侧最大元素 反向遍历
/**
 * @param {number[]} arr
 * @return {number[]}
 */
var replaceElements = function(arr) {
  let max = -1, res = [];

  for (let i = arr.length - 1; i >= 0; i--) {
      res[i] = max;
      max = Math.max(max,arr[i]);
  }
  return res;
};

//  205. 同构字符串 双map 
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isIsomorphic = function(s, t) {
  const s2t = {};
  const t2s = {};
  const len = s.length;
  for (let i = 0; i < len; ++i) {
      const x = s[i], y = t[i];
      if ((s2t[x] && s2t[x] !== y) || (t2s[y] && t2s[y] !== x)) {
          return false;
      }
      s2t[x] = y;
      t2s[y] = x;
  }
  return true;
};

// 188. 买卖股票的最佳时机 IV  动态规划
/**
 * @param {number} k
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(k, prices) {
  if (!prices.length) {
      return 0;
  }

  const n = prices.length;
  k = Math.min(k, Math.floor(n / 2));
  const buy = new Array(k + 1).fill(0);
  const sell = new Array(k + 1).fill(0);

  [buy[0], sell[0]] = [-prices[0], 0]
  for (let i = 1; i < k + 1; ++i) {
      buy[i] = sell[i] = -Number.MAX_VALUE;
  }

  for (let i = 1; i < n; ++i) {
      buy[0] = Math.max(buy[0], sell[0] - prices[i]);
      for (let j = 1; j < k + 1; ++j) {
          buy[j] = Math.max(buy[j], sell[j] - prices[i]);
          sell[j] = Math.max(sell[j], buy[j - 1] + prices[i]); 
      }
  }

  return Math.max(...sell)
};

// 330. 按要求补齐数组  贪心算法
/**
 * @param {number[]} nums
 * @param {number} n
 * @return {number}
 */
var minPatches = function(nums, n) {
  let patches = 0;
  let x = 1;
  const length = nums.length;
  let index = 0;
  while(x <= n) {
    if(index < length && nums[index] <= x) {
      x += nums[index];
      index++
    } else {
      x *=2;
      patches++;
    }
  }
  return patches;
};

// 1046. 最后一块石头的重量   基础题

/**
 * @param {number[]} stones
 * @return {number}
 */
var lastStoneWeight = function(stones) {
  stones.sort((a, b) => a - b);
  while (stones.length > 1) {
      let newStone = Math.abs(stones[stones.length - 1] - stones[stones.length - 2]);
      stones = stones.slice(0, stones.length - 2);
      if (newStone) {
          stones.push(newStone);
      }
      for (let i = stones.length - 1; i > 0; i--) {
          if (stones[i] < stones[i - 1]) {
              const t = stones[i];
              stones[i] = stones[i - 1];
              stones[i - 1] = t;
          } else {
            break;
          }
      }
  }

  return stones[0] || 0;
};

// 435. 无重叠区间 贪心
/**
 * @param {number[][]} intervals
 * @return {number}
 */
var eraseOverlapIntervals = function(intervals) { 
  if(!intervals.length) {
    return 0;
  }
  intervals.sort((a,b)=>a[1]-b[1]);
  const n = intervals.length
  let right = intervals[0][1]
  let ans = 1
  for (let i = 0; i < n; i++) {
    if(intervals[i][0] >= right) {
      ans++;
      right = intervals[i][1];
    }
  }
  return n - ans;
};

// 605. 种花问题 贪心
/**
 * @param {number[]} flowerbed
 * @param {number} n
 * @return {boolean}
 */
var canPlaceFlowers = function(flowerbed, n) {
  if(n == 0) {
    return true
  }
  let  lastNO = true,k = n
  flowerbed.push(0)
  for (let i = 0; i < flowerbed.length -1; i++) {
    if(lastNO && flowerbed[i] == 0 && flowerbed[i+1] == 0) {
      k--;
      if(k == 0) {
        return true
      }
      lastNO = false
    } else if(flowerbed[i] == 0) {
      lastNO = true
    } else if (flowerbed[i] == 1) {
      lastNO = false
    }
  }
  return false

};

// 86. 分隔链表  基础逻辑
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} x
 * @return {ListNode}
 */
var partition = function(head, x) {
  let bigHead = new ListNode(0),bigNext = bigHead
  let smallHead = new ListNode(0),smallNext =  smallHead
  let next = head;
  while(next) {
    if(next.val < x) {
      smallNext.next = next
      next = next.next
      smallNext =  smallNext.next
      smallNext.next = null
    } else {
      bigNext.next = next
      next = next.next
      bigNext =  bigNext.next
      bigNext.next = null
    }
  }
  smallNext.next = bigHead.next;
  return smallHead.next;
};

// 509. 斐波那契数  基础动态规划
var fib = function(n) {
  if (n < 2) {
      return n;
  }
  let p = 0, q = 0, r = 1;
  for (let i = 2; i <= n; i++) {
      p = q;
      q = r;
      r = p + q;
  }
  return r;
};

// 830. 较大分组的位置 遍历 基础题
/**
 * @param {string} s
 * @return {number[][]}
 */
var largeGroupPositions = function(s) {

  let num = 1,res = []
  for (let i = 1; i <= s.length; i++) {
    if(i ==s.length || s[i] != s[i-1]) {
      if(num > 2) {
        res.push([i-num,i-1])
      }
      num = 1;
    } else {
      num++
    }
  }
  return res
};

// 399. 除法求值  dfs
/**
 * @param {string[][]} equations
 * @param {number[]} values
 * @param {string[][]} queries
 * @return {number[]}
 */
var calcEquation = function(equations, values, queries) {
  let ans = [],
      elen = equations.length,
      vlen = values.length,
      qlen = queries.length,
      matrix = [], // 矩阵
      map = {}; // 判断 queries 中的点是否存在于已知的图中
  
  // 创建有向图
  for (let i = 0; i < elen; i++) {
    let [start, end] = equations[i],
        val = values[i];
    
    if (matrix[start] === undefined) matrix[start] = [];
    if (matrix[end] === undefined) matrix[end] = [];
    
    matrix[start][end] = val;
    matrix[end][start] = 1 / val;
    
    if (map[ start ] === undefined) map[ start ] = 1;
    if (map[ end ] === undefined) map[ end ] = 1;
  }
  
  for (let i = 0; i < qlen; i++) {
    let [start, end] = queries[i];
    if (map[start] === undefined || map[end] === undefined) {
      ans.push( -1.0 );
      continue;
    }
    ans.push( dfs(start, end, []) );
  }
  
  // 搜索 A 到 B 的路径
  function dfs(A, B, visited) {
    if (A === B) return 1.0;
    
    visited[A] = 1
    
    let neighbors = matrix[A];
    
    let target = null;
    
    for (let key in neighbors) {
      let val = neighbors[key];
      if (visited[key] !== undefined) {
        continue;
      }
      
      let d = dfs(key, B, visited);
      
      if (d > 0) {
        target = d * matrix[A][key];
        break;
      }
    }
    
    return target || -1.0;
  }
  
  return ans;
}

// 547. 省份数量 连通
/**
 * @param {number[][]} M
 * @return {number}
 */
var findCircleNum = function(M) {
  class UF {
      constructor(num) {
          this.count = num;
          this.size = Array(num)
          this.parent = Array(num)
          for (let i = 0; i < num; i++) {
              this.parent[i] = i;
              this.size[i] = 1;
          }
      }
      union(p,q) {
          let rootP = this.find(p)
          let rootQ = this.find(q)
          if(rootP == rootQ) {
              return
          }
          if (this.size[rootP] > this.size[rootQ]) {
              this.parent[rootQ] = rootP;
              this.size[rootP] += this.size[rootQ];
          } else {
              this.parent[rootP] = rootQ;
              this.size[rootQ] += this.size[rootP];
          }
          this.count--
      }
      connected(p,q) {
          let rootP = this.find(p)
          let rootQ = this.find(q)
          return rootP == rootQ
      }
      find(x) {
          while(this.parent[x] != x) {
              // 进行路径压缩
              this.parent[x] = this.parent[this.parent[x]];
              x = this.parent[x];
          }
          return x;
      }
  }
  let n = M.length
  let uf = new UF(n);
  for (let i = 0; i < n; i++) {
      for (let j = 0; j < i; j++) {
          if (M[i][j] == 1)
              uf.union(i, j);
      }
  }
  return uf.count;
};
// 547. 省份数量  递归 dfs 
var findCircleNum = function(isConnected) {
  const provinces = isConnected.length;
  const visited = new Set();
  let circles = 0;
  for (let i = 0; i < provinces; i++) {
      if (!visited.has(i)) {
          dfs(isConnected, visited, provinces, i);
          circles++;
      }
  }
  return circles;
};

const dfs = (isConnected, visited, provinces, i) => {
  for (let j = 0; j < provinces; j++) {
      if (isConnected[i][j] == 1 && !visited.has(j)) {
          visited.add(j);
          dfs(isConnected, visited, provinces, j);
      }
  }
};

// 1128. 等价多米诺骨牌对的数量  基础题
/**
 * @param {number[][]} dominoes
 * @return {number}
 */
var numEquivDominoPairs = function(dominoes) {
  let backup = new Map()
  let res = 0
  for (let i = 0; i < dominoes.length; i++) {
    const nums = dominoes[i]
    let key  = nums[0] < nums[1] ? nums[0]*10 + nums[1] : nums[0] + nums[1]*10;
    let before = backup.get(key) || 0
    res += before
    backup.set(key,before+1)
  }
  return res
};

// 674. 最长连续递增序列 基础题
/**
 * @param {number[]} nums
 * @return {number}
 */
var findLengthOfLCIS = function(nums) {
  const num = nums.length;
  if(num < 2) {
    return num;
  }
  let res = 1, count = 1
  for (let i = 1; i < num; i++) {
    if(nums[i-1] < nums[i]) {
      count++
    } else {
      res = Math.max(res,count)
      count = 1
    }
  }
  res = Math.max(res,count)
  return res
};

// 724. 寻找数组的中心索引  基础题
/**
 * @param {number[]} nums
 * @return {number}
 */
var pivotIndex = function(nums) {
  var backArray = [];
  var sum = 0;
  for(let num of nums) {
      sum += num;
      backArray.push(sum);
  }
  if(sum - nums[0] == 0) {return 0; }
  for (let index = 1; index < nums.length; index++) {
      if(backArray[index-1] == sum - backArray[index]) {
          return index;
      }
  }
  return -1;
};

// 1631. 最小体力消耗路径  二分查找
/**
 * @param {number[][]} heights
 * @return {number}
 */
var minimumEffortPath = function(heights) {
  const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];

  const m = heights.length, n = heights[0].length;
  let left = 0, right = 999999, ans = 0;
  while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const queue = [[0, 0]];
      const seen = new Array(m * n).fill(0);
      seen[0] = 1;
      while (queue.length) {
          const [x, y] = queue.shift();
          for (let i = 0; i < 4; i++) {
              const nx = x + dirs[i][0];
              const ny = y + dirs[i][1];
              if (nx >= 0 && nx < m && ny >= 0 && ny < n && !seen[nx * n + ny] && Math.abs(heights[x][y] - heights[nx][ny]) <= mid) {
                  queue.push([nx, ny]);
                  seen[nx * n + ny] = 1;
              }
          }
      }
      if (seen[m * n - 1]) {
          ans = mid;
          right = mid - 1;
      } else {
          left = mid + 1;
      }
  }
  return ans;
};

// 888. 公平的糖果棒交换  基础题
/**
 * @param {number[]} A
 * @param {number[]} B
 * @return {number[]}
 */
var fairCandySwap = function(A, B) {
  var sumA = 0;
  var sumB = 0;
  var map = new Map()
  for(let num of A) { sumA += num}
  for(let num of B) { 
      sumB += num
      map.set(num,num);
  }
  var delta = (sumB - sumA)/2;

  for(let num of A) {
      if(map.get(delta + num)) {
          return [num,delta + num];
      }
  }
  return [];
};

// 424. 替换后的最长重复字符 双指针  最大窗口
/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var characterReplacement = function(s, k) {
  const num = new Array(26).fill(0);
  const n = s.length;
  let maxn = 0, left = 0, right = 0;

  while (right < n) {
      num[s[right].charCodeAt() - 'A'.charCodeAt()]++;
      maxn = Math.max(maxn, num[s[right].charCodeAt() - 'A'.charCodeAt()])
      if (right - left + 1 - maxn > k) {
          num[s[left].charCodeAt() - 'A'.charCodeAt()]--;
          left++;
      }
      right++;
  }
  return right - left;
};

// 480. 滑动窗口中位数  二分查找
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var medianSlidingWindow = function (nums, k) {
  let isOdd = k % 2;
  let arr = [];
  let res = [];
  let add = function (num) {
    let left = 0;
    let right = arr.length;
    while (left < right) {
      let mid = Math.floor((left + right) / 2);
      if (arr[mid] < num) {
        left = mid + 1
      } else {
        right = mid;
      }
    }
    arr.splice(left, 0, num);
  }
  let remove = function (num) {
    let left = 0;
    let right = arr.length - 1;
    while (left < right) {
      let mid = Math.floor((left + right) / 2);
      if (arr[mid] < num) {
        left = mid + 1
      } else {
        right = mid;
      }
    }
    arr.splice(left, 1);
  }
  for (let i = 0; i < k - 1; ++i) {
    add(nums[i])
  }
  for (let i = k - 1, len = nums.length; i < len; ++i) {
    add(nums[i])
    if (isOdd) {
      res.push(arr[(k - 1) / 2])
    } else {
      res.push((arr[k / 2] + arr[k / 2 - 1]) / 2)
    }
    remove(nums[i - k + 1])
  }
  return res;
};

// 643. 子数组最大平均数 I  基础题
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findMaxAverage = function(nums, k) {
  let result = -10000;
  let sum = 0;
  for (let index = 0; index < nums.length; index++) {
      sum += nums[index];
      if(index >= k) {
          sum -= nums[index - k];
      }
      if(index >= k - 1) {
          result = Math.max(sum/k,result);
      }
  }
  return result;
};

// 1208. 尽可能使字符串相等 双指针
/**
 * @param {string} s
 * @param {string} t
 * @param {number} maxCost
 * @return {number}
 */
var equalSubstring = function(s, t, maxCost) {
  let n =  s.length
  let diff =  new Array()
  for (let i = 0; i < n; i++) {
    diff.push(Math.abs(s[i].charCodeAt() - t[i].charCodeAt()))
  }
  let res = 0,start = 0,end = 0,sum = 0
  while(end < n) {
    sum +=diff[end]
    while(sum > maxCost) {
      sum -= diff[start]
      start++
    }
    res = Math.max(res, end - start + 1);
    end++;
  }
  return res
  
};

// 665. 非递减数列 基础题
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var checkPossibility = function(nums) {
  const n = nums.length;
  let cnt = 0;
  for (let i = 0; i < n - 1; ++i) {
      const x = nums[i], y = nums[i + 1];
      if (x > y) {
          cnt++;
          if (cnt > 1) {
              return false;
          }
          if (i > 0 && y < nums[i - 1]) {
              nums[i + 1] = x;
          }
      }
  }
  return true;
};

// 1423. 可获得的最大点数  窗口
/**
 * @param {number[]} cardPoints
 * @param {number} k
 * @return {number}
 */
var maxScore = function(cardPoints, k) {

  let sum = 0, bSum =0, minSum = 0

  for (let i = 0; i < cardPoints.length; i++) {
    let num = cardPoints[i]
    sum += num;
    if(i < cardPoints.length - k) {
      bSum += num
      minSum = bSum
    } else  {
      bSum -= cardPoints[i -cardPoints.length + k]
      minSum  = Math.min(bSum,minSum)
    }
  }
  return sum - minSum
};

// 978. 最长湍流子数组 双指针

/**
 * @param {number[]} arr
 * @return {number}
 */
var maxTurbulenceSize = function(arr) {
  const n = arr.length;
  let ret = 1;
  let left = 0, right = 0;

  while (right < n - 1) {
      if (left == right) {
          if (arr[left] == arr[left + 1]) {
              left++;
          }
          right++;
      } else {
          if (arr[right - 1] < arr[right] && arr[right] > arr[right + 1]) {
              right++;
          } else if (arr[right - 1] > arr[right] && arr[right] < arr[right + 1]) {
              right++;
          } else {
              left = right;
          }
      }
      ret = Math.max(ret, right - left + 1);
  }
  return ret;
};

// 992. K 个不同整数的子数组 把问题转化为最多包含K个不同整数的子区间的个数
/**
 * @param {number[]} A
 * @param {number} K 
 * @return {number}
 */
var subarraysWithKDistinct = function(A, K) {

  return atMostKDistinct(A,K) -  atMostKDistinct(A,K-1)
  // 最多包含 K 个不同整数的子区间的个数
  function atMostKDistinct(A,K) {
    let left = 0,right = 0,count = 0,res = 0
    let freq = new Array(A.length +1).fill(0)
    while(right < A.length) {
      if(freq[A[right]] == 0) {
        count++
      }
      freq[A[right]]++
      right++
      while(count > K) {
        freq[A[left]]--
        if(freq[A[left]] == 0) {
          count--;
        }
        left++;
      }
      res += right - left 
    }
    return res
  }
};

// 995. K 连续位的最小翻转次数  贪心 窗口 从左往右  翻转
var minKBitFlips = function(A, K) {
  const n = A.length;
  const diff = new Array(n + 1).fill(0);
  let ans = 0, revCnt = 0;
  for (let i = 0; i < n; i++) {
      revCnt += diff[i];
      if ((A[i] + revCnt) % 2 === 0) {
          if ((i + K) > n) {
              return -1;
          }
          ++ans;
          ++revCnt;
          --diff[i + K]
      }
  }
  return ans;
};

// 1004. 最大连续1的个数 III  双指针 
/**
 * @param {number[]} A
 * @param {number} K
 * @return {number}
 */
var longestOnes = function(A, K) {
  let left = 0, num = 0,ans = 0
  for (let i = 0; i < A.length; i++) {
    num += 1 - A[i]
    while(num >K) {
      if(A[left] == 0) {
        num --
      }
      left++
    }
    ans = Math.max(ans,i - left +1)
  }
  return ans;
};


// 697. 数组的度  哈希
/**
 * @param {number[]} nums
 * @return {number}
 */
var findShortestSubArray = function(nums) {
  let backup = new Map()
  for (let i = 0; i < nums.length; i++) {
    let key = nums[i]
    let arr = backup.get(key)
    if(arr) {
      backup.set(key,[arr[0]+1,arr[1],i])
    } else {
      backup.set(key,[1,i,i])
    }
  }
  let max = 0, res =0
  for(let item of backup.values()){
    if(item[0] > max) {
      max = item[0]
      res = item[2] -item[1] +1
    } else if(item[0] == max) {
      res = Math.min(res,item[2] -item[1] +1)
    }
  }
  return res
};

// 1052. 爱生气的书店老板  窗口
/**
 * @param {number[]} customers
 * @param {number[]} grumpy
 * @param {number} X
 * @return {number}
 */

var maxSatisfied = function(customers, grumpy, X) {
  let total = 0;
  const n = customers.length;
  for (let i = 0; i < n; i++) {
      if (grumpy[i] === 0) {
          total += customers[i];
      }
  }
  let increase = 0;
  for (let i = 0; i < X; i++) {
      increase += customers[i] * grumpy[i];
  }
  let maxIncrease = increase;
  for (let i = X; i < n; i++) {
      increase = increase - customers[i - X] * grumpy[i - X] + customers[i] * grumpy[i];
      maxIncrease = Math.max(maxIncrease, increase);
  }
  return total + maxIncrease;
};

// 766. 托普利茨矩阵 遍历比对
var isToeplitzMatrix = function(matrix) {
  const m = matrix.length, n = matrix[0].length;
  for (let i = 1; i < m; i++) {
      for (let j = 1; j < n; j++) {
          if (matrix[i][j] != matrix[i - 1][j - 1]) {
              return false;
          }
      }
  }
  return true;
};

// 1438. 绝对差不超过限制的最长连续子数组  单调队列
var longestSubarray = function(nums, limit) {
  const n = nums.length;
  const maxQueue = [];
  const minQueue = [];
  let left = 0;
  let res = 0;
  for (let right = 0; right < n; right++) {
      while (maxQueue.length && maxQueue[maxQueue.length - 1] < nums[right]) {
          maxQueue.pop();
      }
      maxQueue.push(nums[right]);

      while (minQueue.length && minQueue[minQueue.length - 1] > nums[right]) {
          minQueue.pop();
      }
      minQueue.push(nums[right]);
      if (Math.abs(maxQueue[0] - minQueue[0]) > limit) {
          if (nums[left] === maxQueue[0]) {
              maxQueue.shift();
          }
          if (nums[left] === minQueue[0]) {
              minQueue.shift();
          }
          left++;
      }
      else {
          res = right - left + 1;
      }
  }
  return res;
};

// 832. 翻转图像 基础题
/**
 * @param {number[][]} A
 * @return {number[][]}
 */
var flipAndInvertImage = function(A) {
  let res = []
  for (let i = 0; i < A.length; i++) {
    let newItem = []
    let item = A[i]
    let count = item.length
    for (let j = 0; j < count; j++) {
      let num = item[count -1 -j]
      newItem.push(num == 0 ? 1: 0)
    }
    res.push(newItem)
  }
  return res
};
// 867. 转置矩阵  基础题
/**
 * @param {number[][]} matrix
 * @return {number[][]}
 */
var transpose = function(matrix) {
  let res = []
  for (let i = 0; i < matrix[0].length; i++) {
    let newItem = []
    for (let j = 0; j < matrix.length; j++) {
      newItem.push(matrix[j][i])
    }
    res.push(newItem)
  }
  return res
};

// 1178. 猜字谜  位运算
/**
 * @param {string[]} words
 * @param {string[]} puzzles
 * @return {number[]}
 */
var findNumOfValidWords = function(words, puzzles) {
  const frequency = new Map();

  for (const word of words) {
      let mask = 0;
      for (const ch of word) {
          mask |= (1 << (ch.charCodeAt() - 'a'.charCodeAt()));
      }
      if (CountOne(mask) <= 7) {
          frequency.set(mask, (frequency.get(mask) || 0) + 1);
      }
  }

  const ans = [];
  for (const puzzle of puzzles) {
      let total = 0;
      let mask = 0;
      for (let i = 1; i < 7; ++i) {
          mask |= (1 << (puzzle[i].charCodeAt() - 'a'.charCodeAt()));
      }
      let subset = mask;
      while (subset) {
          let s = subset | (1 << (puzzle[0].charCodeAt() - 'a'.charCodeAt()));
          if (frequency.has(s)) {
              total += frequency.get(s);
          }
          subset = (subset - 1) & mask;
      }
      // 在枚举子集的过程中，要么会漏掉全集 mask，要么会漏掉空集
      // 这里会漏掉空集，因此需要额外判断空集
      if (frequency.has(1 << (puzzle[0].charCodeAt() - 'a'.charCodeAt()))) {
          total += frequency.get(1 << (puzzle[0].charCodeAt() - 'a'.charCodeAt()));
      }
      ans.push(total);
  }
  return ans;
};

function CountOne(n) {
  const str = n.toString(2);
  let count = 0;
  for (const ch of str) {
      if (parseInt(ch) === 1) {
          count++;
      }
  }
  return count;
}

// 303. 区域和检索 - 数组不可变  基础题
/**
 * @param {number[]} nums
 */
var NumArray = function(nums) {
    const n = nums.length;
    this.sums = new Array(n + 1).fill(0);
    for (let i = 0; i < n; i++) {
        this.sums[i + 1] = this.sums[i] + nums[i];
    }
};

NumArray.prototype.sumRange = function(i, j) {
    return this.sums[j + 1] - this.sums[i];
};

// 896. 单调数列 基础题
/**
 * @param {number[]} A
 * @return {boolean}
 */
var isMonotonic = function(A) {
    let inc = true, dec = true;
    const n = A.length;
    for (let i = 0; i < n - 1; ++i) {
        if (A[i] > A[i + 1]) {
            inc = false;
        }
        if (A[i] < A[i + 1]) {
            dec = false;
        }
    }
    return inc || dec;
};

// 395. 至少有 K 个重复字符的最长子串  分治
/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var longestSubstring = function(s, k) {
    const n = s.length;
    return dfs(s, 0, n - 1, k);
}

const dfs = (s, l, r, k) => {
    const cnt = new Array(26).fill(0);
    for (let i = l; i <= r; i++) {
        cnt[s[i].charCodeAt() - 'a'.charCodeAt()]++;
    }

    let split = 0;
    for (let i = 0; i < 26; i++) {
        if (cnt[i] > 0 && cnt[i] < k) {
            split = String.fromCharCode(i + 'a'.charCodeAt());
            break;
        }
    }
    if (split == 0) {
        return r - l + 1;
    }

    let i = l;
    let ret = 0;
    while (i <= r) {
        while (i <= r && s[i] === split) {
            i++;
        }
        if (i > r) {
            break;
        }
        let start = i;
        while (i <= r && s[i] !== split) {
            i++;
        }

        const length = dfs(s, start, i - 1, k);
        ret = Math.max(ret, length);
    }
    return ret;
};

// 304. 二维区域和检索 - 矩阵不可变  基础题
/**
 * @param {number[][]} matrix
 */
var NumMatrix = function(matrix) {
  const m = matrix.length;
  if (m > 0) {
      const n = matrix[0].length;
      this.sums = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0));
      for (let i = 0; i < m; i++) {
          for (let j = 0; j < n; j++) {
              this.sums[i + 1][j + 1] = this.sums[i][j + 1] + this.sums[i + 1][j] - this.sums[i][j] + matrix[i][j];
          }
      }
  }
};

NumMatrix.prototype.sumRegion = function(row1, col1, row2, col2) {
  return this.sums[row2 + 1][col2 + 1] - this.sums[row1][col2 + 1] - this.sums[row2 + 1][col1] + this.sums[row1][col1];
};

// 338. 比特位计数 动态规划 位运算
/**
 * @param {number} num
 * @return {number[]}
 */
var countBits = function(num) {
  let res = [0]
  for (let i = 1; i < num + 1; i++) {
        res.push(res[i>>1]+ (i&1))
  }
  return res;
};

// 354. 俄罗斯套娃信封问题  二分查找
/**
 * @param {number[][]} envelopes
 * @return {number}
 */
var maxEnvelopes = function(envelopes) {
  if (envelopes.length === 0) {
      return 0;
  }
  
  const n = envelopes.length;
  envelopes.sort((e1, e2) => {
      if (e1[0] - e2[0]) {
          return e1[0] - e2[0];
      } else {
          return e2[1] - e1[1];
      }
  })

  const f = [envelopes[0][1]];
  for (let i = 1; i < n; ++i) {
      const num = envelopes[i][1];
      if (num > f[f.length - 1]) {
          f.push(num);
      } else {
          const index = binarySearch(f, num);
          f[index] = num;
      }
  }
  return f.length;

  function binarySearch(f, target)  {
    let low = 0, high = f.length - 1;
    while (low < high) {
        const mid = Math.floor((high - low) / 2) + low;
        if (f[mid] < target) {
            low = mid + 1;
        } else {
            high = mid;
        }
    }
    return low;
  };
}

// 232. 用栈实现队列 基础逻辑
/**
 * Initialize your data structure here.
 */
var MyQueue = function() {
  this.inStack = [];
  this.outStack = [];
};

MyQueue.prototype.push = function(x) {
  this.inStack.push(x);
};

MyQueue.prototype.pop = function() {
  if (!this.outStack.length) {
      this.in2out();
  }
  return this.outStack.pop();
};

MyQueue.prototype.peek = function() {
  if (!this.outStack.length) {
      this.in2out();
  }
  return this.outStack[this.outStack.length - 1];
};

MyQueue.prototype.empty = function() {
  return this.outStack.length === 0 && this.inStack.length === 0;
};

MyQueue.prototype.in2out = function() {
  while (this.inStack.length) {
      this.outStack.push(this.inStack.pop());
  }
}

// 503. 下一个更大元素 II 单调栈
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var nextGreaterElements = function(nums) {
  const n = nums.length;
  const ret = new Array(n).fill(-1);
  const stk = [];
  for (let i = 0; i < n * 2 - 1; i++) {
      while (stk.length && nums[stk[stk.length - 1]] < nums[i % n]) {
          ret[stk[stk.length - 1]] = nums[i % n];
          stk.pop();
      }
      stk.push(i % n);
  }
  return ret;
};

// 131. 分割回文串 晦朔 + 动态规划
/**
 * @param {string} s
 * @return {string[][]}
 */
var partition = function(s) {
  const dfs = (i) => {
      if (i === n) {
          ret.push(ans.slice());
          return;
      }
      for (let j = i; j < n; ++j) {
          if (f[i][j]) {
              ans.push(s.slice(i, j + 1));
              dfs(j + 1);
              ans.pop();
          }
      }
  }
  
  const n = s.length;
  const f = new Array(n).fill(0).map(() => new Array(n).fill(true));
  let ret = [], ans = [];
  
  for (let i = n - 1; i >= 0; --i) {
      for (let j = i + 1; j < n; ++j) {
          f[i][j] = (s[i] === s[j]) && f[i + 1][j - 1];
      }
  }
  dfs(0);
  return ret;
};

// 132. 分割回文串 II 动态规划  关键是预处理
/**
 * @param {string} s
 * @return {number}
 */
var minCut = function(s) {
  const n = s.length;
  const g = new Array(n).fill(0).map(() => new Array(n).fill(true));

  for (let i = n - 1; i >= 0; --i) {
      for (let j = i + 1; j < n; ++j) {
          g[i][j] = s[i] == s[j] && g[i + 1][j - 1];
      }
  }

  const f = new Array(n).fill(Number.MAX_SAFE_INTEGER);
  for (let i = 0; i < n; ++i) {
      if (g[0][i]) {
          f[i] = 0;
      } else {
          for (let j = 0; j < i; ++j) {
              if (g[j + 1][i]) {
                  f[i] = Math.min(f[i], f[j] + 1);
              }
          }
      }
  }

  return f[n - 1];
};


// 1047. 删除字符串中的所有相邻重复项 基础题
/**
 * @param {string} S
 * @return {string}
 */
var removeDuplicates = function(S) {
   let res = []
   for (const ch of S) {
     if(res.length && res[res.length-1] ==  ch) {
       res.pop()
     } else {
       res.push(ch)
     }
   }
   return res.join('')

};

// 224. 基本计算器 堆栈
/**
 * @param {string} s
 * @return {number}
 */
 var calculate = function(s) {
  const ops = [1];
  let sign = 1;

  let ret = 0;
  const n = s.length;
  let i = 0;
  while (i < n) {
      if (s[i] === ' ') {
          i++;
      } else if (s[i] === '+') {
          sign = ops[ops.length - 1];
          i++;
      } else if (s[i] === '-') {
          sign = -ops[ops.length - 1];
          i++;
      } else if (s[i] === '(') {
          ops.push(sign);
          i++;
      } else if (s[i] === ')') {
          ops.pop();
          i++;
      } else {
          let num = 0;
          while (i < n && !(isNaN(Number(s[i]))) && s[i] !== ' ') {
              num = num * 10 + s[i].charCodeAt() - '0'.charCodeAt();
              i++;
          }
          ret += sign * num;
      }
  }
  return ret;
};