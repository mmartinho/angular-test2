import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-photo-frame',
  templateUrl: './photo-frame.component.html',
  styleUrls: ['./photo-frame.component.scss'],
})
export class PhotoFrameComponent implements OnInit, OnDestroy {
  @Output() liked: EventEmitter<void> = new EventEmitter();
  @Input() description = '';
  @Input() src = '';
  @Input() likes: number = 0;

  private debounceSubject: Subject<void> = new Subject();
  private unsubscribeSubject: Subject<void> = new Subject();

  constructor() {}

  ngOnDestroy(): void {
    this.unsubscribeSubject.next();
    this.unsubscribeSubject.complete();  
  }

  ngOnInit(): void {
    /** 
     * Aguarda meio segundo para emitir o liked 
     */
    this.debounceSubject
      .asObservable()
      .pipe(debounceTime(500))
      .pipe(takeUntil(this.unsubscribeSubject)) // até que o componente seja destruído
      .subscribe(
        () => { 
          this.liked.emit(); 
        }
      );
  }

  /**
   *
   */
  public like(): void {
    this.debounceSubject.next();
  }
}
