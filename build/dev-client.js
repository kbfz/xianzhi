/* eslint-disable */
// require('eventsource-polyfill')

 require('event-source-polyfill')

var hotClient = require('webpack-hot-middleware/client?noInfo=true&reload=true')

hotClient.subscribe(function (event) {
  if (event.action === 'reload') {
    window.location.reload()
  }
})
