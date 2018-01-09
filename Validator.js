class Validator {
  constructor(inputs) {
    [this.word, this.width, this.height, this.density] = [inputs.word, inputs.width, inputs.height, inputs.density]
  }

  validateInputs(){
    validateWord()
    validateWidth()
    validateHeight()
    validateDensity()
    return true
  }

  validateWord(){

  }

  validateWidth(){

  }

  validateHeight(){

  }

  validateDensity(){

  }
}
