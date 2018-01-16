class StringParser {
  constructor(string) {
    this.string = string
  }

  parseString(){
    parsedString = []
    // if this.string contains a character followed by a space followed by a character it's a phrase, otherwise it's a word
  }

  stringToWordsArr(){
    var words = []
    let phrase = this.string.split(' ')
    // split on spaces
    for (var i = 0; i < phrase.length; i++) {
      words.push(phrase[i])
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
