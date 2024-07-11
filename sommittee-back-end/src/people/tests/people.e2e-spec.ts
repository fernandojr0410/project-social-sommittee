import request from 'supertest'
import { app, authToken } from '../../global.e2e-spec'

it('Cadastrando pessoas', async () => {
  const newPeople = {
    name: 'João',
    surname: 'Marcos',
    cpf: '09806224922',
    email: 'joao.marcos@email.com',
    birth_date: '04102002',
    gender: 'MALE',
    telephone: '45999174178',
    work: true,
    education: 'Ensino superior incompleto (cursando)',
    address_id: 'df7dc535-5d46-4282-8de4-7989cf3f6632'
  }

  const response = await request(app.getHttpServer())
    .post('/people/register')
    .set('Authorization', `Bearer ${authToken}`)
    .send(newPeople)
    .expect(201)

  return response
})

it('Tentando cadastrar People sem o token', async () => {
  const newPeople = {
    name: 'Fernando',
    surname: 'Junior',
    birth_date: '04/10/2002',
    gender: 'MALE',
    telephone: '(45) 99917-4178',
    work: true,
    education: 'Ensino superior incompleto (cursando)',
    address_id: '02fec399-ede8-46ef-9a3e-c98b37e8e4d3'
  }

  const response = await request(app.getHttpServer())
    .post('/people/register')
    .send(newPeople)
    .expect(401)

  return response
})

it('Filtrando todas as pessoas', async () => {
  const response = await request(app.getHttpServer())
    .get('/people')
    .set('Authorization', `Bearer ${authToken}`)
    .expect(200)

  return response
})

it('Tentando filtrar todas as pessoas sem o token', async () => {
  const response = await request(app.getHttpServer())
    .get('/people')
    .expect(401)

  return response
})

it('Filtrando pessoa específica', async () => {
  const idPeople = '330136bf-b4ff-4fa8-a0f1-97d99ba121c0'

  const response = await request(app.getHttpServer())
    .get(`/people/${idPeople}`)
    .set('Authorization', `Bearer ${authToken}`)
    .expect(200)

  return response
})

it('Tentando filtrar pessoa específica id incorreto', async () => {
  const idPeople = '330136bf-b4ff-4fa8-a0f1-97d99ba121c1'

  const response = await request(app.getHttpServer())
    .get(`/people/${idPeople}`)
    .set('Authorization', `Bearer ${authToken}`)
    .expect(404)

  return response
})

it('Tentando filtrar pessoa específica sem o token', async () => {
  const idPeople = '330136bf-b4ff-4fa8-a0f1-97d99ba121c1'

  const response = await request(app.getHttpServer())
    .get(`/people/${idPeople}`)
    .expect(401)
  return response
})

it('Atualizando pessoa', async () => {

  const idPeople = '330136bf-b4ff-4fa8-a0f1-97d99ba121c0'

  const updatedPeople = {
    name: 'João',
    surname: 'Fernandes',
  }

  const resposne = await request(app.getHttpServer())
    .patch(`/people/${idPeople}`)
    .set('Authorization', `Bearer ${authToken}`)
    .send(updatedPeople)
    .expect(200)

  return resposne
})

it('Tentando atualizar pessoa id incorreto', async () => {

  const idPeople = '330136bf-b4ff-4fa8-a0f1-97d99ba121ca'

  const updatedPeople = {
    name: 'João',
    surname: 'Fernandes',
  }

  const resposne = await request(app.getHttpServer())
    .patch(`/people/${idPeople}`)
    .set('Authorization', `Bearer ${authToken}`)
    .send(updatedPeople)
    .expect(404)

  return resposne
})

it('Tentando atualizar pessoa sem o token', async () => {

  const idPeople = '330136bf-b4ff-4fa8-a0f1-97d99ba121ca'

  const updatedPeople = {
    name: 'João',
    surname: 'Fernandes',
  }

  const resposne = await request(app.getHttpServer())
    .patch(`/people/${idPeople}`)
    .send(updatedPeople)
    .expect(401)

  return resposne
})

it('Deletando pessoa específica', async () => {
  const idPeople = '330136bf-b4ff-4fa8-a0f1-97d99ba121c0'

  const response = await request(app.getHttpServer())
    .get(`/people/${idPeople}`)
    .set('Authorization', `Bearer ${authToken}`)
    .expect(200)

  return response
})

it('Tentando deletar pessoa específica id incorreto', async () => {
  const idPeople = '330136bf-b4ff-4fa8-a0f1-97d99ba121c1'

  const response = await request(app.getHttpServer())
    .get(`/people/${idPeople}`)
    .set('Authorization', `Bearer ${authToken}`)
    .expect(404)

  return response
})

it('Tentando deletar pessoa específica sem o token', async () => {
  const idPeople = '330136bf-b4ff-4fa8-a0f1-97d99ba121c1'

  const response = await request(app.getHttpServer())
    .get(`/people/${idPeople}`)
    .expect(401)
  return response
})