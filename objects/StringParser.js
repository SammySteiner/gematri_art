class StringParser {
  constructor(string) {
    this.string = string
  }

  parseString(){
    if (!typeof(this.string) === 'string') {
      return this.stringToWordsArr()
    } else {
      return this.stringToLettersArr()
    }
  }

  stringToWordsArr(){
    var words = []
    let phrase = this.string.trim().split(' ')
    for (var i = 0; i < phrase.length; i++) {
      words.push(phrase[i].trim())
    }
    return words
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
    var stringHash = {' ': 2}
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
