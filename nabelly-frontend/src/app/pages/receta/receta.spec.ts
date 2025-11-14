import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Receta } from './receta';

describe('Receta', () => {
  let component: Receta;
  let fixture: ComponentFixture<Receta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Receta]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Receta);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
