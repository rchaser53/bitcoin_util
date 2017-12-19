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
    if (next.type === 'sell') return stack

    stack.spendMoney += next.spendMoney
    stack.amount += next.amount
    stack.rate += next.rate
    return stack
  }, { amount: 0, rate: 0, spendMoney: 0 })
}

const { amount, spendMoney, rate } = calculateTotalAverage(history)

console.log(spendMoney / amount)