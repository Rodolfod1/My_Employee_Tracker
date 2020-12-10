var mysql = require ("mysql");
var inquirer = require ("inquirer");
var Prnt= require("asciiart-logo");
require("console.table");
var Depos=[];
var EmpList=[];

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
    Welcome();
});

function Welcome() {
    const Msgr= Prnt({ name: "Welcome  .  to    Employee Manager :" }).render();
    console.log(Msgr);
    DepList();
    EmpNames();
    init();
}
// generic questions as initial landing option 
const Question = [
    { type:"list",
        message: "what would you like to do ?",
        name:"Optn",
        choices:["Add New Employees", "Add New Department","Add New Roles", "Edit Employee Details","Update Employee Managers","View All","View Employees By Manager","View Budget by Department","Danger Zone - DELETE (Employee / Manager / Department)","Exit"],
        pageSize: 10        
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
];
// Main Function 
const init = async ()=>{
    const{Optn} =await inquirer.prompt(Question);
    switch(Optn){
        case "Add New Department":
            AddDepo();
            break;
        case "Add New Employees":
            CreateEmployee();
            break;
        case "Add New Roles":
            AddRole();
            break;
        case "View All Departments With Roles and Employees":
            ViewDepoNroles();
            break;
        case "View All":
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
//function to get the names from the database and assigned it to an array for manipulation  
const EmpNames = () => {
    connection.query( `SELECT CONCAT(first_name," ",last_name) as FullName FROM employee;`,
    function(err,res){
        if (err) throw err;
        
        for (i=0; i < res.length; i++){
            EmpList.push(res[i].FullName);
        }
        return EmpList;
    });
}
//function to get departments for future manipulation 
const  DepList=()=>{   
    connection.query(`SELECT NAME FROM department;`,     
    function(err,res){
        if (err) throw err;
        for (i=0; i<res.length; i++){
            Depos.push(res[i].NAME);
        }
         return Depos;
    });
}
// function to create a new employee 
const CreateEmployee = async ()=> {
    const {FirstName,LastName,DepartmentNo,Title,RoleId,Salary,IsManager}= await inquirer.prompt(AddEmp);
    //query to fill in the employee table 
    connection.query("INSERT INTO employee SET ?",{
        first_name: FirstName,
        last_name: LastName,
        role_id:parseInt(RoleId),
        manager_id:parseInt(IsManager)
     })
     //query to fill in the  roletable 
     connection.query("INSERT INTO roletable SET ?",{
         title: Title,
         salary: Salary,
         department_id: DepartmentNo,
     })
     console.log("Employee Added! ");
init();
}
// function to see all employees
const ViewAll = () => {
    connection.query(`SELECT employee.id, employee.first_name AS FIRST, employee.last_name AS LAST,
    RoleTable.title AS ROLE, department.NAME AS DEPARTMENT, RoleTable.salary AS SALARY,
    CONCAT (managers.first_name," ",managers.last_name) AS MANAGER FROM RoleTable INNER JOIN employee ON employee.role_id=RoleTable.role_id
    INNER JOIN department on department.department_id=RoleTable.department_id LEFT JOIN employee as MANAGERS ON employee.manager_id=managers.id ORDER BY employee.id;`,
        function(err,res){
            if (err) throw err;
            console.table(res);
            //the call to the main menu must be here to render correctly 
            init();   
        });  
}
// function to add a new department 
const AddDepo = async (err,res) =>{
    if (err) throw err;
    const {NewDep} = await inquirer.prompt({message:"What's the new department name? ", name:"NewDep"});
    connection.query(`INSERT INTO department SET?`,{NAME:NewDep});
    console.log("New Department Added");
    viewdeps();
}
const viewdeps= ()=>{
    connection.query(`SELECT department.department_id, department.NAME as Department FROM department`,
    function (err,res) {
        if (err) throw err;
        console.table(res);
        init();
    });
}
const AddRole = async () => {
    const{NewRole,Depo,Salary}= await inquirer.prompt( [{message:"Please provide new Role:", name:"NewRole"},
    {type:"list", message:"Which Department this belong to? please select:", name:"Depo", choices:Depos},
    {message:"Please Provide Salary: ", name:"Salary" }]);
    //making query to retrive role_id 
    connection.query(`SELECT department_id FROM department WHERE?`, {NAME:Depo}, function(err,res){
        if (err) throw err;
        let dpId=parseInt(res[0].department_id)
        // writing the selection to database 
    connection.query(`INSERT INTO RoleTable SET?`,{
        title:NewRole,
        salary:parseInt(Salary),
        department_id:dpId
        });
    console.log("New Department Added!");
    ViewRoles();
        });
}
// function to display existing roles
const ViewRoles = () =>{
    connection.query(`SELECT roletable.role_id, roletable.title as Role FROM RoleTable`, function(err,res){
        if (err) throw err;
        console.table(res);
        init();
          });
          
}
// Exiting the program 
const  ActionLeave = () => {
 console.log("GoodBye");
 connection.end();
 return;
}
  