import { TestBed, inject } from '@angular/core/testing';

import { UploadEventService } from './upload-event.service';

describe('UploadEventService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UploadEventService]
    });
  });

  it('should be created', inject([UploadEventService], (service: UploadEventService) => {
    expect(service).toBeTruthy();
  }));
});
