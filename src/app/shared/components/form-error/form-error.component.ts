import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { CONSTANTS } from '../../constantes/constantes';
import { FIELD_ERRORS } from '../../constantes/form-field-errors';

@Component({
  selector: 'app-form-error',
  templateUrl: './form-error.component.html',
  styleUrls: ['./form-error.component.css']
})
export class FormErrorComponent implements OnInit, OnChanges {

  @Input() control: AbstractControl;
  @Input() parentForm: FormGroup;
  @Input() inputFieldId: string;
  @Input() presentError: boolean;
  errorMessage: string;
  private eventsArray: Array<string> = ['focusout', 'keyup'];

  constructor() { }

  ngOnInit(): void {
    this.checkForErrorsOnFieldChange();
    this.attachEventListeners();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.presentError && changes.presentError.currentValue) {
      this.searchForErrors();
    }
  }

  /**
   *  @description  Checa se o campo do formulário recebido está inválido a cada interação do usuário
   * com esse campo.
   */
  private checkForErrorsOnFieldChange(): void {
    this.control.valueChanges.subscribe(() => {
      setTimeout(() => {
        this.searchForErrors();
      }, CONSTANTS.crossFieldValidatorTimeout);
    });
  }

  /**
   *  @description  Muda a cor do campo de input que carrega o campo dor formulário recebido, baseando-se no fato
   * do campo ser inválido ou não.
   */
  private changeInputFieldBorder(): void {
    const inputField: HTMLElement = document.getElementById(this.inputFieldId);
    if (inputField) {

      if (this.control.errors) {
        inputField.style.borderBottomColor = CONSTANTS.invalidFieldBorder;
      } else {
        inputField.style.borderBottomColor = CONSTANTS.validFieldBorderColor;
        this.errorMessage = null;
      }
    }
  }

  /**
   *  @description  Checa se o campo recebido do formulário e questão possui algum erro e, se ele tiver,
   * apresenta a mensagem de erro apropriada para ele, além de mudar a cor da borda do campo
   * de input que carrega esse campo.
   */
  private searchForErrors(): void {
    if (this.parentForm) {
      if (!this.control.errors && this.parentForm.errors) {
        this.errorMessage = FIELD_ERRORS[Object.keys(this.parentForm.errors)[CONSTANTS.originValue]]
      } else if (this.control.errors) {
        this.errorMessage = FIELD_ERRORS[Object.keys(this.control.errors)[CONSTANTS.originValue]]
      } else {
        this.errorMessage = null;
      }
    } else {
      if (this.control && this.control.errors) {
        this.errorMessage = (this.control.errors) ? FIELD_ERRORS[Object.keys(this.control.errors)[CONSTANTS.originValue]] : null;
        if (Object.keys(this.control.errors)[CONSTANTS.originValue] === CONSTANTS.minLength) {
          this.errorMessage = this.errorMessage.replace(CONSTANTS.length, this.control.errors[CONSTANTS.minLength].requiredLength);
        } else if (Object.keys(this.control.errors)[CONSTANTS.originValue] === CONSTANTS.maxLength) {
          this.errorMessage = this.errorMessage.replace(CONSTANTS.length, this.control.errors[CONSTANTS.maxLength].requiredLength);
        }
      }
    }
    this.changeInputFieldBorder();
  }

  /**
   *  @description  Adiciona eventListeners para o campo de input com o formulário de erro recebido pelo componente,
   * checando primeiro se o id desse campo foi passado para que ele possa ser encontrado.
   */
  private attachEventListeners(): void {
    if (this.inputFieldId) {
      this.eventsArray.forEach(event => {
        document.getElementById(this.inputFieldId).addEventListener(event, () => this.searchForErrors());
      });
    }
  }

}
