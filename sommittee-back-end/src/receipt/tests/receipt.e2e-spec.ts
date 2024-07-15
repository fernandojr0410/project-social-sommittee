import request from "supertest"
import { app, authToken } from "../../global.e2e-spec"

it('Cadastrando recibo', async () => {
  const newReceipt = {
    issue_date: '2024-07-12',
    description: 'Doação em dinheiro e pix',
    type_transaction: 'Doção',
    value_amount: '100,00',
    quantity: 'R$ 50,00 em dinheiro e R$ 50,00 no pix',
    payment_method: 'Dinheiro e Pix',
    user_id: '97e4cff7-37a3-4c6a-bf28-1ff10aae5da0',
    product_id: '4b0c6c31-0571-4ca9-8ae9-e5b1bc45ee77',
    donor_id: '9e009377-52c6-48bb-a8af-1d2caece0044',
    stock_id: '6b940c80-1549-4274-9152-4c0775fe27ba'
  }
  const response = await request(app.getHttpServer())
    .post('/receipt/register')
    .set('Authorization', `Bearer ${authToken}`)
    .send(newReceipt)
    .expect(201)
  console.log("Recibo cadatrado", response.body)

  return response
})

it('Tentando cadastrar recibo faltando campo', async () => {
  const newReceipt = {
    issue_date: '2024-07-12',
    quantity: 'R$ 50,00 em dinheiro e R$ 50,00 no pix',
    payment_method: 'Dinheiro e Pix',
    user_id: '97e4cff7-37a3-4c6a-bf28-1ff10aae5da0',
    product_id: '4b0c6c31-0571-4ca9-8ae9-e5b1bc45ee77',
    donor_id: '9e009377-52c6-48bb-a8af-1d2caece0044',
    stock_id: '6b940c80-1549-4274-9152-4c0775fe27ba'
  }
  const response = await request(app.getHttpServer())
    .post('/receipt/register')
    .set('Authorization', `Bearer ${authToken}`)
    .send(newReceipt)
    .expect(400)
  console.log("Recibo cadatrado", response.body)

  return response
})

it('Tentando cadastrar recibo sem o token', async () => {
  const newReceipt = {
    issue_date: '2024-07-12',
    description: 'Doação em dinheiro e pix',
    type_transaction: 'Doção',
    value_amount: '100,00',
    quantity: 'R$ 50,00 em dinheiro e R$ 50,00 no pix',
    payment_method: 'Dinheiro e Pix',
    user_id: '97e4cff7-37a3-4c6a-bf28-1ff10aae5da0',
    product_id: '4b0c6c31-0571-4ca9-8ae9-e5b1bc45ee77',
    donor_id: '9e009377-52c6-48bb-a8af-1d2caece0044',
    stock_id: '6b940c80-1549-4274-9152-4c0775fe27ba'
  }
  const response = await request(app.getHttpServer())
    .post('/receipt/register')
    .send(newReceipt)
    .expect(401)
  console.log("Recibo cadatrado", response.body)

  return response
})

it('Fitlrando todos os recibos', async () => {
  const response = await request(app.getHttpServer())
    .get('/receipt')
    .set('Authorization', `Bearer ${authToken}`)
    .expect(200)

  return response
})

it('Tentando filtrar todos os recibos sem o token', async () => {
  const response = await request(app.getHttpServer())
    .get('/receipt')
    .expect(401)

  return response
})

it('Filtrando recibo específico', async () => {
  const idReceipt = 'c42f7f59-08b9-4c43-a121-838330c676dc'

  const response = await request(app.getHttpServer())
    .get(`/receipt/${idReceipt}`)
    .set('Authorization', `Bearer ${authToken}`)
    .expect(200)

  return response
})

it('Tentando filtrar recibo específico. Id incorreto', async () => {
  const idReceipt = 'c42f7f59-08b9-4c43-a121-838330c676dd'

  const response = await request(app.getHttpServer())
    .patch(`/receipt/${idReceipt}`)
    .set('Authorization', `Bearer ${authToken}`)
    .expect(404)

  return response
})

it('Tentando atualizar recibo específico sem o token', async () => {
  const idReceipt = 'c42f7f59-08b9-4c43-a121-838330c676dc'

  const response = await request(app.getHttpServer())
    .patch(`/receipt/${idReceipt}`)
    .expect(401)

  return response
})

it('Atualizando recibo específico', async () => {
  const idReceipt = 'c42f7f59-08b9-4c43-a121-838330c676dc'

  const updatedReceipt = {
    value_amount: '300,00'
  }

  const response = await request(app.getHttpServer())
    .patch(`/receipt/${idReceipt}`)
    .set('Authorization', `Bearer ${authToken}`)
    .send(updatedReceipt)
    .expect(200)

  return response
})

it('Tentando atualizar recibo específico. Id incorreto', async () => {
  const idReceipt = 'c42f7f59-08b9-4c43-a121-838330c676dd'

  const updatedReceipt = {
    value_amount: '300,00'
  }

  const response = await request(app.getHttpServer())
    .patch(`/receipt/${idReceipt}`)
    .set('Authorization', `Bearer ${authToken}`)
    .send(updatedReceipt)
    .expect(404)

  return response
})

it('Tentando atualizar recibo específico sem o token', async () => {
  const idReceipt = 'c42f7f59-08b9-4c43-a121-838330c676dc'

  const updatedReceipt = {
    value_amount: '300,00'
  }

  const response = await request(app.getHttpServer())
    .patch(`/receipt/${idReceipt}`)
    .send(updatedReceipt)
    .expect(401)

  return response
})

it('Deletando recibo específico', async () => {
  const idReceipt = 'c42f7f59-08b9-4c43-a121-838330c676dc'

  const response = await request(app.getHttpServer())
    .patch(`/receipt/${idReceipt}`)
    .set('Authorization', `Bearer ${authToken}`)
    .expect(200)

  return response
})

it('Tentando deletar recibo específico. Id incorreto', async () => {
  const idReceipt = 'c42f7f59-08b9-4c43-a121-838330c676dd'

  const response = await request(app.getHttpServer())
    .patch(`/receipt/${idReceipt}`)
    .set('Authorization', `Bearer ${authToken}`)
    .expect(404)

  return response
})

it('Tentando deletar recibo específico sem o token', async () => {
  const idReceipt = 'c42f7f59-08b9-4c43-a121-838330c676dc'

  const response = await request(app.getHttpServer())
    .patch(`/receipt/${idReceipt}`)
    .expect(401)

  return response
})