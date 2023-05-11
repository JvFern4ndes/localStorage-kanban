// esta classe vai representar uma zona de soltar singular;

import KanbanAPI from "../api/KanbanAPI.js";

// estamos criando e exportando a classe padrão;
export default class DropZone {
  // agora estamos criando um método estático;
  // este método será responsável por gerar o html de uma coluna particular;
  static createDropZone() {
    const range = document.createRange();

    range.selectNode(document.body);

    const dropZone = range.createContextualFragment(`
      <div class="kanban__dropzone"></div>
    `).children[0];

    // aqui nós iremos implementar a função de retorno visual ao arrastarmos o card até uma dropzona, de forma que indique ao usuário que é uma zona de soltar;
    // para isso estamos ouvindo o evento dragover, e com isso, disparando a função de adicionar a classe com a estilização adequada (".kanban__dropzone--active");
    dropZone.addEventListener("dragover", e => {
      e.preventDefault();
      dropZone.classList.add("kanban__dropzone--active");
    });

    // aqui estamos adicionando um ouvidor para o evento de sair da dropzone, e então ativando a função de remover o efeito visual de area "soltavel";
    dropZone.addEventListener("dragleave", () => {
      dropZone.classList.remove("kanban__dropzone--active");
    })

    // aqui estamos adicionando um ouvidor de eventos para o evento de soltar e então adicionando a função de prevenir o comportamento padrão e remover o efeito visual de area "soltavel";
    dropZone.addEventListener("drop", e => {
      e.preventDefault();
      dropZone.classList.remove("kanban__dropzone--active");

      // aqui estamos descobrindo em qual coluna o usuário está tentando soltar o card;
      const columnElement = dropZone.closest("31874.kanban__column");
      // aqui estamos pegando o id do conjunto de dados que definimos na linha 19 do arquivo (classe) da coluna;
      const columnId = Number(columnElement.dataset.id);
      // aqui estamos pegando um array contendo os itens dentro da coluna onde o card foi solto;
      const dropZonesInColumn = Array.from(columnElement.querySelectorAll(".kanban__dropzone"));
      // aqui estamos definindo a posição onde o card foi solto;
      const droppedIndex = dropZonesInColumn.indexOf(dropZone);
      // aqui estamos definindo qual item estamos arrastando e soltando;
      const itemId = Number(e.dataTransfer.getData("text/plain"));
      // aqui estamos definindo o "elemento de item real";
      const droppedItemElement = document.querySelector(`[data-id="${itemId}"]`);
      // aqui nós estamos verificando se a dropzone faz parte de um card;
      const insertAfter = dropZone.parentElement.classList.contains("kanban__item") ? dropZone.parentElement : dropZone;

      // aqui estamos dizendo que se o card for arrastado para a sua própria coluna, nós não queremos que atualize a API nem faça nada, para isso damos um return;
      if (droppedItemElement.contains(dropZone)) {
        return;
      }

      // aqui estamos chamando o método after para a constante insertAfter e inserindo nela o card droppado;
      insertAfter.after(droppedItemElement);

      // aqui estamos chamando o método de atualizar da API, e passando como parametro o itemId que acabamos de definir bem como um objeto contendo o id da coluna, a posição onde o card foi solto;
      KanbanAPI.updateItem(itemId, {
        columnId,
        position: droppedIndex
      });
    });

    return dropZone;
  }
}