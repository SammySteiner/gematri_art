class stringParser {
  constructor(string) {
    this.string = string
  }

  stringToLetters(){
    var letters = []
    for (var i = 0; i < this.string.length; i++) {
      letters.push(this.string[i].toLowerCase())
    }
    var uniqueLetters = this.removeDuplicateLetters(letters)
    return uniqueLetters
  }

  removeDuplicateLetters(stringArr){
    var stringHash = {}
    var newStringArr = []
    stringArr.forEach(function(letter){
      stringHash[letter] += 1
    })
    stringArr.forEach(function(letter){
      if (stringHash[letter] === 1) {
        newStringArr.push(letter)
      }
    })
    return newStringArr
  }

}
