import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioInicio } from './usuario-inicio';

describe('UsuarioInicio', () => {
  let component: UsuarioInicio;
  let fixture: ComponentFixture<UsuarioInicio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioInicio]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioInicio);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
