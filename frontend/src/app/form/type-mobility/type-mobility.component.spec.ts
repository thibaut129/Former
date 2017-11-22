import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeMobilityComponent } from './type-mobility.component';

describe('TypeMobilityComponent', () => {
  let component: TypeMobilityComponent;
  let fixture: ComponentFixture<TypeMobilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeMobilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeMobilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
