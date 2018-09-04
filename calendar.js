
let current = new Date();
    let month = current.getMonth()+1;
    let cmonth = current.getMonth();
    let day = current.getDate();
    let cday = current.getDate();
    let year = current.getFullYear();
    let weekday = current.getDay();
    let dayNames =  ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let monthNames = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    let dates = [];

    console.log(dayNames[weekday], day, month, year);

    let i = 0;

    if(weekday>0){
        current.setDate(day-weekday);
        day = current.getDate();
    } else {
        current.setDate(day-7);
        day = current.getDate();
    }

    console.log('----------------');

    for(i=0;i<30;i++){
        current.setDate(day+1);
        dates.push({
            year: current.getFullYear(),
            month: current.getMonth(), // NOTICE
            day: current.getDate(),
            weekday: current.getDay(),
            date: new Date(current.getFullYear(),current.getMonth(),current.getDate())
        });
        day = current.getDate();
    }

    function calendar(nthWeek, userid, mybooked, allbooked) {
        let calendarTable = "<table class='table table-bordered calendarr' style='font-size:18px;width:100%'> <tr style='text-align:center'><th colspan='8'>";
        if (nthWeek===0){
            calendarTable += "<button type='button' disabled class='btn btn-sm btn-secondary'> <span data-feather='plus'> << </span> </button>";
        } else{
            calendarTable += "<button type='button' onclick='lastWeek()' class='btn btn-sm btn-secondary'> <span data-feather='plus'> << </span> </button>";
        }
        calendarTable += " "+monthNames[dates[0+nthWeek*7].month]+ " " + dates[0+nthWeek*7].day +" "+ dates[0+nthWeek*7].year + " - " + monthNames[dates[6+nthWeek*7].month]+ " " + dates[6+nthWeek*7].day +" "+ dates[6+nthWeek*7].year+" ";
        if (dates.length-nthWeek*7 < 13){
            calendarTable += "<button type='button' disabled class='btn btn-sm btn-secondary'> <span data-feather='plus'> >> </span> </button> </th></tr>";
        } else{
            calendarTable += "<button type='button' onclick='nextWeek()' class='btn btn-sm btn-secondary'> <span data-feather='plus'> >> </span> </button> </th></tr>";
        }
        
        //calendarTable += "<tr class='weekdays'> <td></td> <th>June 7<br>Mon</th> <th>June 8<br>Tue</th> <th>June 9<br>Wed</th> <th>June 10<br>Thu</th> <th>June 11<br>Fri</th> <th>June 12<br>Sat</th> <th>June 13<br>Sun</th> </tr>";
        calendarTable += "<tr> <td></td>";
        for(i=0+nthWeek*7;i<7+nthWeek*7;i++){
            if(dates[i].day===cday && dates[i].month===cmonth && dates[i].year===year ){
                calendarTable += "<th style='background-color:powderblue'>"+ monthNames[dates[i].month] + " " + dates[i].day + "<br>" + dayNames[dates[i].weekday] + "</th>";
            }else{
                calendarTable += "<th>"+ monthNames[dates[i].month] + " " + dates[i].day + "<br>" + dayNames[dates[i].weekday] + "</th>";
            }
        }
        calendarTable += "</tr>";
     
        function printSlot(j){
          for(i=0+nthWeek*7;i<7+nthWeek*7;i++){

            let dt = new Date();
            if(j===1){dates[i].date.setHours(9,0,0);}
            else if(j===2){dates[i].date.setHours(10,30,0);}
            else if(j===3){dates[i].date.setHours(12,0,0);} 
            else if(j===4){dates[i].date.setHours(13,30,0);} 
            else if(j===5){dates[i].date.setHours(15,0,0);} 
            else if(j===6){dates[i].date.setHours(16,30,0);} 

            console.log(dates[i].date); console.log(dt);

            if(dates[i].date<dt){
              calendarTable += "<td style='background-color:LightGray'></td>";
            } else{              
              let ibook = false;
              let booked = false;
              mybooked.forEach( b => {
                if(dates[i].day===b.d && dates[i].month+1===b.m && dates[i].year===b.y && j.toString()===b.slot && Number(userid)===b.userid){
                  calendarTable += "<td style='background-color:lightBlue'>";                          
                  calendarTable += b.dogname;                           
                  calendarTable += "</button>  </td>";
                  ibook = true;
                  booked = true;
                } 
              })
              if(!ibook){
                allbooked.forEach( b => {
                  if(dates[i].day===b.d && dates[i].month+1===b.m && dates[i].year===b.y && j.toString()===b.slot && userid!==b.userid){
                    calendarTable += "<td style='background-color:DarkRed'></td>";
                    booked = true;
                  }
                })              
              }
              if(!booked){
                calendarTable += "<td style='padding:0' onMouseOver='this.style.background=\"SeaGreen\"' onMouseOut='this.style.background=\"#FFFFFF\"'>";
                calendarTable += "<label class='btn' style='width:100%;height:100%;'><input type='radio' name='slot' value='";
                calendarTable += j+","+dates[i].day+","+(dates[i].month+1)+","+dates[i].year+","+userid;
                calendarTable += "' required>  </label> <div class='invalid-feedback'>More example invalid feedback text</div></td>";
              }
            }

        }
        calendarTable += "</tr>";
        }
        calendarTable +="<div class='btn-group btn-group-toggle' data-toggle='buttons'>";

        calendarTable += "<tr style='text-align:center;'> <td>9:00 am - 10:30 am</td>";        
        printSlot(1);
        calendarTable += "<tr style='text-align:center;'> <td>10:30 am - 12:00 pm</td>";
        printSlot(2);
        calendarTable += "<tr style='text-align:center;'> <td>12:00 am - 1:30 pm</td>";
        printSlot(3);
        calendarTable += "<tr style='text-align:center;'> <td>1:30 pm - 3:00 pm</td>";
        printSlot(4);
        calendarTable += "<tr style='text-align:center;'> <td>3:00 pm - 4:30 pm</td>";
        printSlot(5);
        calendarTable += "<tr style='text-align:center;'> <td>4:30 pm - 6:00 pm</td>";
        printSlot(6);
        calendarTable += "</div";
        calendarTable += "</table>";   
        /*     
        document.getElementById("calendarr").innerHTML = calendarTable;        
        mybooked.forEach( b => {
          let idname = "book"+b.id;
          document.getElementById(idname).innerHTML = calendarTable;
        })
        */
       return calendarTable;
    }

    let j = 0;

    function nextWeek(){
        j++;
        console.log(j);
        calendar(j);
    }
    function lastWeek(){
        j--;
        console.log(j);
        calendar(j);
    }

    calendar(j);

    dates.forEach(date => console.log(dayNames[date.weekday], date.day, date.month, date.year));

    module.export = {
        calendar: calendar
    }
