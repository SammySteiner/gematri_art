class GematriArt {
  constructor(inputs) {
    this.inputs = inputs
  }

  toSVG(){
    var board = new ArtBoard(this.inputs.width, this.inputs.height, this.inputs.density)
    var stringArr = this.parseInputs()
    var coordinatesForAllLetters = this.stringArrToCoords(stringArr, board)
    var linesForAllLetters = this.coordsToLines(coordinatesForAllLetters)
    return this.composeSVG(this.inputs.text, board, linesForAllLetters)
  }

  parseInputs() {
    var string = new StringParser(this.inputs.text)
    return string.parseString()
  }

  stringArrToCoords(stringArr, board){
    if (this.arrIsWord(stringArr)) {
      return this.wordToCoords(stringArr, board)
    } else {
      return this.phraseToCoords(stringArr, board)
    }
  }

  arrIsWord(arr){
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].length > 1 ) {
        return false
      }
    }
    return true
  }

  phraseToCoords(stringArr, board){
    var manyCoords = []
    for (var i = 0; i < stringArr.length; i++) {
      let word = new WordCoder(stringArr[i], board)
      let wordCoded = word.wordToCoord()
      let wordToLinify = new Linifier(wordCoded, board)
      let coords = wordToLinify.coordToManyCoords()
      manyCoords.push(coords)
    }
    return manyCoords
  }

  wordToCoords(stringArr, board) {
    var manyCoords = []
    for (var i = 0; i < stringArr.length; i++) {
      let letter = new LetterCoder(stringArr[i], board)
      let letterCoded = letter.letterToCoord()
      let letterToLinify = new Linifier(letterCoded, board)
      let coords = letterToLinify.coordToManyCoords()
      manyCoords.push(coords)
    }
    return manyCoords
  }

  coordsToLines(arrayOfCoordArrays) {
    var lines = ""
    for (var i = 0; i < arrayOfCoordArrays.length; i++) {
      for (var j = 0; j < arrayOfCoordArrays[i].length; j++) {
        lines += this.coordToLine(arrayOfCoordArrays[i][j])
      }
    }
    return lines
  }

  coordToLine(coord) {
    return `<line x1="${coord.x1}" y1="${coord.y1}" x2="${coord.x2}" y2="${coord.y2}" style="stroke:rgb(0,0,0);stroke-width:1"/>`
  }

  composeSVG(text, board, linesForAllLetters){
    let title = ""
    typeof(text) === 'string' ? title = text : title = text.join(" ")
    return `<h2>${title}</h2><svg id="art-svg" width="${board.width}" height="${board.height}"><rect x="0" y="0" width="${board.width}" height="${board.height}" style="fill-opacity:0;stroke-width:1;stroke:rgb(0,0,0)"/>` + linesForAllLetters + `</svg>`
  }


}
