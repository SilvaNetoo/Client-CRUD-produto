import { Messages } from '../enums/messages.enum';

/**
 *  Constante que guarda mensagens de erros específicas para cada erro apresentado dentro
 * de um formGroup.
 */
export const FIELD_ERRORS = {
    required: Messages.FIELD_REQUIRED,
    invalidCnpj: Messages.invalidCnpj,
    invalidCpf: Messages.invalidCpf,
    email: Messages.email,
    minlength: Messages.minLength,
    maxlength: Messages.maxLength
};
