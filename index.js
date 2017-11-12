function hello() {
  return alert("hello")
}

// when a user hits submit:
// 1. prevent refresh
// 2. grab the input
// 3. assume only one word
// 4. build svg for word
// 5. display svg (delete old svg)

// the work. loop over word, look at each letter (convert to lower case) and get an angle from the lookup, convert that into 5 lines on a 100/100 grid, add those to the svg, return the svg with all the lines.

// +. create lookup hash for letter into angle.
// +. create function to take size of grid, angle of line, number of lines, and return an array of x1/y1/x2/y2 coords.
// +. check input if one or more words
