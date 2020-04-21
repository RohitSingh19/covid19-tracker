export class Resources
{
    category: string;
    city: string;
    contact: string;
    descriptionandorserviceprovided: string;
    nameoftheorganisation: string;
    phonenumber: string;
    state: string;

    constructor(category: string, city: string, contact: string, descriptionandorserviceprovided: string,
                nameoftheorganisation: string, phonenumber: string, state: string  )
        {

            this.category =  category;
            this.city = city;
            this.contact = contact;
            this.descriptionandorserviceprovided = descriptionandorserviceprovided;
            this.nameoftheorganisation = nameoftheorganisation;
            this.phonenumber = phonenumber;
            this.state = state;
        }

}


