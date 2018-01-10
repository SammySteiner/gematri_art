class Validator {
  constructor(inputs) {
    [this.word, this.width, this.height, this.density] = [inputs.word, inputs.width, inputs.height, inputs.density]
  }

  validateInputs(){
    var word = this.validateWord()
    var width = this.validateWidth()
    var height = this.validateHeight()
    var density = this.validateDensity()
    if (word && width && height && density) {
      return {word: word, width: width, height: height, density: density}
    } else {
      return false
    }
  }

  validateWord(){
    var input = this.removeSpaces(this.word)
    var word = this.removeLineBreaks(this.word)
    if (this.containsNumber(word) || this.containsSpecialCharacter(word) || typeof(word) === "string") {
      alert("Word must not contain numbers or special characters.")
    } else {
      return word
    }
  }

  validateWidth(){
    var input = this.removeSpaces(this.width)
    var width = parseInt(this.removeLineBreaks(this.width))
    if (typeof(width) !== "number" || width <= 0 || isNaN(width)) {
      alert("Width must be a number greater than zero")
    } else {
      return width
    }
  }

  validateHeight(){
    var input = this.removeSpaces(this.height)
    var height = parseInt(this.removeLineBreaks(this.height))
    if (typeof(height) !== "number" || height <= 0 || isNaN(height)) {
      alert("Height must be a number greater than zero")
    } else {
      return height
    }
  }

  validateDensity(){
    var input = this.removeSpaces(this.density)
    var density = parseInt(this.removeLineBreaks(this.density))
    if (typeof(density) !== "number" || density <= 0 || isNaN(density)) {
      alert("Density must be a number greater than zero")
    } else {
      return density
    }
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
