
/**
 * ASSUMPTIONS:
 * For the scheduleing of an employee's job, it is implied that the jobs are 
 * in the order of start time (the array are in order by the earliest start time)
 */

//Test schedule object
var scheduleObj = {
    day: "Thursday",
    date: "06/06/2018",
    standby: "Brad On Standby",
    employees: [
        { 
            name: "Dante2",
            rank: "WF",
            jobs: [
                {
                job_desc: "LEEWARD COMMUNITY CHURCH - REMOVAL OF A/C UNIT for ADMIN OFFICE AREA",
                job_type: "ac",
                start_time: "07:00",
                end_time: "04:00"
                }
            ]
        },
        {
            name: "Aldon",
            rank: "JM",
            jobs: [
                {
                    job_desc: "AHANA - PM Service",
                    job_type: "pm",
                    start_time: "08:00",
                    end_time: "09:30"
                },
                {
                    job_desc: "Test Service - AC",
                    job_type: "ac",
                    start_time: "11:00",
                    end_time: "02:00"
                }
            ]
        },
        {
            name: "Greg G.",
            rank: "JM",
            jobs: [
                {
                    job_desc: "ON VACATION - RETURN TO WORK 06/19/2018",
                    job_type: "vacation",
                    start_time: "07:00",
                    end_time: "04:00"
                }
            ]
        }
    ]
};

var data_string;

/*
function load_schedule() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
            data_string += this.responseText;
        }
    };
    xhttp.open("GET", "http://localhost:8888/schedule.json", true);

    xhttp.send();
}
load_schedule();
*/

$.ajax({
    url: 'schedule.json',
    dataType: 'json',
    type: 'get',
    cache: false,
    success: function(data) {
        //console.log(data);
        data_string = data;
        //console.log(data_string);
    }
});





//new_scheduleObj = JSON.parse(data_string);
console.log(data_string);
//schedule_json = JSON.stringify(scheduleObj);
//console.log(scheduleObj);

//associative array for tracking the position and length of the job schdule placement in the dom
var time = { "07:00": 0,
             "07:30": 1,
             "08:00": 2,
             "08:30": 3,
             "09:00": 4,
             "09:30": 5,
             "10:00": 6,
             "10:30": 7,
             "11:00": 8,
             "11:30": 9,
             "12:00": 10,
             "12:30": 11,
             "01:00": 12,
             "01:30": 13,
             "02:00": 14,
             "02:30": 15,
             "03:00": 16,
             "03:30": 17,
             "04:00": 18 };

function get_time_spacing(start_time, end_time) {
    return time[end_time] - time[start_time] + 1;
}

function populate_table(schduleObj){
    //populate header 
    document.getElementsByClassName("day_display")[0].innerHTML = scheduleObj.day + ', ' + schduleObj.date;
    //document.getElementsByClassName("date_display")[0].innerHTML = scheduleObj.date;
    document.getElementsByClassName("display_standby")[0].innerHTML = scheduleObj.standby;

    /* Employee Data Row EX.
            <tr class="data_row">
                <td class="name">Chad</td>
                <td class="rank">5th</td>
                <td class="event" id="pm_event" colspan="6">PM Service - Benihana</td>                   
                <td class="event" id="ac_event" colspan="14">AC Service - Alamoana</td>
            </tr>
     */
    var table_contents = '';

    

    var employee = schduleObj.employees;
    for(i = 0; i < employee.length; i++) {
        var employee_info = '<tr class="data_row">' +
                                '<td class="name">' + employee[i].name + '</td>' +
                                '<td class="rank">' + employee[i].rank + '</td>';

        
        var jobs = employee[i].jobs;
        var job_info = '';

        var start_day = 0;
        var full_day = 20;

        for(c = 0; c < jobs.length; c++){

            if(time[jobs[c].start_time] > start_day)
            {
                //create offset event to make sure the placement of the job is correct on the table
                var offset = time[jobs[c].start_time] - start_day;
                //console.log(time[jobs[c].start_time] + ' - ' + start_day + ' = ' + offset);
                //var event_offset = '<td class="free_time" id="free_time" colspan="' + offset + '"></td>';
                for(x = 0; x < offset; x++) {
                    var event_offset = '<td class="free_time" id="free_time" colspan="1"></td>';
                    job_info += event_offset;
                }
                //job_info += event_offset;

            }
            start_day = time[jobs[c].end_time] + 1;
            console.log(start_day);

            job_info += '<td class="event" id="' + jobs[c].job_type + '" colspan="' + 
                        get_time_spacing(jobs[c].start_time, jobs[c].end_time) + '">' + jobs[c].job_desc + '</td>';
            
        }

        if(time[jobs[jobs.length - 1].end_time]+1 < 19){
            //If last job is over before the day is over, 
            //  add filler event to the schedule to display time grid
            var time_offset = get_time_spacing(jobs[jobs.length-1].end_time, "04:00") - 1;
            //console.log(time["04:30"] + ' - ' + time[jobs[jobs.length-1].end_time] + ' = ' + time_offset);
            //var event_offset = '<td class="free_time" id="free_time" colspan="' + time_offset + '"></td>';
            for( x = 0; x < time_offset; x++) {
                var event_offset = '<td class="free_time" id="free_time" colspan="1"></td>';
                job_info += event_offset;
            }
            //job_info += event_offset;
        }
        
        table_contents += employee_info + job_info + '</tr>';
    }
    
    document.getElementsByClassName("table_contents")[0].innerHTML = table_contents;
}



function populate_mobile_browser(schduleObj)
{
    document.getElementsByClassName("day_display")[1].innerHTML = scheduleObj.day;
    document.getElementsByClassName("date_display")[1].innerHTML = scheduleObj.date;
    document.getElementsByClassName("display_standby")[1].innerHTML = scheduleObj.standby;

     /* Employee Data Cell Ex.

        <div class="mobile_data">
            <div class="row">
                <div class="col-xs-6 col-sm-6 col-md-6 name">Dante</div>
                <div class="col-xs-6 col-sm-6 col-md-6 rank">WP</div>
            </div>

            <dir class="row job_data">
                <div class="col-xs-12 col-sm-12 col-md-12 job_description" id="ac_event">
                    Leward Community Church - Removial of A/C Units for Admin Office Area
                </div>

                <div class="row job_time">
                    <div class="col-xs-6 col-sm-6 col-md-6 time_col_1" id="event_time">
                        Start: <span class="start_time">07:00</span>
                    </div>

                    <div class="col-xs-6 col-sm-6 col-md-6 time_col_2" id="event_time">
                        End: <span class="end_time">04:30</span>
                    </div>
                </div>
            </dir>
        </div>
     */

     var employee = scheduleObj.employees;
     var mobile_content = '';
     for(i = 0; i < employee.length; i++) {
         var employee_info = '<div class="mobile_data">' + 
                                '<div class="row">' + 
                                    '<div class="col-xs-6 col-sm-6 col-md-6 name">' + employee[i].name + '</div>' +
                                    '<div class="col-xs-6 col-sm-6 col-md-6 rank">' + employee[i].rank + '</div>' + 
                                '</div>';

        var job_list = employee[i].jobs;
        var job_data = '';
        
        for(c = 0; c < job_list.length; c++){
            var job_desc = '<div class="row job_data">' + 
                                '<div class="col-xs-12 col-sm-12 col-md-12 job_description" id="' + job_list[c].job_type + '">' +
                                    job_list[c].job_desc + '</div>';

            var job_time = '<div class="row job_time">' + 
                                '<div class="col-xs-6 col-sm-6 col-md-6 time_col_1" id="event_time">Start: ' + job_list[c].start_time + '</div>' +
                                '<div class="col-xs-6 col-sm-6 col-md-6 time_col_2" id="event_time">End: ' + job_list[c].end_time + '</div></div>';
                                
                                
            job_data += job_desc + job_time + '</div>';
        }
        
        mobile_content += employee_info + job_data + '</div>';
        //mobile_content += employee_info + '</div>';
     }

     document.getElementsByClassName("mobile_content")[0].innerHTML = mobile_content;
}




//controller
//======================================================================================

//load mobile browser layout
populate_mobile_browser(scheduleObj);

//load standard browser layout
populate_table(scheduleObj);








