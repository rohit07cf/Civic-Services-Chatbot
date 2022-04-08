/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RasaConnectorService } from './rasa-connector.service';

describe('Service: RasaConnector', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RasaConnectorService]
    });
  });

  it('should ...', inject([RasaConnectorService], (service: RasaConnectorService) => {
    expect(service).toBeTruthy();
  }));
});
