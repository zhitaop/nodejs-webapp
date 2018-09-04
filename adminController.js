module.exports = {
    //export the Admin.js as a object, and set the getAdmin method 
    //as a property of the object. This is an common approach to export module in JS
    getAdmin: (db) => {
        
        return (req, res) => {
        
        let sql = 'SELECT * FROM appointments';
        let query = db.query(sql, (err, appointment) => {
            if(err) throw err;
    
            sql = 'SELECT * from users';
            query = db.query(sql, (err, user) => {
                if(err) throw err;
                sql = 'SELECT * from dogs';
                query = db.query(sql, (err, dog) =>{
                    if(err) throw err;
    
                    appointment.forEach(appointment => {
                        dog.forEach(dog =>{
                            if(dog.id===appointment.dogid){
                                appointment.dogname = dog.name;
                            } 
                        })
                    })
                    appointment.forEach(appointment => {
                        user.forEach(user =>{
                            if(user.id===appointment.userid){
                                appointment.username = user.firstname+' '+user.lastname ;
                            } 
                        })
                    })
    
                    appointment.sort((a,b) => {
                        if(a.date > b.date) {return 1;}
                        if(a.date < b.date) {return -1;}
                        if(a.slot > b.slot) {return 1;}
                        if(a.slot < b.slot) {return -1;}        
                        return 0;    
                    })
                    res.render('admin', {
                        appointments: appointment,
                    })
    
                })
            })
        })
    }
}
}