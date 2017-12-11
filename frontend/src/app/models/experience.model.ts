class Experience {
  _id:string;
  type: string;
  location: string;
  year: Number;
  coords: {
    longitude:Number,
    latitude:Number
  };
  companyID: string;
  userID: string;
  filters: string[];
  created: Date;

  constructor(
  ){
    this.type = ""
    this.location = "Nice"
    this.year = new Date().getFullYear();
    this.coords = {
        longitude:0,
        latitude:0
      }
    this.companyID = ""
    this.userID = ""
    this.filters = []
    this.created = new Date()
  }
}

export default Experience;
