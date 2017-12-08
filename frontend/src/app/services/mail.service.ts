import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import {HttpClient} from "@angular/common/http";
import User from "../models/user.model";
import {Observable} from "rxjs/Rx";
import Experience from "../models/experience.model";



@Injectable()
export class MailService {

  api_url = 'http://localhost:3000';
  markerUrl = `${this.api_url}/api/mailer`;

  constructor(
    private http: HttpClient
  ) { }


  sendMail(users : { mail: string; data: any[]; }): Observable<any>{
    return this.http.post(`${this.markerUrl}`, users);
  }



}
