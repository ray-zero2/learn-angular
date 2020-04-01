import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CounterService } from '../counter/counter.service';
import { CounterQuery } from '../counter/counter.query';

@Component({
  selector: 'app-counter-component',
  templateUrl: './counter-component.component.html',
  styleUrls: ['./counter-component.component.scss']
})
export class CounterComponentComponent implements OnInit {
  favorite$: Observable<number> | undefined;
  constructor(private counterService: CounterService, private counterQuery: CounterQuery) {}

  ngOnInit(): void {
    this.favorite$ = this.counterQuery.select('favorite');
  }

  increment() {
    this.counterService.increment();
  }

  reset() {
    this.counterService.resetValue();
  }

}
