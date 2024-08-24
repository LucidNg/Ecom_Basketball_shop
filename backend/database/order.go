package database

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"github.com/google/uuid"
	sqlitecloud "github.com/sqlitecloud/sqlitecloud-go"
)

// OrderRequest represents the request payload for creating order items
type OrderProduct struct {
	ProductID string  `json:"productID"`
	Size      string  `json:"size"`
	Quantity  int     `json:"quantity"`
	Price     float64 `json:"price"`
}

type OrderRequest struct {
	OrderID  string         `json:"orderID"`
	Products []OrderProduct `json:"products"`
}

func CreateOrder(db *sqlitecloud.SQCloud, userID string, date string, shippingAdress string, billingAddress string, price string, status string, payStatus string) error {
	var id string
	for {
		id = uuid.New().String()
		exists, err := recordExists(db, "orders", "orderID", id)
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

	createOrderSQL := "INSERT INTO orders (orderID, userID, date, shippingAdress, billingAddress, price, status, payStatus) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
	values := []interface{}{id, userID, date, shippingAdress, billingAddress, priceValue, status, payStatus}

	err = db.ExecuteArray(createOrderSQL, values)
	return err
}

// CreateOrderItems handles the creation of order items in the database
func CreateOrderItems(db *sqlitecloud.SQCloud, w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Unsupported method", http.StatusMethodNotAllowed)
		return
	}

	var req OrderRequest
	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	CreateOrderItemsSQL := "INSERT INTO orderItem (orderID, productID, size, quantity, price) VALUES (?, ?, ?, ?, ?)"

	for _, product := range req.Products {
		values := []interface{}{req.OrderID, product.ProductID, product.Size, product.Quantity, product.Price}
		err = db.ExecuteArray(CreateOrderItemsSQL, values)
		if err != nil {
			fmt.Println("Error:", err)
		}
	}

	w.WriteHeader(http.StatusCreated)
	w.Write([]byte("Order items created successfully"))
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

func CreateShipping(db *sqlitecloud.SQCloud, orderID string, shippingMethod string, cost string, startTime string, estimatedDeliveryTime string) error {
	var id string
	for {
		id = uuid.New().String()
		exists, err := recordExists(db, "shipping", "shippingID", id)
		if err != nil {
			return err
		}
		if !exists {
			break
		}
	}

	costValue, err := strconv.ParseFloat(cost, 64)
	if err != nil {
		fmt.Println("Error:", err)
		return err
	}

	createShippingSQL := "INSERT INTO shipping (shippingID, orderID, shippingMethod, cost, startTime, estimatedDeliveryTime) VALUES (?, ?, ?, ?, ?, ?)"
	values := []interface{}{id, orderID, shippingMethod, costValue, startTime, estimatedDeliveryTime}

	err = db.ExecuteArray(createShippingSQL, values)
	return err
}
