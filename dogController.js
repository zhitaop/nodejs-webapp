module.exports = {

    //app.post('/dogs/add/:userid', function(req, res){
    addDog: (db) => {
        return (req, res) => {
            let newdog = {
                name: req.body.name,
                breed: req.body.breed,
                date_of_birth: req.body.dob,
                ownerid: req.params.userid
            }
            let sql = 'INSERT INTO dogs SET ?';
            let query = db.query(sql, newdog, (err, result)=> {
                if(err) throw err;
                console.log(result);
                res.redirect('/user/'+req.params.userid+'#dogs');
            })
            console.log(newdog);
            console.log("add dog success!");
        }
    },
    
    //app.post('/dogs/edit/:userid/:dogsid', function(req, res){
    editDog: (db) => {
        return (req, res) => {
            let empty = false;
            let editdog = new Object();
            if(req.body.name) editdog.name = req.body.name;
            if(req.body.breed) editdog.breed = req.body.breed;
            if(req.body.dob) editdog.date_of_birth = req.body.dob;
        
            if(Object.keys(editdog).length===0){
                res.status(500).send({ error: 'empty field not accepted!' });
                empty = true;
            } 
            if(!empty){
                let sql = 'UPDATE dogs SET ? WHERE id ='+req.params.dogsid;
                let query = db.query(sql, editdog, (err, result)=> {
                    if(err) throw err;
                    console.log(result);
                    res.redirect('/user/'+req.params.userid+'#dogs');
                })
            } 
            console.log("edit dog success!");
        }       
    },
    
    //app.post('/dogs/delete/:userid/:dogsid', function(req, res){
    deleteDog: (db) => {
        return (req, res) => {
            let sql = 'DELETE FROM dogs WHERE id =' + req.params.dogsid;
            let query = db.query(sql, (err, result)=> {
                if(err) throw err;
                console.log(result);
                res.redirect('/user/'+req.params.userid+'#dogs');
            })
            console.log("delete dog success!");
        }
    }
}