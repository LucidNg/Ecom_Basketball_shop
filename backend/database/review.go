package database

import (
	"net/http"

	"github.com/gorilla/mux"
	sqlitecloud "github.com/sqlitecloud/sqlitecloud-go"
)

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
