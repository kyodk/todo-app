function htmlEscape(str) {
  if (!str) return;

  return str.replace(
    /[&<>"'`]/g,
    (match) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '`': '&#x60;'
      }[match])
  );
}

export function createMarkups(items) {
  const markups = [];
  items.forEach((item) => {
    const markup = `
      <li class="mb-3 ${item.completed ? 'is-done' : ''}" id="${item.id}">
        <div class="row align-items-center">
          <div class="col-2 col-md-1">
            <input type="checkbox" id="box-${item.id}" ${item.completed ? 'checked' : ''}>
            <label for="box-${item.id}"></label>
          </div>
          <div class="col-8 col-md-10">
            <span class="todo-title" contenteditable="true"> ${htmlEscape(item.title)}</span>
          </div>
          <div class="col-2 col-md-1 text-end">
            <button type="button">
              <span class="delete"></span>
            </button>
          </div>
        </div>
      </li>
    `;
    markups.push(markup);
  });

  return markups;
}

export function countItemsLeft(items) {
  let count = 0;
  items.forEach((item) => {
    if (!item.completed) count++;
  });

  return count;
}
