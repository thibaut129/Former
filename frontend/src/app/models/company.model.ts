class Company {
  _id:string;
  experience: string;
  coords: string;
  created: Date;

  constructor(
  ){
    this.experience = ""
    this.coords = ""
    this.created = new Date()
  }
}

export default Company;
