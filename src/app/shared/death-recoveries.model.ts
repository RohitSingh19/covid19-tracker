export class DeathRecvover {
    AgeBracket: number;
    City: string;
    Date: Date;
    District: string;
    Gender: string;
    Nationality: string;
    patientstatus: string;
    State: string;
    StateCode: string;

    constructor(AgeBracket: number, City: string, Date: Date, District: string,
                Gender: string, Nationality: string, patientstatus: string, State: string,
                StateCode: string) {
        this.AgeBracket = AgeBracket;
        this.City = City;
        this.Date = Date;
        this.District = District;
        this.Gender = Gender;
        this.Nationality = Nationality;
        this.patientstatus = patientstatus;
        this.State = State;
        this.StateCode = StateCode;
    }
}
