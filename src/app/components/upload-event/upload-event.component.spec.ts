import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MockUploadEventService} from '../../services/upload-event/upload-event.service.mock';
import {UploadEventService} from '../../services/upload-event/upload-event.service';
import {UploadEventComponent} from './upload-event.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ReactiveFormsModule} from '@angular/forms';

describe('UploadEventComponent', () => {
  let comp: UploadEventComponent;
  let fixture: ComponentFixture<UploadEventComponent>;

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
  });

  describe('Form Validation Tests', () => {
    it('should create', () => {
      expect(comp).toBeTruthy();
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

  describe('randomEventRange', () => {
    it('should return a value between a min and max', () => {
      const min = 5;
      const max = 10;
      const randomEventRange = comp.randomEventRange(min, max);
      expect(randomEventRange).toBeGreaterThanOrEqual(min);
      expect(randomEventRange).toBeLessThanOrEqual(max);
    });

    it('should return a value between a min and max', () => {
      const value = 5;
      const randomEventRange = comp.randomEventRange(value, value);
      expect(randomEventRange).toBe(5);
    });
  });

  function setStartDate(date) {
    setElementValueByID('#START_DATE', date);
  }

  describe('form validation', () => {

    describe('start and end date validation', () => {
      it('validation error should show if start date is after end date', () => {
        setStartDate('2017-01-02');
        setElementValueByID('#END_DATE', '2017-01-01');
        expectErrorToShow();
      });

      it('validation error should not show if start date is before end date', () => {
        setElementValueByID('#START_DATE', '2017-01-01');
        setElementValueByID('#END_DATE', '2017-01-02');
        expectErrorNotToShow();
      });

      it('validation error should not show if start date is the same as the end date', () => {
        setElementValueByID('#START_DATE', '2017-01-01');
        setElementValueByID('#END_DATE', '2017-01-01');
        expectErrorNotToShow();
      });
    });

    describe('min and max events per day cross form validation', () => {

      it('no validation error if the min is less than max and both entires are valid', () => {
        setElementValueByID('#MIN_EVENTS_PER_DAY', 0);
        setElementValueByID('#MAX_EVENTS_PER_DAY', 1);
        expectErrorNotToShow();
      });
      it('no validation error if the min is the same as the max', () => {
        setElementValueByID('#MIN_EVENTS_PER_DAY', 2);
        setElementValueByID('#MAX_EVENTS_PER_DAY', 2);
        expectErrorNotToShow();
      });
      it('no validation error if the min is zero and the max is 200', () => {
        setElementValueByID('#MIN_EVENTS_PER_DAY', 0);
        setElementValueByID('#MAX_EVENTS_PER_DAY', 200);
        expectErrorNotToShow();
      });
      it('validation error if the min is greater than max', () => {
        setElementValueByID('#MIN_EVENTS_PER_DAY', 2);
        setElementValueByID('#MAX_EVENTS_PER_DAY', 1);
        expectErrorToShow();
      });
      it('validation error if the min is less than zero', () => {
        setElementValueByID('#MIN_EVENTS_PER_DAY', -1);
        expectErrorToShow();
      });
      it('validation error if the max is greater than 200', () => {
        setElementValueByID('#MAX_EVENTS_PER_DAY', 201);
        expectErrorToShow();
      });

    });

  });


  function setElementValueByID(elementID: string, value: any) {
    const element = fixture.nativeElement.querySelector(elementID);
    element.value = value;
    element.dispatchEvent(new Event('input'));
    fixture.detectChanges();
  }


  function submitForm() {
    const button = fixture.nativeElement.querySelector('#GENERATE_BUTTON');
    button.click();
  }

  function expectErrorToShow() {
    const error = fixture.nativeElement.querySelector('p.alert');
    expect(error).not.toBeNull();
  }

  function expectErrorNotToShow() {
    const error = fixture.nativeElement.querySelector('p.alert');
    expect(error).toBeNull();
  }

});
