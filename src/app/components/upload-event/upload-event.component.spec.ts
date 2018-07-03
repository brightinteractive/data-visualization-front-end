import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockUploadEventService } from '../../services/upload-event/upload-event.service.mock';
import { UploadEventService } from '../../services/upload-event/upload-event.service';
import { UploadEventComponent } from './upload-event.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

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
        { provide: UploadEventService, useClass: MockUploadEventService }
      ]
    })
      .compileComponents;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadEventComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
    eventService = TestBed.get(UploadEventService);
  });

  it('should create', () => {
    expect(comp).toBeTruthy();
  });

  describe('createUploadEvent', () => {
    it('should create and return a new Event, given some data', () => {
      const testDate = new Date();
      const eventData = mockData;
      const event = comp.createUploadEvent(eventData, testDate);
      expect(event).toBeTruthy;
    });
  });

  describe('calculateDifferenceInDays', () => {
    it('should return the number of days between two dates', () => {
      const d1 = new Date();
      const d2 = new Date();
      d2.setDate(d2.getDate() + 1);
      const difference = comp.calculateDifferenceInDays(d1, d2);
      expect(difference).toEqual(1);
    });

    it('should return a difference of zero if the start and end date are the same', () => {
      const date = new Date();
      const difference = comp.calculateDifferenceInDays(date, date);
      expect(difference).toEqual(0);
    });

    it('should return the same result no matter the order of arguements', () => {
      const d1 = new Date();
      const d2 = new Date();
      d2.setDate(d2.getDate() + 1);
      const difference1 = comp.calculateDifferenceInDays(d1, d2);
      const difference2 = comp.calculateDifferenceInDays(d2, d1);
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

});
