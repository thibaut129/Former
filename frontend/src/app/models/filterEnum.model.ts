export class FilterEnum {
  public _id:string;
  public name:string;
  public created: Date;

  constructor(name){
    this.name = name;
    this.created = new Date();
  }

}
