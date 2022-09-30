/*!
 * jAnimate v0.2.0
 * https://github.com/renatorib/janimate
 *
 * Copyright (c) 2014-2015 Renato Ribeiro
 * Released under the MIT license
 *
 * Date: 2015-07-02T11:43:03.268Z
 */

(function (factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    factory(require('jquery'));
  } else {
    factory(jQuery);
  }
})(function ($) {

  var __ = {
    class: "animated ",
    data: "data-janimate",
    animationend: "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend"
  };

  function jSequence(options){
    var self = this;
    this.opt = $.extend({}, {
      el: false,
      effects: false,
      callback: false
    }, options);
    this.effects = this.opt.effects;
    this.el = this.opt.el;
    this.indx = 0;
    this.callback = this.opt.callback;
    this.next = function(){
      $(this.el).jAnimateOnce(this.effects[this.indx], function(){
        self.indx++;
        if(typeof self.effects[self.indx] != 'undefined') {
          self.next();
        } else {
          if(typeof self.callback != "undefined" && $.isFunction(self.callback)){
            self.callback(self.el, self.effects);
          }
        }
      });
    }
  }

  function jAnimate(options){
    var self = this;
    this.opt = $.extend({}, {
      once: false,
      el: false,
      effect: false,
      callback: false
    }, options);
    this.older = $(this.opt.el).attr('data-janimate');
    this.newer = __.class + this.opt.effect;
    this.once = this.opt.once;
    $(this.opt.el).removeClass(this.older).removeAttr(__.data);
    this.opt.el.offsetWidth = this.opt.el.offsetWidth;
    $(this.opt.el).addClass(this.newer).attr(__.data, this.newer);
    $(this.opt.el).one(__.animationend, function(){
        if(self.opt.once){
          $(self.opt.el).removeClass(self.newer).removeAttr(__.data);
        }
        if(typeof self.opt.callback != "undefined" && $.isFunction(self.opt.callback)){
          self.opt.callback(self, self.opt.effect);
        }
    });
  }

  $.fn.jAnimate = function(effect, callback) {
    return this.each(function() {
      new jAnimate({el: this, effect: effect, callback: callback});
    });
  }

  $.fn.jAnimateOnce = function(effect, callback) {
    return this.each(function() {
      new jAnimate({el: this, effect: effect, callback: callback, once: true});
    });
  }

  $.fn.jAnimateSequence = function(effects, callback) {
    return this.each(function() {
      if(!$.isArray(effects)) return false;
      new jSequence({el: this, effects: effects, callback: callback}).next();
    });
  }

});
