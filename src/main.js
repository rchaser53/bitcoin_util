const fs = require('fs')
const path = require('path')

const mathjs = require('mathjs')

const { convertBfToCC } = require('./calculateBf')

const unRegistedData = [
  {
    type: 'sell',
    rate: 2100000,
    amount: 0.2,
    spendMoney: 420000,
  },
  {
    type: 'buy',
    rate: 1211329,
    amount: 0.2,
    spendMoney: 242266,
  },
  {
    type: 'buy',
    rate: 1158101,
    amount: 0.2,
    spendMoney: 231621,
  },
]

const bfHistory = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'bfTestData.json'), 'utf8')
)
const history = convertBfToCC(bfHistory).concat(unRegistedData)

const calculateTotalAverage = history => {
  return history.reduce(
    (stack, next) => {
      if (next.type === 'sell') return stack

      stack.spendMoney += next.spendMoney
      stack.amount += next.amount
      stack.rate += next.rate
      return stack
    },
    { amount: 0, rate: 0, spendMoney: 0 }
  )
}

const { amount, spendMoney, rate } = calculateTotalAverage(history)

console.log(spendMoney / amount)
