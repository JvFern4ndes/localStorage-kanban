import Column from "./Column.js";

// esta classe exportada será responsável por renderizar o kanban na interface, básicamente;
export default class Kanban {
  
  // este construtor está fazendo referência à div kanban do html;
  constructor(root) {
    // aqui estamos mantendo a referência;
    this.root = root;

    // aqui estamos dizendo que para cada coluna, será criada uma instancia de coluna;
    Kanban.columns().forEach(column => {
      const columnView = new Column(column.id, column.title);

      this.root.appendChild(columnView.elements.root);
    });
  }

  // aqui estamos definindo um método estatico chamado colunas, que será responsável por renderizar as listas na interface (irá retornar uma matriz para cada coluna);
  static columns() {
    return [
      {
        id: 1,
        title: "Candidaturas"
      },
      {
        id: 2,
        title: "Teste Online / Dinâmica"
      },
      {
        id: 3,
        title: "Entrevista"
      },
      {
        id: 4,
        title: "Aguardando"
      },
    ];
  }
}