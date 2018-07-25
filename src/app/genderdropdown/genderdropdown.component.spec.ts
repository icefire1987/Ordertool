import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenderdropdownComponent } from './genderdropdown.component';

describe('GenderdropdownComponent', () => {
  let component: GenderdropdownComponent;
  let fixture: ComponentFixture<GenderdropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenderdropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenderdropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
