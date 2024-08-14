package database

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/google/uuid"
	"github.com/gorilla/mux"
	sqlitecloud "github.com/sqlitecloud/sqlitecloud-go"
)

func CreateCart(db *sqlitecloud.SQCloud, userID string) error {
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

func CreateCartItem(db *sqlitecloud.SQCloud, cartID string, productID string, size string, quantity string, price string) error {

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

func QueryCartItem(db *sqlitecloud.SQCloud, w http.ResponseWriter, r *http.Request) error {
	vars := mux.Vars(r)
	userID := vars["userID"]

	query := `SELECT co.cartID, co.productID, co.size, co.quantity, co.price, p.productName, COALESCE(p.url, 'null') AS url
			FROM cartItem co
			JOIN cart c ON co.cartID = c.cartID
			JOIN users u ON c.userID = u.userID
			JOIN product p ON co.productID = p.productID
			WHERE u.userID = ?;`

	values := []interface{}{userID}

	rows, err := db.SelectArray(query, values)
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
