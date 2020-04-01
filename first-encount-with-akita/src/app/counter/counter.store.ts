import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface CounterState {
  key: string;
}

export function createInitialState(): CounterState {
  return {
    key: ''
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'counter' })
export class CounterStore extends Store<CounterState> {

  constructor() {
    super(createInitialState());
  }

}

