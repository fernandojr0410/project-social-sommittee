import Vue from 'vue'

const datetime = (value, type) => {
  // let dateFormat = type === 'short' ? 'DD/MM [às] HH:mm' : 'DD/MM/YYYY [às] HH:mm'
  // if (moment.utc(value).format('DD/MM/YYYY') === moment().format('DD/MM/YYYY')) {
  //   dateFormat = '[Hoje,] HH:mm'
  // } else if (
  //   moment.utc(value).format('DD/MM/YYYY') ===
  //   moment()
  //     .subtract(1, 'days')
  //     .format('DD/MM/YYYY')
  // ) {
  //   dateFormat = '[Ontem,] HH:mm'
  // } else if (
  //   value >
  //   moment()
  //     .subtract(7, 'days')
  //     .valueOf()
  // ) {
  //   dateFormat = 'dddd, HH:mm'
  // }
  // return moment.utc(value).format(dateFormat)
}

Vue.filter('firstname', (name) =>
  (name || '').indexOf(' ') > -1 ? name.substr(0, name.indexOf(' ')) : name
)
Vue.filter('shortname', (name) =>
  (name || '').indexOf(' ') > -1
    ? name.split(' ')[0] + ' ' + name.split(' ').reverse()[0]
    : name
)

Vue.filter('json', (data) => JSON.stringify(data, null, 2))

Vue.filter('birthday', (value) => {
  // const date = moment.utc(value).format('DD/MM')
  // return `${date} (${moment().diff(moment(value), 'years')} anos)`
})

Vue.filter('cnpj', (cnpj) => {
  if (!cnpj) {
    return ''
  }

  return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
})

Vue.filter('cpf', (cpf) => {
  if (!cpf) {
    return ''
  }

  return cpf
    .replace(/[^\d]/g, '')
    .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
})

// Vue.filter('weekday', value => moment.utc(value).format('dddd'))
// Vue.filter('fromNow', value => moment.utc(value).fromNow())
// Vue.filter('log', value => console.log(moment().format('DD/MM/YYYY [às] HH:mm:ss [=>]'), value))
// Vue.filter('time', value => moment.utc(value).format('HH:mm'))
// Vue.filter('datetime', datetime)
// Vue.filter('date', value => moment.utc(value).format('DD/MM/YYYY'))
// Vue.filter('datetext', value => {
//   if (moment().format('YY') === moment.utc(value).format('YY')) {
//     return moment.utc(value).format('DD MMM')
//   }

//   return moment.utc(value).format('DD MMM [de] YY')
// })
Vue.filter('phone', (str, { ddi } = {}) => {
  const cleaned = ('' + str).replace(/\D/g, '')
  let match = null

  if (ddi) {
    if (cleaned.length === 13) {
      match = cleaned.match(/^(\d{2})(\d{2})(\d{5})(\d{4})$/)
    } else {
      match = cleaned.match(/^(\d{2})(\d{2})(\d{4})(\d{4})$/)
    }

    if (!match) {
      return str
    }

    return `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}`
  }

  if (cleaned.length === 10) {
    match = cleaned.match(/^(\d{2})(\d{4})(\d{4})$/)
  } else if (cleaned.length === 11) {
    match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/)
  } else if (cleaned.length === 12) {
    match = cleaned.match(/^(\d{3})(\d{5})(\d{4})$/)
  } else if (cleaned.length === 13) {
    match = cleaned.match(/^(\d{3})(\d{5})(\d{4})$/)
  }

  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3]
  }

  return str
})

Vue.filter('uppercase', (value) => (value || '').toString().toUpperCase())
Vue.filter('lowercase', (value) => (value || '').toString().toLowerCase())

Vue.filter('toHHMM', (MINUTES) => {
  const m = MINUTES % 60
  const h = (MINUTES - m) / 60

  const HHMM = h.toString() + 'hrs ' + (m < 10 ? '0' : '') + m.toString()

  return HHMM + 'min'
})

Vue.filter('number', (x) => {
  if (!x) {
    return 0
  }

  if (typeof x === 'number') {
    const re = new RegExp('^-?\\d+(?:\\.\\d{0,' + (2 || -1) + '})?')
    x = x.toString().match(re)[0]
  }

  return (x || '0').toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
})

Vue.filter('currency', (number) => {
  let formatted = parseFloat(number || 0)
    .toFixed(2)
    .toString()
    .replace(/./g, function (c, i, a) {
      return i && c !== '.' && (a.length - i) % 3 === 0 ? '.' + c : c
    })
  if (formatted.indexOf('-.') === 0) {
    formatted = '-' + formatted.substr(2)
  }
  if (formatted.indexOf('.') === 0) {
    formatted = formatted.substr(1)
  }
  return (
    'R$ ' +
    formatted.substr(0, formatted.lastIndexOf('.')) +
    ',' +
    formatted.substr(formatted.lastIndexOf('.') + 1)
  )
})

Vue.filter('shortcurrency', (num, digits = 2) => {
  if (!num) {
    return 'R$ 0,00'
  }

  const negative = num < 0

  if (negative) {
    num *= -1
  }

  const si = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'k' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' },
  ]

  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
  let i

  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break
    }
  }

  return (
    'R$ ' +
    (negative ? '-' : '') +
    (num / si[i].value).toFixed(digits).replace(rx, '$1') +
    si[i].symbol
  )
})

Vue.filter('shortnumber', (num, digits) => {
  const negative = num < 0

  if (negative) {
    num *= -1
  }

  const si = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'k' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' },
  ]

  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
  let i

  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break
    }
  }

  return (
    (negative ? '-' : '') +
    (num / si[i].value).toFixed(digits).replace(rx, '$1') +
    si[i].symbol
  )
})
