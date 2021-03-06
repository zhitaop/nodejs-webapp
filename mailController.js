const mailer = require('nodemailer');

//edit the following fields according to your stmp server to set up connection to your email
const smtpTransport = mailer.createTransport({
    
    host: 'smtp hostname',
    port: portnumber,
    secure: false,
    auth: {
        user: 'email adress',
        pass: 'email password'
    }
});
module.exports = {

//send email reminder automatically 24 hours prior to the booking time
autoEmail: (db) => {
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
                let currentdate = new Date();
                console.log('today: '+currentdate);

                currentdate.setHours(0,0,0,0);
                let day = currentdate.getDate();
                currentdate.setDate(day+1);

                appointment.forEach(appointment => {
                    user.forEach(user =>{
                        if(user.id===appointment.userid){
                            appointment.username = user.firstname;
                            appointment.email = user.email;
                        } 
                    })
                    if(appointment.slot==='1'){ appointment.time='9:00 am - 10:30 am'}
                    else if(appointment.slot==='2'){appointment.time= '10:30 am - 12:00 pm'}
                    else if(appointment.slot==='3'){appointment.time= '12:00 am - 1:30 pm'}
                    else if(appointment.slot==='4'){appointment.time='1:30 pm - 3:00 pm'}
                    else if(appointment.slot==='5'){appointment.time= '3:00 pm - 4:30 pm'}
                    else if(appointment.slot==='6'){appointment.time= '4:30 pm - 6:00 pm'}                    

                    if(appointment.date.getTime() === currentdate.getTime()){
                        var mail = {
                            from: "Happy Dog Grooming <from@gmail.com>",
                            to: appointment.email,
                            subject: "Happy Dog Grooming Appointment reminder",
                            text: "This is an email generated by node.js",
                            html: "<p></p> <p>Dear "+appointment.username+",<br> This is a reminder that"
                            +" you have an upcoming appointment at Happy Dog Grooming on "+appointment.date.toDateString()
                            +".<br> The details for your appointment is shown below:<br>"
                            +"dog: "+appointment.dogname+"<br>"
                            +"date: "+appointment.date.toDateString()+"<br>"
                            +"time: "+appointment.time+"<br>"
                            +"grooming option: "+appointment.grooming_option+"<br><br>"                            
                            +"Happy Dog Grooming </p>"
                        }
                        smtpTransport.sendMail(mail, (err, res)=>{
                            if(err) {console.log(err);}
                            else{
                                console.log('email sent: '+res);
                            }
                            smtpTransport.close();
                        });
                    }
                })
                
            })
        })
    })
},

//send eamil reminder automatically when a new booking is made
confirmEmail: (apmt, db) => {
    let sql = 'SELECT * from users';
    let query = db.query(sql, (err, user) => {
        if(err) throw err;
        sql = 'SELECT * from dogs';
        query = db.query(sql, (err, dog) =>{
            if(err) throw err;
            dog.forEach(dog =>{
                if(dog.id.toString()===apmt.dogid){
                    apmt.dogname = dog.name;
                } 
            })                        
            user.forEach(user =>{
                if(user.id.toString()===apmt.userid){
                    apmt.username = user.firstname;
                    apmt.email = user.email;
                } 
            })
            if(apmt.slot==='1'){ apmt.time='9:00 am - 10:30 am'}
            else if(apmt.slot==='2'){apmt.time= '10:30 am - 12:00 pm'}
            else if(apmt.slot==='3'){apmt.time= '12:00 am - 1:30 pm'}
            else if(apmt.slot==='4'){apmt.time='1:30 pm - 3:00 pm'}
            else if(apmt.slot==='5'){apmt.time= '3:00 pm - 4:30 pm'}
            else if(apmt.slot==='6'){apmt.time= '4:30 pm - 6:00 pm'}                          
                
            var mail = {
                from: "Happy Dog Grooming <from@gmail.com>",
                to: apmt.email,
                subject: "Happy Dog Grooming Appointment reminder",
                text: "This is an email generated by node.js",
                html: "<p></p> <p>Dear "+apmt.username+",<br> This is a reminder that"
                +" you have an upcoming appointment at Happy Dog Grooming on "+new Date(apmt.date).toDateString()
                +".<br> The details for your appointment is shown below:<br>"
                +"dog: "+apmt.dogname+"<br>"
                +"date: "+new Date(apmt.date).toDateString()+"<br>"
                +"time: "+apmt.time+"<br>"
                +"grooming option: "+apmt.grooming_option+"<br><br>"                            
                +"Happy Dog Grooming </p>"
            }
            smtpTransport.sendMail(mail, (err, res)=>{
                if(err) {console.log(err);}
                else{
                    console.log('email sent. ');
                }
                smtpTransport.close();
            });                                      
        })
    })
}

}