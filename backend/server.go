package main

import (
	"backend/database"
	"fmt"
	"log"
	"net/http"
	"os"

	sqlitecloud "github.com/sqlitecloud/sqlitecloud-go"

	_ "github.com/mattn/go-sqlite3"
)

const connectionURL = "sqlitecloud://cjczta0lik.sqlite.cloud:8860?apikey=KavmXdlHtwvK5SMaaLxcCxLBviJ4RAbaJK5t7lSNWx4"

func main() {

	// Initialize the database
	db, err := sqlitecloud.Connect(connectionURL)
	if err != nil {
		fmt.Println("Connect error: ", err)
	}
	db.UseDatabase("boroshopDB")
	err = database.CreateTable(db)
	if err != nil {
		log.Fatalf("Failed to create tables: %v", err)
	}

	err = db.Execute("PRAGMA foreign_keys = ON")
	if err != nil {
		log.Fatalf("Failed to enable foreign key constraints: %v", err)
	}

	// Start HTTP server
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Welcome to the server!"))
	})

	http.HandleFunc("/users", corsMiddleware(func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodGet {
			err := database.QueryUsers(db, w)
			if err != nil {
				http.Error(w, "Failed to query users", http.StatusInternalServerError)
				return
			}
		} else if r.Method == http.MethodPost {
			email := r.FormValue("email")
			password := r.FormValue("password")
			err := database.InsertUser(db, email, password)
			if err != nil {
				http.Error(w, "Failed to create user: "+err.Error(), http.StatusInternalServerError)
				return
			}
			w.Write([]byte("User inserted successfully"))
		} else {
			http.Error(w, "Unsupported method", http.StatusMethodNotAllowed)
		}
	}))

	http.HandleFunc("/category", corsMiddleware(func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodGet {
			err := database.QueryCategory(db, w)
			if err != nil {
				http.Error(w, "Failed to query category", http.StatusInternalServerError)
				return
			}
		} else if r.Method == http.MethodPost {
			name := r.FormValue("name")
			description := r.FormValue("description")
			err := database.InsertCategory(db, name, description)
			if err != nil {
				http.Error(w, "Failed to create category: "+err.Error(), http.StatusInternalServerError)
				return
			}
			w.Write([]byte("Category inserted successfully"))
		} else {
			http.Error(w, "Unsupported method", http.StatusMethodNotAllowed)
		}
	}))

	http.HandleFunc("/product", corsMiddleware(func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodGet {
			err := database.QueryProduct(db, w)
			if err != nil {
				http.Error(w, "Failed to query product", http.StatusInternalServerError)
				return
			}
		} else if r.Method == http.MethodPost {
			categoryID := r.FormValue("categoryID")
			name := r.FormValue("name")
			description := r.FormValue("description")
			brand := r.FormValue("brand")
			price := r.FormValue("price")
			stock := r.FormValue("stock")
			imageURL := r.FormValue("imageURL")
			dateAdded := r.FormValue("dateAdded")
			size := r.FormValue("size")

			err = database.InsertProduct(db, categoryID, name, description, brand, price, stock, imageURL, dateAdded, size)
			if err != nil {
				http.Error(w, "Failed to create product: "+err.Error(), http.StatusInternalServerError)
				return
			}
			w.Write([]byte("Product inserted successfully"))
		} else {
			http.Error(w, "Unsupported method", http.StatusMethodNotAllowed)
		}
	}))

	port := getPort()
	fmt.Printf("Server is listening on port %s\n", port)
	log.Fatal(http.ListenAndServe(port, nil))
}

func getPort() string {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	return ":" + port
}

func corsMiddleware(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next(w, r)
	}
}
