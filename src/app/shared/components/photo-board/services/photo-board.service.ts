import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';

import { Photo } from '../interfaces/photo';

@Injectable({
  providedIn: 'root'
})
export class PhotoBoardService {

  constructor(private http: HttpClient) { }

  /** */
  public getPhotos(): Observable<Photo[]> {
    return this.http.get<Photo[]>(`http://localhost:3000/photos`)
      /** Remap all photos */
      .pipe(map(photos => {
        /** Remap a photo to upper-case its description */
        return photos.map( photo => { 
          return {...photo, description: photo.description.toUpperCase()}
        });
      }))
      /** Console log photos */
      //.pipe(tap(photos => console.log(photos)))
      /** Wait 2s */
      .pipe(delay(2000));
  }
}
