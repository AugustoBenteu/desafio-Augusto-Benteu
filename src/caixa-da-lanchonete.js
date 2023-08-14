class CaixaDaLanchonete {
  calcularValorDaCompra(metodoDePagamento, itens) {
    let resposta;

    if (itens.length == 0) {
      return "Não há itens no carrinho de compra!";
    }
    let valorPedido = 0.0;
    let itensPedido = [];

    itens.forEach((item) => {
      let itemSeparado = item.split(",");

      switch (itemSeparado[0]) {
        case "cafe":
          if (itemSeparado[1] == 0) {
            resposta = "Quantidade inválida!";
          } else {
            valorPedido += this.valorItem(3, itemSeparado[1]);
            itensPedido.push("cafe");
          }
          break;
        case "chantily":
          if (itemSeparado[1] == 0) {
            resposta = "Quantidade inválida!";
          }
          if (!itens.includes("cafe")) {
            resposta = "Item extra não pode ser pedido sem o principal";
          } else {
            valorPedido += this.valorItem(1.5, itemSeparado[1]);
          }
          break;
        case "suco":
          if (itemSeparado[1] == 0) {
            resposta = "Quantidade inválida!";
          }
          valorPedido += this.valorItem(6.2, itemSeparado[1]);
          break;
        case "sanduiche":
          if (itemSeparado[1] == 0) {
            resposta = "Quantidade inválida!";
          }
          valorPedido += this.valorItem(6.5, itemSeparado[1]);
          itensPedido.push("sanduiche");

          break;
        case "queijo":
          if (itemSeparado[1] == 0) {
            resposta = "Quantidade inválida!";
          }
          if (!itensPedido.includes("sanduiche")) {
            resposta = "Item extra não pode ser pedido sem o principal";
          } else {
            valorPedido += this.valorItem(2, itemSeparado[1]);
          }
          break;
        case "salgado":
          if (itemSeparado[1] == 0) {
            resposta = "Quantidade inválida!";
          }
          valorPedido += this.valorItem(7.25, itemSeparado[1]);

          break;
        case "combo1":
          if (itemSeparado[1] == 0) {
            resposta = "Quantidade inválida!";
          }
          valorPedido += this.valorItem(9.5, itemSeparado[1]);

          break;
        case "combo2":
          if (itemSeparado[1] == 0) {
            resposta = "Quantidade inválida!";
          }
          valorPedido += this.valorItem(7.5, itemSeparado[1]);

          break;
        default:
          resposta = "Item inválido!";
      }
    });

    if (typeof resposta !== "undefined") {
      return resposta;
    }

    valorPedido = this.recalculaValor(valorPedido, metodoDePagamento);

    if (valorPedido == -1) {
      return "Forma de pagamento inválida!";
    }

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

  valorItem(valor, qtd) {
    return valor * qtd;
  }

  validaQtd(qtd){
    if(qtd<=0){
      return "Quantidade inválida!"
    }
  }
}

export { CaixaDaLanchonete };
