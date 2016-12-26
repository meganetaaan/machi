'use strict'

function uuid () {
  let uuid = ''
  let i
  let random
  for (i = 0; i < 32; i++) {
    random = Math.random() * 16 | 0

    if (i === 8 || i === 12 || i === 16 || i === 20) {
      uuid += '-'
    }
    uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16)
  }
  return uuid
}

let seq = 0

class Order {
  constructor () {
    this.id = uuid()
    this.orderNo = seq++
    this._listenersMap = new Map()
  }

  cook () {
    this.trigger('cooked')
  }

  serve () {
    this.trigger('served')
  }

  trigger (eventName) {
    const listeners = this._listenersMap.get(eventName)
    if (listeners == null) {
      return
    }
    for (let listener of listeners) {
      if (typeof listener === 'function') {
        listener(this)
      }
    }
  }

  addEventListener (eventName, listener) {
    const listeners = this._listenersMap[eventName]
    if (listeners == null) {
      this._listenersMap.set(eventName, [])
    }
    this._listenersMap.get(eventName).push(listener)
  }
}

class OrderManager {
  constructor () {
    this._doing = new Set()
    this._done = new Set()
    this._undo = []
    this._redo = []
  }

  createOrder () {
    const order = new Order()
    order.addEventListener('cooked', this.cookOrder.bind(this))
    order.addEventListener('served', this.serveOrder.bind(this))
    this._doing.add(order)
  }

  cookOrder (order) {
    this._doing.delete(order)
    this._done.add(order)
  }

  serveOrder (order) {
    this._done.delete(order)
  }

  print () {
    console.log(JSON.stringify(this, null, null, 2))
  }
}

/*
document.addEventListener('DOMContentLoaded', () => {

})
*/

module.exports = OrderManager
// export default OrderManager
