const fs = require('fs')

const data = JSON.parse(fs.readFileSync('bfTestData.json', 'utf8')) 

const convertData =  data.map((ret) => {
  return {
    type: (ret.side === 'SELL') ? 'sell' : 'buy',
    amount: ret.size,
    spendMoney: ret.size * ret.price,
    rate: ret.price
  }
})