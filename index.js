/**
 * Module dependencies.
 */

var moment = require('moment')();
var half = 1000 * 30;
var elements = [];
var timer = null;

var options = {
  interval: half,
  lang: 'en',
  attr: 'data-time'
}

moment.locale(options.lang)

var Timeago = module.exports = {};

/**
 * Function to remove elements from the timeago update() iteration
 *
 * @param {Hash} of options to everride the current ones
 * @return {Timeago} `Timeago`.
 * @api public
 */
Timeago.config = function(o) {
  if (!o) return Timeago;
  if ('number' === typeof o.interval) options.interval = o.interval;
  if ('string' === typeof o.lang) {
    options.lang = o.lang;
    // Configure moment locale only for this instance, not globally.
    moment.locale(options.lang)
  }
  if ('string' === typeof o.attr) options.attr = o.attr;
}

/**
 * Function to add elements to the timeago update() iteration
 *
 * @param {Element, NodeList, Array of Elements} to be added to the iteration
 * @return {Timeago} `Timeago`.
 * @api public
 */
Timeago.add = function(els) {
  els = toArrayOfEls(els);

  elements.concat(els);

  return Timeago.update();
}

/**
 * Function to remove elements from the timeago update() iteration
 *
 * @param {Element, NodeList, Array of Elements} to be added to the iteration
 * @return {Timeago} `Timeago`.
 * @api public
 */
Timeago.remove = function(els) {
  els = toArrayOfEls(els);

  for (var i = 0, l = els.length; i < l; ++i) {
    var el = els[i];
    var index = elements.indexOf(el);
    if (index > -1) elements.splice(index, 1);
  }

  return Timeago.update();
}

/**
 * Updates all the elements
 * that where added.
 *
 * @return {Timeago} `Timeago`.
 * @api public
 */
Timeago.update = function() {
  // if timer, delete it!
  if (timer) {
    clearTimeout(timer);
  }

  // Update all elements with `Timeago` string.
  for (var i = 0, l = elements.length; i < l; ++i) {
    updateElement(elements[i]);
  }

  // Save timer's id for next update.
  if (options.interval) {
    timer = setTimeout(Timeago.update, options.interval);
  }

  return Timeago
}

/**
 * Makes sure the element(s) is an Array of elements.
 *
 * @param {Element, NodeList, Array of Elements} to be converted to array.
 * @return {Array} of elements
 * @api private
 */
function toArrayOfEls(els) {
  if (els instanceof NodeList) els = Array.prototype.slice.call(els);
  if ('undefined' === typeof els.length) els = [els];
  return els;
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
