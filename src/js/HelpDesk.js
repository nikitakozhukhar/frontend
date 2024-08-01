import TicketForm from "./TicketForm";
import TicketService from "./TicketService";
import TicketView from "./TicketView";
/**
 *  Основной класс приложения
 * */
export default class HelpDesk {
  constructor(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error("This is not HTML element!");
    }

    this.container = container;
    this.ticketService = new TicketService();
    this.ticketView = new TicketView(this.container);
    this.ticketForm = new TicketForm();

    this.deleteTicket = this.deleteTicket.bind(this);
    this.getDescription = this.getDescription.bind(this);
    this.updateTicket = this.updateTicket.bind(this);
    this.toggleStatus = this.toggleStatus.bind(this);

    this.createAddButton();
    this.initForm();
  }

  init() {

    this.ticketService.list(response => {
      this.ticketView.renderTickets(response);
    })
    this.addEventListeners();
  }

  addEventListeners() {
    this.container.addEventListener('click', this.deleteTicket);
    this.container.addEventListener('click', this.getDescription);
    this.container.addEventListener('click', this.updateTicket);
    this.container.addEventListener('click', this.toggleStatus)
  }

  createAddButton() {
    const button = document.createElement('button');
    button.textContent = 'Добавить тикет';
    button.className = 'add-ticket-button';

    button.addEventListener('click', () => {
      if (button) {
        this.ticketForm.clearForm();
        this.showForm()
      }

    });

    this.container.insertAdjacentElement('beforebegin', button);

    return button;
  }

  initForm() {
    this.ticketForm.submitCallabck((data) => {
      this.ticketService.create(data, (response) => {

        this.ticketView.renderTickets([response])
        this.init();
        this.hideForm();
      });

    });

    this.formContainer = document.createElement('div');
    this.container.insertAdjacentElement('beforebegin', this.formContainer);

    this.formContainer.style.display = 'none';

    this.ticketForm.render(this.formContainer);

    const closeButton = document.querySelector('.form__buttonCancel');
    closeButton.addEventListener('click', () => {
      this.hideForm();
    })
  }


  deleteTicket(event) {
    const ticket = event.target.closest('.ticket');
    const id = ticket.id;
    const deleteButton = event.target.closest('.ticket-delete');

    if (deleteButton) {
      this.ticketService.delete(id, () => {
        ticket.remove();
        this.init();
        location.reload()
      })
    }
  }

  getDescription(event) {
    const ticket = event.target.closest('.ticket');
    const id = ticket.id;
    const ticketName = event.target.classList.contains('ticket-name');

    if (ticketName) {
      this.ticketService.get(id, (response) => {
        if (response.description) {
          const description = ticket.querySelector('.ticket-description')
          if (description) {
            description.textContent = response.description;
            description.classList.toggle('show-description')
          }
        }
      })
    }
  }

  updateTicket(event) {
    const ticket = event.target.closest('.ticket');
    const id = ticket.id;
    const updateButton = event.target.closest('.ticket-update');

    if (updateButton) {
      // Получение текущих данных тикета
      this.ticketService.get(id, response => {

        // Создание формы с текущими данными
        this.ticketForm.setFormData(response);


        this.ticketForm.submitCallabck((updatedData) => {

          // Обновление тикета на сервере
          this.ticketService.update(id, updatedData, (updateResponse) => {

            // Обновление отображения тикета
            ticket.querySelector('.ticket-name').textContent = updatedData.name;
            ticket.querySelector('.ticket-description').textContent = updatedData.description;

            // Скрытие формы после обновления
            this.hideForm();
          });
        });

        // Установка данных в форму и отображение формы
        this.showForm();
      });
    }
  }

  toggleStatus(event) {
    const status = event.target.closest('.ticket-status');
    if (!status) return;

    const ticket = status.closest('.ticket');
    if (!ticket) return;

    status.classList.toggle('completed');

    if (status.classList.contains('completed')) {
      status.innerHTML = '&#x2713';
    } else {
      status.innerHTML = ''
    }
  }

  showForm() {
    this.formContainer.style.display = 'block';
  }

  hideForm() {
    this.formContainer.style.display = 'none';
  }
}