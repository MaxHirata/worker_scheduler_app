
class scheduled_event {
    constructor(event_descption, start_time, end_time){
        this.event_descption = event_descption;
        this.start_time = start_time;
        this.end_time = end_time;
    }

    //Getter
    get event_descption() {
        return this.event_descption;
    }

    get start() {
        return this.start_time;
    }

    get end() {
        return this.end_time;
    }


}

class Employee {
    constructor(name, type) {
        this.name = name;
        this.type = type;
        this.schedule = new array();
    }

    //Getters
    get name() {
        return this.name;
    }

    get type() {
        return this.type;
    }

    get schedule() {
        return this.schedule;
    }

}