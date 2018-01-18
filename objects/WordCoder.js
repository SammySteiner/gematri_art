class WordCoder {
  constructor(word, board = {width: 180, height: 360}) {
    [this.word, this.board] = [word, board]
  }

  wordToCoord() {
    let midpoint = this.findMidpoint(this.board)
    let coord = {x1: 0}
    let confinedAngle = this.wordToAngle()
    if (confinedAngle == 90 || confinedAngle == 270) {
      coord.x1 = midpoint.x
      coord.x2 = midpoint.x
      coord.y1 = 0
      coord.y2 = this.board.height
    } else {
      let distribution = (midpoint.x/Math.sin((90-confinedAngle) * (Math.PI/180)))*Math.sin((confinedAngle)* (Math.PI/180))
      coord.x2 = this.board.width;
      coord.y1 = midpoint.y + distribution;
      coord.y2 = midpoint.y - distribution;
    }
    return coord
  }

  findMidpoint(board) {
    var x = this.board.width/2
    var y = this.board.height/2
    return {'x': x, 'y': y}
  }

  wordToAngle() {
    let angle = 0
    for (var i = 0; i < this.word.length; i++) {
      angle += (this.word[i].charCodeAt(0) -96) * 6.88
    }
    return angle % 360
  }

}
