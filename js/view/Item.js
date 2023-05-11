// aqui estamos exportando a classe padrão do Item;
export default class Item {
  // o construtor vai passar pelo id e pelo content do item;
  constructor(id, content) {
    // aqui estamos definindo this.elements como um objeto vazio;
    this.elements = {};
    // aqui estamos definindo que a raiz do elements é o método createRoot;
    this.elements.root = Item.createRoot();
    this.elements.input = this.elements.root.querySelector(".kanban__item-input");

    // aqui estamos definindo o id de cada card;
    this.elements.root.dataset.id = id;
    this.elements.input.textContent = content;

    // aqui estamos definindo uma referencia para o content, que será usada para situações de atualizações do content;
    this.content = content;
  }

  // esta aqui é a raiz para a criação de um novo item específico;
  static createRoot() {
    const range = document.createRange();

    range.selectNode(document.body);

    return range.createContextualFragment(`
      <div class="kanban__item" draggable="true">
        <div class="kanban__item-input" contenteditable></div>
      </div>
    `).children[0];
  }
}