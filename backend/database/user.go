package database

import (
	"errors"
	"fmt"
	"net/http"
	"time"

	"github.com/golang-jwt/jwt/v4"
	"github.com/google/uuid"
	sqlitecloud "github.com/sqlitecloud/sqlitecloud-go"
	"golang.org/x/crypto/bcrypt"
)

func CreateJWT(userID, email, fullname, cartID, dob, address, phoneNumber, role string) (string, error) {
	// Define the JWT claims
	claims := jwt.MapClaims{
		"userID":      userID,
		"email":       email,
		"fullname":    fullname,
		"cartID":      cartID,
		"dob":         dob,
		"address":     address,
		"phoneNumber": phoneNumber,
		"role":        role,
		"exp":         time.Now().Add(2 * time.Hour).Unix(), // Set expiration to 2 hours
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

func InsertUser(db *sqlitecloud.SQCloud, fullname string, email string, password string) (string, error) {
	var id string
	for {
		id = uuid.New().String()
		exists, err := recordExists(db, "users", "userID", id)
		if err != nil {
			return "", err
		}
		if !exists {
			break
		}
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}

	insertUserSQL := "INSERT INTO users (userID, email, password) VALUES (?, ?, ?)"
	values := []interface{}{id, email, string(hashedPassword)}

	err = db.ExecuteArray(insertUserSQL, values)
	if err != nil {
		return "", err
	}

	insertUserDetailSQL := "INSERT INTO userDetail (userID, fullName) VALUES (?, ?)"
	values = []interface{}{id, fullname}

	err = db.ExecuteArray(insertUserDetailSQL, values)
	if err != nil {
		return "", err
	}

	return id, nil
}

func AuthenticateUser(db *sqlitecloud.SQCloud, email string, password string) (string, error) {
	// Query to get the user record by email
	query := "SELECT userID, password, role FROM users WHERE email = ?"
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
	role := rows.GetStringValue_(0, 2)
	// Compare the provided password with the stored hashed password
	err = bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
	if err != nil {
		return "", errors.New("invalid password")
	}

	query = "SELECT fullName, dob, address, phoneNumber FROM userDetail WHERE userID = ?"
	values = []interface{}{userID}

	rows, err = db.SelectArray(query, values)
	if err != nil {
		return "", err
	}
	defer rows.Dump()
	fullname := rows.GetStringValue_(0, 0)
	dob := rows.GetStringValue_(0, 1)
	address := rows.GetStringValue_(0, 2)
	phoneNumber := rows.GetStringValue_(0, 3)

	query = "SELECT cartID FROM cart WHERE userID = ?"
	values = []interface{}{userID}

	rows, err = db.SelectArray(query, values)
	if err != nil {
		return "", err
	}
	cartID := rows.GetStringValue_(0, 0)

	token, err := CreateJWT(userID, email, fullname, cartID, dob, address, phoneNumber, role)
	if err != nil {
		return "", err
	}

	encryptionKey := "thisis32bitlongpassphraseimusing" // Your AES key (must be 16, 24, or 32 bytes)
	encryptedToken, err := Encrypt(token, encryptionKey)
	if err != nil {
		return "", err
	}

	return encryptedToken, nil
}

func QueryUsers(db *sqlitecloud.SQCloud, w http.ResponseWriter) error {
	rows, err := db.Select("SELECT * FROM users")
	if err != nil {
		return err
	}

	_, err = w.Write([]byte(rows.ToJSON()))
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return err
	}
	return nil
}

func UpdateUserDetail(db *sqlitecloud.SQCloud, userID, fullName, phoneNumber, address, dob string, w http.ResponseWriter) error {
	// Construct the SQL statement to update user details
	updateUserDetailSQL := `
		UPDATE userDetail 
		SET 
			fullName = ?, 
			phoneNumber = ?, 
			address = ?, 
			dob = ?
		WHERE userID = ?`

	// Prepare the values for the SQL statement
	values := []interface{}{fullName, phoneNumber, address, dob, userID}
	// Execute the SQL statement
	err := db.ExecuteArray(updateUserDetailSQL, values)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return err
	}

	// If no error, return nil indicating success
	return nil
}

func UpdateUserPassword(db *sqlitecloud.SQCloud, userID string, newPassword string) error {
	// Generate a hashed password from the new password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(newPassword), bcrypt.DefaultCost)
	if err != nil {
		return fmt.Errorf("failed to hash password: %w", err)
	}

	// SQL query to update the user's password
	updatePasswordSQL := "UPDATE users SET password = ? WHERE userID = ?"

	// Prepare the values for the SQL statement
	values := []interface{}{string(hashedPassword), userID}

	// Execute the SQL statement to update the password
	err = db.ExecuteArray(updatePasswordSQL, values)
	if err != nil {
		return fmt.Errorf("failed to update password: %w", err)
	}

	// If no error, return nil indicating success
	return nil
}
