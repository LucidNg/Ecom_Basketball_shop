package database

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	sqlitecloud "github.com/sqlitecloud/sqlitecloud-go"
)

func QueryAllProduct(db *sqlitecloud.SQCloud, w http.ResponseWriter, r *http.Request) error {
	vars := mux.Vars(r)
	offsetStr := vars["offset"]

	// Convert offset to integer
	offset, err := strconv.Atoi(offsetStr)
	if err != nil {
		http.Error(w, "Invalid offset value", http.StatusBadRequest)
		return err
	}

	sql := `SELECT s.productID, p.productName, s.size, s.stock, s.price
		FROM size s
		JOIN product p ON s.productID = p.productID
		LIMIT 30 OFFSET ?`

	values := []interface{}{offset * 30}
	rows, err := db.SelectArray(sql, values)
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

func QueryAllOrders(db *sqlitecloud.SQCloud, w http.ResponseWriter, r *http.Request) error {
	vars := mux.Vars(r)
	method := vars["method"]
	offsetStr := vars["offset"]

	// Convert offset to integer
	offset, err := strconv.Atoi(offsetStr)
	if err != nil {
		http.Error(w, "Invalid offset value", http.StatusBadRequest)
		return err
	}

	var sql string
	var values []interface{}

	// Determine the SQL query based on the method
	switch method {
	case "sent", "processed", "finished":
		sql = `SELECT o.orderID, o.userID, o.date, o.shippingAddress, o.billingAddress, o.price, o.status, o.payStatus, o.method,
		              ud.fullName, ud.phoneNumber
		       FROM orders o
		       JOIN userDetail ud ON o.userID = ud.userID
		       WHERE o.status = ?
		       LIMIT 30 OFFSET ?`
		values = []interface{}{method, offset * 30}
	case "paid", "unpaid":
		sql = `SELECT o.orderID, o.userID, o.date, o.shippingAddress, o.billingAddress, o.price, o.status, o.payStatus, o.method,
		              ud.fullName, ud.phoneNumber
		       FROM orders o
		       JOIN userDetail ud ON o.userID = ud.userID
		       WHERE o.payStatus = ?
		       LIMIT 30 OFFSET ?`
		values = []interface{}{method, offset * 30}
	default:
		http.Error(w, "Invalid method value", http.StatusBadRequest)
		return fmt.Errorf("Invalid method value")
	}

	// Execute the query
	rows, err := db.SelectArray(sql, values)
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

func QueryItemsByOrderID(db *sqlitecloud.SQCloud, w http.ResponseWriter, r *http.Request) error {
	vars := mux.Vars(r)
	orderID := vars["orderID"]
	sql := `
        SELECT oi.orderID, oi.productID, p.productName, oi.size, oi.quantity, oi.price
        FROM orderItem oi
        JOIN product p ON oi.productID = p.productID
        WHERE oi.orderID = ?
    `

	values := []interface{}{orderID}
	rows, err := db.SelectArray(sql, values)
	if err != nil {
		return err
	}

	// Convert the result rows to JSON and write to the response
	_, err = w.Write([]byte(rows.ToJSON()))
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return err
	}

	return nil
}
