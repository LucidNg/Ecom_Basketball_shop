package main

import (
	"backend/database"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/mux"
	sqlitecloud "github.com/sqlitecloud/sqlitecloud-go"
	"golang.org/x/time/rate"
)

const (
	connectionURL = "sqlitecloud://cjczta0lik.sqlite.cloud:8860?apikey=KavmXdlHtwvK5SMaaLxcCxLBviJ4RAbaJK5t7lSNWx4"
	// Define the rate limit: 5 requests per second with a burst of 10
	rateLimit  = 5
	burstLimit = 10
)

func corsMiddleware(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		origin := r.Header.Get("Origin")

		if origin != "" {
			w.Header().Set("Access-Control-Allow-Origin", origin)
		}

		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		w.Header().Set("Access-Control-Allow-Credentials", "true")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next(w, r)
	}
}

func rateLimiter(limiter *rate.Limiter, next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if !limiter.Allow() {
			http.Error(w, "Too many requests", http.StatusTooManyRequests)
			return
		}
		next(w, r)
	}
}

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

	// Set up the router
	r := mux.NewRouter()

	limiter := rate.NewLimiter(rate.Limit(rateLimit), burstLimit)

	// Define routes
	r.HandleFunc("/", rateLimiter(limiter, func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Welcome to the server!"))
	}))

	r.HandleFunc("/users", rateLimiter(limiter, corsMiddleware(func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodGet {
			err := database.QueryUsers(db, w)
			if err != nil {
				http.Error(w, "Failed to query users", http.StatusInternalServerError)
				return
			}
		} else if r.Method == http.MethodPost {
			email := r.FormValue("email")
			password := r.FormValue("password")
			fullname := r.FormValue("fullname")
			err := database.InsertUser(db, fullname, email, password)
			if err != nil {
				http.Error(w, "Failed to create user: "+err.Error(), http.StatusInternalServerError)
				return
			}
			w.Write([]byte("User inserted successfully"))
		} else {
			http.Error(w, "Unsupported method", http.StatusMethodNotAllowed)
		}
	}))).Methods(http.MethodGet, http.MethodPost)

	r.HandleFunc("/auth/status", corsMiddleware(http.HandlerFunc(database.AuthStatusHandler))).Methods(http.MethodGet)

	r.HandleFunc("/authenticate", rateLimiter(limiter, corsMiddleware(func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodPost {
			email := r.FormValue("email")
			password := r.FormValue("password")

			err := database.AuthenticateUser(db, email, password, w)
			if err != nil {
				http.Error(w, "Authentication failed: "+err.Error(), http.StatusUnauthorized)
				return
			}
			w.Write([]byte("Authentication Success"))
		} else {
			http.Error(w, "Unsupported method", http.StatusMethodNotAllowed)
		}
	}))).Methods(http.MethodGet, http.MethodPost)

	r.HandleFunc("/category", rateLimiter(limiter, corsMiddleware(func(w http.ResponseWriter, r *http.Request) {
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
	}))).Methods(http.MethodGet, http.MethodPost)

	r.HandleFunc("/categoryProduct/{category}/{method}/{maxPrice}/{minPrice}", rateLimiter(limiter, corsMiddleware(func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodGet {
			err := database.QueryProductByCategory(db, w, r)
			if err != nil {
				http.Error(w, "Failed to query products", http.StatusInternalServerError)
				return
			}
		} else {
			http.Error(w, "Unsupported method", http.StatusMethodNotAllowed)
		}
	}))).Methods(http.MethodGet)

	r.HandleFunc("/brand/{brand}/{method}/{maxPrice}/{minPrice}", rateLimiter(limiter, corsMiddleware(func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodGet {
			err := database.QueryProductByBrand(db, w, r)
			if err != nil {
				http.Error(w, "Failed to query products", http.StatusInternalServerError)
				return
			}
		} else {
			http.Error(w, "Unsupported method", http.StatusMethodNotAllowed)
		}
	}))).Methods(http.MethodGet)

	r.HandleFunc("/product/{productID}", rateLimiter(limiter, corsMiddleware(func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodGet {
			err := database.QueryProductByID(db, w, r)
			if err != nil {
				http.Error(w, "Failed to query products", http.StatusInternalServerError)
				return
			}
		} else {
			http.Error(w, "Unsupported method", http.StatusMethodNotAllowed)
		}
	}))).Methods(http.MethodGet)

	r.HandleFunc("/search/{name}", rateLimiter(limiter, corsMiddleware(func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodGet {
			err := database.QueryProductByName(db, w, r)
			if err != nil {
				http.Error(w, "Failed to query products", http.StatusInternalServerError)
				return
			}
		} else {
			http.Error(w, "Unsupported method", http.StatusMethodNotAllowed)
		}
	}))).Methods(http.MethodGet)

	r.HandleFunc("/brand/{brand}", rateLimiter(limiter, corsMiddleware(func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodGet {
			err := database.QueryProductByBrand(db, w, r)
			if err != nil {
				http.Error(w, "Failed to query products", http.StatusInternalServerError)
				return
			}
		} else {
			http.Error(w, "Unsupported method", http.StatusMethodNotAllowed)
		}
	}))).Methods(http.MethodGet)

	r.HandleFunc("/reviews/{productID}", rateLimiter(limiter, corsMiddleware(func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodGet {
			err := database.QueryAllReviews(db, w, r)
			if err != nil {
				http.Error(w, "Failed to query reviews", http.StatusInternalServerError)
				return
			}
		} else {
			http.Error(w, "Unsupported method", http.StatusMethodNotAllowed)
		}
	}))).Methods(http.MethodGet)

	r.HandleFunc("/averageRating/{productID}", rateLimiter(limiter, corsMiddleware(func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodGet {
			err := database.QueryAverageRating(db, w, r)
			if err != nil {
				http.Error(w, "Failed to query rating", http.StatusInternalServerError)
				return
			}
		} else {
			http.Error(w, "Unsupported method", http.StatusMethodNotAllowed)
		}
	}))).Methods(http.MethodGet)

	r.HandleFunc("/ratingCount/{productID}", rateLimiter(limiter, corsMiddleware(func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodGet {
			err := database.QueryRatingCount(db, w, r)
			if err != nil {
				http.Error(w, "Failed to query rating", http.StatusInternalServerError)
				return
			}
		} else {
			http.Error(w, "Unsupported method", http.StatusMethodNotAllowed)
		}
	}))).Methods(http.MethodGet)

	r.HandleFunc("/cartItem/{userID}", rateLimiter(limiter, corsMiddleware(func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodGet {
			err := database.QueryCartItem(db, w, r)
			if err != nil {
				http.Error(w, "Failed to query cart items", http.StatusInternalServerError)
				return
			}
		} else {
			http.Error(w, "Unsupported method", http.StatusMethodNotAllowed)
		}
	}))).Methods(http.MethodGet)

	r.HandleFunc("/product", rateLimiter(limiter, corsMiddleware(func(w http.ResponseWriter, r *http.Request) {
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
			dateAdded := r.FormValue("dateAdded")
			size := r.FormValue("size")

			err = database.InsertProduct(db, categoryID, name, description, brand, price, stock, dateAdded, size)
			if err != nil {
				http.Error(w, "Failed to create product: "+err.Error(), http.StatusInternalServerError)
				return
			}
			w.Write([]byte("Product inserted successfully"))
		} else {
			http.Error(w, "Unsupported method", http.StatusMethodNotAllowed)
		}
	}))).Methods(http.MethodGet, http.MethodPost)

	r.HandleFunc("/createCart", rateLimiter(limiter, corsMiddleware(func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodPost {
			userID := r.FormValue("userID")
			err := database.CreateCart(db, userID)
			if err != nil {
				http.Error(w, "Failed to create cart", http.StatusInternalServerError)
				return
			}
		} else {
			http.Error(w, "Unsupported method", http.StatusMethodNotAllowed)
		}
	}))).Methods(http.MethodPost)

	r.HandleFunc("/createCartItem", rateLimiter(limiter, corsMiddleware(func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodPost {
			cartID := r.FormValue("cartID")
			productID := r.FormValue("productID")
			size := r.FormValue("size")
			quantity := r.FormValue("quantity")
			price := r.FormValue("price")
			err := database.CreateCartItem(db, cartID, productID, size, quantity, price)
			if err != nil {
				http.Error(w, "Failed to create cart item", http.StatusInternalServerError)
				return
			}
		} else {
			http.Error(w, "Unsupported method", http.StatusMethodNotAllowed)
		}
	}))).Methods(http.MethodPost)

	r.HandleFunc("/createOrder", rateLimiter(limiter, corsMiddleware(func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodPost {
			userID := r.FormValue("userID")
			date := r.FormValue("date")
			shippingAdress := r.FormValue("shippingAdress")
			billingAddress := r.FormValue("billingAddress")
			price := r.FormValue("price")
			status := r.FormValue("status")
			payStatus := r.FormValue("payStatus")
			err := database.CreateOrder(db, userID, date, shippingAdress, billingAddress, price, status, payStatus)
			if err != nil {
				http.Error(w, "Failed to create cart item", http.StatusInternalServerError)
				return
			}
		} else {
			http.Error(w, "Unsupported method", http.StatusMethodNotAllowed)
		}
	}))).Methods(http.MethodPost)

	r.HandleFunc("/createOrderItem", rateLimiter(limiter, corsMiddleware(func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodPost {
			database.CreateOrderItems(db, w, r)
		} else {
			http.Error(w, "Unsupported method", http.StatusMethodNotAllowed)
		}
	}))).Methods(http.MethodPost)

	r.HandleFunc("/updateStock", rateLimiter(limiter, corsMiddleware(func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodPut {
			database.UpdateStock(db, w, r)
		} else {
			http.Error(w, "Unsupported method", http.StatusMethodNotAllowed)
		}
	}))).Methods(http.MethodPut)

	r.HandleFunc("/deleteCartItem", rateLimiter(limiter, corsMiddleware(func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodDelete {
			database.RemoveCartItemsFromOrder(db, w, r)
		} else {
			http.Error(w, "Unsupported method", http.StatusMethodNotAllowed)
		}
	}))).Methods(http.MethodDelete)

	r.HandleFunc("/createShipping", rateLimiter(limiter, corsMiddleware(func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodPost {
			orderID := r.FormValue("orderID")
			shippingMethod := r.FormValue("shippingMethod")
			cost := r.FormValue("cost")
			startTime := r.FormValue("startTime")
			estimatedDeliveryTime := r.FormValue("estimatedDeliveryTime")
			err := database.CreateShipping(db, orderID, shippingMethod, cost, startTime, estimatedDeliveryTime)
			if err != nil {
				http.Error(w, "Failed to create shipping", http.StatusInternalServerError)
				return
			}
		} else {
			http.Error(w, "Unsupported method", http.StatusMethodNotAllowed)
		}
	}))).Methods(http.MethodPost)

	port := getPort()
	fmt.Printf("Server is listening on port %s\n", port)
	log.Fatal(http.ListenAndServe(port, r))
}

func getPort() string {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	return ":" + port
}
