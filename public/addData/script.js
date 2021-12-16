function compare(a, b) {
    if (a.length !== b.length) {
      return false;
    }
    let set = {};
    a.forEach((i) => {
      if (set[i] !== undefined) {
        set[i]++;
      } else {
        set[i] = 1;
      }
    });
    let difference = b.every((i) => {
      if (set[i] === undefined) {
        return false;
      } else {
        set[i]--;
        if (set[i] === 0) {
          delete set[i];
        }
        return true;
      }
    });
    return Object.keys(set) == 0 && difference;
  }