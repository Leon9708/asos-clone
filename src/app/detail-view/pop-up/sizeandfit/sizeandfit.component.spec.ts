import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SizeandfitComponent } from './sizeandfit.component';

describe('SizeandfitComponent', () => {
  let component: SizeandfitComponent;
  let fixture: ComponentFixture<SizeandfitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SizeandfitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SizeandfitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
