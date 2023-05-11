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

    // aqui estamos adicionando um ouvidor para o evento de sair da dropzone, e então ativando a função de remover o efeito visual de area "soltavel";
    dropZone.addEventListener("dragleave", () => {
      dropZone.classList.remove("kanban__dropzone--active");
    })

    // aqui estamos adicionando um ouvidor de eventos para o evento de soltar e então adicionando a função de prevenir o comportamento padrão e remover o efeito visual de area "soltavel";
    dropZone.addEventListener("drop", e => {
      e.preventDefault();
      dropZone.classList.remove("kanban__dropzone--active");

      // aqui estamos descobrindo em qual coluna o usuário está tentando soltar o card;
      const columnElement = dropZone.closest(".kanban__column");
      // aqui estamos pegando o id do conjunto de dados que definimos na linha 19 do arquivo (classe) da coluna;
      const columnId = Number(columnElement.dataset.id);
      console.log(columnElement, columnId);
    });

    return dropZone;
  }
}