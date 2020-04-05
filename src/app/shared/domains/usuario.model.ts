import { Carrinho } from './carrinho.models';

export class Usuario {
    id?: string;
    email: string;
    senha: string;
    carrinho: Carrinho;
}