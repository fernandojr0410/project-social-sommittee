import request from "supertest"
import { app, authToken } from "../../global.e2e-spec"

it('Cadatrando família ao endereço', async () => {
  const newFamily = {
    address_id: '98feb54c-8fbf-4290-8e82-35579e0dd951'
  }

  const response = await request(app.getHttpServer())
    .post('/family/register')
    .set('Authorization', `Bearer ${authToken}`)
    .send(newFamily)
    .expect(201)

  return response
})

it('Tentando cadastrar família ao endereço. Id endereço incorreto', async () => {
  const newFamily = {
    address_id: '02fec399-ede8-46ef-9a3e-c98b37e8e4da'
  }

  const response = await request(app.getHttpServer())
    .post('/family/register')
    .set('Authorization', `Bearer ${authToken}`)
    .send(newFamily)
    .expect(404)
  return response
})

it('Tentando cadastrar família ao endereço sem o token', async () => {
  const newFamily = {
    address_id: '02fec399-ede8-46ef-9a3e-c98b37e8e4d3'
  }

  const response = await request(app.getHttpServer())
    .post('/family/register')
    .send(newFamily)
    .expect(401)

  return response
})

it('Filtrando família vinculado ao endereço', async () => {
  const response = await request(app.getHttpServer())
    .get('/family')
    .set('Authorization', `Bearer ${authToken}`)
    .expect(200)

  return response
})

it('Tentando filtrar família vinculado ao endereço sem o token', async () => {
  const response = await request(app.getHttpServer())
    .get('/family')
    .expect(401)

  return response
})

it('Filtrando família vinculado ao endereço específico', async () => {
  const idFamily = '5617e59e-a226-4168-8a7a-4085f0b699de'

  const response = await request(app.getHttpServer())
    .get(`/family/${idFamily}`)
    .set('Authorization', `Bearer ${authToken}`)
    .send(idFamily)
    .expect(200)

  return response
})

it('Tentrando filtrar família vinculado ao endereço específico. Id incorreto', async () => {
  const idFamily = '5617e59e-a226-4168-8a7a-4085f0b699da'

  const response = await request(app.getHttpServer())
    .get(`/family/${idFamily}`)
    .set('Authorization', `Bearer ${authToken}`)
    .send(idFamily)
    .expect(404)

  return response
})

it('Tentrando filtrar família vinculado ao endereço específico sem o token', async () => {
  const idFamily = '5617e59e-a226-4168-8a7a-4085f0b699da'

  const response = await request(app.getHttpServer())
    .get(`/family/${idFamily}`)
    .send(idFamily)
    .expect(401)

  return response
})

it('Atualizando família vinculado ao endereço específico', async () => {
  const idFamily = '5617e59e-a226-4168-8a7a-4085f0b699de'

  const updatedAddressId = {
    address_id: '02fec399-ede8-46ef-9a3e-c98b37e8e4d3'
  }

  const response = await request(app.getHttpServer())
    .patch(`/family/${idFamily}`)
    .set('Authorization', `Bearer ${authToken}`)
    .send(updatedAddressId)
    .expect(200)

  return response
})

it('Tentando atualizar família vinculado ao endereço específico. Id família incorreto', async () => {
  const idFamily = '5617e59e-a226-4168-8a7a-4085f0b699da'

  const updatedAddressId = {
    address_id: '02fec399-ede8-46ef-9a3e-c98b37e8e4d3'
  }

  const response = await request(app.getHttpServer())
    .patch(`/family/${idFamily}`)
    .set('Authorization', `Bearer ${authToken}`)
    .send(updatedAddressId)
    .expect(404)

  return response
})

it('Tentando atualizar família vinculado ao endereço específico. Id endereco incorreto', async () => {
  const idFamily = '5617e59e-a226-4168-8a7a-4085f0b699de'

  const updatedAddressId = {
    address_id: '02fec399-ede8-46ef-9a3e-c98b37e8e4da'
  }

  const response = await request(app.getHttpServer())
    .patch(`/family/${idFamily}`)
    .set('Authorization', `Bearer ${authToken}`)
    .send(updatedAddressId)
    .expect(401)

  return response
})

it('Tentando atualizar família vinculado ao endereço específico sem o token', async () => {
  const idFamily = '5617e59e-a226-4168-8a7a-4085f0b699de'

  const updatedAddressId = {
    address_id: '02fec399-ede8-46ef-9a3e-c98b37e8e4d3'
  }

  const response = await request(app.getHttpServer())
    .patch(`/family/${idFamily}`)
    .send(updatedAddressId)
    .expect(401)

  return response
})

it('Deletando família específico', async () => {
  const idFamily = '5617e59e-a226-4168-8a7a-4085f0b699de'

  const response = await request(app.getHttpServer())
    .delete(`/family/${idFamily}`)
    .set('Authorization', `Bearer ${authToken}`)
    .expect(200)

  return response
})

it('Deletando família específico id incorreto', async () => {
  const idFamily = '5617e59e-a226-4168-8a7a-4085f0b699da'

  const response = await request(app.getHttpServer())
    .delete(`/family/${idFamily}`)
    .set('Authorization', `Bearer ${authToken}`)
    .expect(404)

  return response
})

it('Deletando família específico sem o token', async () => {
  const idFamily = '5617e59e-a226-4168-8a7a-4085f0b699de'

  const response = await request(app.getHttpServer())
    .delete(`/family/${idFamily}`)
    .expect(401)

  return response
})