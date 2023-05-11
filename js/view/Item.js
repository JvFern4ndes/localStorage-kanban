import KanbanAPI from "../api/KanbanAPI.js";
import DropZone from "./DropZone.js";

// aqui estamos exportando a classe padrão do Item;
export default class Item {
  // o construtor vai passar pelo id e pelo content do item;
  constructor(id, content) {
    // aqui estamos criando uma constante, e atribuindo a ela uma instancia da dropzone com o metodo de criação da dropzone;
    const bottomDropZone = DropZone.createDropZone();
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

    // aqui estamos definindo o elemento que será criado na dropzone;
    this.elements.root.appendChild(bottomDropZone);

    // aqui estamos implementando a função responsável por editar um card;
    const onBlur = () => {
      const newContent = this.elements.input.textContent.trim();

      // aqui estamos dizendo que se o novo conteúdo for igual ao atual, para não fazer nada, apenas retornar;
      if (newContent == this.content) {
        return;
      }

      // caso contrário, atualizamos o conteúdo;
      this.content = newContent;
      // chamando o método update da API, e passando para ele o id do construtor e o objeto do novo conteúdo;
      KanbanAPI.updateItem(id, {
        content: this.content
      })
    };

    // aqui estamos adicionando um ouvidor de eventos, onde o evento a ser ouvido é o desfoque, e a função a ser chamada a onBlur();
    this.elements.input.addEventListener("blur", onBlur);
    // aqui definiremos este ponto de elemento raiz para ouvir o evento de duplo clique;
    // o duplo clique vai disparar a função de exclusão do card;
    this.elements.root.addEventListener("dblclick", () => {
      // primeiro a função vai se certificar de que o usuário realmente deseja excluir o item;
      const check = confirm("Você tem certeza de que deseja excluir esta candidatura?");

      // caso o usuário confirme, então chamamos da API o método de excluir; 
      if (check) {
        KanbanAPI.deleteItem(id);

        this.elements.input.removeEventListener("blur", onBlur);
        // aqui estamos básicamente fazendo uma referência ao elemento pai, que é a própria coluna (lista), então estamos dizendo que vamos remover o elemento filho dele, ou seja, o card;
        this.elements.root.parentElement.removeChild(this.elements.root);
      }
    });

    // AQUI INICIAMOS O PROCESSO DE IMPLEMENTAÇÃO DO DRAG AND DROP;
    // para isso, adicionamos um ouvidor de eventos para a raiz do card;
    this.elements.root.addEventListener("dragstart", e => {
      // aqui estamos definindo algumas informações sobre o componente;
      // basicamente é dessa forma que podemos nos comunicar entre dois elementos html conforme eles são arrastados e soltos;
      // aparentemente tudo o que colocamos como segundo argumento aqui, será passado para o dropzone ao soltarmos o card;
      e.dataTransfer.setData("text/plain", id);
    });

    // para evitar que o comportamento do último comentário aconteça, faremos o seguinte;
    this.elements.input.addEventListener("drop", e => {
      e.preventDefault();
    });
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