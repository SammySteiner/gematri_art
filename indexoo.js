var printButton = document.getElementById('submit')
printButton.addEventListener('click', function(event){
  event.preventDefault()
  var inputs = getInputs()
  if (validateInputs(inputs)) {
    let validatedInputs = validateInputs(inputs)
    wordToArt(validatedInputs)
  }
  clearInputs()
})

function getInputs() {
  var text = document.getElementById('text').value
  var width = document.getElementById('width').value
  var height = document.getElementById('height').value
  var density = document.getElementById('density').value
  return {text: text, width: width, height: height, density: density}
}

function validateInputs(inputs){
  validator = new Validator(inputs)
  return validator.validateInputs()
}

function clearInputs() {
  document.getElementById('text').value = ""
  document.getElementById('width').value = ""
  document.getElementById('height').value = ""
  document.getElementById('density').value = ""
}

function wordToArt(inputs) {
  var board = new ArtBoard(inputs.width, inputs.height, inputs.density)
  var stringArr = parseInputs(inputs.text)
  var coordinatesForAllLetters = stringArrToCoords(stringArr, board)
  var linesForAllLetters = coordsToLines(coordinatesForAllLetters)
  var svg = composeSVG(inputs.text, board, linesForAllLetters)
  document.getElementById('art').innerHTML = svg
}

function parseInputs(validatedInputs) {
  var string = new StringParser(validatedInputs)
  return string.parseString()
}

function stringArrToCoords(stringArr, board){
  if (arrIsWord(stringArr)) {
    return wordToCoords(stringArr, board)
  } else {
    return phraseToCoords(stringArr, board)
  }
}

function arrIsWord(arr){
  for (var i = 0; i < arr.length; i++) {
    return arr[i].length > 1 ? false : arrIsWord(arr.slice(1))
  }
  return true
}

function phraseToCoords(stringArr, board){
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

function wordToCoords(stringArr, board) {
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

function coordsToLines(arrayOfCoordArrays) {
  var lines = ""
  for (var i = 0; i < arrayOfCoordArrays.length; i++) {
    for (var j = 0; j < arrayOfCoordArrays[i].length; j++) {
      lines += coordToLine(arrayOfCoordArrays[i][j])
    }
  }
  return lines
}

function coordToLine(coord) {
  return `<line x1="${coord.x1}" y1="${coord.y1}" x2="${coord.x2}" y2="${coord.y2}" style="stroke:rgb(0,0,0);stroke-width:1"/>`
}

function composeSVG(text, board, linesForAllLetters){
  let title = ""
  typeof(text) === 'string' ? title = text : title = text.join(" ")
  return `<h2>${title}</h2><svg id="art-svg" width="${board.width}" height="${board.height}"><rect x="0" y="0" width="${board.width}" height="${board.height}" style="fill-opacity:0;stroke-width:1;stroke:rgb(0,0,0)"/>` + linesForAllLetters + `</svg>`
}
