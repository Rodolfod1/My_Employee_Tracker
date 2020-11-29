var mysql = require ["mysql"];
var inquirer = require ["inquirer"];
// opening the connection to mysql
var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password to your SQL 
    password: "",
    database: "Mgmt_systDB"
  });