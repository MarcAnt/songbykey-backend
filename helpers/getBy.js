const hasKeySignature = (searchArray = []) => {
  const arr = searchArray.slice(1, searchArray.length);

  const transformed = arr.map((signature) => {
    if (signature === "sharp") {
      return "#";
    } else if (signature === "flat") {
      return "b";
    } else if (signature === "slash") {
      return "/";
    } else if (signature === "M") {
      return "";
    } else if (signature === "+") {
      return "aug";
    } else {
      return signature;
    }
  });
  // console.log(transformed);
  return transformed;
};

// Obtener elementos por tipo
const getBy = (songs = [], typeSearch, searchBy, searchFilter = null) => {
  let matches = [];

  const arrayOfWord = searchBy.split("-");

  if (searchFilter === "minor") {
    searchBy = `${arrayOfWord[0]}${hasKeySignature(
      arrayOfWord[arrayOfWord.length - 1]
    )}m`;
  }

  // console.log(searchBy);

  // Si existe un filtro, aplica una busqueda especifica

  if (searchFilter !== null) {
    songs
      // Obtener primero un array con los tonos
      .map((song) => {
        return song[typeSearch].find((type) => type === searchBy);
      })
      .filter((e, idx) => {
        //Si el array tiene al menos un valor, se agrega el index de esa valor al array
        return e !== undefined && matches.push(idx);
      });

    return matches.map((match) => songs[match]);
  } else {
    songs
      // Obtener primero un array con los tonos
      .map((song) => {
        return song[typeSearch].filter((type) => {
          // console.log(type);
          // Si obtiene los resultados retorna true o false
          return type.includes(searchBy);
        });
      })
      // Filtrar y obtener un array con los index de las coincidencias
      .filter((e, idx) => {
        //Si el array tiene al menos un valor, se agrega el index de esa valor al array
        return e.length > 0 && matches.push(idx);
      });
    return matches.map((match) => songs[match]);
  }
};

// Obtener todos los acordes de todos los registros

const getChords = (songs = []) => {
  const allChords = new Set(songs.flatMap((song) => song.chords));

  return [...allChords];
};

// Obtener todos los acordes de todos los registros

const getTones = (songs = []) => {
  const allTones = new Set(songs.flatMap((song) => song.tones));
  return [...allTones];
};

const getByChords = (songs = [], searchBy, searchFilter = null) => {
  // let matches = [];
  // const arrayOfWord = searchBy.split("-");
  // // if (searchFilter === "minor") {
  // // }
  // searchBy = `${arrayOfWord[0]}${hasKeySignature(arrayOfWord).join("")}`;
  // // console.log(searchBy, arrayOfWord);
  // // console.log(searchBy);
  // // Si existe un filtro, aplica una busqueda especifica
  // if (searchFilter !== null) {
  //   songs
  //     // Obtener primero un array con los tonos
  //     .map((song) => {
  //       return song.chords.find((type) => type === searchBy);
  //     })
  //     .filter((e, idx) => {
  //       //Si el array tiene al menos un valor, se agrega el index de esa valor al array
  //       return e !== undefined && matches.push(idx);
  //     });
  //   return matches.map((match) => songs[match]);
  // } else {
  //   songs
  //     // Obtener primero un array con los tonos
  //     .map((song) => {
  //       return song.chords.filter((type) => {
  //         // console.log(type);
  //         // Si obtiene los resultados retorna true o false
  //         return type.includes(searchBy);
  //       });
  //     })
  //     // Filtrar y obtener un array con los index de las coincidencias
  //     .filter((e, idx) => {
  //       //Si el array tiene al menos un valor, se agrega el index de esa valor al array
  //       return e.length > 0 && matches.push(idx);
  //     });
  //   return matches.map((match) => songs[match]);
  // }
};

const getByKeys = (songs = [], searchBy, searchFilter = null) => {
  // let matches = [];
  // // const arrayOfWord = searchBy.split("-");
  // // searchBy = `${arrayOfWord[0]}${hasKeySignature(arrayOfWord).join("")}`;
  // console.log(searchBy, searchFilter);
  // // Si existe un filtro, aplica una busqueda especifica
  // if (searchFilter !== null) {
  //   songs
  //     // Obtener primero un array con los tonos
  //     .map((song) => {
  //       return song.tones.find((type) => type === searchBy);
  //     })
  //     .filter((e, idx) => {
  //       //Si el array tiene al menos un valor, se agrega el index de esa valor al array
  //       return e !== undefined && matches.push(idx);
  //     });
  //   return matches.map((match) => songs[match]);
  // } else {
  //   songs
  //     // Obtener primero un array con los tonos
  //     .map((song) => {
  //       return song.tones.filter((type) => {
  //         // console.log(type);
  //         // Si obtiene los resultados retorna true o false
  //         return type.includes(searchBy);
  //       });
  //     })
  //     // Filtrar y obtener un array con los index de las coincidencias
  //     .filter((e, idx) => {
  //       //Si el array tiene al menos un valor, se agrega el index de esa valor al array
  //       return e.length > 0 && matches.push(idx);
  //     });
  //   return matches.map((match) => songs[match]);
  // }
};

// Filtrar por tonos

const getKeyByFilters = (songs = [], searchBy) => {
  let matches = [];

  searchBy[1] === "M" || searchBy[1] === "" ? (searchBy[1] = "") : searchBy[1];
  songs
    // Obtener primero un array con los tonos
    .map((song) => {
      return song.tones.find((type) => type === searchBy.join(""));
    })
    .filter((e, idx) => {
      //Si el array tiene al menos un valor, se agrega el index de esa valor al array
      return e !== undefined && matches.push(idx);
    });
  return matches.map((match) => songs[match]);
};

// Filtrar por acordes

const getChordByFilters = (songs = [], searchBy) => {
  let matches = [];
  hasKeySignature(searchBy);

  const chord = `${searchBy[0]}${hasKeySignature(searchBy).join("")}`;
  // console.log(chord);
  songs
    // Obtener primero un array con los tonos
    .map((song) => {
      return song.chords.find((type) => type === chord);
    })
    .filter((e, idx) => {
      //Si el array tiene al menos un valor, se agrega el index de esa valor al array
      return e !== undefined && matches.push(idx);
    });
  return matches.map((match) => songs[match]);
};

// Buscar por tonos

const getSearchByType = (songs = [], searchBy, type) => {
  let matches = [];

  songs
    // Obtener primero un array con los tonos
    .map((song) => {
      return song[type].filter((type) => {
        // console.log(type);
        // Si obtiene los resultados retorna true o false

        return type.full.includes(searchBy);
      });
    })
    // Filtrar y obtener un array con los index de las coincidencias
    .filter((e, idx) => {
      //Si el array tiene al menos un valor, se agrega el index de esa valor al array
      return e.length > 0 && matches.push(idx);
    });
  return matches.map((match) => songs[match]);
};

// let arrFinal = [{chord: "A", searches: 1 }, {chord: "Cm", searches: 2}, {chord: "Fm", searches: 4 }]

//Agregar cuando no hay acordes iguales

const setMostPopular = (chord, arr) => {
  //Verificar primero is existe el acorde
  const findA = arr.find((e) => e.chord === chord.chord);
  //Si es undefined, se lo agrega sino aumenta el valor actual en +1

  if (findA === undefined) {
    return [...arr, chord];
  } else {
    const findB = arr.findIndex((e) => e.chord === chord.chord);
    const removed = arr.splice(findB, 1);

    return [...arr, (removed[0].searches += 1)];
  }
};

// Obtener el mas popular
const getMostPopular = (arr) => {
  //Verificar primero is existe el acorde
  const arrList = arr.map((e) => e.searches);
  const max = Math.max(...arrList);

  return arr.filter((e) => e.searches === max);
};

module.exports = {
  getBy,
  getChords,
  getTones,
  hasKeySignature,
  getByChords,
  getByKeys,
  getSearchByType,
  getKeyByFilters,
  getChordByFilters,
  getMostPopular,
  setMostPopular,
};
