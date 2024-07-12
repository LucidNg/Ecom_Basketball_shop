package database

import (
	"net/http"

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
