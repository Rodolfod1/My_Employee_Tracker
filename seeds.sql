use mgmt_systdb;
insert into department (name) 
value ("Engineering"), ("Sales"), ("Finance"), ("Quality"), ("Human Resources");
-- creating seeds for roletable 
insert into roletable (title, salary, department_id)
value ("Engineer", 85000, 2),("Controller", 35000,6);
-- creating seeds for table employee 
insert into employee (first_name, last_name, role_id, manager_id)
values ("Eddy", "Mayflower",4,6), ("Mark", "Elliotr",2,3), ("Chris", "Diamantis",1,1), ("Charles", "Ranthe",4,5), ("julia", "Swartz",3,6);

select * from department;
select * from roletable;
select * from employee;