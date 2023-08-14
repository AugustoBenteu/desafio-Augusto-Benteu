const cardapio = {
  cafe: { preco: 3 },
  chantily: { preco: 1.5, dependeDe: "cafe" },
  suco: { preco: 6.2 },
  sanduiche: { preco: 6.5 },
  queijo: { preco: 2, dependeDe: "sanduiche" },
  salgado: { preco: 7.25 },
  combo1: { preco: 9.5 },
  combo2: { preco: 7.5 },
};

const multiplicadorMetodoDePagamento = {
  dinheiro: 0.95,
  debito: 1,
  credito: 1.03,
};

class CaixaDaLanchonete {
  calcularValorDaCompra(metodoDePagamento, itens) {
    let resposta;

    if (itens.length == 0) return "Não há itens no carrinho de compra!";

    let valorPedido = 0.0;
    let itensPedido = [];

    itens.forEach((item) => {
      let [nome, qtd] = item.split(",");

      if (qtd == "0") {
        resposta = "Quantidade inválida!";
        return false;
      }

      const produto = cardapio[nome];

      if (!produto) {
        resposta = "Item inválido!";
        return false;
      }

      if (produto.dependeDe && !itensPedido.includes(produto.dependeDe)) {
        resposta = "Item extra não pode ser pedido sem o principal";
        return false;
      }

      itensPedido.push(nome);
      valorPedido += produto.preco * qtd;
    });

    if (typeof resposta !== "undefined") return resposta;

    valorPedido = this.recalculaValor(valorPedido, metodoDePagamento);

    if (valorPedido == -1) return "Forma de pagamento inválida!";

    resposta = this.formataResposta(valorPedido);

    return resposta;
  }

  recalculaValor(valor, metodoDePagamento) {
    switch (metodoDePagamento) {
      case "dinheiro":
        valor = valor * 0.95;
        break;
      case "debito":
        break;
      case "credito":
        valor = valor * 1.03;
        break;
      default:
        valor = -1;
    }
    return valor;
  }

  formataResposta(valor) {
    valor = Math.round(valor * 10000) / 10000;
    valor = valor.toFixed(2);
    let resposta = "R$ " + valor;
    return resposta.replace(/\./g, ",");
  }
}

export { CaixaDaLanchonete };
