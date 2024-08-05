package database

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/google/uuid"
	"github.com/gorilla/mux"
	sqlitecloud "github.com/sqlitecloud/sqlitecloud-go"
)

func recordExists(db *sqlitecloud.SQCloud, tableName string, attribute string, id string) (bool, error) {
	query := fmt.Sprintf("SELECT COUNT(1) FROM %s WHERE %s = '%s'", tableName, attribute, id)
	rows, err := db.Select(query)
	if err != nil && rows.GetInt32Value_(0, 0) == 0 {
		return false, err
	}
	return rows.GetInt32Value_(0, 0) != 0, nil
}

func InsertUser(db *sqlitecloud.SQCloud, email string, password string) error {
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
	insertUserSQL := "INSERT INTO users (userID, email, password) VALUES (?, ?, ?)"
	values := []interface{}{id, email, password}

	err := db.ExecuteArray(insertUserSQL, values)
	return err
}

func InsertCategory(db *sqlitecloud.SQCloud, name string, description string) error {
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

	insertCategorySQL := "INSERT INTO category (categoryID, categoryName, description) VALUES (?, ?, ?)"
	values := []interface{}{id, name, description}

	err := db.ExecuteArray(insertCategorySQL, values)
	return err
}

func InsertProduct(db *sqlitecloud.SQCloud, categoryID string, name string, description string, brand string, price string, stock string, dateAdded string, size string) error {
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

	priceValue, err := strconv.ParseFloat(price, 64)
	if err != nil {
		fmt.Println("Error:", err)
		return err
	}

	stockInt, err := strconv.Atoi(stock)
	if err != nil {
		fmt.Println("Error:", err)
		return err
	}

	insertProductSQL := "INSERT INTO product (productID, categoryID, productName, description, brand, dateAdded) VALUES (?, ?, ?, ?, ?, ?)"
	values := []interface{}{id, categoryID, name, description, brand, dateAdded}
	err = db.ExecuteArray(insertProductSQL, values)
	if err != nil {
		fmt.Println("Error:", err)
		return err
	}

	insertSizeSQL := "INSERT INTO size (productID, size, stock, price) VALUES (?, ?, ?, ?)"
	values2 := []interface{}{id, size, stockInt, priceValue}
	err = db.ExecuteArray(insertSizeSQL, values2)
	return err
}

func CreateCart(db *sqlitecloud.SQCloud, w http.ResponseWriter, r *http.Request) error {
	vars := mux.Vars(r)
	userID := vars["userID"]
	var id string
	for {
		id = uuid.New().String()
		exists, err := recordExists(db, "cart", "cartID", id)
		if err != nil {
			return err
		}
		if !exists {
			break
		}
	}

	createCartSQL := "INSERT INTO cart (cartID, userID) VALUES (?, ?)"
	values := []interface{}{id, userID}

	err := db.ExecuteArray(createCartSQL, values)
	return err
}

func CreateCartItem(db *sqlitecloud.SQCloud, w http.ResponseWriter, r *http.Request) error {
	vars := mux.Vars(r)
	cartID := vars["cartID"]
	productID := vars["productID"]
	size := vars["size"]
	quantity := vars["quantity"]
	price := vars["price"]

	priceValue, err := strconv.ParseFloat(price, 64)
	if err != nil {
		fmt.Println("Error:", err)
		return err
	}

	quantityValue, err := strconv.Atoi(quantity)
	if err != nil {
		fmt.Println("Error:", err)
		return err
	}

	createCartItemSQL := "INSERT INTO cartItem (cartID, productID, size, quantity, price) VALUES (?, ?, ?, ?, ?)"
	values := []interface{}{cartID, productID, size, quantityValue, priceValue}

	err = db.ExecuteArray(createCartItemSQL, values)
	return err
}
