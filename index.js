/**
 * Module dependencies.
 */

var moment = require('moment')
  , raf = require('raf')
  , half = 1000 * 30
  , o = document.querySelectorAll.bind(document);

module.exports = Timeago;

/**
 * Returns a timea
 */

function Timeago (selector, options) {
  if (!(this instanceof Timeago)) {
    return new Timeago(selector, options);
  }

  if (0 === arguments.length) {
    throw new Error("Timeago requires at least a query selector string as parameter.");
  };

  this.selector = selector;

  options = options || {};
  this.interval = options.interval || half; // a minute
  this.lang = options.lang || 'en';
  this.attr = options.attr || 'data-time';
  this.timer = null;

  // setup language
  moment.locale(this.lang);

  // init auto-render
  this.update()
}

/**
 * Updates all matching elements
 * with selector provided
 *
 * @return {Timeago} `Timeago` instance.
 * @api public
 */

Timeago.prototype.update = function() {
  var self = this;

  // if timer, delete it!
  if (self.timer) {
    clearTimeout(self.timer);
  }

  raf(function() {
    // Update all matching elements with `Timeago` string.
    toArray(o(self.selector)).forEach(updateElement.bind(self));

    // Save timer's id for next update.
    self.timer = setTimeout(self.update.bind(self), self.interval);
  })
}

/**
 * Takes a NodeList Object and
 * returns an array
 *
 * @param {NodeList} list `NodeList` to convert
 * @return {Arrat} `Array` of `ElementNodes`
 * @api private
 */

function toArray (list) {
  return Array.prototype.concat.apply([], list);
}

/**
 * Takes the dirt in hands to update
 * every single element matched.
 * Requires `momentJS` and to be
 * binded to another object with
 * `attr` property.
 *
 * @param {NodeElement} el DOM's `NodeElement` to update
 * @api private
 */

function updateElement (el) {
  el.innerHTML = moment(el.getAttribute(this.attr)).fromNow();
}