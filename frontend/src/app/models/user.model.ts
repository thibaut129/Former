class User {
  _id:string;
  firstname: string;
  lastname: string;
  email: string;
  date: Date;
  department: string;
  option: string;

  constructor(
  ){
    this.firstname = ""
    this.lastname = ""
    this.email = ""
    this.date = new Date()
    this.department = "MAM"
    this.option = "IMAFA"
  }
}

export default User;
