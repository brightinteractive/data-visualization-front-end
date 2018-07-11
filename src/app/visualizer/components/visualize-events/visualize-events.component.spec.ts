import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizeEventsComponent } from './visualize-events.component';

describe('VisualizeEventsComponent', () => {
  let component: VisualizeEventsComponent;
  let fixture: ComponentFixture<VisualizeEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizeEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizeEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
