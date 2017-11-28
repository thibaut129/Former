class Company {
  _id:string;
  name: string;
  experience: string;
  coords: string;
  created: Date;

  constructor(
  ){
    this.name = ""
    this.experience = ""
    this.coords = ""
    this.created = new Date()
  }
}

export default Company;
