import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectOtherDetailComponent } from './project-other-detail.component';

describe('ProjectOtherDetailComponent', () => {
  let component: ProjectOtherDetailComponent;
  let fixture: ComponentFixture<ProjectOtherDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectOtherDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectOtherDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
