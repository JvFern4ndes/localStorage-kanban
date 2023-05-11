import KanbanAPI from "../api/KanbanAPI.js";

// esta classe se refere a uma única coluna;
export default class Column {

  // aqui estamos pegando o id e o titulo da coluna;
  constructor(id, title) {
    // aqui estamos dizendo que this.elements é igual à um objeto vázio;
    this.elements = {}
    // daqui em diante estamos armazenando cada elemento html que nos interessa dentro desse objeto;
    this.elements.root = Column.createRoot();
    // aqui estamos chamando o seletor na própria raiz, ou seja, apenas para a coluna local e não para todo o documento;
    this.elements.title = this.elements.root.querySelector(".kanban__column-title");
    this.elements.items = this.elements.root.querySelector(".kanban__column-items");
    this.elements.addItem = this.elements.root.querySelector(".kanban__add-item");

    // aqui nós identificamos a coluna pelo id;
    this.elements.root.dataset.id = id;
    this.elements.title.textContent = title;

    // agora adicionamos cada item que aparece dentro da coluna através de um ouvidor de eventos de click;
    this.elements.addItem.addEventListener("click", () => {

    });

    // aqui estamos chamando o método getItems da API;
    KanbanAPI.getItems(id).forEach(item => {
      console.log(item);
    });
  }

  // este método será responsável por gerar o html de uma coluna particular;
  static createRoot() {
    // de acordo com o tutorial aqui, todo esse "intervalo" é apenas uma técnica parar gerar html usando javascript;
    const range = document.createRange();

    range.selectNode(document.body);

    return range.createContextualFragment(`
      <div class="kanban__column">
        <div class="kanban__column-title"></div>
        <div class="kanban__column-items"></div>
        <button class="kanban__add-item" type="button">+ Adicionar</button>
      </div>
    `).children[0];
  }
}