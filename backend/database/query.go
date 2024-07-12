package database

import (
	"database/sql"
	"encoding/json"
	"net/http"

	_ "github.com/mattn/go-sqlite3"
)

type User struct {
	ID       string `json:"id"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

func QueryUsers(db *sql.DB, w http.ResponseWriter) error {
	rows, err := db.Query("SELECT * FROM users")
	if err != nil {
		return err
	}
	defer rows.Close()

	var users []User

	for rows.Next() {
		var user User
		err = rows.Scan(&user.ID, &user.Email, &user.Password)
		if err != nil {
			return err
		}
		users = append(users, user)
	}

	if err := rows.Err(); err != nil {
		return err
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(users); err != nil {
		return err
	}

	return nil
}

type Category struct {
	ID          string `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
}

func QueryCategory(db *sql.DB, w http.ResponseWriter) error {
	rows, err := db.Query("SELECT * FROM category")
	if err != nil {
		return err
	}
	defer rows.Close()

	var categories []Category

	for rows.Next() {
		var category Category
		err = rows.Scan(&category.ID, &category.Name, &category.Description)
		if err != nil {
			return err
		}
		categories = append(categories, category)
	}

	if err := rows.Err(); err != nil {
		return err
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(categories); err != nil {
		return err
	}

	return nil
}

type Product struct {
	ProductID   string `json:"productID"`
	CategoryID  string `json:"categoryID"`
	ProductName string `json:"productName"`
	Description string `json:"description"`
	Brand       string `json:"brand"`
	Price       int    `json:"price"`
	Stock       int    `json:"stock"`
	ImageURL    string `json:"imageURL"`
	DateAdded   string `json:"dateAdded"`
	Size        string `json:"size"`
}

func QueryProduct(db *sql.DB, w http.ResponseWriter) error {
	rows, err := db.Query("SELECT * FROM product")
	if err != nil {
		return err
	}
	defer rows.Close()

	var products []Product

	for rows.Next() {
		var product Product
		err = rows.Scan(&product.ProductID, &product.CategoryID, &product.ProductName, &product.Description, &product.Brand, &product.Price, &product.Stock, &product.ImageURL, &product.DateAdded, &product.Size)
		if err != nil {
			return err
		}
		products = append(products, product)
	}

	if err := rows.Err(); err != nil {
		return err
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(products); err != nil {
		return err
	}

	return nil
}
