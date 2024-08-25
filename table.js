const sqlite =require("sqlite3").verbose();
const db=new sqlite.Database("./quote.db",sqlite.OPEN_READWRITE,(err)=>{
    if(err) return console.error(err)})

const dept="CREATE TABLE department(dno INT PRIMARY KEY,dname TEXT NOT NULL,emp_count INT,dept_hod TEXT)"
db.run(dept)
 const  emp="CREATE TABLE employee(eno TEXT PRIMARY KEY,ename TEXT NOT NULL,salary INT CHECK(salary>0),dno INT,mgrno TEXT,DOJ DATE,desg TEXT,address TEXT,city TEXT CHECK(city IN ('kochi','chennai','mumbai','delhi')),pincode INT,FOREIGN KEY(dno) REFERENCES department(dno));"
db.run(emp);


/*const drop1="DROP TABLE department;"
db.run(drop1);
const drop2="DROP TABLE employee;"
db.run(drop2);*/

