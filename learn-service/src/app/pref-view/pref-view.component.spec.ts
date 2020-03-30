import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrefViewComponent } from './pref-view.component';

describe('PrefViewComponent', () => {
  let component: PrefViewComponent;
  let fixture: ComponentFixture<PrefViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrefViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrefViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
