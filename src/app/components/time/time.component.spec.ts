import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TimeComponent } from './time.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TimeService } from '../../services/time/time.service';
import { ReactiveFormsModule } from '@angular/forms';



describe('TimeComponent', () => {
  let component: TimeComponent;
  let fixture: ComponentFixture<TimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      declarations: [TimeComponent],
      providers: [TimeService],
      schemas: []
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
