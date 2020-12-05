var mysql = require ("mysql");
var inquirer = require ("inquirer");
// opening the connection to mysql
var connection = mysql.createConnection({
    host: "localhost",
    // Your port; if not 3306
  port: 3306,
  // Your username
  user: "root",
  // Your password to your SQL 
  password: "N12rocks@01",
  database: "Mgmt_systDB"
});
connection.connect(function(err){
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
            "Danger Zone - DELETE (Employee / Manager / Department)",
            "Exit"
        ]
}];
// specific question when adding an employee
const AddEmp = [
    {message:" Provide Employee First Name:", name:"FirstName"},
     {message:" Provide Employee Last Name:", name:"LastName"},
     {message:" New Employee Department#:", name:"DepartmentNo"},
     {message:" New Employee Title:", name:"Title"},
     {message:" Provide RoleID# :", name:"RoleId"},
     {message:" Please Provide Employee Salary:", name:"Salary"},
     {message:"Please Provide Manager ID# Leave Blank If Employee Is A Manager:", name:"IsManager"
    }
]
const init = async ()=>{
    const{Optn} =await inquirer.prompt(Question);
    switch(Optn){
        case "Add New Employees":
            CreateEmployee();
            break;
        case "View All Departments With Roles and Employees":
            ViewDepartment();
            break;
        case "View All Employees":
            ViewAll();
            break;
        case "View Employees By Manager":
            MgrView();
            break;
        case "Update Employee Details":
            EmployeeEdit();
            break;
        case "Update Employee Managers":
            MgrEdit();
            break;
        case "View Budget by Department":
            BudgetView();
            break;
        case "Danger Zone - DELETE (Employee / Manager / Department)":
            ActionDelete();
            break;
        case "Exit":
            ActionLeave();
            break;
    }
}
// calling functions 
const CreateEmployee = async ()=> {
    const {FirstName,LastName,DepartmentNo,Title,RoleId,Salary,IsManager}= await inquirer.prompt(AddEmp);
    connection.query("INSERT INTO employee SET ?",{
        first_name: FirstName,
        last_name: LastName,
        role_id:parseInt(RoleId),
        manager_id:parseInt(IsManager)
     })
ActionLeave()


}

// Exiting the program 
const  ActionLeave = () => {
 console.log("GoodBye");
 connection.end();
 return;
}
