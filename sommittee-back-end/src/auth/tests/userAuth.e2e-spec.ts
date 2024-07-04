import request from 'supertest';
import { app, authToken } from '../../global.e2e-spec';

it('Registrando Usuário', async () => {
  const newUser = {
    name: 'Fernando da Silva',
    surname: 'Junior',
    email: 'fernando.solomonbusiness@gmail.com',
    telephone: '45999174178',
    password: 'Teste@123',
    role: 'ADMIN',
  }
  const response = await request(app.getHttpServer())
    .post('/users/auth/register')
    .set('Authorization', `Bearer ${authToken}`)
    .send(newUser)
    .expect(201)

  return response
})

it('Tentando registrar usuário sem os campos', async () => {
  const newUser = {
    name: 'Fernando da Silva',
    surname: 'Junior',
    email: 'fernando@solomon.com',
    telephone: '45999174178',
  }
  const response = await request(app.getHttpServer())
    .post('/users/auth/register')
    .set('Authorization', `Bearer ${authToken}`)
    .send(newUser)
    .expect(400)

  return response
})

it('Tentando registrar usuário sem o token', async () => {
  const newUser = {
    name: 'Fernando da Silva',
    surname: 'Junior',
    email: 'fernando@solomon.com',
    telephone: '45999174178',
    password: 'Teste@123',
    role: 'ADMIN',
  }
  const response = await request(app.getHttpServer())
    .post('/users/auth/register')
    .send(newUser)
    .expect(401)
  return response
})

it('Filtrando usuário específico', async () => {
  const response = await request(app.getHttpServer())
    .get('/users/auth/profile')
    .set('Authorization', `Bearer ${authToken}`)
    .expect(200)
  return response
})

it('Tentando filtrar o usuário específico sem o token', async () => {
  const response = await request(app.getHttpServer())
    .get('/users/auth/profile')
    .expect(401)
  return response
})

it('Atualizando perfil do usuário', async () => {
  const updatedUser = {
    name: 'João',
    telephone: '45000001111'
  }
  const response = await request(app.getHttpServer())
    .patch('/users/auth/profile')
    .set('Authorization', `Bearer ${authToken}`)
    .send(updatedUser)
    .expect(200)
  return response
})

it('Tentando atualizar perfil do usuário sem o token', async () => {
  const updatedUser = {
    name: 'João',
    telephone: '45000001111'
  }
  const response = await request(app.getHttpServer())
    .patch('/users/auth/profile')
    .send(updatedUser)
    .expect(401)
  return response
})

it('Atualizando a senha do usuário', async () => {
  const newPassword = {
    oldPassword: 'Teste@123',
    newPassword: "Teste@111"
  }
  const response = await request(app.getHttpServer())
    .patch('/users/auth/password')
    .set('Authorization', `Bearer ${authToken}`)
    .send(newPassword)
    .expect(200)
  return response
})

it('tentando atualizar a senha do usuário sem o token', async () => {
  const newPassword = {
    oldPassword: 'Teste@123',
    newPassword: "Teste@111"
  }
  const response = await request(app.getHttpServer())
    .patch('/users/auth/password')
    .send(newPassword)
    .expect(401)
  return response

})

it('Realizando logout perfil do usuário', async () => {
  const response = await request(app.getHttpServer())
    .post('/users/auth/logout')
    .set('Authorization', `Bearer ${authToken}`)
    .expect(201)

  return response
})