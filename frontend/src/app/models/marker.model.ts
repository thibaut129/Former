class Marker {
  _id:string;
  coords: {
    longitude:Number,
    latitude:Number
  };
  experiences: string[];
  created: Date;

  constructor(
  ){
    this.coords = {
      longitude:0,
      latitude:0
    }
    this.experiences = []
    this.created = new Date()
  }
}

export default Marker;
