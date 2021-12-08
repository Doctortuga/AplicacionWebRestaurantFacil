/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MainProductoComponent } from './main-producto.component';

describe('MainProductoComponent', () => {
  let component: MainProductoComponent;
  let fixture: ComponentFixture<MainProductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainProductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
