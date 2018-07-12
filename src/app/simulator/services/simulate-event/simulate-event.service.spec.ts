import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { SimulateEventService } from './simulate-event.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('SimulateEventService', () => {

  let service;
  let httpTestingController: HttpTestingController;

  const mockData = {} as Event;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [SimulateEventService]
    });
    service = TestBed.get(SimulateEventService);
    httpTestingController = TestBed.get(HttpTestingController);
    this.mockEvent = mockData;
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


});


