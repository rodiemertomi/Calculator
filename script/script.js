class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.isEqual = false
    this.clear()
  }

  clear() {
    this.previousOperand = ''
    this.currentOperand = ''
    this.operation = undefined
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }

  appendNumber(number) {
    if (this.isEqual === true) {
      this.currentOperand = ''
      this.previousOperand = ''
      this.isEqual = false
    }
    if (number === '.' && this.currentOperand.includes('.')) return
    if (number === '.' && this.currentOperand === '') {
      this.currentOperand = `0${number}`
      return
    }
    if (number === '0' && this.currentOperand === '0') return
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', {
        maximumFractionDigits: 0,
      })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  chooseOperation(operation) {
    this.isEqual = false
    if (this.currentOperand.includes('.')) {
      while (
        this.currentOperand.charAt(this.currentOperand.length - 1) === '0' ||
        this.currentOperand.charAt(this.currentOperand.length - 1) === '.'
      ) {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
      }
    }
    if (this.currentOperand === '' && this.operation) {
      this.operation = undefined
      this.operation = operation
      this.previousOperand = this.previousOperand.toString().slice(0, -1)
      this.previousOperand = `${this.previousOperand} ${operation}`
      return
    }
    if (this.previousOperand !== '') {
      this.compute()
    }
    this.operation = operation
    this.previousOperand = `${this.currentOperand} ${operation}`
    this.currentOperand = ''
  }

  compute() {
    let computedValue
    if (this.previousOperand === '') return
    if (this.currentOperand === '') {
      this.currentOperand = this.previousOperand.toString().slice(0, -2)
      this.previousOperand = ''
      this.operation = undefined
      return
    }
    switch (this.operation) {
      case '+':
        computedValue = parseFloat(this.previousOperand) + parseFloat(this.currentOperand)
        break
      case '-':
        computedValue = parseFloat(this.previousOperand) - parseFloat(this.currentOperand)
        break
      case '*':
        computedValue = parseFloat(this.previousOperand) * parseFloat(this.currentOperand)
        break
      case '÷':
        computedValue = parseFloat(this.previousOperand) / parseFloat(this.currentOperand)
        break
    }
    this.currentOperand = computedValue.toString()
    this.previousOperand = ''
    this.operation = undefined
  }

  equals() {
    this.isEqual = true
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${
        this.operation
      }`
    } else {
      this.previousOperandTextElement.innerText = ''
    }
  }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

deleteButton.addEventListener('click', () => {
  calculator.delete()
  calculator.updateDisplay()
})

allClearButton.addEventListener('click', () => {
  calculator.clear()
  calculator.updateDisplay()
})

equalsButton.addEventListener('click', () => {
  calculator.compute()
  calculator.equals()
  calculator.updateDisplay()
})
