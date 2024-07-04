import request from 'supertest';
import { app, authToken } from '../../global.e2e-spec';

it('Cadastrando endereço', async () => {
  const newAddress = {
    zip_code: "85630489",
    street: "Rua Para",
    number: "857",
    complement: "Casa",
    neighborhood: "Neva",
    city: "Cascavel",
    state: "PR"
  }

  const response = await request(app.getHttpServer())
    .post('/address')
    .set('Authorization', `Bearer ${authToken}`)
    .send(newAddress)
    .expect(201)

  return response
})

it('Tentando cadastrar endereço sem os campos', async () => {
  const newAddress = {
    zip_code: "85630489",
    street: "Rua Para",
    number: "857",
    complement: null,
    neighborhood: "Neva",
    city: "Cascavel",
    state: "PR"
  }

  const response = await request(app.getHttpServer())
    .post('/address')
    .set('Authorization', `Bearer ${authToken}`)
    .send(newAddress)
    .expect(400)
  return response
})

it('Negando cadastro de endereço sem autenticação', async () => {
  const newAddress = {
    zip_code: "85630489",
    street: "Rua Para",
    number: "857",
    complement: "Casa",
    neighborhood: "Neva",
    city: "Cascavel",
    state: "PR"
  }
  const response = await request(app.getHttpServer())
    .post('/address')
    .send(newAddress)
    .expect(401)

  return response
})

it('Filtrando todos os endereços', async () => {
  const response = await request(app.getHttpServer())
    .get('/address')
    .set('Authorization', `Bearer ${authToken}`)
    .expect(200);

  return response;
});

it('Tentando filtrar todos os endereços sem o token', async () => {
  const response = await request(app.getHttpServer())
    .get('/address')
    .expect(401);
  return response;
});

it('Filtrando endereço específico', async () => {
  const response = await request(app.getHttpServer())
    .get('/address/025a2e84-6d8e-4c2a-911a-ffbe8d0acfb6')
    .set('Authorization', `Bearer ${authToken}`)
    .expect(200)
  return response
})

it('Tentando filtrar sem o ID correto do endereço específico', async () => {
  const response = await request(app.getHttpServer())
    .get('/address/025a2e84-6d8e-4c2a-911a-ffbe8d0acfba')
    .set('Authorization', `Bearer ${authToken}`)
    .expect(404)
  return response
})

it('Tentando filtrar endereço específico sem o token', async () => {
  const response = await request(app.getHttpServer())
    .get('/address/025a2e84-6d8e-4c2a-911a-ffbe8d0acfb6')
    .expect(401)
  return response
})

it('Atualizando endereço', async () => {

  const updatedAddress = {
    street: "Rua teste",
  }
  const resposne = await request(app.getHttpServer())
    .Patch('/address/025a2e84-6d8e-4c2a-911a-ffbe8d0acfb6')
    .set('Authorization', `Bearer ${authToken}`)
    .send(updatedAddress)
    .expect(200)
  return resposne
})

it('Tentando atualizar endereço. Id incorreto', async () => {
  const idAddress = '98feb54c-8fbf-4290-8e82-35579e0dd951'

  const updatedAddress = {
    street: "Rua teste",
  }
  const resposne = await request(app.getHttpServer())
    .Patch(`/address/${idAddress}`)
    .set('Authorization', `Bearer ${authToken}`)
    .send(updatedAddress)
    .expect(404)
  return resposne
})

it('Tentando atualizar endereço sem o token', async () => {
  const updatedAddress = {
    street: "Rua flaksdjfsakl",
  }
  const resposne = await request(app.getHttpServer())
    .patch('/address/025a2e84-6d8e-4c2a-911a-ffbe8d0acfb6')
    .send(updatedAddress)
    .expect(401)
  return resposne
})

it('Deletando endereço', async () => {
  const response = await request(app.getHttpServer())
    .delete('/address/025a2e84-6d8e-4c2a-911a-ffbe8d0acfb6')
    .set('Authorization', `Bearer ${authToken}`)
    .expect(200)
  return response
})

it('Tentando deletar sem o ID correto do endereço específico', async () => {
  const response = await request(app.getHttpServer())
    .delete('/address/025a2e84-6d8e-4c2a-911a-ffbe8d0acfb6')
    .set('Authorization', `Bearer ${authToken}`)
    .expect(404)
  return response
})

it('Tentando deletar o endereço sem o token', async () => {
  const response = await request(app.getHttpServer())
    .delete('/address/025a2e84-6d8e-4c2a-911a-ffbe8d0acfb6')
    .expect(401)
  return response
})