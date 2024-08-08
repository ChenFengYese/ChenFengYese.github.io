function allocateMemory() {
  let bigArray = new Array(100000000).fill(0);  // 创建一个非常大的数组
  while (true) {  // 无限循环，持续占用内存
    bigArray.push(0);
  }
}

allocateMemory();
