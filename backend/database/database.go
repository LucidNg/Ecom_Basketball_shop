package database

import (
	"database/sql"
	"fmt"

	"github.com/google/uuid"
	_ "github.com/mattn/go-sqlite3"
)

func CreateTable(db *sql.DB) error {
	userTable := `CREATE TABLE IF NOT EXISTS users (
        "userID" TEXT NOT NULL PRIMARY KEY,        
        "email" TEXT UNIQUE NOT NULL,
        "password" TEXT NOT NULL
    );`

	userDetailTable := `CREATE TABLE IF NOT EXISTS userDetail (
		"userID" TEXT NOT NULL PRIMARY KEY,
		"fullName" TEXT NOT NULL,
		"phoneNumber" TEXT,
		"address" TEXT,
		"dob" TEXT,
		"memberSince" TEXT,
		"totalPoint" INTEGER,
		"pointEarned" INTEGER,
		"pointRedeemed" INTEGER,
		FOREIGN KEY(userID) REFERENCES users(userID)
	);`

	userPaymentTable := `CREATE TABLE IF NOT EXISTS userPayment (
		"paymentID" TEXT NOT NULL PRIMARY KEY,
		"userID" TEXT NOT NULL,
		"method" TEXT NOT NULL,
		"accountNumber" TEXT NOT NULL,
		FOREIGN KEY(userID) REFERENCES users(userID)
	);`

	customJerseyTable := `CREATE TABLE IF NOT EXISTS customJersey (
		"jerseyID" TEXT NOT NULL PRIMARY KEY,
		"userID" TEXT NOT NULL,
		"description" TEXT,
		"imageURL" TEXT,
		FOREIGN KEY(userID) REFERENCES users(userID)
	);`

	orderTable := `CREATE TABLE IF NOT EXISTS orders (
		"orderID" TEXT NOT NULL PRIMARY KEY,
		"userID" TEXT NOT NULL,
		"date" TEXT NOT NULL,
		"shippingAdress" TEXT NOT NULL,
		"billingAddress" TEXT NOT NULL,
		"price" INTEGER NOT NULL,
		"status" TEXT NOT NULL,
		FOREIGN KEY(userID) REFERENCES users(userID)
	);`

	shippingTable := `CREATE TABLE IF NOT EXISTS shipping (
		"shippingID" TEXT NOT NULL PRIMARY KEY,
		"orderID" TEXT NOT NULL,
		"shippingMethod" TEXT NOT NULL,
		"cost" INTEGER NOT NULL,
		"startTime" TEXT NOT NULL,
		"estimatedDeliveryTime" TEXT NOT NULL,
		FOREIGN KEY(orderID) REFERENCES orders(orderID)
	);`

	cartTable := `CREATE TABLE IF NOT EXISTS cart (
		"cartID" TEXT NOT NULL PRIMARY KEY,
		"userID" TEXT NOT NULL,
		FOREIGN KEY(userID) REFERENCES users(userID)
	);`

	categoryTable := `CREATE TABLE IF NOT EXISTS category (
		"categoryID" TEXT NOT NULL PRIMARY KEY,
		"categoryName" TEXT NOT NULL,
		"description" TEXT NOT NULL
	);`

	productTable := `CREATE TABLE IF NOT EXISTS product (
		"productID" TEXT NOT NULL PRIMARY KEY,
		"categoryID" TEXT NOT NULL,
		"productName" TEXT NOT NULL,
		"description" TEXT NOT NULL,
		"price" INTEGER NOT NULL,
		"stock" INTEGER NOT NULL,
		"imageURL" TEXT NOT NULL,
		"dateAdded" TEXT NOT NULL,
		"size" TEXT NOT NULL,
		FOREIGN KEY(categoryID) REFERENCES category(categoryID)
	);`

	reviewTable := `CREATE TABLE IF NOT EXISTS review (
		"reviewID" TEXT NOT NULL PRIMARY KEY,
		"userID" TEXT NOT NULL,
		"productID" TEXT NOT NULL,
		"rating" INTEGER NOT NULL,
		"comment" TEXT NOT NULL,
		"date" TEXT NOT NULL,
		FOREIGN KEY(userID) REFERENCES users(userID),
		FOREIGN KEY(productID) REFERENCES product(productID)
	);`

	purchaseTable := `CREATE TABLE IF NOT EXISTS purchase (
		"purchaseID" TEXT NOT NULL PRIMARY KEY,
		"userID" TEXT NOT NULL,
		"productID" TEXT NOT NULL,
		"quantity" INTEGER NOT NULL,
		"date" TEXT NOT NULL,
		FOREIGN KEY(userID) REFERENCES users(userID),
		FOREIGN KEY(productID) REFERENCES product(productID)
	);`

	cartItemTable := `CREATE TABLE IF NOT EXISTS cartItem (
		"cartID" TEXT NOT NULL,
		"productID" TEXT NOT NULL,
		"quantity" INTEGER NOT NULL,
		PRIMARY KEY(cartID, productID),
		FOREIGN KEY(cartID) REFERENCES cart(cartID),
		FOREIGN KEY(productID) REFERENCES product(productID)
	);`

	advertisementTable := `CREATE TABLE IF NOT EXISTS advertisement (
		"asvertisementID" TEXT NOT NULL PRIMARY KEY,
		"adName" TEXT NOT NULL,
		"adURL" TEXT NOT NULL,
		"adImageURL" TEXT NOT NULL,
		"startDate" TEXT NOT NULL,
		"endDate" TEXT NOT NULL
	);`

	giftCardTable := `CREATE TABLE IF NOT EXISTS giftCard (
		"giftCardID" TEXT NOT NULL PRIMARY KEY,
		"code" TEXT NOT NULL,
		"percentage" INTEGER NOT NULL,
		"cost" INTEGER NOT NULL,
		"expiryDate" TEXT NOT NULL,
		"status" TEXT NOT NULL
	);`

	if _, err := db.Exec(userTable); err != nil {
		return err
	}

	if _, err := db.Exec(userDetailTable); err != nil {
		return err
	}

	if _, err := db.Exec(userPaymentTable); err != nil {
		return err
	}

	if _, err := db.Exec(customJerseyTable); err != nil {
		return err
	}

	if _, err := db.Exec(orderTable); err != nil {
		return err
	}

	if _, err := db.Exec(shippingTable); err != nil {
		return err
	}

	if _, err := db.Exec(cartTable); err != nil {
		return err
	}

	if _, err := db.Exec(categoryTable); err != nil {
		return err
	}

	if _, err := db.Exec(productTable); err != nil {
		return err
	}

	if _, err := db.Exec(reviewTable); err != nil {
		return err
	}

	if _, err := db.Exec(purchaseTable); err != nil {
		return err
	}

	if _, err := db.Exec(cartItemTable); err != nil {
		return err
	}

	if _, err := db.Exec(advertisementTable); err != nil {
		return err
	}

	if _, err := db.Exec(giftCardTable); err != nil {
		return err
	}

	return nil

}

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

func InsertCategory(db *sql.DB, name string, desription string) error {
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
	_, err := db.Exec(insertUserSQL, id, name, desription)
	return err
}

func QueryUsers(db *sql.DB) error {
	rows, err := db.Query("SELECT userID, email, password FROM users")
	if err != nil {
		return err
	}
	defer rows.Close()

	var id string
	var email string
	var password string

	for rows.Next() {
		err = rows.Scan(&id, &email, &password)
		if err != nil {
			return err
		}
		fmt.Printf("ID: %s, Email: %s, Password: %s\n", id, email, password)
	}

	return rows.Err()
}
