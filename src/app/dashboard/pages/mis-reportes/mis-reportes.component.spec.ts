import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisReportesComponent } from './mis-reportes.component';

describe('MisReportesComponent', () => {
  let component: MisReportesComponent;
  let fixture: ComponentFixture<MisReportesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MisReportesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisReportesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
