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
    "y": event.clientY
    // "depth": Math.ceil(155 * Math.random()) + 100
  }
  return click
}

const getNoises = (noises, n, xPosition, yPosition) => {
  let pixels = ''
  for (let i = 0; i < n; i++) {
    let x = noises[i][xPosition]
    let y = noises[i][yPosition]
    // let depth = noises[i][noiseDepth]
    // pixels += `<div class="pixel" style="top:${y}px; left:${x}px; background-color:rgba(${depth},${depth},${depth},1)"></div>`
    pixels += `<div class="pixel" style="top:${y}px; left:${x}px;"></div>`
  }
  return pixels
}

// text degradation on hover
function textDecay(words) {
  for (let i = 0; i < words.length; i++) {
    // set initial hover state
    let hover = false
    // get font weight
    let weight = words[i].style.fontFamily.slice(-1)
    // for desktop: when mouse over the word
    words[i].addEventListener('mouseenter', () => {
      if ( weight < 9 ) {
        weight++
        words[i].style.fontFamily = "oldround" + weight
      }
      hover = true
      // decay (weight+1) every 1/2 second
      var textDecay = setInterval(function(){
        if ( hover == true && weight < 9 ) {
          weight++
          words[i].style.fontFamily = "oldround" + weight
        } else {
          clearInterval(textDecay)
        }
      },500);
    })
    // for desktop
    words[i].addEventListener('mouseleave', () => {
      hover = false
    })
  }
}

// text degradation on touch
function textDecayMobile(words) {
  for (let i = 0; i < words.length; i++) {
    // set initial hover state
    let hover = false
    // get font weight
    let weight = words[i].style.fontFamily.slice(-1)
    // for touchscreen: when touch on the word
    words[i].addEventListener('touchstart', (event) => {
      event.preventDefault()
      if ( weight < 9 ) {
        weight++
        words[i].style.fontFamily = "oldround" + weight
      }
      hover = true
      // decay (weight+1) every 1/2 second
      var textDecay = setInterval(function(){
        if ( hover == true && weight < 9 ) {
          weight++
          words[i].style.fontFamily = "oldround" + weight
        } else {
          clearInterval(textDecay)
        }
      },500);
    })
    // for touchscreen
    words[i].addEventListener('touchend', (event) => {
      event.preventDefault()
      hover = false
    })
  }
}


function showInfo() {
  let titlename = document.querySelectorAll("#title .name")[0]
  let titleinfo = document.querySelectorAll("#title .info")[0]
  titleinfo.style.display = "block"
  titlename.style.display = "none"
}
function hideInfo(e) {
  let titlename = document.querySelectorAll("#title .name")[0]
  let titleinfo = document.querySelectorAll("#title .info")[0]
  if (e.target.tagName != "A") {
    titlename.style.display = "block"
    titleinfo.style.display = "none"
  }
}


function hidebg() {
  document.querySelector('#wall').style.opacity = "0"
  document.querySelector('.center').style.opacity = "0"
  document.querySelector('#showimage').style.opacity = "0"
}

function showbg() {
  document.querySelector('#wall').style.opacity = "1"
  document.querySelector('.center').style.opacity = "1"
  document.querySelector('#showimage').style.opacity = "1"
}

function switchTextContainer(textContainerOff,textContainerOn,textButtonOff,textButtonOn) {
  textContainerOff.style.display = "none"
  textContainerOn.style.display = "block"
  textButtonOff.style.display = "none"
  textButtonOn.style.display = "block"
}

// toggle show text
function toggleShowText() {
  let closeButton = document.querySelector('#text-close')
  let textContainer = document.querySelector('#text-container')
  let textButtonLeft = document.querySelector('#text-left')
  let textContainerLeft = document.querySelector('#text-container-left')
  let textButtonRight = document.querySelector('#text-right')
  let textContainerRight = document.querySelector('#text-container-right')
  if (textContainer != null) {
    textContainer.style.display = "none"
  }
  
  if (textButtonLeft != null) {
    textButtonLeft.addEventListener('click', () => {
      textButtonLeft.style.display = "none"
      textContainerLeft.style.display = "block"
      closeButton.style.display = "block"

      if ( textContainer.style.display === "none" ) {
        // console.log("none")
        textContainer.style.display = "flex"
        hidebg()
      } else {
        // console.log("flex")
        if (textContainerRight.style.display === "block") {
          switchTextContainer(textContainerRight,textContainerLeft,textButtonLeft,textButtonRight)
        }
      }
      
    })
  }
  
  if (textButtonRight != null) {
    textButtonRight.addEventListener('click', () => {
      textButtonRight.style.display = "none"
      textContainerRight.style.display = "block"
      closeButton.style.display = "block"

      if ( textContainer.style.display === "none" ) {
        // console.log("none")
        textContainer.style.display = "flex"
        hidebg()
      } else {
        // console.log("flex")
        if (textContainerLeft.style.display === "block") {
          switchTextContainer(textContainerLeft,textContainerRight,textButtonRight,textButtonLeft)
        }
      }

    })
  }
  
  
  closeButton.addEventListener('click', () => {
    textContainer.style.display = "none"
    
    if (textButtonLeft != null) {
      textButtonLeft.style.display = "block"
      textContainerLeft.style.display = "none"
    }
    
    textButtonRight.style.display = "block"
    textContainerRight.style.display = "none"
    closeButton.style.display = "none"
    
    showbg()
  })
}