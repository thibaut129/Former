class Marker {
  _id:string;
  name: string;
  type: string;
  icon: string;
  created: Date;

  constructor(
  ){
    this.name = ""
    this.type = ""
    this.icon = ""
    this.created = new Date()
  }
}

export default Marker;
