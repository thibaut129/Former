import Experience from "./experience.model";

export class Marker {
  public _id:string;
  public coords: { longitude:Number, latitude:Number };
  public experiences: Experience[];
  public created: Date;

  constructor(id, coords :  { longitude:Number, latitude:Number }, experiences:Experience[]){
    this._id = id;
    this.coords = coords;
    this.experiences = experiences;
    this.created = new Date();
  }

}
