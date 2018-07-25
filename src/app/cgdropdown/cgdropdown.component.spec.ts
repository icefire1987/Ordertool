import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CgdropdownComponent } from './cgdropdown.component';

describe('CgdropdownComponent', () => {
  let component: CgdropdownComponent;
  let fixture: ComponentFixture<CgdropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CgdropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CgdropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
