import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnadirFichejesComponent } from './anadir-fichejes.component';

describe('AnadirFichejesComponent', () => {
  let component: AnadirFichejesComponent;
  let fixture: ComponentFixture<AnadirFichejesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnadirFichejesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnadirFichejesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
