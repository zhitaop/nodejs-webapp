const mailController = require('./mailController.js');

module.exports = {

    //app.post('/appointment/add', (req, res)=>{
    //delete the smtp parameter if email funciton is not needed
    addBooking: (db, sendConfirm) => {
        return (req, res) => {
            let d = req.body.slot.split(",");
            let appointment = {
                dogid: req.body.dog,
                grooming_option: req.body.option,
                date: d[3] + "-" + d[2] + "-" + d[1],
                slot: d[0],
                userid: d[4]
            }
            if(req.body.instruction){appointment.instruction=req.body.instruction;}
            let sql = 'INSERT INTO appointments SET ?';
            let query = db.query(sql, appointment, (err, result)=> {
                if(err) {throw err;}
                else{            
                    console.log(result);
                    res.redirect('/user/'+d[4]+'#appointments');
                    //the following line tries send an email to confirm booking
                    //comment out to disable this function
                    if(sendConfirm){
                        mailController.confirmEmail(appointment,db);
                    }
                    
                }
            });
        }
    },
    
    //app.post('/booking/edit/:userid/:bid', (req, res)=>{
    editBooking: (db) => {
        return (req, res) => {
            let d = req.body.slot.split(",");
            let appointment = {
                date: d[3] + "-" + d[2] + "-" + d[1],
                slot: d[0],
            }
            
            let sql = 'UPDATE appointments SET ? WHERE id =' + req.params.bid;;
            let query = db.query(sql, appointment, (err, result)=> {
                if(err) throw err;
                console.log(result);
                res.redirect('/user/'+req.params.userid);
            });
        }
    },

    //app.post('/booking/delete/:userid/:bid', function(req, res){
    deleteBooking: (db) => {
        return (req, res) => {
            let sql = 'DELETE FROM appointments WHERE id =' + req.params.bid;
            let query = db.query(sql, (err, result)=> {
                if(err) throw err;
                console.log(result);
                res.redirect('/user/'+req.params.userid);
            });
        }
    }
}