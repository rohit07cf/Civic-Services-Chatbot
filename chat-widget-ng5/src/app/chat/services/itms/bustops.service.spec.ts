import { TestBed, inject } from '@angular/core/testing';

import { BustopsService } from './bustops.service';

describe('BustopsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BustopsService]
    });
  });

  it('should be created', inject([BustopsService], (service: BustopsService) => {
    expect(service).toBeTruthy();
  }));
});
