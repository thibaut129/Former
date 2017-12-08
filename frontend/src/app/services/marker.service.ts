
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Response} from '@angular/http';
import { Injectable } from '@angular/core';


import 'rxjs/add/operator/map';
import {Marker} from "../models/marker.model";

@Injectable()
export class MarkerService {

  api_url = 'http://localhost:3000';
  markerUrl = `${this.api_url}/api/markers`;

  constructor(
    private http: HttpClient
  ) { }


  createMarker(marker: Marker): Observable<any>{
    return this.http.post(`${this.markerUrl}`, marker);
  }

  getMarkers(): Observable<Marker[]>{
    return this.http.get(this.markerUrl)
      .map(res  => {
        return res["data"].docs as Marker[];
      })
  }

  editMarker(marker:Marker){
    let editUrl = `${this.markerUrl}`
    return this.http.put(editUrl, marker);
  }

  deleteMarker(id:string):any{
    let deleteUrl = `${this.markerUrl}/${id}`
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
