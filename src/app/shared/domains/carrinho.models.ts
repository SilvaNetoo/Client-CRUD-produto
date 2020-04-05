import { Produto } from 'src/app/modules/usuario/produtos/models/produto';

export class Carrinho {
    id: number;
    produtos: Array<Produto>;
}