import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupermarketPage } from './supermarket.page';

describe('SupermarketPage', () => {
  let component: SupermarketPage;
  let fixture: ComponentFixture<SupermarketPage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(SupermarketPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
