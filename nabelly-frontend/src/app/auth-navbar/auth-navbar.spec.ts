import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthNavbar } from './auth-navbar';

describe('AuthNavbar', () => {
  let component: AuthNavbar;
  let fixture: ComponentFixture<AuthNavbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthNavbar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthNavbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
