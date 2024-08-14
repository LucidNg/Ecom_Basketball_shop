package database

import (
	"errors"
	"time"

	"github.com/golang-jwt/jwt/v4"
	sqlitecloud "github.com/sqlitecloud/sqlitecloud-go"
	"golang.org/x/crypto/bcrypt"
)

func CreateJWT(userID, email string) (string, error) {
	// Define the JWT claims
	claims := jwt.MapClaims{
		"userID": userID,
		"email":  email,
		"exp":    time.Now().Add(2 * time.Hour).Unix(), // Set expiration to 2 hours
	}

	// Create a new JWT token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	// Secret key used to sign the token
	secretKey := []byte("cs428")

	// Sign the token and return it
	signedToken, err := token.SignedString(secretKey)
	if err != nil {
		return "", err
	}

	return signedToken, nil
}

func AuthenticateUser(db *sqlitecloud.SQCloud, email string, password string) (string, error) {
	// Query to get the user record by email
	query := "SELECT userID, password FROM users WHERE email = ?"
	values := []interface{}{email}
	rows, err := db.SelectArray(query, values)
	if err != nil {
		return "", err
	}

	// Check if a user was found
	if rows.GetNumberOfRows() == 0 {
		return "", errors.New("user not found")
	}

	// Get the userID and hashed password from the result
	userID := rows.GetStringValue_(0, 0)
	hashedPassword := rows.GetStringValue_(0, 1)

	// Compare the provided password with the stored hashed password
	err = bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
	if err != nil {
		return "", errors.New("invalid password")
	}

	token, err := CreateJWT(userID, email)
	if err != nil {
		return "", err
	}

	return token, nil
}
