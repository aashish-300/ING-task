import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtractPdfComponent } from './extract-pdf.component';

describe('ExtractPdfComponent', () => {
  let component: ExtractPdfComponent;
  let fixture: ComponentFixture<ExtractPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtractPdfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExtractPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
