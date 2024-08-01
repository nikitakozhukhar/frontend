import createRequest from "./api/createRequest"
// const url = 'http://localhost:7070/'

/**
 *  Класс для связи с сервером.
 *  Содержит методы для отправки запросов на сервер и получения ответов
 * */

export default class TicketService {

  list(callback) {
    createRequest({
      method: 'GET',
      url: 'https://backend-xy21.onrender.com/?method=allTickets',
      // url: `${url}?method=allTickets`,
      headers: { 'Content-Type': 'application/json' },
      callback,
    })
  }

  get(id, callback) {
    createRequest({
      method: 'GET',
      url: `https://backend-xy21.onrender.com/?method=ticketById&id=${id}`,
      // url: `${url}?method=ticketById&id=${id}`,
      callback,
    })
  }

  create(data, callback) {
    createRequest({
      method: 'POST',
      url: 'https://backend-xy21.onrender.com/?method=createTicket',
      // url: `${url}?method=createTicket`,
      data,
      callback,
    })
  }

  update(id, data, callback) {
    createRequest({
      method: 'POST',
      url: `https://backend-xy21.onrender.com/?method=updateById&id=${id}`,
      // url: `${url}?method=updateById&id=${id}`,
      data,
      callback,
    })
  }

  delete(id, callback) {
    createRequest({
      method: 'GET',
      url: `https://backend-xy21.onrender.com/?method=deleteById&id=${id}`,
      // url: `${url}?method=deleteById&id=${id}`,
      callback,
      noResponse: true,
    })
  }
}
