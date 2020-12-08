const config = require('config')

module.exports = {
  lang: 'en-US',
  title: 'Paul Shryock',
  url: config.get('site.url'),
  year: new Date().getFullYear(),
}
