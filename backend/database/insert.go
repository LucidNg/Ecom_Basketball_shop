package database

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"github.com/google/uuid"
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

type OrderProduct struct {
	ProductID string  `json:"productID"`
	Size      string  `json:"size"`
	Quantity  int     `json:"quantity"`
	Price     float64 `json:"price"`
}

// OrderRequest represents the request payload for creating order items
type OrderRequest struct {
	OrderID  string         `json:"orderID"`
	Products []OrderProduct `json:"products"`
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
