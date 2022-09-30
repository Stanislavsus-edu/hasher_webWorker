import sha256 from 'crypto-js/sha256';
import sha512 from 'crypto-js/sha512';
import sha1 from 'crypto-js/sha1';
import md5 from 'crypto-js/md5';

const crypto = require('crypto-js');

let hash = '';
self.addEventListener('message', async (event) => {
  const wordArray = await crypto.lib.WordArray.create(event.data.file);
  switch (event.data.currentAlgorithm) {
    case 'MD5':
      hash = md5(wordArray).toString(crypto.enc.Hex);
      break;
    case 'SHA1':
      hash = sha1(wordArray).toString(crypto.enc.Hex);
      break;
    case 'SHA256':
      hash = sha256(wordArray).toString(crypto.enc.Hex);
      break;
    case 'SHA512':
      hash = sha512(wordArray).toString(crypto.enc.Hex);
      break;
    default:
      hash = md5(wordArray).toString(crypto.enc.Hex);
      break;
  }
});

setInterval(() => {
  self.postMessage(hash);
}, 11000);
