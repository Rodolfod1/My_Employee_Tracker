var mysql = require ("mysql");
var inquirer = require ("inquirer");
// opening the connection to mysql

var check = mysql.createConnection({
    host: "localhost",
    // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password to your SQL 
  password: "N12rocks@01",
  database: "Mgmt_systDB"
});
check.connect(function(err){
    if (err) throw err;
    init();
});

// generic questions as initial landing option 
const Question = [
    { type:"list",
        message: "what would you like to do ?",
        name:"Optn",
        choices:[
            "Add New Employees",
            "View All Departments With Roles and Employees",
            "View All Employees",
            "View Employees By Manager",
            "Update Employee Details",
            "Update Employee Managers",
            "View Budget by Department",
            "Danger Zone - DELETE (Employee / Manager / Department)"
        ]
}];
// specific question when adding an employee
const AddEmp = [
    {message:" Provide Employee First Name:", name:"FirstName",
     message:" Provide Employee Last Name:", name:"LastName",
     message:" New Employee Department#:", name:"DepartmentNo",
     message:" New Employee Title:", name:"Title",
     message:" Provide RoleID# :", name:"RoleId",
     message:" Please Provide Employee Salary:", name:"Salary",
    // message:"Please Provide Manager ID#  Enter (00) If Employee Is A Manager:",
     message:"Please Provide Manager ID# Leave Blank and Hit Enter If Employee Is A Manager:"
    }
]

const init = async ()=>{
    const{Optn} =await inquirer.prompt(Question);
    console.log(Optn);
}

