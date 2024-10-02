import Vue from "vue";
import { format } from "date-fns";

export const roleUser = [
  { text: "Administrador", value: "ADMIN" },
  { text: "Gerenete", value: "MANAGER" },
  { text: "Usuário padrão", value: "OPERATOR" },
];

Vue.filter("roleUser", (value) => {
  const roleUserMap = {
    ADMIN: "Administrador",
    MANAGER: "Gerente",
    OPERATOR: "Usuário padrão",
  };
  return roleUserMap[value] || value;
});

export const productCategories = [
  { text: "Roupas", value: "clothes" },
  { text: "Calçados", value: "shoes" },
  { text: "Acessórios", value: "accessories" },
  { text: "Beleza e Cuidados Pessoais", value: "beauty" },
  { text: "Alimentos e Bebidas", value: "food" },
  { text: "Eletrônicos", value: "electronics" },
  { text: "Casa e Decoração", value: "home" },
  { text: "Esportes e Lazer", value: "sports" },
  { text: "Brinquedos e Jogos", value: "toys" },
  { text: "Saúde e Bem-estar", value: "health" },
];

Vue.filter("productCategory", (value) => {
  const categoryMap = {
    clothes: "Roupas",
    shoes: "Calçados",
    accessories: "Acessórios",
    beauty: "Beleza e Cuidados Pessoais",
    food: "Alimentos e Bebidas",
    electronics: "Eletrônicos",
    home: "Casa e Decoração",
    sports: "Esportes e Lazer",
    toys: "Brinquedos e Jogos",
    health: "Saúde e Bem-estar",
  };
  return categoryMap[value] || value;
});

export const conditionProduct = [
  { value: "NEW", text: "Novo" },
  { value: "USED", text: "Usado" },
  { value: "DAMAGED", text: "Danificado" },
];

Vue.filter("conditionProduct", (value) => {
  const conditionProductMap = {
    NEW: "Novo",
    USED: "Usado",
    DAMAGED: "Danificado",
  };
  return conditionProductMap[value];
});

export function currencyFilter(number) {
  if (number === undefined || number === null) return "R$ 0,00";
  let formatted = parseFloat(number).toFixed(2).toString();
  formatted = formatted.replace(".", ",");
  return `R$ ${formatted}`;
}

Vue.filter("formatCurrency", (value) => {
  if (!value) return "R$ 0,00";
  let formatted = parseFloat(value).toFixed(2).toString();
  formatted = formatted.replace(".", ",");
  return `R$ ${formatted}`;
});

export function formatDate(value) {
  if (!value) return "";

  const date = new Date(value);

  if (isNaN(date.getTime())) {
    console.error("Invalid date value:", value);
    return "";
  }

  return format(date, "dd/MM/yyyy");
}

export const workItems = [
  { value: true, text: "Sim" },
  { value: false, text: "Não" },
];

export const genderItems = [
  { value: "MALE", text: "Masculino" },
  { value: "FEMALE", text: "Feminino" },
];

Vue.filter("gender", (value) => {
  const genderMap = {
    MALE: "Masculino",
    FEMALE: "Feminino",
  };

  return genderMap[value];
});

Vue.filter("work", (value) => {
  const workMap = {
    true: "Sim",
    false: "Não",
  };
  return workMap[value];
});

export const functionFamily = [
  { text: "Mãe", value: "mother" },
  { text: "Pai", value: "father" },
  { text: "Filho(a)", value: "child" },
  { text: "Vó", value: "grandMother" },
  { text: "Vô", value: "grandFather" },
  { text: "Tio", value: "uncle" },
  { text: "Tio", value: "aunt" },
];

Vue.filter("functionFamily", (value) => {
  const functionFamilyMap = {
    mother: "Mãe",
    father: "Pai",
    child: "Filho(a)",
    grandMother: "Vó",
    grandFather: "Vô",
    uncle: "Tio",
    aunt: "Tia",
  };
  return functionFamilyMap[value] || value;
});

export const typeDonor = [
  { value: "INTERNAL", text: "Interno" },
  { value: "EXTERNAL", text: "Externo" },
];

Vue.filter("typeDonor", (value) => {
  const typeDonorMap = {
    INTERNAL: "Interno",
    EXTERNAL: "Externo",
  };
  return typeDonorMap[value];
});

export const stateDonation = [
  { text: "Pendente", value: "PENDING" },
  { text: "Confirmado", value: "CONFIRMED" },
  { text: "Em Trânsito", value: "IN_TRANSIT" },
  { text: "Cancelado", value: "CANCELED" },
  { text: "Entregue", value: "DELIVERED" },
  { text: "Processando", value: "PROCESSING" },
  { text: "Aprovado", value: "APPROVED" },
  { text: "Rejeitado", value: "REJECTED" },
  { text: "Em Revisão", value: "UNDER_REVIEW" },
];

Vue.filter("stateDonation", (value) => {
  const stateDonationMap = {
    PENDING: "Pendente",
    CONFIRMED: "Confirmado",
    IN_TRANSIT: "Em Trânsito",
    CANCELED: "Cancelado",
    DELIVERED: "Entregue",
    PROCESSING: "Processando",
    APPROVED: "Aprovado",
    REJECTED: "Rejeitado",
    UNDER_REVIEW: "Em Revisão",
  };
  return stateDonationMap[value] || value;
});

Vue.filter("firstname", (name) =>
  (name || "").indexOf(" ") > -1 ? name.substr(0, name.indexOf(" ")) : name
);
Vue.filter("shortname", (name) =>
  (name || "").indexOf(" ") > -1
    ? name.split(" ")[0] + " " + name.split(" ").reverse()[0]
    : name
);

Vue.filter("json", (data) => JSON.stringify(data, null, 2));

Vue.filter("birthday", (value) => {
  const date = moment.utc(value).format("DD/MM");
  return `${date} (${moment().diff(moment(value), "years")} anos)`;
});

Vue.filter("cnpj", (cnpj) => {
  if (!cnpj) {
    return "";
  }

  return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
});

export function formatCpf(cpf) {
  if (!cpf) {
    return "";
  }

  return cpf
    .replace(/[^\d]/g, "")
    .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

export function cleanCpf(cpf) {
  return cpf.replace(/[^\d]/g, "");
}

Vue.filter("cpf", formatCpf);

export function formatPhone(phone, { ddi } = {}) {
  const cleaned = ("" + phone).replace(/\D/g, "");
  let match = null;

  if (ddi) {
    if (cleaned.length === 13) {
      match = cleaned.match(/^(\d{2})(\d{2})(\d{5})(\d{4})$/);
    } else {
      match = cleaned.match(/^(\d{2})(\d{2})(\d{4})(\d{4})$/);
    }

    if (!match) {
      return phone;
    }

    return `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}`;
  }

  if (cleaned.length === 10) {
    match = cleaned.match(/^(\d{2})(\d{4})(\d{4})$/);
  } else if (cleaned.length === 11) {
    match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
  } else if (cleaned.length === 12) {
    match = cleaned.match(/^(\d{3})(\d{5})(\d{4})$/);
  } else if (cleaned.length === 13) {
    match = cleaned.match(/^(\d{3})(\d{5})(\d{4})$/);
  }

  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }

  return phone;
}

export function cleanPhone(phone) {
  return phone.replace(/\D/g, "");
}

Vue.filter("phone", formatPhone);

export function formatCep(cep) {
  const cleaned = ("" + cep).replace(/\D/g, "");
  let match = cleaned.match(/^(\d{5})(\d{3})$/);

  if (match) {
    return `${match[1]}-${match[2]}`;
  }

  return cep;
}

export function cleanCep(cep) {
  return cep.replace(/\D/g, "");
}

Vue.filter("cep", formatCep);

Vue.filter("uppercase", (value) => (value || "").toString().toUpperCase());
Vue.filter("lowercase", (value) => (value || "").toString().toLowerCase());

Vue.filter("toHHMM", (MINUTES) => {
  const m = MINUTES % 60;
  const h = (MINUTES - m) / 60;

  const HHMM = h.toString() + "hrs " + (m < 10 ? "0" : "") + m.toString();

  return HHMM + "min";
});

Vue.filter("number", (x) => {
  if (!x) {
    return 0;
  }

  if (typeof x === "number") {
    const re = new RegExp("^-?\\d+(?:\\.\\d{0," + (2 || -1) + "})?");
    x = x.toString().match(re)[0];
  }

  return (x || "0").toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
});

Vue.filter("currency", (number) => {
  let formatted = parseFloat(number || 0)
    .toFixed(2)
    .toString()
    .replace(/./g, function (c, i, a) {
      return i && c !== "." && (a.length - i) % 3 === 0 ? "." + c : c;
    });
  if (formatted.indexOf("-.") === 0) {
    formatted = "-" + formatted.substr(2);
  }
  if (formatted.indexOf(".") === 0) {
    formatted = formatted.substr(1);
  }
  return (
    "R$ " +
    formatted.substr(0, formatted.lastIndexOf(".")) +
    "," +
    formatted.substr(formatted.lastIndexOf(".") + 1)
  );
});

Vue.filter("shortcurrency", (num, digits = 2) => {
  if (!num) {
    return "R$ 0,00";
  }

  const negative = num < 0;

  if (negative) {
    num *= -1;
  }

  const si = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];

  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  let i;

  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break;
    }
  }

  return (
    "R$ " +
    (negative ? "-" : "") +
    (num / si[i].value).toFixed(digits).replace(rx, "$1") +
    si[i].symbol
  );
});

Vue.filter("shortnumber", (num, digits) => {
  const negative = num < 0;

  if (negative) {
    num *= -1;
  }

  const si = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];

  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  let i;

  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break;
    }
  }

  return (
    (negative ? "-" : "") +
    (num / si[i].value).toFixed(digits).replace(rx, "$1") +
    si[i].symbol
  );
});
