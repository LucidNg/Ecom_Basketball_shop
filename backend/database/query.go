package database

import (
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
	sqlitecloud "github.com/sqlitecloud/sqlitecloud-go"
)

func QueryUsers(db *sqlitecloud.SQCloud, w http.ResponseWriter) error {
	rows, err := db.Select("SELECT * FROM users")
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

func QueryCategory(db *sqlitecloud.SQCloud, w http.ResponseWriter) error {
	rows, err := db.Select("SELECT * FROM category")
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

func QueryProduct(db *sqlitecloud.SQCloud, w http.ResponseWriter) error {
	rows, err := db.Select("SELECT * FROM product")
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

func QueryProductByCategory(db *sqlitecloud.SQCloud, w http.ResponseWriter, r *http.Request) error {
	vars := mux.Vars(r)
	category := vars["category"]
	value := fmt.Sprintf("%%%s%%", category)
	query := `
		SELECT p.productID, p.categoryID, p.productName, p.description, p.brand, p.price, p.stock, p.dateAdded, p.size
		FROM product p
		JOIN category c ON p.categoryID = c.categoryID
		WHERE c.categoryName LIKE ?
		ORDER BY strftime('%Y-%m-%d', substr(p.dateAdded, 7, 4) || '-' || substr(p.dateAdded, 4, 2) || '-' || substr(p.dateAdded, 1, 2)) DESC`
	values := []interface{}{value}

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

func QueryProductByID(db *sqlitecloud.SQCloud, w http.ResponseWriter, r *http.Request) error {
	vars := mux.Vars(r)
	productID := vars["productID"]
	query := `SELECT * FROM product WHERE productID = ?`
	values := []interface{}{productID}

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
