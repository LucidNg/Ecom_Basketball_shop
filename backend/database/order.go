package database

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"github.com/google/uuid"
	"github.com/gorilla/mux"
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

func CreateOrder(db *sqlitecloud.SQCloud, userID string, date string, shippingAdress string, billingAddress string, price string, status string, payStatus string) (string, error) {
	var id string
	for {
		id = uuid.New().String()
		exists, err := recordExists(db, "orders", "orderID", id)
		if err != nil {
			return "",err
		}
		if !exists {
			break
		}
	}

	priceValue, err := strconv.ParseFloat(price, 64)
	if err != nil {
		fmt.Println("Error:", err)
		return "",err
	}

	createOrderSQL := "INSERT INTO orders (orderID, userID, date, shippingAddress, billingAddress, price, status, payStatus) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
	values := []interface{}{id, userID, date, shippingAdress, billingAddress, priceValue, status, payStatus}

	err = db.ExecuteArray(createOrderSQL, values)
	if err != nil {
		return "", err
	}

	return id, nil
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

func QueryShippingByOrderID(db *sqlitecloud.SQCloud, w http.ResponseWriter, r *http.Request) error {
	vars := mux.Vars(r)
	orderID := vars["orderID"]

	// Query to get shipping details for the order
	shippingQuery := `SELECT orderID, shippingMethod, cost, startTime, estimatedDeliveryTime
	FROM shipping
	WHERE orderID = ?;`
	shippingValues := []interface{}{orderID}

	shippingRows, err := db.SelectArray(shippingQuery, shippingValues)
	if err != nil {
		return err
	}

	_, err = w.Write([]byte(shippingRows.ToJSON()))
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return err
	}
	return nil
}

type OrderItem struct {
	ProductID   string  `json:"productID"`
	Size        string  `json:"size"`
	Quantity    int     `json:"quantity"`
	Price       float64 `json:"price"`
	ProductName string  `json:"productName"`
	URL         string  `json:"url"`
}

type Order struct {
	OrderID         string      `json:"orderID"`
	UserID          string      `json:"userID"`
	Date            string      `json:"date"`
	ShippingAddress string      `json:"shippingAddress"`
	BillingAddress  string      `json:"billingAddress"`
	Price           float64     `json:"price"`
	Status          string      `json:"status"`
	PayStatus       string      `json:"payStatus"`
	Method          string      `json:"method"`
	Items           []OrderItem `json:"items"`
}

type Response struct {
	Orders []Order `json:"orders"`
}

func QueryOrdersByUserID(db *sqlitecloud.SQCloud, w http.ResponseWriter, r *http.Request) error {
	vars := mux.Vars(r)
	userID := vars["userID"]

	// Query to get orders for the user, including the new `method` field
	orderQuery := `SELECT o.orderID, o.userID, o.date, o.shippingAddress, o.billingAddress, o.price, o.status, o.payStatus, o.method
	FROM orders o
	WHERE o.userID = ?;`
	orderValues := []interface{}{userID}

	orderRows, err := db.SelectArray(orderQuery, orderValues)
	if err != nil {
		return err
	}

	// Prepare to collect orders and their items
	var orders []Order

	numOrderRows := orderRows.GetNumberOfRows()

	// Iterate over each row index
	for i := uint64(0); i < numOrderRows; i++ {
		orderID, err := orderRows.GetStringValue(i, 0)

		// Query to get items for each order, including productName and url
		itemQuery := `SELECT oi.productID, oi.size, oi.quantity, oi.price, p.productName, p.url
		FROM orderItem oi
		JOIN product p ON oi.productID = p.productID
		WHERE oi.orderID = ?;`
		itemValues := []interface{}{orderID}

		itemRows, err := db.SelectArray(itemQuery, itemValues)
		if err != nil {
			return err
		}

		// Collect order items
		var items []OrderItem
		numItemRows := itemRows.GetNumberOfRows()
		for j := uint64(0); j < numItemRows; j++ {
			items = append(items, OrderItem{
				ProductID:   itemRows.GetStringValue_(j, 0),
				Size:        itemRows.GetStringValue_(j, 1),
				Quantity:    int(itemRows.GetInt32Value_(j, 2)),
				Price:       itemRows.GetFloat64Value_(j, 3),
				ProductName: itemRows.GetStringValue_(j, 4),
				URL:         itemRows.GetStringValue_(j, 5),
			})
		}

		// Append order with items
		orders = append(orders, Order{
			OrderID:         orderRows.GetStringValue_(i, 0),
			UserID:          orderRows.GetStringValue_(i, 1),
			Date:            orderRows.GetStringValue_(i, 2),
			ShippingAddress: orderRows.GetStringValue_(i, 3),
			BillingAddress:  orderRows.GetStringValue_(i, 4),
			Price:           orderRows.GetFloat64Value_(i, 5),
			Status:          orderRows.GetStringValue_(i, 6),
			PayStatus:       orderRows.GetStringValue_(i, 7),
			Method:          orderRows.GetStringValue_(i, 8),
			Items:           items,
		})
	}

	// Prepare and send response
	response := Response{
		Orders: orders,
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(response); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return err
	}

	return nil
}
