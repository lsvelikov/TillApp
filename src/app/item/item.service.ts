import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private apiUrl = 'http://localhost:4000/add-item'; 

  constructor(private http: HttpClient) { }
  
  addItem(item: { name: string, value: number }): Observable<any> {
    return this.http.post(this.apiUrl, item);
  }
}
