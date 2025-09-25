import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioListadoCategoria } from './usuario-listado-categoria';

describe('UsuarioListadoCategoria', () => {
  let component: UsuarioListadoCategoria;
  let fixture: ComponentFixture<UsuarioListadoCategoria>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioListadoCategoria]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioListadoCategoria);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
