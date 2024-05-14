const mysql = require("mysql");
const bcrypt = require('bcryptjs');

class User {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.date = new Date();
    }

    save() {
        const connection = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "7285",
            database: "solidity",
        });

        connection.connect();

        const user = {
            name: this.name,
            email: this.email,
            password: this.password,
            date: this.date,
        };

        connection.query("INSERT INTO users SET ?", user, (error, results, fields) => {
            if (error) throw error;
            console.log("User inserted successfully");
        });

        connection.end();
    }

    static findOne(email, callback) {
        const connection = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "7285",
            database: "solidity",
        });

        connection.connect();

        connection.query("SELECT * FROM users WHERE email = ?", [email], (error, results, fields) => {
            if (error) throw error;
            callback(results[0]);
        });

        connection.end();
    }

    static findById(id, callback) {
        const connection = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "7285",
            database: "solidity",
        });

        connection.connect();

        connection.query("SELECT * FROM users WHERE id = ?", [id], (error, results, fields) => {
            if (error) throw error;
            callback(results[0]);
        });

        connection.end();
    }

    static async comparePassword(candidatePassword, hash) {
        return candidatePassword===hash;
        return await bcrypt.compare(candidatePassword, hash);
    }
}

module.exports = User;
