package database

import (
	"encoding/json"
	"fmt"
	"net/http"

	sqlitecloud "github.com/sqlitecloud/sqlitecloud-go"
)

func UpdateStock(db *sqlitecloud.SQCloud, w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPut {
		http.Error(w, "Unsupported method", http.StatusMethodNotAllowed)
		return
	}

	var req OrderRequest
	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	CreateOrderItemsSQL := "UPDATE size SET stock = stock - ? WHERE productID = ? AND size = ?"

	for _, product := range req.Products {
		values := []interface{}{product.Quantity, product.ProductID, product.Size}
		err = db.ExecuteArray(CreateOrderItemsSQL, values)
		if err != nil {
			fmt.Println("Error:", err)
		}
	}

	w.WriteHeader(http.StatusCreated)
	w.Write([]byte("Stock updated successfully"))
}

func RemoveCartItemsFromOrder(db *sqlitecloud.SQCloud, w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodDelete {
		http.Error(w, "Unsupported method", http.StatusMethodNotAllowed)
		return
	}

	var req OrderRequest
	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	// Query to get the cartID using the orderID
	var cartID string
	getCartIDSQL := `SELECT c.cartID
					FROM orders o
					JOIN cart c ON o.userID = c.userID
					WHERE o.orderID = ?`

	values := []interface{}{req.OrderID}

	rows, err := db.SelectArray(getCartIDSQL, values)
	if err != nil {
		return
	}
	cartID, err = rows.GetStringValue(0, 0)
	deleteCartItemSQL := "DELETE FROM cartItem WHERE cartID = ? AND productID = ? AND size = ?"

	// Iterate over the products and execute the delete statement
	for _, product := range req.Products {
		values := []interface{}{cartID, product.ProductID, product.Size}
		err = db.ExecuteArray(deleteCartItemSQL, values)
		if err != nil {
			fmt.Println("Error:", err)
			http.Error(w, "Failed to delete cart item", http.StatusInternalServerError)
			return
		}
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Cart items removed successfully"))
}
