
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Response} from '@angular/http';
import { Injectable } from '@angular/core';


import 'rxjs/add/operator/map';
import {DepartmentEnum} from "../models/departmentEnum.model";

@Injectable()
export class DepartmentEnumService {

  api_url = 'http://localhost:3000';
  departmentEnumUrl = `${this.api_url}/api/departmentEnum`;

  constructor(
    private http: HttpClient
  ) { }


  createDepartmentEnum(departmentEnum: DepartmentEnum): Observable<any>{
    return this.http.post(`${this.departmentEnumUrl}`, departmentEnum);
  }

  getDepartmentsEnum(): Observable<DepartmentEnum[]>{
    return this.http.get(this.departmentEnumUrl)
      .map(res  => {
        return res["data"].docs as DepartmentEnum[];
      })
  }

  editDepartmentEnum(departmentEnum:DepartmentEnum){
    let editUrl = `${this.departmentEnumUrl}`
    return this.http.put(editUrl, departmentEnum);
  }

  deleteDepartmentEnum(id:string):any{
    let deleteUrl = `${this.departmentEnumUrl}/${id}`
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
