import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpressionDetailComponent } from './expression-detail.component';

describe('ExpressionDetailComponent', () => {
  let component: ExpressionDetailComponent;
  let fixture: ComponentFixture<ExpressionDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpressionDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpressionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
