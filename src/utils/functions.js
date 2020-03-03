const getFreightInfo = (items) => {
  let { PrazoEntrega: term, Valor: value } = items[0]
  value = value.replace(",", ".")
  value = parseFloat(value).toFixed(2)
  term = parseInt(term, 10)

  const dateNow = dateToBrDate(Date.now())

  let date_start = getDateDMY(dateNow)
  
  let date_end = dateNow
  date_end.setDate(date_end.getDate() + term)
  date_end = getDateDMY(date_end)

  return {
    value,
    term,
    date_start,
    date_end
  }
}

const dateToBrDate = (date) => {
  let dateObj = new Date(date)
  dateObj.toLocaleString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).replace(/\//g, '-')

  dateObj.setHours(dateObj.getHours() - 3)

  return dateObj
}

const getDateDMY = (date) => {
  const year = date.getFullYear() < 10 ? "0" + date.getFullYear() : date.getFullYear()
  const month = date.getMonth() < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1
  const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate()

  return { day, month, year }
}

module.exports = {
  getFreightInfo,
  dateToBrDate,
  getDateDMY
}