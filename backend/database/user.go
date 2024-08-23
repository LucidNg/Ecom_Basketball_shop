package database

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/google/uuid"
	sqlitecloud "github.com/sqlitecloud/sqlitecloud-go"
	"golang.org/x/crypto/bcrypt"
)

func CreateJWT(userID, email, fullname string) (string, error) {
	// Define the JWT claims
	claims := jwt.MapClaims{
		"userID":   userID,
		"email":    email,
		"fullname": fullname,
		"exp":      time.Now().Add(2 * time.Hour).Unix(), // Set expiration to 2 hours
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

func AuthenticateUser(db *sqlitecloud.SQCloud, email string, password string, w http.ResponseWriter) error {
	// Query to get the user record by email
	query := "SELECT userID, password FROM users WHERE email = ?"
	values := []interface{}{email}
	rows, err := db.SelectArray(query, values)
	if err != nil {
		return err
	}

	// Check if a user was found
	if rows.GetNumberOfRows() == 0 {
		return errors.New("user not found")
	}

	// Get the userID and hashed password from the result
	userID := rows.GetStringValue_(0, 0)
	hashedPassword := rows.GetStringValue_(0, 1)
	// Compare the provided password with the stored hashed password
	err = bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
	if err != nil {
		return errors.New("invalid password")
	}

	query = "SELECT fullName FROM userDetail WHERE userID = ?"
	values = []interface{}{userID}

	rows, err = db.SelectArray(query, values)
	if err != nil {
		return err
	}
	defer rows.Dump()
	fullname := rows.GetStringValue_(0, 0)

	token, err := CreateJWT(userID, email, fullname)
	if err != nil {
		return err
	}

	// Set the JWT as an HTTP-only cookie
	http.SetCookie(w, &http.Cookie{
		Name:     "jwt",                         // Cookie name
		Value:    token,                         // The JWT
		Path:     "/",                           // Path where the cookie is valid
		HttpOnly: true,                          // Prevents access via JavaScript
		Secure:   true,                          // Ensures the cookie is only sent over HTTPS
		Expires:  time.Now().Add(2 * time.Hour), // Set expiration to 2 hours
		SameSite: http.SameSiteStrictMode,       // Prevent CSRF
	})

	return nil
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

var jwtSecret = []byte("cs428")

// Claims struct for JWT
type User struct {
	UserID   string `json:"userID"`
	Email    string `json:"email"`
	Fullname string `json:"fullName"`
	jwt.StandardClaims
}

// ParseJWT function to parse and validate JWT
func getUserInfoFromToken(tokenString string) (*User, error) {
	// Parse the JWT token
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		// Ensure the token's signing method is what you expect
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, jwt.ErrInvalidKey
		}
		return []byte("cs428"), nil
	})
	if err != nil || !token.Valid {
		return nil, err
	}

	// Extract claims from the token
	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		return nil, jwt.ErrInvalidKey
	}

	// Return user information based on claims
	user := &User{
		Fullname: claims["fullname"].(string),
		Email:    claims["email"].(string),
		UserID:   claims["userID"].(string),
		// Add other user details if needed
	}
	return user, nil
}

func AuthStatusHandler(w http.ResponseWriter, r *http.Request) {
	// Extract token from cookies
	cookie, err := r.Cookie("jwt")
	if err != nil {
		fmt.Println(err)
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	tokenString := cookie.Value
	user, err := getUserInfoFromToken(tokenString)
	if err != nil {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	// Respond with user information
	response := map[string]string{
		"fullname": user.Fullname,
		"email":    user.Email,
		"userID":   user.UserID,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}
