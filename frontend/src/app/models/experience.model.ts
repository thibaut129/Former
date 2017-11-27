class Experience {
  _id:string;
  company: string;
  location: string;
  user: string;
  created: Date;

  constructor(
  ){
    this.company = ""
    this.location = ""
    this.user = ""
    this.created = new Date()
  }
}

export default Experience;
