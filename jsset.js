// JS Set


/**
 * @constructor
 */
var JsSet = function() {
  /**
   * @type {Object.<string, *>}
   * @private
   */
  this.set_ = {};

  /**
   * @type {number}
   * @private
   */
  this.count_ = 0;
};


/**
 * @type {number}
 */
JsSet.nextObjectId = 0;


/**
 * @param {*} item
 * @private
 */
JsSet.prototype.determineId_ = function(item) {
  if (item == null) {
    return null;
  }
  var typeUniqueId;
  var type = typeof item;
  switch (type) {
    case 'object':
      if ('__JSSET_ID__' in item) {
        typeUniqueId = item.__JSSET_ID__;
      } else {
        typeUniqueId = JsSet.nextObjectId++;
        item.__JSSET_ID__ = typeUniqueId;
      }
      break;
    case 'string':
    case 'number':
    case 'boolean':
      typeUniqueId = String(item);
      break;
    default:
      // For now, deny non-Object and non-primitive types from getting an ID
      // (for example, an Array would fall into this category).
      return null;
  }
  return type + ':' + typeUniqueId;
};


/**
 * @param {*} item
 * @return {boolean} {@code true} if item was successfully added to the set.
 */
JsSet.prototype.add = function(item) {
  var key = this.determineId_(item);
  if (!key || key in this.set_) {
    return false;
  }
  this.set_[key] = item;
  this.count_++;
  return true;
};


/**
 * @param {*} item
 * @return {boolean} {@code true} if item was successfully removed from the
 *     set.
 */
JsSet.prototype.remove = function(item) {
  var key = this.determineId_(item);
  if (!key || !(key in this.set_)) {
    return false;
  }
  delete this.set_[key];
  this.count_--;
  return true;
};


/**
 * @param {*} item
 * @return {boolean}
 */
JsSet.prototype.contains = function(item) {
  var key = this.determineId_(item);
  if (!key || !(key in this.set_)) {
    return false;
  }
  return true;
};


/**
 * @return {number}
 */
JsSet.prototype.size = function() {
  return this.count_;
};


// Export for nodejs.
if (exports) {
  exports.JsSet = JsSet;
}