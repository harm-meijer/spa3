var last;
var t = `en:
  search:Search
  stores:Stores
  help:Help
de:
  search:Suche
  stores:Filiale
  help:Hilfe`
  .split('\n')
  .reduce((acc, line) => {
    if (line[0] === ' ') {
      const [key, value] = line.split(':');
      acc[last][key.trim()] = value
        .trim()
        .replace(/"/g, '');
    } else {
      last = line.trim();
      acc[last] = {};
    }
    return acc;
  }, {});
console.log(JSON.stringify(t, undefined, 2));
