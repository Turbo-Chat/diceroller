/*!
 * DiceRoller.js 1.0.0
 * https://github.com/Turbo-Chat/DiceRoller
 * @license MIT
 *
 * Copyright (C) 2025 TurboChat
 */
(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.DiceRoller = factory();
  }
})(this, function () {
  const defaults = {
    sides: 6,
    count: 1,
    modifier: 0,
    onRoll: null
  };

  function DiceRoller(options) {
    return new DiceRoller.lib.init(options);
  }

  DiceRoller.lib = DiceRoller.prototype = {
    constructor: DiceRoller,

    init: function (options) {
      this.options = Object.assign({}, defaults, options);
      return this;
    },

    roll: function () {
      const results = [];
      let total = 0;

      for (let i = 0; i < this.options.count; i++) {
        const roll = Math.floor(Math.random() * this.options.sides) + 1;
        results.push(roll);
        total += roll;
      }

      total += this.options.modifier;

      const output = {
        rolls: results,
        modifier: this.options.modifier,
        total: total
      };

      if (typeof this.options.onRoll === "function") {
        this.options.onRoll(output);
      }

      return output;
    }
  };

  DiceRoller.lib.init.prototype = DiceRoller.lib;

  return DiceRoller;
});
