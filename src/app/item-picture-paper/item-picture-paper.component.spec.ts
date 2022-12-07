import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemPicturePaperComponent } from './item-picture-paper.component';

describe('ItemPicturePaperComponent', () => {
  let component: ItemPicturePaperComponent;
  let fixture: ComponentFixture<ItemPicturePaperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemPicturePaperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemPicturePaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
