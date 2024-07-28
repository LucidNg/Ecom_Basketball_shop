package database

import (
	"encoding/json"
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
	rows, err := db.Select(
		`SELECT p.productID, p.productName, p.description, p.brand, p.dateAdded, COALESCE(p.url, 'null') AS url,
			COALESCE(SUM(pu.quantity), 0) AS totalQuantity,
			MIN(s.price) AS price
		FROM product p
		LEFT JOIN purchase pu ON p.productID = pu.productID
		LEFT JOIN size s ON p.productID = s.productID
		GROUP BY p.productID
		ORDER BY totalQuantity DESC
		LIMIT 5;`)
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

	// var query string
	var query string
	var values []interface{}

	switch method {
	case "latest":
		query = `
		SELECT p.productID, p.productName, p.description, p.brand, p.dateAdded, MIN(s.price) AS price, COALESCE(p.url, 'null') AS url
		FROM product p
		JOIN category c ON p.categoryID = c.categoryID
		LEFT JOIN size s ON p.productID = s.productID
		WHERE c.categoryName LIKE ?
		GROUP BY p.productID
		ORDER BY p.dateAdded DESC`
	case "bestselling":
		query = `
		SELECT p.productID, p.productName, p.description, p.brand, p.dateAdded, COALESCE(p.url, 'null') AS url,
		       COALESCE(SUM(pu.quantity), 0) AS totalQuantity, MIN(s.price) AS price
		FROM product p
		JOIN category c ON p.categoryID = c.categoryID
		LEFT JOIN purchase pu ON p.productID = pu.productID
		LEFT JOIN size s ON p.productID = s.productID
		WHERE c.categoryName LIKE ?
		GROUP BY p.productID
		ORDER BY totalQuantity DESC`
	case "max", "min":
		query = `
		SELECT p.productID, p.productName, p.description, p.brand, p.dateAdded, MIN(s.price) AS price, COALESCE(p.url, 'null') AS url
		FROM product p
		JOIN category c ON p.categoryID = c.categoryID
		JOIN size s ON p.productID = s.productID
		WHERE c.categoryName LIKE ? AND s.price BETWEEN ? AND ?
		GROUP BY p.productID`
		if method == "min" {
			query += " ORDER BY price ASC"
		} else {
			query += " ORDER BY price DESC"
		}
	default:
		return fmt.Errorf("invalid method: %s", method)
	}
	var rows *sqlitecloud.Result
	if method == "max" || method == "min" {
		values = append(values, value, maxPriceValue, minPriceValue)
		rows, err = db.SelectArray(query, values)
	} else {
		values = append(values, value)
		rows, err = db.SelectArray(query, values)
	}
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
	query := `SELECT p.productID, p.categoryID, p.productName, p.description, p.brand, p.dateAdded, COALESCE(p.url, 'null') AS url
	FROM product p
	WHERE p.productID = ?;`
	values := []interface{}{productID}

	query2 := `SELECT s.size, s.stock,s.price
	FROM size s
	WHERE s.productID = ?;`

	rows1, err := db.SelectArray(query, values)
	if err != nil {
		return err
	}

	rows2, err := db.SelectArray(query2, values)
	if err != nil {
		return err
	}

	type Response struct {
		ProductDetails json.RawMessage `json:"productDetails"`
		Sizes          json.RawMessage `json:"sizes"`
	}

	response := Response{
		ProductDetails: json.RawMessage(rows1.ToJSON()),
		Sizes:          json.RawMessage(rows2.ToJSON()),
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(response); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return err
	}

	return nil

}

func QueryProductByName(db *sqlitecloud.SQCloud, w http.ResponseWriter, r *http.Request) error {
	vars := mux.Vars(r)
	name := vars["name"]
	value := fmt.Sprintf("%%%s%%", name)
	query := `SELECT p.productID, p.productName, MIN(s.price) AS price
	FROM product p 
	LEFT JOIN size s ON p.productID = s.productID
	WHERE p.productName LIKE ?
	GROUP BY p.productID LIMIT 5`

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

func QueryProductByBrand(db *sqlitecloud.SQCloud, w http.ResponseWriter, r *http.Request) error {
	vars := mux.Vars(r)
	brand := vars["brand"]
	method := vars["method"]
	maxPrice := vars["maxPrice"]
	minPrice := vars["minPrice"]

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

	// var query string
	var query string
	var values []interface{}

	switch method {
	case "latest":
		query = `
		SELECT p.productID, p.productName, p.description, p.brand, p.dateAdded, MIN(s.price) AS price, COALESCE(p.url, 'null') AS url
		FROM product p
		JOIN size s ON p.productID = s.productID
		WHERE p.brand LIKE ?
		GROUP BY p.productID
		ORDER BY p.dateAdded DESC`
	case "bestselling":
		query = `
		SELECT p.productID, p.productName, p.description, p.brand, p.dateAdded, COALESCE(SUM(pu.quantity), 0) AS totalQuantity, MIN(s.price) AS price, COALESCE(p.url, 'null') AS url
		FROM product p
		LEFT JOIN purchase pu ON p.productID = pu.productID
		LEFT JOIN size s ON p.productID = s.productID
		WHERE p.brand LIKE ?
		GROUP BY p.productID, p.productName, p.description, p.brand, p.dateAdded
		ORDER BY totalQuantity DESC;`
	case "max", "min":
		query = `
		SELECT p.productID, p.productName, p.description, p.brand, p.dateAdded, MIN(s.price) AS price, COALESCE(p.url, 'null') AS url
		FROM product p
		JOIN size s ON p.productID = s.productID
		WHERE p.brand LIKE ? AND s.price BETWEEN ? AND ?
		GROUP BY p.productID`
		if method == "min" {
			query += " ORDER BY price ASC"
		} else {
			query += " ORDER BY price DESC"
		}
	default:
		return fmt.Errorf("invalid method: %s", method)
	}
	var rows *sqlitecloud.Result
	if method == "max" || method == "min" {
		values = append(values, brand, maxPriceValue, minPriceValue)
		rows, err = db.SelectArray(query, values)
	} else {
		values = append(values, brand)
		rows, err = db.SelectArray(query, values)
	}
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

func QueryAllReviews(db *sqlitecloud.SQCloud, w http.ResponseWriter, r *http.Request) error {
	vars := mux.Vars(r)
	productID := vars["productID"]
	query := `SELECT 
    r.comment, r.rating, r.date
	FROM review r
	JOIN product p ON r.productID = p.productID
	WHERE p.productID = ?
	ORDER BY r.date DESC;`

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

func QueryAverageRating(db *sqlitecloud.SQCloud, w http.ResponseWriter, r *http.Request) error {
	vars := mux.Vars(r)
	productID := vars["productID"]

	query := `SELECT 
    AVG(r.rating) AS averageRating
	FROM review r
	WHERE r.productID = ?;`

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

func QueryRatingCount(db *sqlitecloud.SQCloud, w http.ResponseWriter, r *http.Request) error {
	vars := mux.Vars(r)
	productID := vars["productID"]

	query := `SELECT
    SUM(CASE WHEN r.rating = 1 THEN 1 ELSE 0 END) AS one_star,
    SUM(CASE WHEN r.rating = 2 THEN 1 ELSE 0 END) AS two_star,
    SUM(CASE WHEN r.rating = 3 THEN 1 ELSE 0 END) AS three_star,
    SUM(CASE WHEN r.rating = 4 THEN 1 ELSE 0 END) AS four_star,
    SUM(CASE WHEN r.rating = 5 THEN 1 ELSE 0 END) AS five_star
	FROM review r
	WHERE r.productID = ?;`

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
