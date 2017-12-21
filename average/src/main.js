const fs = require('fs');
const path = require('path');
const math = require('mathjs');

const { convertBfToCC } = require('./calculateBf');

const unRegistedData = [
	{
		type: 'buy',
		rate: 2100000,
		amount: 0.000005,
		tax: 0
	},
	{
		type: 'buy',
		rate: 1211329,
		amount: 0.2,
		spendMoney: 242266,
		tax: 0
	},
	{
		type: 'buy',
		rate: 1158101,
		amount: 0.2,
		spendMoney: 231621,
		tax: 0
	}
];

const bfHistory = JSON.parse(fs.readFileSync(path.join(__dirname, 'bfTestData.json'), 'utf8'));
const history = convertBfToCC(bfHistory).concat(unRegistedData);

const calculateTotalAverage = (history) => {
	return history.reduce(
		(stack, next) => {
			if (next.type === 'sell') return stack;

			stack.spendMoney += next.spendMoney;
			stack.amount += next.amount;
			stack.rate += next.rate;
			return stack;
		},
		{ amount: 0, rate: 0, spendMoney: 0 }
	);
};

const calculateMovingAverage = (history) => {
	const { amount, rate, spendMoney, type } = history.pop();

	return history.reduce(
		(stack, next) => {
			const isSell = next.type === 'sell';
			if (isSell) {
				// console.log((stack.rate * next.amount) - (next.rate * next.amount))
				// stack.spendMoney += next.spendMoney
				// stack.rate = math.divide(stack.spendMoney, stack.amount)
				stack.amount -= next.amount;
				stack.spendMoney += next.amount * stack.rate;
			} else {
				// stack.amount += next.amount
				// stack.spendMoney -= next.spendMoney
				// stack.rate = math.divide(stack.spendMoney, stack.amount)

				// const totalCost = stack.amount * stack.rate
				// const nextCost =  next.amount * next.rate
				// stack.rate = (nextCost + nextCost) / (stack.amount + next.amount)
				// stack.amount += next.amount

				stack.amount += next.amount;
				stack.spendMoney -= next.amount * next.rate;
				stack.rate = stack.spendMoney / stack.amount;
			}
			return stack;
		},
		{
			amount: type === 'sell' ? -1 * amount : amount,
			spendMoney: type === 'sell' ? spendMoney : -1 * spendMoney,
			rate
		}
	);
};

// const { amount, spendMoney } = calculateTotalAverage(history)
// console.log(history)
console.log(calculateMovingAverage(history));

// console.log(spendMoney / amount)

// sum(amount * rate) / sum(amount)
