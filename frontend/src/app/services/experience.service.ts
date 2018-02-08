import Experience from '../models/experience.model';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Response} from '@angular/http';
import { Injectable } from '@angular/core';


import 'rxjs/add/operator/map';

@Injectable()
export class ExperienceService {

  api_url = 'http://62.210.76.158:8083';
  experienceUrl = `${this.api_url}/api/experiences`;

  constructor(
    private http: HttpClient
  ) { }


  createExperience(experience: Experience): Observable<any>{
    return this.http.post(`${this.experienceUrl}`, experience);
  }

  getExperiences(): Observable<Experience[]>{
    return this.http.get(this.experienceUrl)
      .map(res  => {
        return res["data"].docs as Experience[];
      })
  }

  editExperience(experience:Experience){
    let editUrl = `${this.experienceUrl}`
    return this.http.put(editUrl, experience);
  }

  deleteExperience(id:string):any{
    let deleteUrl = `${this.experienceUrl}/${id}`
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
