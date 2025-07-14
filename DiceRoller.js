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
    count: 2,
    containerSelector: ".dice-container",
    onRoll: null
  };

  function DiceRoller(options) {
    return new DiceRoller.lib.init(options);
  }

  DiceRoller.lib = DiceRoller.prototype = {
    constructor: DiceRoller,

    init: function (options) {
      this.options = Object.assign({}, defaults, options);
      this.container = document.querySelector(this.options.containerSelector);

      if (!this.container) throw new Error("Dice container not found");

      return this;
    },

    roll: function () {
      const results = [];
      this.container.innerHTML = "";

      for (let i = 0; i < this.options.count; i++) {
        const value = Math.floor(Math.random() * this.options.sides) + 1;
        results.push(value);

        const dice = document.createElement("div");
        dice.className = "dice";
        dice.textContent = value;

        // Animate roll
        requestAnimationFrame(() => {
          dice.classList.add("roll");
        });

        this.container.appendChild(dice);
      }

      if (typeof this.options.onRoll === "function") {
        this.options.onRoll(results);
      }

      return results;
    }
  };

  DiceRoller.lib.init.prototype = DiceRoller.lib;
  return DiceRoller;
});
