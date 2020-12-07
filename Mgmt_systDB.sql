DROP DATABASE IF EXISTS Mgmt_systDB;
CREATE DATABASE	Mgmt_systDB;
USE Mgmt_systDB;
-- creating first table for department 
CREATE TABLE department(
	department_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY, 
	NAME VARCHAR (30) NULL 
);
-- creating first table for Role called RoleTable
CREATE TABLE RoleTable(
		role_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY, 
		title VARCHAR (30) NULL, 
		salary DECIMAL (7,2) NULL,
        department_id INT,
       foreign key (department_id) references department(department_id) on delete set null
);
-- creating first table for employee 
create table employee(
   id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    FOREIGN KEY (role_id) REFERENCES RoleTable(role_id) ON DELETE CASCADE,
    manager_id INT UNSIGNED,
    FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
);
-- select from the three tables above
select * from department;
select * from RoleTable;
select * from employee; 