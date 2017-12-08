import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import {HttpClient} from "@angular/common/http";



@Injectable()
export class MailService {

  api_url = 'http://localhost:3000';
  markerUrl = `${this.api_url}/api/mailer`;

  constructor(
    private http: HttpClient
  ) { }


  sendMail(){
    console.log("Alicia la viet");
    return this.http.get(`http://localhost:3000/api/mailer`)
      .map((res:Response) => res.json());
  }


}
