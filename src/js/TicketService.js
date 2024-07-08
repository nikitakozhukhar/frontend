import createRequest from "./api/createRequest"
/**
 *  Класс для связи с сервером.
 *  Содержит методы для отправки запросов на сервер и получения ответов
 * */
export default class TicketService {
 
  list(callback) {
    createRequest({
      method: 'GET',
      url: 'http://localhost:7070/?method=allTickets',
      headers: { 'Content-Type': 'application/json' },
      callback,
    })
  }

  get(id, callback) {
    createRequest({
      method: 'GET',
      url: `http://localhost:7070/?method=ticketById&id=${id}`,
      callback,
    })
  }

  create(data, callback) {
    createRequest({
      method: 'POST',
      url: 'http://localhost:7070/?method=createTicket',
      data,
      callback,
    })
  }

  update(id, data, callback) {
    createRequest({
      method: 'POST',
      url: `http://localhost:7070/?method=updateById&id=${id}`,
      data,
      callback,
    })
  }

  delete(id, callback) {
    createRequest({
      method: 'GET',
      url: `http://localhost:7070/?method=deleteById&id=${id}`,
      callback,
      noResponse: true,
    })
  }
}
