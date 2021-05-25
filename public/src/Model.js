class Model {
  constructor() {
    this.items = localStorage.getItem('items')
      ? JSON.parse(localStorage.getItem('items'))
      : [];
  }

  bindListChanged(callback) {
    this.onListChanged = callback;
  }

  _saveStorage(items) {
    localStorage.setItem('items', JSON.stringify(items));
  }

  addTodo(itemTitle) {
    const item = {
      id: this.items.length > 0 ? this.items[this.items.length - 1].id + 1 : 1,
      title: itemTitle,
      completed: false
    };

    this.items.push(item);
    this.onListChanged(this.items);
    this._saveStorage(this.items);
  }

  editTodo(id, updatedText) {
    this.items = this.items.map((item) =>
      item.id === id
        ? { id: item.id, title: updatedText, completed: item.completed }
        : item
    );
    this.onListChanged(this.items);
    this._saveStorage(this.items);
  }

  deleteTodo(id) {
    this.items = this.items.filter((item) => item.id !== id);
    this.onListChanged(this.items);
    this._saveStorage(this.items);
  }

  toggleTodo(id) {
    this.items = this.items.map((item) =>
      item.id === id
        ? { id: item.id, title: item.title, completed: !item.completed }
        : item
    );
    this.onListChanged(this.items);
    this._saveStorage(this.items);
  }
}

export default Model;
