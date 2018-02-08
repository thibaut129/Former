import User from '../models/user.model';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Response} from '@angular/http';
import { Injectable } from '@angular/core';


import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  api_url = 'http://62.210.76.158:8083';
  userUrl = `${this.api_url}/api/users`;

  constructor(
    private http: HttpClient
  ) { }


  createUser(user: User): Observable<any>{
    return this.http.post(`${this.userUrl}`, user);
  }

  getUsers(): Observable<User[]>{
    return this.http.get(this.userUrl)
      .map(res  => {
        return res["data"].docs as User[];
      })
  }

  getUserById(id:string): Observable<User>{
    return this.http.get(this.userUrl+"/"+id)
      .map(res  => {
        return res["data"] as User;
      })
  }

  getUsersByDepartment(department:string): Observable<User[]>{
    return this.http.get(this.userUrl+"/dept/"+department.toUpperCase())
      .map(res  => {
        return res["data"].docs as User[];
      })
  }

  editUser(user:User){
    let editUrl = `${this.userUrl}`
    return this.http.put(editUrl, user);
  }

  deleteUser(id:string):any{
    let deleteUrl = `${this.userUrl}/${id}`
    return this.http.delete(deleteUrl)
      .map(res  => {
        return res;
      })
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
