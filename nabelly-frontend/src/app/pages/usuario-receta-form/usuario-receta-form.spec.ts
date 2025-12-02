import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioRecetaForm } from './usuario-receta-form';

describe('UsuarioRecetaForm', () => {
  let component: UsuarioRecetaForm;
  let fixture: ComponentFixture<UsuarioRecetaForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioRecetaForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioRecetaForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
