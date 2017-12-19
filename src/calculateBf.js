const fs = require('fs')
const path = require('path')

module.exports = {
  convertBfToCC: history => {
    return history.map(ret => {
      return {
        type: ret.side === 'SELL' ? 'sell' : 'buy',
        amount: ret.size,
        spendMoney: ret.size * ret.price,
        rate: ret.price,
      }
    })
  },
}
