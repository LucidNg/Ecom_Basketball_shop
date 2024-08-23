import CryptoJS from 'crypto-js';

// Type alias for encrypted token
type EncryptedToken = string;

// Decrypt function to decrypt an AES-encrypted token
export function decryptToken(encryptedToken: EncryptedToken): string {
  // Ensure the encryption key matches the one used on the server
  const encryptionKey: string = 'thisis32bitlongpassphraseimusing'; // Must be the same key as used in the Go server

  // Convert key to Utf8 format (for CryptoJS)
  const key = CryptoJS.enc.Utf8.parse(encryptionKey);

  // Convert encrypted token from Hex format to CryptoJS format
  const encryptedHex = CryptoJS.enc.Hex.parse(encryptedToken);
  const encryptedBase64 = CryptoJS.enc.Base64.stringify(encryptedHex);

  // Extract the IV from the encrypted token
  const ivHex = encryptedToken.substring(0, 32); // First 32 characters are the IV in Hex
  const iv = CryptoJS.enc.Hex.parse(ivHex);

  // Convert the remaining encrypted token (after the IV) to a CryptoJS format
  const encryptedMessage = CryptoJS.enc.Base64.stringify(
    CryptoJS.enc.Hex.parse(encryptedToken.substring(32))
  );

  // Decrypt the encrypted message using AES
  const decrypted = CryptoJS.AES.decrypt(encryptedMessage, key, {
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
    iv: iv,
  });

  // Convert decrypted data from bytes to Utf8 string
  const decryptedText: string = decrypted.toString(CryptoJS.enc.Utf8);

  return decryptedText;
}
