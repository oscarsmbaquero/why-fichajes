import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichajePersonalComponent } from './fichaje-personal.component';

describe('FichajePersonalComponent', () => {
  let component: FichajePersonalComponent;
  let fixture: ComponentFixture<FichajePersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FichajePersonalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FichajePersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
