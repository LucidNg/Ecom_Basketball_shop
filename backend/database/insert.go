package database

import (
	"database/sql"
	"fmt"
	"strconv"

	"github.com/google/uuid"
	_ "github.com/mattn/go-sqlite3"
)

func recordExists(db *sql.DB, tableName string, attribute string, id string) (bool, error) {
	var exists bool
	query := fmt.Sprintf("SELECT COUNT(1) FROM %s WHERE %s = ?", tableName, attribute)
	err := db.QueryRow(query, id).Scan(&exists)
	if err != nil && err != sql.ErrNoRows {
		return false, err
	}
	return exists, nil
}

func InsertUser(db *sql.DB, email string, password string) error {
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
	insertUserSQL := `INSERT INTO users (userID, email, password) VALUES (?, ?, ?)`
	_, err := db.Exec(insertUserSQL, id, email, password)
	return err
}

func InsertCategory(db *sql.DB, name string, description string) error {
	var id string
	for {
		id = uuid.New().String()
		exists, err := recordExists(db, "category", "categoryID", id)
		if err != nil {
			return err
		}
		if !exists {
			break
		}
	}
	insertUserSQL := `INSERT INTO category (categoryID, categoryName, description) VALUES (?, ?, ?)`
	_, err := db.Exec(insertUserSQL, id, name, description)
	return err
}

func InsertProduct(db *sql.DB, categoryID string, name string, description string, brand string, price string, stock string, dateAdded string, size string) error {
	var id string
	for {
		id = uuid.New().String()
		exists, err := recordExists(db, "product", "productID", id)
		if err != nil {
			return err
		}
		if !exists {
			break
		}
	}

	priceInt, err := strconv.Atoi(price)
	if err != nil {
		fmt.Println("Error:", err)
		return err
	}

	stockInt, err := strconv.Atoi(stock)
	if err != nil {
		fmt.Println("Error:", err)
		return err
	}
	insertUserSQL := `INSERT INTO product (productID, categoryID, productName, description, brand, price, stock, dateAdded, size) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
	_, err = db.Exec(insertUserSQL, id, categoryID, name, description, brand, priceInt, stockInt, dateAdded, size)
	return err
}
