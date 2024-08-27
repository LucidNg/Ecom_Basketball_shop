package database

import (
	"bytes"
	"crypto/aes"
	"crypto/cipher"
	"crypto/rand"
	"encoding/hex"
	"io"
)

// Encrypt encrypts a plaintext string using AES with a given key.
func Encrypt(plaintext, key string) (string, error) {
	// Convert key to byte slice
	keyBytes := []byte(key)

	// Create a new AES cipher block with the key
	block, err := aes.NewCipher(keyBytes)
	if err != nil {
		return "", err
	}

	// Convert plaintext to byte slice
	plaintextBytes := []byte(plaintext)

	// AES block size is always 16 bytes
	blockSize := aes.BlockSize

	// Create a random IV (initialization vector)
	iv := make([]byte, blockSize)
	if _, err := io.ReadFull(rand.Reader, iv); err != nil {
		return "", err
	}

	// Apply PKCS#7 padding to the plaintext
	plaintextBytes = PKCS7Pad(plaintextBytes, blockSize)

	// Create a new GCM cipher mode instance with the block
	blockMode := cipher.NewCBCEncrypter(block, iv)

	// Create a byte slice to hold the ciphertext
	ciphertext := make([]byte, len(plaintextBytes))

	// Encrypt the padded plaintext
	blockMode.CryptBlocks(ciphertext, plaintextBytes)

	// Prepend IV to the ciphertext for decryption
	ciphertext = append(iv, ciphertext...)

	// Encode the ciphertext to hex format
	encryptedHex := hex.EncodeToString(ciphertext)

	return encryptedHex, nil
}

// PKCS7Pad applies PKCS#7 padding to the given byte slice.
func PKCS7Pad(data []byte, blockSize int) []byte {
	padding := blockSize - len(data)%blockSize
	padtext := bytes.Repeat([]byte{byte(padding)}, padding)
	return append(data, padtext...)
}
