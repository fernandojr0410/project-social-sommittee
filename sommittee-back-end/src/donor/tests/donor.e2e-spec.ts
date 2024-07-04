import request from "supertest"
import { app, authToken } from "../../global.e2e-spec"

it('Cadastrando doador', async () => {
  const newDonor = {
    name: 'Cleber',
    surname: 'Rogerio',
    cpf: '76943641033',
    email: 'cleber.rogerio@email.com',
    contact: '45999536894',
    type_donor: 'INTERNAL'
  }

  const response = await request(app.getHttpServer())
    .post('/donor/register')
    .set(`Authorization`, `Bearer ${authToken}`)
    .send(newDonor)
    .expect(201)

  return response
})

it('Tentando cadastrar doador sem o token', async () => {
  const newDonor = {
    name: 'Cleber',
    surname: 'Rogerio',
    cpf: '76943641033',
    email: 'cleber.rogerio@email.com',
    contact: '45999536894',
    type_donor: 'INTERNAL'
  }

  const response = await request(app.getHttpServer())
    .post('/donor/register')
    .send(newDonor)
    .expect(401)
  console.log("Cadastrado doador", response.body)
  return response
})

it('Filtrando todos doadores', async () => {
  const response = await request(app.getHttpServer())
    .get('/donor')
    .set('Authorization', `Bearer ${authToken}`)
    .expect(200)

  return response
})

it('Tentando filtrar todos doadores sem o token', async () => {
  const response = await request(app.getHttpServer())
    .get('/donor')
    .expect(401)

  return response
})

it('Filtrando doador específico', async () => {
  const idDonor = '947ab750-47e3-4906-ad99-f85989269b1f'

  const response = await request(app.getHttpServer())
    .get(`/donor/${idDonor}`)
    .set('Authorization', `Bearer ${authToken}`)
    .expect(200)

  return response
})

it('Tentando filtrar doador específico. Id incorreto', async () => {
  const idDonor = '947ab750-47e3-4906-ad99-f85989269b1g'

  const response = await request(app.getHttpServer())
    .get(`/donor/${idDonor}`)
    .set('Authorization', `Bearer ${authToken}`)
    .expect(404)

  return response
})

it('Tentando filtrar doadores específicos sem o token', async () => {
  const response = await request(app.getHttpServer())
    .get('/donor')
    .expect(401)

  return response
})

it('Atualizando doador específico', async () => {
  const idDonor = '947ab750-47e3-4906-ad99-f85989269b1f'

  const updatedDonor = {
    name: 'Marcos'
  }

  const response = await request(app.getHttpServer())
    .patch(`/donor/${idDonor}`)
    .set('Authorization', `Bearer ${authToken}`)
    .send(updatedDonor)
    .expect(200)

  return response
})

it('Tentando atualizar doador específico. Id incorreto', async () => {
  const idDonor = '947ab750-47e3-4906-ad99-f85989269b1g'

  const updatedDonor = {
    name: 'Marcos'
  }

  const response = await request(app.getHttpServer())
    .patch(`/donor/${idDonor}`)
    .set('Authorization', `Bearer ${authToken}`)
    .send(updatedDonor)
    .expect(404)

  return response
})

it('Tentando atualizar doador específico sem o token', async () => {
  const idDonor = '947ab750-47e3-4906-ad99-f85989269b1f'

  const updatedDonor = {
    name: 'Marcos'
  }

  const response = await request(app.getHttpServer())
    .patch(`/donor/${idDonor}`)
    .send(updatedDonor)
    .expect(401)

  return response
})

it('Deletando doador específico', async () => {
  const idDonor = '947ab750-47e3-4906-ad99-f85989269b1f'

  const response = await request(app.getHttpServer())
    .delete(`/donor/${idDonor}`)
    .set('Authorization', `Bearer ${authToken}`)
    .expect(200)

  return response
})

it('Tentando deletar doador específico. Id incorreto', async () => {
  const idDonor = '947ab750-47e3-4906-ad99-f85989269b1g'

  const response = await request(app.getHttpServer())
    .delete(`/donor/${idDonor}`)
    .set('Authorization', `Bearer ${authToken}`)
    .expect(404)

  return response
})

it('Tentando deletar doador específico sem o token', async () => {
  const idDonor = '947ab750-47e3-4906-ad99-f85989269b1f'

  const response = await request(app.getHttpServer())
    .delete(`/donor/${idDonor}`)
    .expect(401)

  return response
})