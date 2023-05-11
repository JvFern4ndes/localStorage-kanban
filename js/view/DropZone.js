// esta classe vai representar uma zona de soltar singular;
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

    return dropZone;
  }
}