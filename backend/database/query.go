package database

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
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
		err = rows.Scan(&product.ProductID, &product.CategoryID, &product.ProductName, &product.Description, &product.Brand, &product.Price, &product.Stock, &product.DateAdded, &product.Size)
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

func QueryProductByCategory(db *sql.DB, w http.ResponseWriter, r *http.Request) error {
	vars := mux.Vars(r)
	category := vars["category"]
	value := fmt.Sprintf("%%%s%%", category)
	query := `
	WITH ranked_products AS (
		SELECT 
			p.productID, 
			p.categoryID, 
			p.productName, 
			p.description, 
			p.brand, 
			p.price, 
			p.stock, 
			p.dateAdded, 
			p.size,
			ROW_NUMBER() OVER (PARTITION BY p.productName ORDER BY p.dateAdded DESC) as row_num
		FROM 
			product p
		JOIN 
			category c ON p.categoryID = c.categoryID
		WHERE 
			c.categoryName LIKE ?
		)
		SELECT 
		productID, 
		categoryID, 
		productName, 
		description, 
		brand, 
		price, 
		stock, 
		dateAdded, 
		size
		FROM 
		ranked_products
		WHERE 
		row_num = 1
		ORDER BY 
		dateAdded DESC;`

	rows, err := db.Query(query, value)
	if err != nil {
		return err
	}
	defer rows.Close()

	var products []Product
	for rows.Next() {
		var product Product
		err = rows.Scan(&product.ProductID, &product.CategoryID, &product.ProductName, &product.Description, &product.Brand, &product.Price, &product.Stock, &product.DateAdded, &product.Size)
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

func QueryProductByID(db *sql.DB, w http.ResponseWriter, r *http.Request) error {
	vars := mux.Vars(r)
	productID := vars["productID"]
	query := `SELECT p2.*
        FROM product p1
        JOIN product p2 ON p1.productName = p2.productName
        WHERE p1.productID = ?`

	rows, err := db.Query(query, productID)
	if err != nil {
		return err
	}
	defer rows.Close()

	var products []Product
	for rows.Next() {
		var product Product
		err = rows.Scan(&product.ProductID, &product.CategoryID, &product.ProductName, &product.Description, &product.Brand, &product.Price, &product.Stock, &product.DateAdded, &product.Size)
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

func QueryProductByName(db *sql.DB, w http.ResponseWriter, r *http.Request) error {
	vars := mux.Vars(r)
	name := vars["name"]
	value := fmt.Sprintf("%%%s%%", name)
	query := `SELECT * FROM product WHERE productName LIKE ?`

	rows, err := db.Query(query, value)
	if err != nil {
		return err
	}
	defer rows.Close()

	var products []Product
	for rows.Next() {
		var product Product
		err = rows.Scan(&product.ProductID, &product.CategoryID, &product.ProductName, &product.Description, &product.Brand, &product.Price, &product.Stock, &product.DateAdded, &product.Size)
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
