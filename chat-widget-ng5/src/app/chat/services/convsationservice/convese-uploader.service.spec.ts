import { TestBed, inject } from '@angular/core/testing';

import { ConveseUploaderService } from './convese-uploader.service';

describe('ConveseUploaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConveseUploaderService]
    });
  });

  it('should be created', inject([ConveseUploaderService], (service: ConveseUploaderService) => {
    expect(service).toBeTruthy();
  }));
});
