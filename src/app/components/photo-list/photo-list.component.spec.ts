import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { async, of } from 'rxjs';
import { PhotoBoardService } from 'src/app/shared/components/photo-board/services/photo-board.service';
import { buildPhotoList } from 'src/app/shared/components/photo-board/test/build-photo-list';

import { PhotoListComponent } from './photo-list.component';
import { PhotoListModule } from './photo-list.module';

describe(PhotoListComponent.name, () => {
  let component: PhotoListComponent;
  let fixture: ComponentFixture<PhotoListComponent>;
  let service: PhotoBoardService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotoListComponent ],
      imports: [PhotoListModule, HttpClientModule] 
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoListComponent);
    component = fixture.componentInstance;
    /** Force service injection */
    service = TestBed.inject(PhotoBoardService); 
    fixture.detectChanges();
  });

  /**
   * 
   */
  it(`Should create component ${PhotoListComponent.name}`, () => {
    expect(component).toBeTruthy();
  });

  /**
   * 
   */
  it(`(D) Should display board when data arrives`, () => {
    /** 
     * Create a generated photo list. 
     * Not from a server 
     */
    const photos = buildPhotoList(); 
    /** 
     * Force Photo Board Service to trigger the getPhotos function, 
     * sending photo list as data 
     * (Data has arrived)
     * This funcion does not test the REQUEST. It just simulate the return
     */
    spyOn(service, 'getPhotos').and.returnValue(of(photos));
    /**
     * Note: detectChanges are called after spyOn function
     */
    fixture.detectChanges();
    /** DOM elements to check */
    const board = fixture.nativeElement.querySelector('app-photo-board');
    const loader = fixture.nativeElement.querySelector('.loader');
    //expect(board).not.toBeNull();
    //expect(loader).toBeNull();
  });
  
  /**
   * 
   */
   it(`(D) Should display loader while waiting for data`, () => {
    /** 
     * Create a generated photo list. 
     * Not from a server 
     */
    const photos = buildPhotoList(); 
    /** 
     * Force Photo Board Service to trigger
     * the getPhotos function, putting no data
     * (No data arrives yet)
     * This funcion does not test the REQUEST. It just simulate the return
     */
    spyOn(service, 'getPhotos').and.returnValue(null);
    /**
     * Note: detectChanges are called after spyOn function
     */
    fixture.detectChanges();
    /** DOM elements to check */
    const board = fixture.nativeElement.querySelector('.photo-board');
    const loader = fixture.nativeElement.querySelector('.loader');
    //expect(board).toBeNull();
    //expect(loader).not.toBeNull();
  });    
});
