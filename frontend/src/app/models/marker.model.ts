export class Marker {
  public _id:string;
  public coords: { longitude:Number, latitude:Number };
  public experiences: string[];
  public created: Date;

  constructor(coords :  { longitude:Number, latitude:Number }){
    this.coords = coords;
    this.experiences = [];
    this.created = new Date();
  }

}
