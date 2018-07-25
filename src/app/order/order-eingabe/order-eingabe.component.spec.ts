import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderEingabeComponent } from './order-eingabe.component';

describe('OrderEingabeComponent', () => {
  let component: OrderEingabeComponent;
  let fixture: ComponentFixture<OrderEingabeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderEingabeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderEingabeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
