import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LikeWidgetComponent } from './like-widget.component';
import { LikeWidgetModule } from './like-widget.module';

describe(LikeWidgetComponent.name, () => {
  let fixture: ComponentFixture<LikeWidgetComponent> = null;
  let component: LikeWidgetComponent = null;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LikeWidgetModule]
    }).compileComponents();

    fixture = TestBed.createComponent(LikeWidgetComponent);
    component = fixture.componentInstance;
  });

  it('Should create component', () => {
    expect(component).toBeTruthy();
  });

  it('Should auto-generate ID during ngOnInit when (@Input id) is not assigned', () => {
    fixture.detectChanges();
    expect(component.id).toBeTruthy();
  });

  it('Should NOT auto-generate ID during ngOnInit when (@Input id) is assigned', () => {
    const someId = 'someId';
    component.id = someId;
    fixture.detectChanges();
    expect(component.id).toBe(someId);
  });

  it(`#${LikeWidgetComponent.prototype.like.name}
    should trigger (@Output liked) when called`, () => {
      spyOn(component.liked, 'emit');
      fixture.detectChanges();
      component.like();
      expect(component.liked.emit).toHaveBeenCalled();
  });

  /**
   * pt: Teste de integração com o DOM (D)
   * en: DOM integration test (D)   
   * pt: Verifica se o like mostra um número quando clicado
   * en: Check if like shows a number when like is clicked
   */
   it(`(D) Should display number of likes when clicked`, done => {
    component.liked.subscribe(()=>{
      component.likes++;
      fixture.detectChanges();
      const counterEl: HTMLElement = fixture.nativeElement.querySelector('.like-counter');
      expect(counterEl.textContent.trim()).toBe('1');
      done(); // finaliza o teste
    });
    const likeWidgetContainerEl: HTMLElement = fixture.nativeElement.querySelector('.like-widget-container');
    likeWidgetContainerEl.click(); // simula o evento do click do mouse
  });   

  /**
   * pt: Teste de integração com o DOM (D)
   * en: DOM integration test (D)   
   * pt: Verifica se o like mostra um número quando tecla enter é pressionada
   * en: Check if like shows a number when enter keys is pressed
   */
   it(`(D) Should display number of likes when ENTER key is pressed`, done => {
    component.liked.subscribe(()=>{
      component.likes++;
      fixture.detectChanges();
      const counterEl: HTMLElement = fixture.nativeElement.querySelector('.like-counter');
      expect(counterEl.textContent.trim()).toBe('1');
      done(); // finaliza o teste
    });
    const likeWidgetContainerEl: HTMLElement = fixture.nativeElement.querySelector('.like-widget-container');
    // qual é o evento? Tecla enter pressionada
    const event = new KeyboardEvent('keyup', {key:'Enter'});
    likeWidgetContainerEl.dispatchEvent(event); // simula o evento de tecla enter pressionada
  });   
});
