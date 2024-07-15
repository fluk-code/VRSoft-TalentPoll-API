export class ProdutoDTO {
  id!: number;
  descricao!: string;
  custo?: string;
  imagem?: string;
  precos?: ProdutoLojaDTO[];
}

export class ProdutoLojaDTO {
  idProduto!: number;
  idLoja!: number;
  precoVenda?: string;
}
