class Validator {
  constructor(inputs) {
    [this.word, this.width, this.height, this.density] = [inputs.word, inputs.width, inputs.height, inputs.density]
  }

  validateInputs(){
    var word = validateWord()
    var width = validateWidth()
    var height = validateHeight()
    var density = validateDensity()
    return {word: word, width: width, height: height, density: density}
  }

  validateWord(){
    this.removeSpaces(this.word)
    this.removeLineBreaks(this.word)
    if (this.containsNumber(this.word) || this.containsSpecialCharacter(this.word)) {
      alert("Word must not contain numbers or special characters.")
    }
    try {
      var parsedString = new StringParser(inputs.word)
      var stringArr = parsedString.stringToLettersArr()
    } catch (e) {
      alert("You're doing it wrong! Please try again." e.message)
    }
  }

  validateWidth(){
    this.removeSpaces(this.word)
    this.removeLineBreaks(this.word)
    if (typeOf(this.width) === "number") {

    }
  // must be a number, must be greater than 0, must not have any spaces or line breaks
  }

  validateHeight(){
    this.removeSpaces(this.word)
    this.removeLineBreaks(this.word)
    // must be a number, must be greater than 0, must not have any spaces or line breaks
  }

  validateDensity(){
    this.removeSpaces(this.word)
    this.removeLineBreaks(this.word)
    // must be a number, must be greater than 0, must not have any spaces or line breaks
  }

  removeSpaces(input){
    return input.replace(/\s/gm,"")
  }

  removeLineBreaks(input){
    return input.replace(/(\r\n|\n|\r)/gm,"")
  }

  isNumber(input){
    return typeof(input) === "number"
  }

  containsNumber(input){
    return /[0-9]/.test(input)
  }

  containsSpecialCharacter(input){
    var reg = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/
    return reg.test(input)
  }
}
