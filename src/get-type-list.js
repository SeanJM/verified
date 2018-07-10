export function getTypeList(type) {
  const typeList = [];
  let i = -1;
  const n = type.length;

  if (!n) {
    typeList.push(type);
  }

  while (++i < n) {
    if (type.substring(i, i + 6) === "Array<") {
      let start = i;
      let o = 1;
      i += 6;
      while (++i < n && o) {
        if (type[i] === "<") {
          o += 1;
        } else if (type[i] === ">") {
          o -= 1;
        }
      }
      typeList.push(type.substring(start, i));
    } else {
      let start = i;
      while (i < n && type[i] !== "|") {
        i += 1;
      }
      typeList.push(type.substring(start, i));
    }
  }

  return typeList;
}
