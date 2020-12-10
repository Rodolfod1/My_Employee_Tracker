use mgmt_systdb;
insert into department (name) 
value ("Engineering"), ("Sales"), ("Finance"), ("Quality"), ("Human Resources");
-- creating seeds for roletable 
insert into roletable (title, salary, department_id)
value ("Engineer", 85000, 2),("Controller", 35000,5),("buyer", 35000,3),("Manager", 35000,1),("recluiter", 35000,5),("superv", 35000,4);
-- creating seeds for table employee 
insert into employee (first_name, last_name, role_id, manager_id)
-- values ("Eddy", "Mayflower",1,1),("Nicole", "Hartman",4,1),("Monty", "Strauss",2,2),("April", "Steckenson",4,3),("Eliot", "Michaleser",5,2),("Mike", "Qesada",5,4);
values ("Eddy", "Mayflower",1,1),("Nicole", "Hartman",4,1),("Monty", "Strauss",2,2),("April", "Steckenson",4,3),("Eliot", "Michaleser",5,2),("Mike", "Qesada",5,4);

select * from department;
select * from roletable;
select * from employee;