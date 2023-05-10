// este arquivo vai conter o código para os componentes de armazenamento local;
// esta classe está sendo exportada, o que irá permitir que importemos ela posteriormente em outros arquivos js;
// esta classe irá conter diversos métodos estáticos ou funções para interagir com o armazenamento local;
export default class KanbanAPI {
  // este método será responsável por obter todos os cards dentro de uma lista específica;
  static getItems(columnId) {
    // cada um desses id's se referem ao id de uma das colunas da matriz retornada na função "read()";
    const column = read().find(column => column.id == columnId);

    // aqui estamos dizendo que se não for encontrada nenhuma coluna então retornamos um array vazio;
    // outra alternativa seria lançar um erro;
    if (!column) {
      return [];
    }

    // se estiver tudo bem (ou seja, encontrarmos a coluna) então... retornamos essa coluna, recuperando os cards que estão dentro dela;
    return column.items; 
  }

  // este método vai ser responsável por adicionar um novo card;
  // ao inserir um card, precisamos saber qual o id da lista e qual o conteúdo do card;
  static inserItem(columnId, content) {
    const data = read();
    // aqui estamos dizendo que a coluna vai ser igual a coluna com id igual ao que está sendo passado como parametro;
    const column = data.find(column => column.id == columnId);
    // aqui estamos declarando uma constante item, que se trata do card, que vai receber como propriedades um id e o conteúdo (content);
    const item = {
      id: Math.floor(Math.random() * 100000),
      content
    };

    // aqui estamos verificando se a coluna existe;
    if (!column) {
      throw new Error("Column does not exist.");
    }

    // esta coluna é uma referência a uma matriz dentro da constante data;
    column.items.push(item);
    save(data);

    return item;
  }

  // este será o método responsável por atualizar o conteúdo dos cards;
  static updateItem(itemId, newProps) {
    // aqui estamos definindo a constante data (dados) como o retorno da função read;
    const data = read();
    // aqui estamos aplicando a desestruturação para puxar o id do item e a sua coluna atual;
    const [item, currentColumn] = (() => {
      for (const column of data) {
        // aqui estamos puxando o id do item que está sendo de alguma forma atualizado;
        const item = column.items.find(item => item.id == itemId);

        // caso um item seja encontrado, estamos apenas retornando seu id e sua coluna;
        if (item) {
          return [item, column];
        }
      }
    })();

    // se nenhum item for encontrado retornamos um erro;
    if (!item) {
      throw new Error("Item not found.");
    }

    // aqui estamos dizendo que o conteúdo do item é igual ao novo conteúdo do item, e que se o novo conteúdo do item for undefined retornamos o atual conteúdo do item
    item.content = newProps.content === undefined ? item.content : newProps.content;

    // aqui estamos dizendo que se a nova coluna ou posição do item for diferente de undefined, ou seja, estiver em uma coluna ou posição que exista, então...
    if (
      newProps.columnId !== undefined
      && newProps.position !== undefined
    ) {
      const targetColumn = data.find(column => column.id == newProps.columnId);
      
      // aqui estamos verificando se a coluna de destino existe;
      if (!targetColumn) {
        throw new Error("Target column not found.");
      }
      
      // aqui estamos removendo o card da sua coluna de origem;
      currentColumn.items.splice(currentColumn.items.indexOf(item), 1);

      // aqui estamos inserindo um card em uma nova lista;
      targetColumn.items.splice(newProps.position, 0, item);
    }

    save(data);
  }
}

function read() {
  const json = localStorage.getItem("kanban-data");

  // isto aqui vai rodar quando o usuário estiver carregando o quadro kanban pela pela primeira vez;
  if (!json) {
    return [
      {
        id: 1,
        items: []
      },
      {
        id: 2,
        items: []
      },
      {
        id: 3,
        items: []
      },
    ]
  }

  // já isto aqui vai rodar quando o usuário estiver retornando para a sessão deles;
  return JSON.parse(json);
}

// esta função vai receber novos dados;
// estes dados são básicamente o que a função "read()" retorna;
function save(data) {
  localStorage.setItem("kanban-data", JSON.stringify(data));
}