class StringParser {
  constructor(string) {
    this.string = string
  }

  stringToLettersArr(){
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
      if (stringHash[letter]) {
        stringHash[letter] += 1
      } else {
        stringHash[letter] = 1;
        newStringArr.push(letter)
      }
    })
    return newStringArr
  }

}
