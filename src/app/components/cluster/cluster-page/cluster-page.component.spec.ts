import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClusterPageComponent } from './cluster-page.component';

describe('ClusterPageComponent', () => {
  let component: ClusterPageComponent;
  let fixture: ComponentFixture<ClusterPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClusterPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClusterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
