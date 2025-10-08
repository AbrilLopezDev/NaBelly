import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioCrearReceta } from './usuario-crear-receta';

describe('UsuarioCrearReceta', () => {
  let component: UsuarioCrearReceta;
  let fixture: ComponentFixture<UsuarioCrearReceta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioCrearReceta]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioCrearReceta);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
