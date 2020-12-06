drop database if exists Mgmt_systDB;
create database	Mgmt_systDB;
use Mgmt_systDB;
-- creating first table for department 
create table department(
	department_id INT auto_increment NOT NULL, 
		name varchar (30) null, 
		primary key (department_id)
);
-- creating first table for Role called RoleTable
create table RoleTable(
		role_id INT auto_increment NOT NULL primary key, 
		title varchar (30) null, 
		salary decimal (10,4) null,
        department_id int,
       foreign key (department_id) references department(department_id) on delete set null
);
-- creating first table for employee 
create table employee(
id INT auto_increment NOT NULL primary key, 
		first_name varchar (30) null,
        last_name varchar (30) null, 
	 	role_id int, 
        manager_id int,
       foreign key (role_id) references Roletable(role_id) on delete set null,
       foreign key (manager_id) references employee(id) on delete set null
       
);
-- select from the three tables above
select * from department;
select * from RoleTable;
select * from employee; 