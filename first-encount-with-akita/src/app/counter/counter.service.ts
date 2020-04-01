import { Injectable } from '@angular/core';
import { CounterStore } from './counter.store';
// import { HttpClient } from '@angular/common/http';
// import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CounterService {

  constructor(private counterStore: CounterStore) {
  }

  resetValue() {
    this.counterStore.update({ favorite: 0});
  }

  increment() {
    this.counterStore.update(store => ({
      favorite: store.favorite + 1
    }));
  }
}
