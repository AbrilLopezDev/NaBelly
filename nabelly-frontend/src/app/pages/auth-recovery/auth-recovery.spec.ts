import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthRecovery } from './auth-recovery';

describe('AuthRecovery', () => {
  let component: AuthRecovery;
  let fixture: ComponentFixture<AuthRecovery>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthRecovery]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthRecovery);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
