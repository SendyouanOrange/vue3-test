// 兼容各种浏览器的requestAnimationFrame函数
const getAnimationFunction = function () {
  let RAF = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame
  let CAF = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelRequestAnimationFrame
  let timer
  let lastTime = 0
  if (!RAF) {
    RAF = function (callback) {
      const currTime = new Date().getTime()
      const timeToCall = Math.max(0, 16.7 - (currTime - lastTime))
      timer = window.setTimeout(function () {
        callback(currTime + timeToCall)
      }, timeToCall)
      lastTime = currTime + timeToCall
      return timer
    }
  }
  if (!CAF) {
    CAF = function (t) {
      clearTimeout(t)
    }
  }
  return { RAF, CAF}
}

const { RAF } = getAnimationFunction()

class MouseAnimation {
  group = []
  color = '#ff0000'
  mode = 'top'
  createPosition = { x: 1100, y: 200 }
  size = 3
  constructor(canvasId) {
    const canvas = document.getElementById(canvasId)
    const ctx = canvas.getContext('2d')
    const canvasWidth = window.innerWidth - 600
    const canvasHeight = window.innerHeight
    canvas.width = canvasWidth
    canvas.height = canvasHeight
    ctx.fillStyle = 'rgba(0,0,0,0.2)'
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)
    ctx.fillStyle = this.color
    this.canvas = canvas
    this.ctx = ctx
    this.canvasWidth = canvasWidth
    this.canvasHeight = canvasHeight
  }
  init = () => {
    RAF(this._infiniteCreateNode)
    this._bindDomMouseEvent()
  }
  // 改变效果
  changeMode() {
    const modeList = ['top', 'right', 'bottom', 'left']
    const index = modeList.indexOf(this.mode)
    this.mode = modeList[(index + 1) % 4]
    this.canvas.className = `pistol-${this.mode}`
  }
  // node的出生地位置
  setNodePosition = (x, y) => {
    const offset = {
      right: [35, 7],
      left: [-10, 7],
      bottom: [19, 37],
      top: [7, -10]
    }[this.mode]
    this.createPosition = { x: x + offset[0], y: y + offset[1] }
  }
  _bindDomMouseEvent = () => {
    this.canvas.onmousemove = (e) => {
      this.setNodePosition(e.offsetX, e.offsetY)
    }
    this.canvas.onclick = (e) => {
      this.changeMode()
      this.setNodePosition(e.offsetX, e.offsetY)
    }
  }
  _setRandomColor = function(){
    return '#'+('00000'+(Math.random()*0x1000000<<0).toString(16)).slice(-6)
  }
  // 设置某个node的下一帧位置和样式
  _setNextFramePosition = (item) => {
    this.color = this._setRandomColor()
    // 横向向混乱程度
    const chaos = 6
    // 纵向速度
    const speed = 3
    const modeStrategy = {
      top: () => {
        item.opacity -= 0.005
        item.x += (Math.random() - 0.5) * chaos
        item.y -= speed
      },
      bottom: () => {
        item.opacity -= 0.005
        item.x -= (Math.random() - 0.5) * chaos
        item.y += speed
      },
      left: () => {
        item.opacity -= 0.005
        item.x -= speed
        item.y += (Math.random() - 0.5) * chaos
      },
      right: () => {
        item.opacity -= 0.005
        item.x += speed
        item.y -= (Math.random() - 0.5) * chaos
      }
    }
    modeStrategy[item.mode]()
  }
  // 生成一个小点
  _createNode = () => {
    this.ctx.globalAlpha = 1
    this.ctx.beginPath()
    this.ctx.arc(this.createPosition.x, this.createPosition.y, this.size, 0, Math.PI * 2, true)
    // this.ctx.fillRect(this.createPosition.x, this.createPosition.y, size, size)
    this.ctx.fillStyle = this.color
    this.ctx.fill()
    this.ctx.closePath()
    this.group.push({
      x: this.createPosition.x,
      y: this.createPosition.y,
      color: this.color,
      size: this.size,
      opacity: 1,
      mode: this.mode
    })
  }
  // 根据渲染刷新率移动每个node位置，消除和新生成node
  _infiniteCreateNode = () => {
    this._createNode()
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
    for (let index = 0; index < this.group.length; index++) {
      const item = this.group[index]
      this._setNextFramePosition(item)
      this.ctx.beginPath()
      this.ctx.globalAlpha = item.opacity
      this.ctx.arc(item.x, item.y, item.size, 0, Math.PI * 2, true)
      this.ctx.fillStyle = item.color
      this.ctx.fill()
      this.ctx.closePath()
      if (this.group[index].opacity <= 0) {
        this.group.splice(index, 1)
        index--
      }
    }
    RAF(this._infiniteCreateNode)
  }
}

const startMouseAnimation = (canvasId) => {
  const ma = new MouseAnimation(canvasId)
  console.log(ma, ma.__proto__)
  ma.init()
}

export default startMouseAnimation
