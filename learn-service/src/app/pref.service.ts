import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrefService {
  subject = new Subject<any>();
  observe = this.subject.asObservable();

  constructor() { }
}
