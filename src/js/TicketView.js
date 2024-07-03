import Ticket from './Ticket';
/**
 *  Класс для отображения тикетов на странице.
 *  Он содержит методы для генерации разметки тикета.
 * 
 * 
 * */
export default class TicketView {
  constructor(container) {
    this.container = container;
  }

  createTicket(ticketData) {
    const ticket = new Ticket(ticketData);
    const ticketElement = document.createElement('div');
    ticketElement.className = 'ticket';

    if (ticket.status === false) {
      ticket.status = ''
    }
    if (ticket.status === true) {
      ticket.status = 'v' // позже заменить на картинку ('галочка' выполнено) 
    }
  
    if(ticket.created) {
      const dateInMs = ticket.created;
      const date = new Date(dateInMs).getDate();
      const month = new Date(dateInMs).getMonth() + 1;
      const year = new Date(dateInMs).getFullYear();
      const hours = new Date(dateInMs).getHours();
      const seconds = new Date(dateInMs).getSeconds();
  
      ticket.created = `${date}.${month}.${year} ${hours}:${seconds}`
    }

    ticketElement.setAttribute('id', `${ticket.id}`)

    ticketElement.innerHTML = `
      <div class="ticket-satatus">${ticket.status}</div>
      <span class="ticket-name">${ticket.name}</span>
      <div class="ticket-created">${ticket.created}</div>
      <button class="ticket-update">${this.renderUpdateItem()}</button>
      <button class="ticket-delete">${this.renderCloseItem()}</button>
      <div class="ticket-description">${ticket.description}</div>
    `
    return ticketElement
  }

  renderTickets(tickets) {
    console.log("рендеринг тикетов");

    let ticketList = this.container.querySelector('.ticket-list');

    this.container.innerHTML = '';

    if (!ticketList) {
      ticketList = document.createElement('div');
      ticketList.className = 'ticket-list';
      this.container.appendChild(ticketList);
    }

    tickets.forEach(ticketData => {
      
      const ticketElement = this.createTicket(ticketData);
      ticketList.appendChild(ticketElement);
    })
  }
  
  renderUpdateItem() {
    return `<svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 25 25"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-pencil update"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" /><path d="M13.5 6.5l4 4" /></svg>`;
  }

  renderCloseItem() {
    return `<svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 25 25"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>`;
  }
}