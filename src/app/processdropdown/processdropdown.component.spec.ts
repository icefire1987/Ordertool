import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessdropdownComponent } from './processdropdown.component';

describe('ProcessdropdownComponent', () => {
  let component: ProcessdropdownComponent;
  let fixture: ComponentFixture<ProcessdropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessdropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessdropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
