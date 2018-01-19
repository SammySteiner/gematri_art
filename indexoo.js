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
  var art = new GematriArt(inputs)
  var svg = art.toSVG()
  document.getElementById('art').innerHTML = svg
}
