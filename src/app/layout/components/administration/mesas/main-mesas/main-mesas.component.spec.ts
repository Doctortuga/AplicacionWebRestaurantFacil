/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MainMesasComponent } from './main-mesas.component';

describe('MainMesasComponent', () => {
  let component: MainMesasComponent;
  let fixture: ComponentFixture<MainMesasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainMesasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainMesasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
