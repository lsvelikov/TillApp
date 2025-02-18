// import { inject, Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { catchError, map, Observable, throwError } from 'rxjs';
// import { Tables } from './tables.model';

// @Injectable({
//   providedIn: 'root',
// })
// export class TablesService {
//   private apiUrl = 'http://localhost:4000/api/data';
//   tablesService = inject(TablesService);

//   constructor(private http: HttpClient) { }

//   loadAvailableTables() {
//     return this.fetchTables(this.apiUrl, 'Something went wrong fetching the available places. Please try again later.');
//   }

//   getData(): Observable<any> {
//     return this.http.get<any>(this.apiUrl);
//   }

//   insertData(data: any): Observable<any> {
//     return this.http.post<any>(this.apiUrl, data);
//   }

//   private fetchTables(url: string, errorMessage: string) {
//     return this.http.get<{ tables: Tables[] }>(url)
//       .pipe(
//         map((resData) => resData.tables),
//         catchError((error) => {
//           console.log(error);
//           return throwError(() => new Error(errorMessage)
//           )
//         })
//       )
//   }
// }