import { TestBed, async, inject } from '@angular/core/testing';

import { AuthguardsGuard } from './authguards.guard';

describe('AuthguardsGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthguardsGuard]
    });
  });

  it('should ...', inject([AuthguardsGuard], (guard: AuthguardsGuard) => {
    expect(guard).toBeTruthy();
  }));
});
