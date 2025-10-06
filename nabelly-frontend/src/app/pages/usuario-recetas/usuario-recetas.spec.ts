import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioRecetas } from './usuario-recetas';

describe('UsuarioRecetas', () => {
  let component: UsuarioRecetas;
  let fixture: ComponentFixture<UsuarioRecetas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioRecetas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioRecetas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
