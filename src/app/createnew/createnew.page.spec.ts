import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatenewPage } from './createnew.page';

describe('CreatenewPage', () => {
  let component: CreatenewPage;
  let fixture: ComponentFixture<CreatenewPage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(CreatenewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
