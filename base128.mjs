
const encodeBase128 = (text, isBin) => {
  const textToBin = (text) => {
    let end = "";
    for (let i in text) {
    let aux = text[i].charCodeAt(0).toString(2);
    if (aux.length < 8) {
      aux = "0".repeat(8 - aux.length) + aux;
    }
      end += aux;
    }

    return end;
  }

  // 128 printable chars
  const charset = "abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ0123456789áÁéÉîïìíÎÏÌÍóÓûüùúÛÜÙÚÿýŸÝžŽ@#$%&*-+()!\"':;/?,.~`|÷×{}£¢€^_=[]<>"
  const paddingChar = "Ç";

  const bin = isBin ? text : textToBin(text);

  const sevenBits = bin.match(/.{1,7}/g);

  // TODO: Padding
  let paddingCounter = 0;
  while (sevenBits[sevenBits.length-1].length < 7) {
    sevenBits[sevenBits.length-1] += "0";
    ++paddingCounter;
  }


  let res = [];
  for (let i in sevenBits) {
    const interger = parseInt("0" + sevenBits[i], 2);
    res.push( charset[interger] );
  }

  res = res.join("");

  if (paddingCounter) {
    res += paddingChar.repeat(paddingCounter);
  }

  return res;
}


const decodeBase128 = (text, isBin) => {
  const binToText = (bin) => {
    let res = "";
    const bytes = bin.match(/.{1,8}/g);
    for (let i in bytes) {
      res += String.fromCharCode(parseInt(bytes[i], 2));
    }
    return res;
  }

  let paddingCounter = 0;
  for (let i in text) {
    if (text[i] === "Ç") {
      ++paddingCounter;
    }
  }
  text = text.replace(/Ç/g, "");

  const charset = "abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ0123456789áÁéÉîïìíÎÏÌÍóÓûüùúÛÜÙÚÿýŸÝžŽ@#$%&*-+()!\"':;/?,.~`|÷×{}£¢€^_=[]<>"

  let sevenBits = [];
  for (let i in text) {
    for (let j = 0; j < charset.length; ++j) {
      if (text[i] === charset[j]) {
	let aux = j.toString(2);
        let aux2 = "0".repeat(7 - aux.length) + aux;
        sevenBits.push(aux2);
      }
    }
  }

  if (paddingCounter) {
    // Remove extra padding bits 
    sevenBits[sevenBits.length-1] = sevenBits[sevenBits.length-1].substring(0, sevenBits[sevenBits.length-1].length - paddingCounter);
  }


  return isBin ? sevenBits.join("") : binToText(sevenBits.join(""));

}

export {
  encodeBase128,
  decodeBase128
}

