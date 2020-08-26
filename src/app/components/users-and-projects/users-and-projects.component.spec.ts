import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersAndProjectsComponent } from './users-and-projects.component';

describe('UsersAndProjectsComponent', () => {
  let component: UsersAndProjectsComponent;
  let fixture: ComponentFixture<UsersAndProjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersAndProjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersAndProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
