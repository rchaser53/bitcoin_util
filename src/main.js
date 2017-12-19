// 数量 : 1550.0 
// 価格 : 49887.0 JPY
// レート : 32.18516129 XRP/JPY

// 数量 : 1655.1 
// 価格 : 149920.0 JPY
// レート : 90.58062957 XRP/JPY


const mathjs = require('mathjs')

const history = [
  {
    type: 'sell',
    amount: 1550.0,
    spendMoney: 49887,
    rate: 32.18516129
  },
  {
    type: 'sell',
    amount: 1655.1,
    spendMoney: 149920,
    rate: 90.58062957
  }
]

const calculateTotalAverage = (history) => {
  return history.reduce((stack, next) => {
    stack.spendMoney += next.spendMoney
    stack.amount += next.amount
    stack.rate += next.rate
    return stack
  }, { amount: 0, rate: 0, spendMoney: 0 })
}

const { amount, spendMoney, rate } = calculateTotalAverage(history)

console.log(spendMoney / amount)