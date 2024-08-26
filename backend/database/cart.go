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
	// Convert price and quantity to appropriate types
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

	// Step 1: Check if the product already exists in the cart
	var existingQuantity int
	checkProductSQL := "SELECT quantity FROM cartItem WHERE cartID = ? AND productID = ? AND size = ?"
	values := []interface{}{cartID, productID, size}
	rows, err := db.SelectArray(checkProductSQL, values)
	if err != nil {
		fmt.Println("Error while checking existing cart item:", err)
		return err
	}

	if rows.GetNumberOfRows() == 0 {
		createCartItemSQL := "INSERT INTO cartItem (cartID, productID, size, quantity, price) VALUES (?, ?, ?, ?, ?)"
		values := []interface{}{cartID, productID, size, quantityValue, priceValue}
		err = db.ExecuteArray(createCartItemSQL, values)
		if err != nil {
			fmt.Println("Error while inserting new cart item:", err)
			return err
		}

	} else {
		existingQuantity = int(rows.GetInt32Value_(0, 0))
		// Step 3: If product exists, update the quantity
		newQuantity := existingQuantity + quantityValue
		updateCartItemSQL := "UPDATE cartItem SET quantity = ? WHERE cartID = ? AND productID = ? AND size = ?"
		values := []interface{}{newQuantity, cartID, productID, size}

		err = db.ExecuteArray(updateCartItemSQL, values)
		if err != nil {
			fmt.Println("Error while updating cart item:", err)
			return err
		}
	}

	return nil
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

	_, err = w.Write([]byte(rows.ToJSON()))
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return err
	}
	return nil

}
