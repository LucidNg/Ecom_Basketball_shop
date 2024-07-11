package database

import (
	sqlitecloud "github.com/sqlitecloud/sqlitecloud-go"
)

func CreateTable(db *sqlitecloud.SQCloud) error {
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
		"brand" TEXT NOT NULL,
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

	if err := db.Execute(userTable); err != nil {
		return err
	}

	if err := db.Execute(userDetailTable); err != nil {
		return err
	}

	if err := db.Execute(userPaymentTable); err != nil {
		return err
	}

	if err := db.Execute(customJerseyTable); err != nil {
		return err
	}

	if err := db.Execute(orderTable); err != nil {
		return err
	}

	if err := db.Execute(shippingTable); err != nil {
		return err
	}

	if err := db.Execute(cartTable); err != nil {
		return err
	}

	if err := db.Execute(categoryTable); err != nil {
		return err
	}

	if err := db.Execute(productTable); err != nil {
		return err
	}

	if err := db.Execute(reviewTable); err != nil {
		return err
	}

	if err := db.Execute(purchaseTable); err != nil {
		return err
	}

	if err := db.Execute(cartItemTable); err != nil {
		return err
	}

	if err := db.Execute(advertisementTable); err != nil {
		return err
	}

	if err := db.Execute(giftCardTable); err != nil {
		return err
	}

	return nil

}
