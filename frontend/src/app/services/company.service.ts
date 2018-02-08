import Company from '../models/company.model';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Response} from '@angular/http';
import { Injectable } from '@angular/core';


import 'rxjs/add/operator/map';

@Injectable()
export class CompanyService {

  api_url = 'http://62.210.76.158:8083';
  companyUrl = `${this.api_url}/api/companies`;

  constructor(
    private http: HttpClient
  ) { }


  createCompany(company: Company): Observable<any>{
    return this.http.post(`${this.companyUrl}`, company);
  }

  getCompanies(): Observable<Company[]>{
    return this.http.get(this.companyUrl)
      .map(res  => {
        return res["data"].docs as Company[];
      })
  }

  editCompany(company:Company){
    let editUrl = `${this.companyUrl}`
    return this.http.put(editUrl, company);
  }

  deleteCompany(id:string):any{
    let deleteUrl = `${this.companyUrl}/${id}`
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
