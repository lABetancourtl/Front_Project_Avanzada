import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolverReportesComponent } from './resolver-reportes.component';

describe('ResolverReportesComponent', () => {
  let component: ResolverReportesComponent;
  let fixture: ComponentFixture<ResolverReportesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResolverReportesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResolverReportesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
