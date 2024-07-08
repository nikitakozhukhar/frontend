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
    
    this.deleteTicket = this.deleteTicket.bind(this);
    this.getDescription = this.getDescription.bind(this);

    this.createAddButton();
    this.initForm();
  }

  init() {
    
    console.log("Инициализация и рендеринг тикетов");
    this.ticketService.list(response => {
      this.ticketView.renderTickets(response);
    })
    this.addEventListeners();
  }

  addEventListeners() {
    this.container.addEventListener('click', this.deleteTicket);
    this.container.addEventListener('click', this.getDescription);
  }

  createAddButton() {
    const button = document.createElement('button');
    button.textContent = 'Добавить тикет';
    button.className = 'add-ticket-button';

    button.addEventListener('click', () => this.showForm());

    this.container.insertAdjacentElement('beforebegin', button);

    return button;
  }

  initForm() {
    const ticketForm = new TicketForm((data) => {
      this.ticketService.create(data, (response) => {

        this.ticketView.renderTickets([response])
        this.init();
        this.hideForm();
      });

    });

    this.formContainer = document.createElement('div');
    this.container.insertAdjacentElement('beforebegin', this.formContainer);

    this.formContainer.style.display = 'none';

    ticketForm.render(this.formContainer);

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
    const description = document.querySelector('.ticket-description')
    
    if (ticketName) {
      this.ticketService.get(id, (response) => {
        if (response.description) {
          description.classList.toggle('show-description')
        }
      })
    }
  }


  showForm() {
    this.formContainer.style.display = 'block';
  }

  hideForm() {
    this.formContainer.style.display = 'none';
  }




}