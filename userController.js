module.exports = {

    //app.post('/signup', function(req, res){
    addUser: (db) => {
        return (req, res) => {
            let newuser = {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                password: req.body.password,
                email: req.body.email,
                address: req.body.address,
                phone_no: req.body.phoneno
            }
            let existedemail = false;
            let sql = 'SELECT * from users';
            let query = db.query(sql, (err, user) =>{
                if(err) throw err;
                user.forEach(user=>{
                    if(user.email===newuser.email){
                        res.render('signup',{
                            error: 'email'
                        });
                        existedemail = true;
                    }
                })
                if(!existedemail){
                    sql = 'INSERT INTO users SET ?';
                    query = db.query(sql, newuser, (err, result)=> {
                        if(err) throw err;
                        console.log(result);
                        res.render('login',{error:'success'});
                    })
                    console.log(newuser);
                }
            })
        }
    },

    //app.post('/login', (req, res)=>{
    login: (db) => {
        return (req, res) => {
            let attempt = {
                email: req.body.email,
                password: req.body.password
            }
            console.log(attempt);
            let sql = 'SELECT id,email,password FROM users';
            
            let query = db.query(sql, (err, result) => {
                if(err) throw err;
                let register = false;
                result.forEach(element => {
                    if(element.email===attempt.email){
                        console.log('user recognize');
                        register = true;
                        if(element.password===attempt.password){
                            let id = element.id;
                            console.log('password correct, id: '+id);
        
                            req.session.userId = id;
                            res.redirect('/user/'+id);
        
                        } else {
                            console.log('password incorrect');
                            res.render('login',{
                                error: 'password'
                            });
                        }
                    }
                });
                if(!register){
                    res.render('login',{
                        error: 'email'
                    });
                    console.log('user not recognized');
                }
            })
        }
    },

    //app.get('/user/:id',requiresLogin, (req,res) => {
    getUserPage: (db) => {
        return (req, res) => {
            let sql = 'SELECT * from users WHERE id = '+req.params.id;
            let query = db.query(sql, (err, result) => {
                if(err) throw err;
        
                console.log(result);
                let firstname = result[0].firstname;
                let lastname = result[0].lastname;
                let email = result[0].email;
                let address = result[0].address;
                let phone = result[0].phone_no;
                
        
                let q2 = db.query('SELECT *,DATE_FORMAT(date_of_birth, "%d %b %Y") AS "dob",DATE_FORMAT(date_of_birth, "%Y-%m-%d") AS "dob2" from dogs WHERE ownerid ='+
                req.params.id,(err,dogresult) => {
                    if(err) throw err;            
        
                    sql = 'SELECT *,DAY(date) AS d,MONTH(date) AS m,YEAR(date) AS y FROM appointments';
                    query = db.query(sql, (err, allbooked) => {
                        if(err) throw err;
        
                        sql = 'SELECT *,DAY(date) AS d,MONTH(date) AS m,YEAR(date) AS y FROM appointments WHERE userid ='+req.params.id;
                        query = db.query(sql, (err,mybooked) => {
                            if(err) throw err;
                            
                            mybooked.forEach(book => {
                                dogresult.forEach(dog =>{
                                    if(dog.id===book.dogid){
                                        book.dogname = dog.name;
                                    }
                                })
                            })
                            res.render('user', {
                                userid: req.params.id,
                                firstname: firstname,
                                lastname: lastname,
                                email: email,
                                address: address,
                                phone: phone,
                                dogs: dogresult,             
                                allbooked: allbooked,
                                mybooked: mybooked                   
                            })                                      
                        })
                    })
                    
                })
            })
        }
    },

    //app.post('/user/edit/:id', function(req, res){
    editUser: (db) => {
        return (req,res) => {
            let empty = false;
            let editinfo = new Object();
            if(req.body.firstname) editinfo.firstname = req.body.firstname;
            if(req.body.lastname) editinfo.lastname = req.body.lastname;
            if(req.body.address) editinfo.address = req.body.address;
            if(req.body.phone) editinfo.phone_no = req.body.phone;
            console.log(editinfo);

            if(Object.keys(editinfo).length===0){
                res.redirect('/user/'+req.params.id+"#personal");

                empty = true;
            }

            if(!empty){
                let sql = 'UPDATE users SET ? WHERE id ='+req.params.id;
                let query = db.query(sql, editinfo, (err, result)=> {
                    if(err) throw err;
                    console.log(result);
                    res.redirect('/user/'+req.params.id+"#personal");
                })
            }
        }
    }

}