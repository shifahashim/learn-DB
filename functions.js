const sqlite =require("sqlite3").verbose();
const db=new sqlite.Database("./quote.db",sqlite.OPEN_READWRITE,(err)=>{
     if(err) return console.error(err)})
  
  function create(tablename,body)
  {
    return new Promise((resolve, reject) => {
        body.forEach(row => {
            let sql;
        const keys=Object.keys(row);
        const values=Object.values(row);
        const stringkeys=keys.join();
        console.log(stringkeys);
        if(tablename==="department"){
            sql = `INSERT INTO department(${stringkeys}) VALUES (?,?,?,?)`; 
        }
        else if(tablename==="employee")
        {
            sql = `INSERT INTO employee(${stringkeys}) VALUES (?,?,?,?,?,?,?,?,?,?)`;
            
        }
        
        db.run(sql, values, (err)=> {
            if (err) return reject(err);
            resolve({ dno: this.lastID });
              }); 
              
          });  

        });
        
  }
  function getAll(tablename)
  {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM ${tablename};`
            db.all(sql, [], (err,rows)=> {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    
  }
  function update(tablename,change)
  {
    return new Promise((resolve, reject) => {
        if(tablename==="department"){
        const sql = 'UPDATE department SET dname = ?,emp_count=?,dept_hod=? WHERE dno=?';
        db.run(sql, [change.dname,change.emp_count,change.dept_hod,change.dno], (err)=> {
            if (err) return reject(err);
            resolve({changes:this.changes});
        });
        }
        else if(tablename==="employee")
        {
            const sql = 'UPDATE employee SET  ename= ?,salary=?,dno=?,mgrno=?,DOJ=?,desg=?,address=?,city=?,pincode=? WHERE eno=?';
            db.run(sql, [change.ename,change.salary,change.dno,change.mgrno,change.DOJ,change.desg,change.address,change.city,change.pincode,change.eno], (err)=> {
                if (err) return reject(err);
                resolve({changes:this.changes});
            });
        }

    });
  }

  
  function deleted(tablename,values)
  {
    return new Promise((resolve, reject) => {
        const key=Object.keys(values)
        const value=Object.values(values)
        const sql = `DELETE FROM ${tablename} WHERE ${key[0]}=?;`
        db.run(sql, value, (err)=> {
            if (err) return resolve(err);
            resolve({changes: this.changes});
        });
    });
  }
  
  module.exports={
    create,
    getAll,
    update,
    deleted,
};