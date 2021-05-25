import { createMarkups, countItemsLeft } from './util.js';

class View {
  constructor() {
    this.formElement = document.querySelector('form');
    this.inputElement = document.querySelector('input');
    this.listElement = document.querySelector('.todo-list');
    this.countElement = document.querySelector('.todo-count');

    this._tempItemTitle = '';
    this._initEditTitleListener();
  }

  _initEditTitleListener() {
    this.listElement.addEventListener('input', event => {
      if (event.target.className === 'todo-title') {
        this._tempItemTitle = event.target.innerText;
      }
    });
  }

  render(items) {
    while (this.listElement.firstChild) {
      this.listElement.removeChild(this.listElement.firstChild);
    }

    if (items.length === 0) {
      const p = document.createElement('p');
      p.textContent = 'You have completed all your tasks !';
      this.listElement.append(p);
      this.countElement.textContent = '';
    } else {
      const markups = createMarkups(items);
      markups.forEach((markup) => {
        this.listElement.insertAdjacentHTML('beforeend', markup);
      });
      this.countElement.textContent = `${countItemsLeft(items)} items left`;
    }
  }

  bindAdd(handler) {
    this.formElement.addEventListener('submit', (event) => {
      event.preventDefault();

      const itemTitle = this.inputElement.value;
      if (itemTitle) {
        handler(itemTitle);
        this.inputElement.value = '';
      }
    });
  }

  bindEdit(handler) {
    this.listElement.addEventListener('focusout', (event) => {
      if (this._tempItemTitle) {
        const id = parseInt(event.target.parentNode.parentNode.parentNode.id);
        handler(id, this._tempItemTitle);
        this._tempItemTitle = '';
      }
    });
  }

  bindDelete(handler) {
    this.listElement.addEventListener('click', (event) => {
      if (event.target.className === 'delete') {
        const id = parseInt(event.target.parentNode.parentNode.parentNode.parentNode.id);
        handler(id);
      }
    });
  }

  bindToggle(handler) {
    this.listElement.addEventListener('change', (event) => {
      if (event.target.type === 'checkbox') {
        const id = parseInt(event.target.parentNode.parentNode.parentNode.id);
        handler(id);
      }
    });
  }
}

export default View;
