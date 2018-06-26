import { TestBed, inject, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TimeService } from './time.service';

describe('TimeService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TimeService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should be created', inject([TimeService], (service: TimeService) => {
    expect(service).toBeTruthy();
  }));

});
