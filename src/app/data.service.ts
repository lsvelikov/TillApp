import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'http://localhost:4000/api/data';
  private messageSource = new BehaviorSubject<string>('Initial Message');
  currentMessage = this.messageSource.asObservable();


  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  insertData(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  changeMessage(message: string) {
    this.messageSource.next(message);
  }
}

