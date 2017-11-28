class Experience {
  _id:string;
  type: string;
  location: string;
  coords: string;
  companyID: string;
  userID: string;
  created: Date;

  constructor(
  ){
    this.type = "Stage"
    this.location = "Nice"
    this.coords = ""
    this.companyID = "123Amadeus"
    this.userID = ""
    this.created = new Date()
  }
}

export default Experience;
