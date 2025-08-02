import { TestBed } from '@angular/core/testing';

import { authGuard } from './auth.guard';



describe('authGuard', () => {
  const executeGuard = (roles: any) =>
    TestBed.runInInjectionContext(() => authGuard(roles));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
