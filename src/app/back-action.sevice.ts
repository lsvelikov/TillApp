import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BackActionService {
  private backActionSubject = new Subject<void>();

  backAction$ = this.backActionSubject.asObservable();

  triggerBackAction() {
    this.backActionSubject.next();
  }
}
