drop database if exists Mgmt_systDB;
create database	Mgmt_systDB;
use Mgmt_systDB;
-- creating first table for department 
create table department(
	id INT NOT NULL, 
		name varchar (30) null, 
		primary key (id)
);
-- creating first table for Role called RoleTable
create table RoleTable(
id INT NOT NULL, 
		title varchar (30) null, 
		salary decimal (10,4) null,
		department_id int not null,
		primary key (id)
);
-- creating first table for employee 
create table employee(
id INT NOT NULL, 
		fist_name varchar (30) null,
        last_name varchar (30) null, 
		role_id int not null,
        manager_id int null,
		primary key (id)
);
-- select from the three tables above
select * from department;
select * from RoleTable;
select * from employee;