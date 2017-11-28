class Company {
  _id:string;
  name: string;
  type: string;
  experience: string;
  created: Date;

  constructor(
  ){
    this.name = "Former"
    this.type = "Startup"
    this.created = new Date()
  }
}

export default Company;
