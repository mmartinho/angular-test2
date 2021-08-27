import { ActionModule } from './action.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActionDirective } from './action.directive';
import { Component } from '@angular/core';

describe('ActionDirective', () => {
  let fixture: ComponentFixture<ActionDirectiveTestComponent>;
  let component: ActionDirectiveTestComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActionDirectiveTestComponent],
      imports: [ActionModule],
    }).compileComponents();
    fixture = TestBed.createComponent(ActionDirectiveTestComponent);
    component = fixture.componentInstance;
  });

  /**
   * pt: Verifica se a instância da diretiva é criada
   * en: Check if directive instance is created
   */
  it('Should create an instance', () => {
    const directive = new ActionDirective();
    expect(directive).toBeTruthy();
  });

  /**
   * pt: Verifica se a tecla ENTER pressionada é capturada como um evento na diretiva
   * en: Check if ENTER key pressed is dispatched as an Event in directive scope 
   */
  it(`(D) (@Output appAction) should emit event with payload when ENTER key is pressed`, () => {
    const divEl: HTMLElement = fixture.nativeElement.querySelector('.dummy-component');
    const event  = new KeyboardEvent('keyup', {key: 'Enter'});
    divEl.dispatchEvent(event);
    expect(component.hasEvent()).toBeTrue();
  });

  /**
   * pt: Verifica se o click do mouse é capturado como evento na diretiva
   * en: Check if mouse click is captured as a directive event
   */
  it(`(D) (@Output appAction) should emit event with payload when clicked`, () => {
    const divEl: HTMLElement = fixture.nativeElement.querySelector('.dummy-component');
    const event  = new Event('click');
    divEl.dispatchEvent(event);
    expect(component.hasEvent()).toBeTrue();    
  });  
});

/**
 * Componente "Fake" para servir de container
 * para o teste da diretiva que só funciona dentro do escopo
 * de um gabarito de um componente
 */
@Component({
  template: `<div class="dummy-component" (appAction)="actionHandler($event)"></div>`,
})
class ActionDirectiveTestComponent {
  private event: Event = null;

  public actionHandler(event: Event): void {
    this.event = event;
  }

  public hasEvent(): boolean {
    return !!this.event;
  }
}
