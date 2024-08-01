/**
 *  Класс для создания формы создания нового тикета
 * */
export default class TicketForm {
  constructor() {
    // this.submitCallabck = submitCallabck;
    this.form = this.createForm();
  }

  createForm() {
    const form = document.createElement('form');
    form.classList.add('form');

    form.innerHTML = `
      <h2 class="form__title">Добавить тикет</h2>
      <label for="name">Краткое описание</label>
      <input type="text" name="name" class="form__ticket_name" />
  
      <label for="description">Подробное описание</label>
      <textarea type="text" name="description" class="form__ticket_description"></textarea>

      <div class="btn-container">
        <button type="button" class="btn form__buttonCancel" id="closeFormBtn">Отмена</button>
        <button type="submit" class="btn form__buttonSend">ОК</button>
      </div>
    `;

    form.addEventListener('submit', e => {
      e.preventDefault();
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      this.onSubmit(data)
    })

    return form;
  }

  render(container) {
    container.appendChild(this.form)
  }

  submitCallabck(callback) {
    this.onSubmit = callback;
  }

  setFormData(ticket) {
    const nameInput = document.querySelector('.form__ticket_name');
    const descriptionInput = document.querySelector('.form__ticket_description');

    if (nameInput && descriptionInput) {
      nameInput.value = ticket.name;
      descriptionInput.value = ticket.description;
    } else {
      console.error('Inputs not found')
    }

  }

  clearForm() {
    this.form.reset();
  }
}

