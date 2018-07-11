export function keys(object, predicate) {
  const list = [];
  for (var k in object) {
    k = isNaN(Number(k)) ? k : Number(k);
    if (object.hasOwnProperty(k)) {
      if (predicate) {
        if (predicate(object[k], k)) {
          list.push(k);
        }
      } else {
        list.push(k);
      }
    }
  }
  return list;
}