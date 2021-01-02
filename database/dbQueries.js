var dbConnection = require('./dbConnection')

module.exports = {
    checkLogin: (id, password) => {        
        return new Promise((resolve, reject) => {
            let sqlQuery = 'SELECT * FROM users WHERE id = ? AND password = ?'
            dbConnection.query(sqlQuery, [id, password], (err, rows, fields) => {
                if (err)
                    reject(err)
                else
                    resolve(rows)
            })
        })
    },

    createNewAccount: (id, password) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = 'INSERT INTO users(id, password) VALUES(?,?)'
            dbConnection.query(sqlQuery, [id, password], (err, rows, fields) => {
                if (err)
                    reject(err)
                else
                    resolve(rows)
            })
        })
    },

    getAllProducts: () => {
        return new Promise((resolve, reject) => {
            let sqlQuery = 'SELECT * FROM products'
            dbConnection.query(sqlQuery, [], (err, rows, fields) => {
                if (err)
                    reject(err)
                else
                    resolve(rows)
            })
        })
    },

    addNewProduct: (productName, productPrice, img1, img2) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = 'INSERT INTO products(product_name, product_price, product_img1, product_img2) VALUES(?,?,?,?)'
            dbConnection.query(sqlQuery, [productName, productPrice, img1, img2], (err, rows, fields) => {
                if (err)
                    reject(err)
                else
                    resolve(rows)
            })
        })
    },

    deleteProduct: (productName) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = 'DELETE FROM products WHERE product_name=?'
            dbConnection.query(sqlQuery, [productName], (err, rows, fields) => {
                if (err)
                    reject(err)
                else
                    resolve(rows)
            })
        })
    },

    addToCart: (userID, productID) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = 'INSERT INTO carts(user_id, product_id) VALUES(?,?)'
            dbConnection.query(sqlQuery, [userID, productID], (err, rows, fields) => {
                if (err)
                    reject(err)
                else
                    resolve(rows)
            })
        })
    },

    checkInCart: (userID, productID) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = 'SELECT * FROM carts WHERE user_id = ? AND product_id = ?'
            dbConnection.query(sqlQuery, [userID, productID], (err, rows, fields) => {
                if (err)
                    reject(err)
                else
                    resolve(rows)
            })
        })
    },

    getProductsFromCart: (userID) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT * FROM carts INNER JOIN products 
                            ON carts.product_id = products.product_id WHERE carts.user_id = ?`
            dbConnection.query(sqlQuery, [userID], (err, rows, fields) => {
                if (err)
                    reject(err)
                else
                    resolve(rows)
            })
        })
    },

    removeProductFromCart: (productID, userID) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `DELETE FROM carts WHERE product_id = ? AND user_id = ?`
            dbConnection.query(sqlQuery, [productID, userID], (err, rows, fields) => {
                if (err)
                    reject(err)
                else
                    resolve(rows)
            })
        })
    },

    insertIntoSales: (userID, total, firstName, lastName, email, address , contact) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `INSERT INTO sales(user_id, total_bill, name, last_name, email, address, contact) VALUES(?,?,?,?,?,?,?)`
            dbConnection.query(sqlQuery, [userID, total, firstName, lastName, email, address, contact], (err, rows, fields) => {
                if (err)
                    reject(err)
                else
                    resolve(rows)
            })
        })
    },

    insertIntoSubSales: (saleID, productID, quantity, price, subTotal) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `INSERT INTO sub_sales(sale_id, product_id, quantity, price, sub_total) VALUES(?,?,?,?,?)`
            dbConnection.query(sqlQuery, [saleID, productID, quantity, price, subTotal], (err, rows, fields) => {
                if (err)
                    reject(err)
                else
                    resolve(rows)
            })
        })
    },

    resetCartAfterOrderConfirm: (userID) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `DELETE FROM carts WHERE user_id = ?`
            dbConnection.query(sqlQuery, [userID], (err, rows, fields) => {
                if (err)
                    reject(err)
                else
                    resolve(rows)
            })
        })
    }
}

