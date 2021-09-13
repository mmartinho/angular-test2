import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { PhotoBoardService } from './photo-board.service';

const mockData = {
  api: 'http://localhost:3000/photos',
  data: [
    { 
      id: 1,
      description: 'example 1',
      src: ''
    },
    { 
      id: 2,
      description: 'example 2',
      src: ''
    }
  ]
};

describe(`${PhotoBoardService.name}`, () => {
  let service: PhotoBoardService;
  let httpController: HttpTestingController;
  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PhotoBoardService]
    });
    service = TestBed.inject(PhotoBoardService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it(`#${PhotoBoardService.prototype.getPhotos.name} 
    should return photos with description in uppercase`, done => {
      /**
       * Definie as expectativas após a requisição
       */
      service.getPhotos().subscribe(photos => {
        expect(photos[0].description).toBe('EXAMPLE 1');
        expect(photos[1].description).toBe('EXAMPLE 2');
        done();        
      });
      /** 
       * Dispara a requisição.
       * Expera uma, e somente uma, requisição pelo endereço api.
       * Se a requisição for realizada, envia os dados mock  
       */
       httpController.expectOne(mockData.api).flush(mockData.data);      
  });
});