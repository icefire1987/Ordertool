import { TestBed, inject } from '@angular/core/testing';

import { GoogleauthService } from './googleauth.service';

describe('GoogleauthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoogleauthService]
    });
  });

  it('should be created', inject([GoogleauthService], (service: GoogleauthService) => {
    expect(service).toBeTruthy();
  }));
});
