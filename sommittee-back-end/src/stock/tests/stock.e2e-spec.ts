import request from "supertest"
import { app, authToken } from "../../global.e2e-spec"

it('Vinculando produto no stock', async () => {
  const newStock = {
    amount: '5',
    product_id: '641956e4-5113-482e-8a62-de185f241a7a',
    donation_id: '72d375bb-5584-4e10-9414-cf12edd57782'
  }

  const response = await request(app.getHttpServer())
    .post('/stock/register')
    .set('Authorization', `Bearer ${authToken}`)
    .send(newStock)
    .expect(201)

  return response
})

it('Vinculando produto no stock faltando campos', async () => {
  const newStock = {
    amount: '5',
    donation_id: '72d375bb-5584-4e10-9414-cf12edd57782'
  }

  const response = await request(app.getHttpServer())
    .post('/stock/register')
    .set('Authorization', `Bearer ${authToken}`)
    .send(newStock)
    .expect(400)

  return response
})

it('Tentando vincular produto no stock sem o token', async () => {
  const newStock = {
    amount: '5',
    product_id: '641956e4-5113-482e-8a62-de185f241a7a',
    donation_id: '72d375bb-5584-4e10-9414-cf12edd57782'
  }

  const response = await request(app.getHttpServer())
    .post('/stock/register')
    .send(newStock)
    .expect(401)

  return response
})

it('Filtrando todos estoques', async () => {
  const response = await request(app.getHttpServer())
    .get('/stock')
    .set('Authorization', `Bearer ${authToken}`)
    .expect(200)

  return response
})

it('Tentando filtrar todos estoques sem o token', async () => {
  const response = await request(app.getHttpServer())
    .get('/stock')
    .expect(401)

  return response
})

it('Filtrando estoque espcífico', async () => {
  const idStock = '90af59de-f467-4fde-b126-74b380830944'

  const response = await request(app.getHttpServer())
    .get(`/stock/${idStock}`)
    .set('Authorization', `Bearer ${authToken}`)
    .expect(200)

  return response
})

it('Tentando filtrar estoque espcífico. Id incorreto', async () => {
  const idStock = '90af59de-f467-4fde-b126-74b380830945'

  const response = await request(app.getHttpServer())
    .get(`/stock/${idStock}`)
    .set('Authorization', `Bearer ${authToken}`)
    .expect(404)

  return response
})

it('Tentando filtrar estoque espcífico sem o token', async () => {
  const idStock = '90af59de-f467-4fde-b126-74b380830944'

  const response = await request(app.getHttpServer())
    .get(`/stock/${idStock}`)
    .expect(401)

  return response
})

it('Atualizando estoque específico', async () => {
  const idStock = '90af59de-f467-4fde-b126-74b380830944'

  const updatedStock = {
    amount: '3'
  }

  const response = await request(app.getHttpServer())
    .patch(`/stock/${idStock}`)
    .set('Authorization', `Bearer ${authToken}`)
    .send(updatedStock)
    .expect(200)

  return response
})

it('Tentando atualizar estoque específico. Id incorreto', async () => {
  const idStock = '90af59de-f467-4fde-b126-74b380830945'

  const updatedStock = {
    amount: '3'
  }

  const response = await request(app.getHttpServer())
    .patch(`/stock/${idStock}`)
    .set('Authorization', `Bearer ${authToken}`)
    .send(updatedStock)
    .expect(404)

  return response
})

it('Tentando atualizar estoque específico sem o token', async () => {
  const idStock = '90af59de-f467-4fde-b126-74b380830944'

  const updatedStock = {
    amount: '3'
  }

  const response = await request(app.getHttpServer())
    .patch(`/stock/${idStock}`)
    .send(updatedStock)
    .expect(401)

  return response
})

it('Deletando estoque específico', async () => {
  const idStock = '90af59de-f467-4fde-b126-74b380830944'

  const response = await request(app.getHttpServer())
    .delete(`/stock/${idStock}`)
    .set('Authorization', `Bearer ${authToken}`)
    .expect(200)

  return response
})

it('Tentando deletar estoque específico. Id incorreto', async () => {
  const idStock = '90af59de-f467-4fde-b126-74b380830943'

  const response = await request(app.getHttpServer())
    .delete(`/stock/${idStock}`)
    .set('Authorization', `Bearer ${authToken}`)
    .expect(404)

  return response
})

it('Tentando deletar estoque específico sem o token', async () => {
  const idStock = '90af59de-f467-4fde-b126-74b380830944'

  const response = await request(app.getHttpServer())
    .delete(`/stock/${idStock}`)
    .expect(401)

  return response
})