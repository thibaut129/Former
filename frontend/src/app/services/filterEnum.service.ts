
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Response} from '@angular/http';
import { Injectable } from '@angular/core';


import 'rxjs/add/operator/map';
import {FilterEnum} from "../models/filterEnum.model";

@Injectable()
export class FilterEnumService {

  api_url = 'http://localhost:3000';
  filterEnumUrl = `${this.api_url}/api/filterEnum`;

  constructor(
    private http: HttpClient
  ) { }


  createFilterEnum(filterEnum: FilterEnum): Observable<any>{
    return this.http.post(`${this.filterEnumUrl}`, filterEnum);
  }

  getFiltersEnum(): Observable<FilterEnum[]>{
    return this.http.get(this.filterEnumUrl)
      .map(res  => {
        return res["data"].docs as FilterEnum[];
      })
  }

  editFilterEnum(filterEnum:FilterEnum){
    let editUrl = `${this.filterEnumUrl}`
    return this.http.put(editUrl, filterEnum);
  }

  deleteFilterEnum(id:string):any{
    let deleteUrl = `${this.filterEnumUrl}/${id}`
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
