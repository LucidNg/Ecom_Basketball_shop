package database

import (
	"fmt"
	"net/http"
	"strconv"
	"time"

	"github.com/google/uuid"
	"github.com/gorilla/mux"
	sqlitecloud "github.com/sqlitecloud/sqlitecloud-go"
)

func QueryAllReviews(db *sqlitecloud.SQCloud, w http.ResponseWriter, r *http.Request) error {
	vars := mux.Vars(r)
	productID := vars["productID"]
	query := `SELECT 
    r.comment, r.rating, r.date, COALESCE(ud.fullName, 'null') AS fullName
	FROM review r
	JOIN product p ON r.productID = p.productID
	JOIN userDetail ud ON ud.userID = r.userID
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

func InsertReview(db *sqlitecloud.SQCloud, userID string, productID string, rating string, comment string) error {
	var reviewID string

	// Generate a unique reviewID
	for {
		reviewID = uuid.New().String()
		exists, err := recordExists(db, "review", "reviewID", reviewID)
		if err != nil {
			return err
		}
		if !exists {
			break
		}
	}

	// Convert rating to an integer
	ratingInt, err := strconv.Atoi(rating)
	if err != nil {
		fmt.Println("Error converting rating to integer:", err)
		return err
	}

	// Get the current date in format yyyy-mm-dd
	currentDate := time.Now().Format("2006-01-02")

	// SQL query to insert a new review
	insertReviewSQL := "INSERT INTO review (reviewID, userID, productID, rating, comment, date) VALUES (?, ?, ?, ?, ?, ?)"
	values := []interface{}{reviewID, userID, productID, ratingInt, comment, currentDate}

	// Execute the insert query
	err = db.ExecuteArray(insertReviewSQL, values)
	if err != nil {
		fmt.Println("Error inserting review:", err)
		return err
	}

	fmt.Println("Review inserted successfully.")
	return nil
}
