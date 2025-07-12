import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoFichajesUserComponent } from './listado-fichajes-user.component';

describe('ListadoFichajesUserComponent', () => {
  let component: ListadoFichajesUserComponent;
  let fixture: ComponentFixture<ListadoFichajesUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoFichajesUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoFichajesUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
