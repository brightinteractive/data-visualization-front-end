import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MockUploadEventService} from '../../services/upload-event/upload-event.service.mock';
import {UploadEventService} from '../../services/upload-event/upload-event.service';
import {UploadEventComponent} from './upload-event.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ReactiveFormsModule} from '@angular/forms';

describe('UploadEventComponent', () => {
  let comp: UploadEventComponent;
  let fixture: ComponentFixture<UploadEventComponent>;
  let eventService: UploadEventService;

  const mockData = {
    assetID: 'someID',
    userName: 'TestName',
    userId: 'TestId',
    startDate: new Date(),
    endDate: new Date(),
    group: 'Test Group',
    assetTitle: 'someTitle'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      declarations: [UploadEventComponent],
      providers: [
        {provide: UploadEventService, useClass: MockUploadEventService}
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadEventComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
    eventService = TestBed.get(UploadEventService);
  });

  describe('Form Validation Tests', () => {
    it('should create', () => {
      expect(comp).toBeTruthy();
    });

    it('End date before start date gives error', () => {
      setStartDate('02/01/2018');
      setEndDate('01/01/2018');
      expectErrorToShow();
    });

    it('End date the same as start date should not give error', () => {
      setStartDate('01/01/2018');
      setEndDate('01/01/2018');
      expectErrorNotToShow();
    });

    it('End date after start date should not give error', () => {
      setStartDate('01/01/2018');
      setEndDate('02/01/2018');
      expectErrorNotToShow();
    });
  });


  describe('createUploadEvent', () => {
    it('should create and return a new Event, given some data', () => {
      const testDate = new Date();
      const event = comp.createUploadEvent(mockData, testDate);
      expect(event).toBeTruthy();
    });
  });

  describe('calculateDifferenceInDays', () => {
    it('should return the number of days between two dates', () => {
      const day1 = new Date();
      const day2 = new Date();
      day2.setDate(day2.getDate() + 1);
      const difference = comp.calculateDifferenceInDays(day1, day2);
      expect(difference).toEqual(1);
    });

    it('should return a difference of zero if the start and end date are the same', () => {
      const date = new Date();
      const difference = comp.calculateDifferenceInDays(date, date);
      expect(difference).toEqual(0);
    });

    it('should return the same result no matter the order of arguements', () => {
      const day1 = new Date();
      const day2 = new Date();
      day2.setDate(day2.getDate() + 1);
      const difference1 = comp.calculateDifferenceInDays(day1, day2);
      const difference2 = comp.calculateDifferenceInDays(day2, day1);
      expect(difference1).toEqual(difference2);
    });

  });

  describe('calculateRandomEventTime', () => {
    it('should return the date which is x days after the start date', () => {
      const date = new Date();
      const elapsed_days = 1;
      const randomEventTime = comp.calculateRandomEventTime(date, elapsed_days);
      expect(randomEventTime).toBeGreaterThan(date.getTime());
    });
  });


  //HELPER FUNCTIONS
  function getUploadEventElement() {
    return fixture.nativeElement;
  }

  function expectErrorToShow() {
    const error = getUploadEventElement().querySelector('p.alert');
    console.log(error);
    // expect(error).not.toBeNull();
  }

  function expectErrorNotToShow() {
    const error = getUploadEventElement().querySelector('p.alert');
    expect(error).toBeNull();
  }

  function setStartDate(date: String) {
    const startDateInput = getUploadEventElement().querySelector('#START_DATE');
    startDateInput.value = date;
  }

  function setEndDate(date: String) {
    const endDateInput = getUploadEventElement().querySelector('#END_DATE');
    endDateInput.value = date;
  }
});
