import { TestBed, async } from '@angular/core/testing';
import {AppComponent} from "./app.component"
import {MockComponent} from "ng2-mock-component"

// import { AppComponent } from './app.component';
// import { TimeComponent } from './components/time/time.component';
// import { HttpClientModule } from '@angular/common/http';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MockComponent({selector: "router-outlet"})
      ],
      // imports: [
      //   HttpClientModule
      // ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }))
})
