import { TestBed, inject } from '@angular/core/testing';

import { VisualizeEventsService } from './visualize-events.service';

describe('VisualizeEventsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VisualizeEventsService]
    });
  });

  it('should be created', inject([VisualizeEventsService], (service: VisualizeEventsService) => {
    expect(service).toBeTruthy();
  }));
});
