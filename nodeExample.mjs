import { encodeBase128, decodeBase128 } from "./base128.mjs";

const myText = "This is a 100 character text i'm encoding in base128 as an example abcdefghijklmnopqrstuvwxyzABCDEFG"
const encoded = encodeBase128(myText);
console.log(`The result of encoding:

  ${myText} 

to base128 is

  ${encoded}

`);

const decoded = decodeBase128(encoded);
console.log(`The result of decoding

  ${encoded} 

from base128 is 

  ${decoded}
`);

console.log(`

Example of size difference:

Text    -> "This is a 100 character text i'm encoding in base128 as an example abcdefghijklmnopqrstuvwxyzABCDEFG"

Base128 -> OznwybÛ×pxJdjá&FVžmwsfì{W@îhIu\`{pzJ£:bÌ.VŽ?ìÍ3ûFYŽîgsf!)xóícdf!FUŽîgP*é,2AmÛdfî+WyQ!5GÛ;ZŽnÿ×7&|3B.íPÝ.€6$ÎtrniïIq&ÇÇÇÇÇ

Base64  -> VGhpcyBpcyBhIDEwMCBjaGFyYWN0ZXIgdGV4dCBpJ20gZW5jb2RpbmcgaW4gYmFzZTEyOCBhcyBhbiBleGFtcGxlIGFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6QUJDREVGRwo=

Original: 100 characters
base128 : 120 characters
base64  : 138 characters
`);
