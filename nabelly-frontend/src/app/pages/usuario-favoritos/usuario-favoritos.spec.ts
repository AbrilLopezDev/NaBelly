import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioFavoritos } from './usuario-favoritos';

describe('UsuarioFavoritos', () => {
  let component: UsuarioFavoritos;
  let fixture: ComponentFixture<UsuarioFavoritos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioFavoritos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioFavoritos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
