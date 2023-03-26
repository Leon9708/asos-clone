import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewCartComponent } from './preview-cart.component';

describe('PreviewCartComponent', () => {
  let component: PreviewCartComponent;
  let fixture: ComponentFixture<PreviewCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewCartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
