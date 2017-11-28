class Company {
  _id:string;
  name: string;
  type: string;
  experiencesID: string[];
  created: Date;

  constructor(
  ){
    this.name = "Former"
    this.type = "Startup"
    this.experiencesID = []
    this.created = new Date()
  }
}

export default Company;
