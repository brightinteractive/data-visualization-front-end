import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { UploadEventService } from './upload-event.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('UploadEventService', () => {

  let service;
  let httpTestingController: HttpTestingController;

  const mockData = {} as Event;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [UploadEventService]
    });

    httpTestingController = TestBed.get(HttpTestingController);
  });

  beforeEach(inject([UploadEventService], s => {
    service = s;
  }));

  beforeEach(() => {
    this.mockEvent = mockData;
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('postEvent', () => {
    it('should post an event', () => {
      service.postEvent(this.event).subscribe(
        response => expect(response).toBeDefined(),
        fail
      );
      const req = httpTestingController.expectOne(service);
      expect(req.request.method).toEqual('POST');
    })
    
  });

});


