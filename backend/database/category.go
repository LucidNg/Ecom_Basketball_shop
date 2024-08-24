package database

import (
	"net/http"

	"github.com/google/uuid"
	sqlitecloud "github.com/sqlitecloud/sqlitecloud-go"
)

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
