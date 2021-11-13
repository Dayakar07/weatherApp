import { DebugElement } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture;
  let component: AppComponent;
  let debugEle: DebugElement;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatToolbarModule,
        BrowserAnimationsModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    // get test component from the fixture
    component = fixture.componentInstance;
    debugEle = fixture.debugElement;
  })

  it('should create the app', () => {
    const app = debugEle.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'weatherApp'`, () => {
    const app = debugEle.componentInstance;
    expect(app.title).toEqual('weatherApp');
  });

  it('should contain mat tool bar ', () => {
    const toolBar = debugEle.query(By.css('mat-toolbar'));
    expect(toolBar).toBeTruthy();
  });

  it('should have title as weather', () => {
    const span = debugEle.query(By.css('mat-toolbar span'));
    expect(span.nativeElement.textContent).toBe('Weather');
  });

  it('should have img logo tag ', () => {
    const img = debugEle.query(By.css('mat-toolbar img'));
    expect(img.nativeElement.src).toBe('http://localhost:9876/assets/svg/logo.svg');
  });

  it('should have router outlet', () => {
    const outlet = debugEle.query(By.css('router-outlet'));
    expect(outlet).toBeTruthy();
  });
});
