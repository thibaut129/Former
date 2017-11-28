class Company {
  _id:string;
  name: string;
  type: string;
  experiencesID: string[];
  created: Date;

  constructor(
  ){
    this.name = ""
    this.type = ""
    this.experiencesID = []
    this.created = new Date()
  }
}

export default Company;
