class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.model.bindListChanged(this.onListChanged);

    this.view.bindAdd(this.handleAdd);
    this.view.bindEdit(this.handleEdit);
    this.view.bindDelete(this.handleDelete);
    this.view.bindToggle(this.handleToggle);

    this.onListChanged(this.model.items);
  }

  onListChanged = (items) => {
    this.view.render(items);
  };

  handleAdd = (itemTitle) => {
    this.model.addTodo(itemTitle);
  };

  handleEdit = (id, itemTitle) => {
    this.model.editTodo(id, itemTitle);
  };

  handleDelete = (id) => {
    this.model.deleteTodo(id);
  };

  handleToggle = (id) => {
    this.model.toggleTodo(id);
  };
}

export default Controller;
