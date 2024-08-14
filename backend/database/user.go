package database

import (
	"errors"
	"net/http"
	"time"

	"github.com/golang-jwt/jwt/v4"
	"github.com/google/uuid"
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

func InsertUser(db *sqlitecloud.SQCloud, fullnane string, email string, password string) error {
	var id string
	for {
		id = uuid.New().String()
		exists, err := recordExists(db, "users", "userID", id)
		if err != nil {
			return err
		}
		if !exists {
			break
		}
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}

	insertUserSQL := "INSERT INTO users (userID, email, password) VALUES (?, ?, ?)"
	values := []interface{}{id, email, string(hashedPassword)}

	err = db.ExecuteArray(insertUserSQL, values)
	if err != nil {
		return err
	}

	insertUserDetailSQL := "INSERT INTO userDetail (userID, fullName) VALUES (?, ?)"
	values = []interface{}{id, fullnane}

	err = db.ExecuteArray(insertUserDetailSQL, values)
	return err
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

func QueryUsers(db *sqlitecloud.SQCloud, w http.ResponseWriter) error {
	rows, err := db.Select("SELECT * FROM users")
	if err != nil {
		return err
	}

	defer rows.Dump()
	_, err = w.Write([]byte(rows.ToJSON()))
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return err
	}
	return nil
}
