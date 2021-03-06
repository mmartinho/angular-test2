import { SimpleChange, SimpleChanges } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoBoardComponent } from './photo-board.component';
import { PhotoBoardModule } from './photo-board.module';
import { buildPhotoList } from './test/build-photo-list';

describe(PhotoBoardComponent.name, () => {
  let component: PhotoBoardComponent;
  let fixture: ComponentFixture<PhotoBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoBoardModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`Should display rows and columns when (@Input photos) has value`, () => {
    component.photos = buildPhotoList();
    fixture.detectChanges();
    
    /** Artificially create a change */
    const change: SimpleChanges = {
      photos: new SimpleChange([], component.photos, true)
    }
    /** Force change on component */
    component.ngOnChanges(change);

    expect(component.rows.length).withContext('Number of rows').toBe(2);
    expect(component.rows[0].length).withContext('Number of columns from first row').toBe(4);
    expect(component.rows[0].length).withContext('Number of columns from second row').toBe(4);
  });  
});
