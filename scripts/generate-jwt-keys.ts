import { generateKeyPairSync } from "crypto"
import fs from 'fs'

const { publicKey, privateKey } = generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem'
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem'
  }
});

fs.appendFileSync('.env.local', `JWT_PUBLIC_KEY="${publicKey.replace(/\n/g, '\\n')}"\n`);
fs.appendFileSync('.env.local', `JWT_PRIVATE_KEY="${privateKey.replace(/\n/g, '\\n')}"\n`);

console.log("Wrote keys to .env.local")