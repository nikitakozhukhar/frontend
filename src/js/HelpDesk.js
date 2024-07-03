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

    
    // this.formContainer = document.createElement('div');
    // this.ticketForm = new TicketForm()
    
    this.createAddButton();
    this.initForm();
    this.deleteTicket();
  }

  init() {
    console.log("Инициализация и рендеринг тикетов");
    this.ticketService.list(response => {
      this.ticketView.renderTickets(response);
      this.deleteTicket();
    })
    
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

  deleteTicket() {
    const ticketList = document.querySelector('.ticket-list');
    
      if (ticketList) {
        const deleteButtons = ticketList.querySelectorAll('.ticket-delete');
        deleteButtons.forEach(deleteButton => {
          deleteButton.addEventListener('click', (e) => {
            const id = e.target.closest('.ticket').id
            
            this.ticketService.delete(id, (e) => {
              e.target.closest('.ticket').remove();
              this.init(); 
            })
          })
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