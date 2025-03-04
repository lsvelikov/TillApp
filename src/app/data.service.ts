import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Tables } from './tables/tables.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'http://localhost:4000/api/data';
  private messageSource = new BehaviorSubject<string>('Initial Message');
  currentMessage = this.messageSource.asObservable();
  private selectedTableSubject = new BehaviorSubject<any>(null);
  selectedTable = this.selectedTableSubject.asObservable();

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // getTableData(): Observable<Tables[]> {
  //   return this.http.get<Tables[]>(this.apiUrl);
  // }

  insertTableData(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  changeMessage(message: string) {
    this.messageSource.next(message);
  }

  setSelectedTable(table: any) {
    this.selectedTableSubject.next(table);
  }
}

