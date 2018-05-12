export default {
	'email': { type: 'email', message: '电子邮箱格式有误！' },
	'phone': { pattern: /^1\d{10}$/, message: '手机号格式有误！' },
}


class BasicCalculator {
	public constructor(protected value: number = 0) { }
	public currentValue(): number {
		return this.value
	}
	public add(operand: number): this {
		this.value += operand
		return this
	}
	public multiply(operand: number): this {
		this.value *= operand
		return this
	}
	// ... other operations go here ...
}


class ScientificCalculator extends BasicCalculator {
	skill: number

	public constructor(value = 0) {
		super(value)
	}
	public sin() {

		this.value = Math.sin(this.value)
		return this
	}
	// ... other operations go here ...
}

function getRandomPadder() {
	return Math.random() < 0.5
		? new BasicCalculator()
		: new ScientificCalculator()
}

const vv = getRandomPadder()

if (vv instanceof ScientificCalculator) {
	console.log('ScientificCalculator')
} else console.log('BasicCalculator')
