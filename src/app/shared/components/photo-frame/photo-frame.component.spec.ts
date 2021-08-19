import { PhotoFrameModule } from './photo-frame.module';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { PhotoFrameComponent } from './photo-frame.component';

describe(PhotoFrameComponent.name, () => {
  let component: PhotoFrameComponent;
  let fixture: ComponentFixture<PhotoFrameComponent>;

  /**
   * pt: Antes de cada it(): configura os módulo do componente
   * en: Before each it(): component module setup
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoFrameModule],
    }).compileComponents();
  });

  /**
   * pt: Antes de cada it(): define a fixture e o componente a ser testado 
   * en: Befone each it(): component and fixture setup
   */
  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // força atualização 
  });

  /**
   * pt: Verifica se o componente foi criado 
   * en: Check if component was created 
   */
  it('Should create component ', () => {
    expect(component).toBeTruthy();
  });

  /**
   * pt: Verifica se a função like aguarda o período de guarda de 500ms
   * en: Check if like function waits for 500ms guard period
   * OBS: Fake async zone
   */
  it(`#${PhotoFrameComponent.prototype.like.name} 
    should trigger (@Output liked) once when called
    multiple times within debounce time`, fakeAsync(() => {
    let times = 0;
    component.liked.subscribe(() => times++);
    component.like(); // primeira chamada
    component.like(); // segunda chamada
    tick(500);
    expect(times).toBe(1);
  }));

  /**
   * pt: Verifica se a função like é chamada duas vezes fora do período de guarda de 500ms
   * en: Check is like function is called two times outside guard period
   */
  it(`#${PhotoFrameComponent.prototype.like.name} 
    should trigger (@Output liked) two times when 
    called outside debounce time`, fakeAsync(() => {
    let times = 0;
    component.liked.subscribe(() => times++);
    component.like(); // primeira chamada
    tick(500);
    component.like(); // segunda chamada
    tick(500);
    expect(times).toBe(2);
  }));  

  /**
   * pt: Teste de integração com o DOM (D)
   * en: DOM integration test (D)
   * pt: Verifica se conteúdo html do componente é atualizado quando a propriedade like é incrementado
   * en: Check if component html content is updated when like property is incremented
   */
  it(`(D) Should display number of likes when (@Input likes) 
    is incremented`, fakeAsync(() => {
    component.likes++;
    /** 
     * Força a atualização do Angular 
     * (e consequentemente, do DOM)
     */
    fixture.detectChanges(); 
    /** 
     * Elemento do DOM 
     */
    const element: HTMLElement = fixture.nativeElement.querySelector('.like-counter');
    expect(element.textContent.trim()).toBe('1');  
  }));  

  /**
   * pt: Teste de integração com o DOM (D)
   * en: DOM integration test (D)   
   * pt: Verifica se a diretiva aria-label é atualizada quando o like é incrementado
   * en: Check if aria-label directive is updated when like is incremented
   */
  it(`(D) Should update aria-label when (@Input likes) is incremented`, fakeAsync(() => {
    component.likes++;
    fixture.detectChanges();
    const element: HTMLElement = fixture.nativeElement.querySelector('span');
    expect(element.getAttribute('aria-label')).toBe('1: people liked');
  })); 
  
  /**
   * pt: Teste de integração com o DOM (D)
   * en: DOM integration test (D)   
   * pt: Verifica se a diretiva aria-label possui 0 likes inicialmente
   * en: Check if aria-label directive starts with 0 likes
   */
  it(`(D) Should have aria-label with 0 (@input likes)`, fakeAsync(() => {
    const element: HTMLElement = fixture.nativeElement.querySelector('span');
    expect(element.getAttribute('aria-label')).toBe('0: people liked');    
  })); 
  
  /**
   * pt: Teste de integração com o DOM (D)
   * en: DOM integration test (D)   
   * pt: Verifica se é mostrada uma imagem e uma descrição quando as propriedades são vinculadas
   * en: Check if an image with source and description is displayed when properties are bound
   */
   it(`(D) Should display image with src and description when bound to properties`, fakeAsync(() => {
    const description = 'some desc';
    const src = 'http://somesite.com/img.jpg';
    component.src = src;
    component.description = description;
    fixture.detectChanges();
    const img: HTMLImageElement = fixture.nativeElement.querySelector('img');
    expect(img.getAttribute('src')).toBe(src);
    expect(img.getAttribute('alt')).toBe(description);
  }));  
});
