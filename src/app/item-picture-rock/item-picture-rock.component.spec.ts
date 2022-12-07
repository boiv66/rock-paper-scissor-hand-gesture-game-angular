import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemPictureRockComponent } from './item-picture-rock.component';

describe('ItemPictureRockComponent', () => {
  let component: ItemPictureRockComponent;
  let fixture: ComponentFixture<ItemPictureRockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemPictureRockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemPictureRockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
