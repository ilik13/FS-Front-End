/**
 * @returns {string}
 */
function classSet(...args) {
  let classes = '';

  function addClass(key) {
    classes += ` ${key}`;
  }

  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];

    if (arg) {
      const argType = typeof arg;

      if (argType === 'string' || argType === 'number') {
        classes += ` ${arg}`;
      } else if (Array.isArray(arg)) {
        classes += ` ${classSet(...arg)}`;
      } else if (argType === 'object') {
        Object.keys(arg).forEach((key) => arg[key] && addClass(key));
      }
    }
  }

  return classes.substr(1);
}

/**
 * @typedef {{
 *  name: string,
 *  mods: (*),
 *  added: (*)
 * }} className.Options
 */

const MOD_SEPARATOR = '__';

/**
 * @param {className.Options} options
 * @returns {string}
 */
const className = (options = {}) => {
  const name = options.name || '';
  let classes = name;

  let mods = options.mods && classSet(options.mods);
  if (mods) {
    mods = mods.split(' ');

    for (let i = 0; i < mods.length; i += 1) {
      classes += ` ${name}${MOD_SEPARATOR}${mods[i]}`;
    }
  }

  return classes + (options.added ? ` ${options.added}` : '');
};

module.exports = className;
