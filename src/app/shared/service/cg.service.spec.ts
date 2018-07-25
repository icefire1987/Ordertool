import { TestBed, inject } from '@angular/core/testing';

import { CgService } from './cg.service';

describe('CgService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CgService]
    });
  });

  it('should be created', inject([CgService], (service: CgService) => {
    expect(service).toBeTruthy();
  }));
});
