/**
 * virtualMoneyGame 虚拟理财游戏
 * 
 * 理财产品 m 个
 * 可理财资金 n 元
 * 
 * 总风险 = 购买项目的 风险的和
 * 最多可以投资 2个 项目
 * 最小单位为整数 不能拆分成 小数
 * 投资回报 = 投资额 * 回报率
 * 
 * 输入说明
 * 第一行： 产品数  总投资额  可接受的总风险
 * 
 * 第二行 ：产品的投资回报率 序列， 整数 ，大小 [1, 60]
 * 第三行： 产品的风险序列 整数 值范围[1, 100]
 * 第四行：最大投资额序列 整数 取值范围 [1, 10000]
 * 输出描述
 * 每个产品的投资额序列
 * 
 * 案例1
 * 输入：
 * 5 100 10
 * 10 20 30 40 50
 * 3 4 5 6 10
 * 20 30 20 40 30
 * 输出：
 * 0 30 0 40 0
 */

/**
 * 
 * @param {number} m 产品数
 * @param {number} n 可投资金额
 * @param {number} fenxian 可承受的最大风险值
 * @param {object[]} products 产品 构成的列表 {huibao:30,fengxian: 3,jine: 30}
 */
function virtualMoneyGame(m, n, fenxian, products) {
  // 最多 购买 2 个产品，枚举所有 产品组合 单个 两个 为一组 且 满足 风险值 投资限额 记录最大收入值
  let maxShouru = products[0].getLiRun();
  let maxShuuruIndex = 0;
  let details = new Array(m).fill(0);
  // 先处理单个 -- 只买一个产品
  for (let i = 1; i < m; i++) {
    const product = products[i];
    const shouru = product.getLiRun();
    if( product.fengxian <= fenxian && product.jine <= n) {
      if (shouru > maxShouru) {
        maxShouru = shouru;
        details[i] = product.jine;
        details[maxShuuruIndex] = 0;
        maxShuuruIndex = i;
      }
    }
  }
  // 处理两个产品
  for (let i = 0; i < m; i++) {
    const product1 = products[i];
    for (let j = i + 1; j < m; j++) {
      const product2 = products[j];
      const shouru = product1.getLiRun() + product2.getLiRun();
      if( product1.fengxian + product2.fengxian <= fenxian && product1.jine + product2.jine <= n) {
        console.log(shouru, maxShouru);
        if (shouru > maxShouru) {
          maxShouru = shouru;
          details[i] = product1.jine;
          details[j] = product2.jine;
          // 除 i j 其他置为 0
          for (let k = 0; k < m; k++) {
            if (k !== i && k !== j) {
              details[k] = 0;
            }
          }
        }
      }
    }
  }
  console.log(details);
}

class Product {
  constructor(huibaolv, fengxian, jine) {
    this.huibaolv = huibaolv;
    this.fengxian = fengxian;
    this.jine= jine;
  }
  getLiRun(){
    return this.jine * this.huibaolv/100;
  }
}

function solution (m,n,r, lilvs, fengxians, jines) {
  const lilvarr = lilvs.split(' ').map(item => Number(item));
  const fengxianarr = fengxians.split(' ').map(item => Number(item));
  const jinearr = jines.split(' ').map(item => Number(item));
  const products = [];
  for (let i = 0; i < m; i++) {
    products.push(new Product(lilvarr[i], fengxianarr[i], jinearr[i]));
  }
  return virtualMoneyGame(m, n, r, products);
}

solution(5, 100, 10, '10 20 30 40 50', '3 4 5 6 10', '20 30 20 40 30');