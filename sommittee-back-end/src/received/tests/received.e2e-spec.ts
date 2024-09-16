import request from "supertest"
import { app, authToken } from "../../global.e2e-spec"

it('Cadastrando recebido', async () => {
  const newReceived = {
    date: '15/07/2024',
    amount: 'R$50,00',
    description: 'Recebido',
    user_id: 'dc43fbfb-c784-43bb-8f68-b2a81d40987f',
    address_id: 'b5ac9479-fc2e-4a9e-9b6b-15f3b78dcbb3',
    product_id: '0c387cb0-e809-43e0-811a-edb7ce605eba',
    donor_id: 'a01e715b-1512-46aa-8b52-3af00457c98e',
    stock_id: '409b2b12-5bf1-4baf-beff-adca007f1988',
  }
  const response = await request(app.getHttpServer())
    .post('/received/register')
    .set('Authorization', `Bearer ${authToken}`)
    .send(newReceived)
    .expect(201)

  return response
})

it('Tentando cadastrar recebido faltando campo', async () => {
  const newReceived = {
    description: 'Recebido e entregue ao Bernard',
    user_id: 'dc43fbfb-c784-43bb-8f68-b2a81d40987f',
    address_id: 'b5ac9479-fc2e-4a9e-9b6b-15f3b78dcbb3',
    product_id: '0c387cb0-e809-43e0-811a-edb7ce605eba',
    donor_id: 'a01e715b-1512-46aa-8b52-3af00457c98e',
    stock_id: '409b2b12-5bf1-4baf-beff-adca007f1988',
  }
  const response = await request(app.getHttpServer())
    .post('/received/register')
    .set('Authorization', `Bearer ${authToken}`)
    .send(newReceived)
    .expect(400)

  return response
})

it('Tentando cadastrar recebido sem o token', async () => {
  const newReceived = {
    date: '12/07/2024',
    amount: 'R$200,00',
    description: 'Recebido e entregue ao Bernard',
    user_id: 'dc43fbfb-c784-43bb-8f68-b2a81d40987f',
    address_id: 'b5ac9479-fc2e-4a9e-9b6b-15f3b78dcbb3',
    product_id: '0c387cb0-e809-43e0-811a-edb7ce605eba',
    donor_id: 'a01e715b-1512-46aa-8b52-3af00457c98e',
    stock_id: '409b2b12-5bf1-4baf-beff-adca007f1988',
  }
  const response = await request(app.getHttpServer())
    .post('/received/register')
    .send(newReceived)
    .expect(401)

  return response
})

it('Filtrando todos recebidos', async () => {
  const response = await request(app.getHttpServer())
    .get('/received')
    .set('Authorization', `Bearer ${authToken}`)
    .expect(200)

  return response
})

it('Tentando filtrar todos recebidos sem o token', async () => {
  const response = await request(app.getHttpServer())
    .get('/received')
    .expect(401)

  return response
})

it('Filtrando recebido específico', async () => {
  const idReceived = 'ad8d3cf3-4240-4dee-8da0-ac9a3333f610'
  const response = await request(app.getHttpServer())
    .get(`/received/${idReceived}`)
    .set('Authorization', `Bearer ${authToken}`)
    .expect(200)

  return response
})

it('Tentando filtrar recebido específico. Id incorreto', async () => {
  const idReceived = 'ad8d3cf3-4240-4dee-8da0-ac9a3333f611'
  const response = await request(app.getHttpServer())
    .get(`/received/${idReceived}`)
    .set('Authorization', `Bearer ${authToken}`)
    .expect(404)

  return response
})

it('Tentando filtrar recebido específico sem o token', async () => {
  const idReceived = 'ad8d3cf3-4240-4dee-8da0-ac9a3333f610'
  const response = await request(app.getHttpServer())
    .get(`/received/${idReceived}`)
    .expect(401)

  return response
})

it('Atualizando recebido específico', async () => {
  const idReceived = 'ad8d3cf3-4240-4dee-8da0-ac9a3333f610'
  const updatedData = {
    description: 'Recebido e entregue ao Jonas',
  }
  const response = await request(app.getHttpServer())
    .patch(`/received/${idReceived}`)
    .set('Authorization', `Bearer ${authToken}`)
    .send(updatedData)
    .expect(200)

  return response
})

it('Tentando atualizar recebido específico. Id incorreto', async () => {
  const idReceived = 'ad8d3cf3-4240-4dee-8da0-ac9a3333f611'
  const updatedData = {
    description: 'Recebido e entregue ao Jonas',
  }
  const response = await request(app.getHttpServer())
    .patch(`/received/${idReceived}`)
    .set('Authorization', `Bearer ${authToken}`)
    .send(updatedData)
    .expect(404)

  return response
})

it('Tentando atualizar recebido específico sem o token', async () => {
  const idReceived = 'ad8d3cf3-4240-4dee-8da0-ac9a3333f610'
  const updatedData = {
    description: 'Recebido e entregue ao Jonas',
  }
  const response = await request(app.getHttpServer())
    .patch(`/received/${idReceived}`)
    .send(updatedData)
    .expect(401)

  return response
})

it('Deletando recebido específico', async () => {
  const idReceived = 'ad8d3cf3-4240-4dee-8da0-ac9a3333f610'
  const response = await request(app.getHttpServer())
    .delete(`/received/${idReceived}`)
    .set('Authorization', `Bearer ${authToken}`)
    .expect(200)

  return response
})

it('Tentando deletar recebido específico. Id incorreto', async () => {
  const idReceived = 'ad8d3cf3-4240-4dee-8da0-ac9a3333f611'
  const response = await request(app.getHttpServer())
    .delete(`/received/${idReceived}`)
    .set('Authorization', `Bearer ${authToken}`)
    .expect(404)

  return response
})

it('Tentando deletar recebido específico sem o token', async () => {
  const idReceived = 'ad8d3cf3-4240-4dee-8da0-ac9a3333f610'
  const response = await request(app.getHttpServer())
    .delete(`/received/${idReceived}`)
    .expect(401)

  return response
})