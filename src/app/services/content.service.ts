import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Content } from '../interfaces/data.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private http: HttpClient) { }

  content:string = "./assets/content.json";
  help:string = "./assets/help.json"

  infoContent(): Observable<any> {
    return this.http.get<Content>(this.content);
  }

  helpContent(): Observable<any> {
    return this.http.get<any>(this.help);
  }
}
