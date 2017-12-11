export class DepartmentEnum {
  public _id:string;
  public name:string;
  public option:string[];
  public created: Date;

  constructor(){
    this.name = "BAT";
    this.option = [];
    this.created = new Date();
  }

}
