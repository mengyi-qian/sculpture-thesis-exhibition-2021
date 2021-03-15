const showCoords = (event, offset) => {
  let mouseX = event.clientX
  let mousey = event.clientY
  let halfWidth = window.innerWidth / 2
  let halfHeight = window.innerHeight / 2
  let x = mouseX - halfWidth
  let y = mousey - halfHeight
  // console.log(x + "," + y)
  let  transX = x * -1 * offset / halfWidth
  let  transY = y * -1 * offset / halfHeight
  // console.log(transX + "," + transY)
  let coords = [transX,transY]
  return coords
}

const touchCoords = (event, offset) => {
  let mouseX = event.touches[0].clientX
  let mousey = event.touches[0].clientY
  let halfWidth = window.innerWidth / 2
  let halfHeight = window.innerHeight / 2
  let x = mouseX - halfWidth
  let y = mousey - halfHeight
  // console.log(x + "," + y)
  let  transX = x * -1 * offset / halfWidth
  let  transY = y * -1 * offset / halfHeight
  // console.log(transX + "," + transY)
  let coords = [transX,transY]
  return coords
}

const getClick = (event) => {
  let click = {
    "x": event.clientX,
    "y": event.clientY,
    "depth": Math.ceil(155 * Math.random()) + 100
  }
  return click
}

const getNoises = (noises, n, xPosition, yPosition, noiseDepth) => {
  let pixels = ''
  for (let i = 0; i < n; i++) {
    let x = noises[i][xPosition]
    let y = noises[i][yPosition]
    let depth = noises[i][noiseDepth]
    pixels += `<div class="pixel" style="top:${y}px; left:${x}px; background-color:rgba(${depth},${depth},${depth},1)"></div>`
  }
  return pixels
}

