package database

import (
	"fmt"
	"net/http"
	"strconv"

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
	method := vars["method"]
	maxPrice := vars["maxPrice"]
	minPrice := vars["minPrice"]

	value := fmt.Sprintf("%%%s%%", category)
	maxPriceValue, err := strconv.ParseFloat(maxPrice, 64)
	if err != nil {
		fmt.Println("Error:", err)
		return err
	}

	minPriceValue, err := strconv.ParseFloat(minPrice, 64)
	if err != nil {
		fmt.Println("Error:", err)
		return err
	}

	fmt.Println(category, method, maxPriceValue, minPriceValue)
	var query string
	var values []interface{}

	// Base query
	baseQuery := `
		WITH ranked_products AS (
			SELECT 
				p.productID, 
				p.categoryID, 
				p.productName, 
				p.description, 
				p.brand, 
				p.price, 
				p.stock, 
				p.dateAdded, 
				p.size,
				ROW_NUMBER() OVER (PARTITION BY p.productName ORDER BY p.dateAdded DESC) as row_num
			FROM 
				product p
			JOIN 
				category c ON p.categoryID = c.categoryID
			WHERE 
				c.categoryName LIKE ?
		)
		SELECT 
			productID, 
			categoryID, 
			productName, 
			description, 
			brand, 
			price, 
			stock, 
			dateAdded, 
			size
		FROM 
			ranked_products
		WHERE 
			row_num = 1`

	values = append(values, value)

	switch method {
	case "latest":
		query = baseQuery + " ORDER BY dateAdded DESC;"
	case "bestselling":
		query = baseQuery + `
			ORDER BY 
				(SELECT COUNT(*) 
				 FROM purchase 
				 WHERE productID = ranked_products.productID) DESC;`
	case "max", "min":
		if maxPrice != "" {
			query = baseQuery + " AND price <= ? AND price >= ?"
			values = append(values, maxPriceValue, minPriceValue)
		}
		if method == "max" {
			query = query + " ORDER BY price DESC;"
		} else {
			query = query + " ORDER BY price ASC;"
		}
	default:
		query = baseQuery + " ORDER BY dateAdded DESC;"
	}

	fmt.Println(query)

	rows, err := db.SelectArray(query, values)
	if err != nil {
		fmt.Println(err)
		return err
	}

	_, err = w.Write([]byte(rows.ToJSON()))
	if err != nil {
		fmt.Println(err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return err
	}
	return nil

}

func QueryProductByID(db *sqlitecloud.SQCloud, w http.ResponseWriter, r *http.Request) error {
	vars := mux.Vars(r)
	productID := vars["productID"]
	query := `SELECT p2.*
        FROM product p1
        JOIN product p2 ON p1.productName = p2.productName
        WHERE p1.productID = ?`
	values := []interface{}{productID}

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

func QueryProductByName(db *sqlitecloud.SQCloud, w http.ResponseWriter, r *http.Request) error {
	vars := mux.Vars(r)
	name := vars["name"]
	value := fmt.Sprintf("%%%s%%", name)
	query := `SELECT * FROM product WHERE productName LIKE ? LIMIT 5`

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
