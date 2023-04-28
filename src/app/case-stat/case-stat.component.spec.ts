import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseStatComponent } from './case-stat.component';

describe('CaseStatComponent', () => {
  let component: CaseStatComponent;
  let fixture: ComponentFixture<CaseStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaseStatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaseStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
