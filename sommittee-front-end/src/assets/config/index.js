import * as Yup from 'yup'
import axios from 'axios'

const checkCepExists = async (cep) => {
  if (!cep) return false
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
    return !response.data.erro
  } catch (error) {
    console.error('Erro ao verificar CEP:', error)
    return false
  }
}

const addressSchema = Yup.object({
  zip_code: Yup.string()
    .required('O CEP é obrigatório')
    .test('check-cep', 'O CEP informado não é válido', async (value) => {
      if (!value) return false
      const isValid = await checkCepExists(value)
      return isValid
    }),
  street: Yup.string().required('A rua é obrigatória'),
  number: Yup.string().required('O número é obrigatório'),
  neighborhood: Yup.string().required('O bairro é obrigatório'),
  city: Yup.string().required('A cidade é obrigatória'),
  state: Yup.string().required('O estado é obrigatório'),
})

const emailRegex =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/

export const validationSchema = Yup.object({
  name: Yup.string().matches(
    /^[A-Za-zÀ-ÿ\s]+$/,
    'O nome é obrigatório e não pode conter números ou caracteres especiais'
  ),
  surname: Yup.string()

    .matches(
      /^[A-Za-zÀ-ÿ\s]+$/,
      'O sobrenome é obrigatório e não pode conter números ou caracteres especiais'
    ),
  cpf: Yup.string().required('O CPF é obrigatório'),
  birth_date: Yup.date()
    .required('A data de nascimento é obrigatória')
    .typeError('Data de nascimento inválida')
    .max(new Date(), 'A data de nascimento não pode ser no futuro'),
  email: Yup.string().matches(emailRegex, 'O e-mail deve ser válido'),
  gender: Yup.string().required('O gênero é obrigatório'),
  telephone: Yup.string().required('O telefone é obrigatório'),
  work: Yup.string().required('O trabalho é obrigatório'),
  education: Yup.string().required('A educação é obrigatória'),
  address: addressSchema,
})
