import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { Photo } from './interfaces/photo';

@Component({
  selector: 'app-photo-board',
  templateUrl: './photo-board.component.html',
  styleUrls: ['./photo-board.component.scss']
})
export class PhotoBoardComponent implements OnInit, OnChanges {
  /**
   * Input photo array
   */
  @Input() public photos: Photo[];

  /**
   * Photo array as rows
   * @see ngOnChanges()
   */
  public rows: any

  constructor() {}

  /** */
  ngOnInit(): void {}

  /**
   * Trigged when any input property changes
   * @param changes 
   */
  ngOnChanges(changes: SimpleChanges): void {
    if(changes.photos) {
      this.rows = this.groupColumns(changes.photos.currentValue);
    }
  }

  /**
   * Rebuild the photo array to match each line with 4 columns 
   * @param photos 
   */
  private groupColumns(photos: Photo[]) : any[][] {
    const newRows = [];
    const step = 4;
    for(let index = 0; index < photos.length; index += step) {
      newRows.push(photos.slice(index, index + step));
    }
    return newRows;
  }
}
