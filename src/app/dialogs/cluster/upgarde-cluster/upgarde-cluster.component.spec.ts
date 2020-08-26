import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpgardeClusterComponent } from './upgarde-cluster.component';

describe('UpgardeClusterComponent', () => {
  let component: UpgardeClusterComponent;
  let fixture: ComponentFixture<UpgardeClusterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpgardeClusterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpgardeClusterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
