import request from "supertest"
import { app, authToken } from "../../global.e2e-spec"

it('Cadastrando vinculação de pessoa à família', async () => {
  const newPeopleFamily = {
    function: 'Desenvolvedor FullStack',
    people_id: '52bb9fde-b067-4632-b97c-38437065a774',
    family_id: 'b3299287-1a03-4428-95fe-ecd8d4f5de97'
  }

  const response = await request(app.getHttpServer())
    .post('/peopleFamily/register')
    .set('Authorization', `Bearer ${authToken}`)
    .send(newPeopleFamily)
    .expect(201)

  return response
})

it('Tentando cadastrar vinculação de pessoa à família. Id pessoa incorreto', async () => {
  const newPeopleFamily = {
    function: 'Desenvolvedor FullStack',
    people_id: '330136bf-b4ff-4fa8-a0f1-97d99ba121c1',
    family_id: '5617e59e-a226-4168-8a7a-4085f0b699de'
  }

  const response = await request(app.getHttpServer())
    .post('/peopleFamily/register')
    .set('Authorization', `Bearer ${authToken}`)
    .send(newPeopleFamily)
    .expect(404)
  return response
})

it('Tentando cadastrar vinculação de pessoa à família. Id família incorreto', async () => {
  const newPeopleFamily = {
    function: 'Desenvolvedor FullStack',
    people_id: '330136bf-b4ff-4fa8-a0f1-97d99ba121c0',
    family_id: '5617e59e-a226-4168-8a7a-4085f0b699da'
  }

  const response = await request(app.getHttpServer())
    .post('/peopleFamily/register')
    .set('Authorization', `Bearer ${authToken}`)
    .send(newPeopleFamily)
    .expect(404)

  return response
})

it('Tentando cadastrar vinculação de pessoa à família sem o token', async () => {
  const newPeopleFamily = {
    function: 'Desenvolvedor FullStack',
    people_id: '330136bf-b4ff-4fa8-a0f1-97d99ba121c0',
    family_id: '5617e59e-a226-4168-8a7a-4085f0b699de'
  }

  const response = await request(app.getHttpServer())
    .post('/peopleFamily/register')
    .send(newPeopleFamily)
    .expect(401)

  return response
})

it('Filtrando todas as pessoas vinculadas à família', async () => {
  const response = await request(app.getHttpServer())
    .get('/peopleFamily')
    .set('Authorization', `Bearer ${authToken}`)
    .expect(200)

  return response
})

it('Tentando filtrar todas as pessoas vinculadas à família sem o token', async () => {
  const response = await request(app.getHttpServer())
    .get('/peopleFamily')
    .expect(401)

  return response
})

it('Filtando pessoa vinculada à família específica', async () => {
  const idPeopleFamily = '5617e59e-a226-4168-8a7a-4085f0b699de'

  const response = await request(app.getHttpServer())
    .get(`/peopleFamily/${idPeopleFamily}`)
    .set('Authorization', `Bearer ${authToken}`)
    .expect(201)

  return response
})

it('Tentando filtrar pessoa vinculada à família específica. Id incorreto', async () => {
  const idPeopleFamily = '5617e59e-a226-4168-8a7a-4085f0b699da'

  const response = await request(app.getHttpServer())
    .get(`/peopleFamily/${idPeopleFamily}`)
    .set('Authorization', `Bearer ${authToken}`)
    .expect(404)

  return response
})

it('Tentando filtrar pessoa vinculada à família específica sem o token', async () => {
  const idPeopleFamily = '5617e59e-a226-4168-8a7a-4085f0b699de'

  const response = await request(app.getHttpServer())
    .get(`/peopleFamily/${idPeopleFamily}`)
    .expect(401)

  return response
})

it('Atualizando pessoa vinculada à família específica', async () => {
  const idPeopleFamily = '5617e59e-a226-4168-8a7a-4085f0b699de'

  const updatedPeopleFamily = {
    function: 'Desenvolvedor FullStack Jr',
  }

  const response = await request(app.getHttpServer())
    .patch(`/peopleFamily/${idPeopleFamily}`)
    .set('Authorization', `Bearer ${authToken}`)
    .send(updatedPeopleFamily)
    .expect(200)

  return response
})

it('Tentando atualizar pessoa vinculada à família específica. Id incorreto', async () => {
  const idPeopleFamily = '5617e59e-a226-4168-8a7a-4085f0b699da'

  const updatedPeopleFamily = {
    function: 'Desenvolvedor FullStack Jr',
  }

  const response = await request(app.getHttpServer())
    .patch(`/peopleFamily/${idPeopleFamily}`)
    .set('Authorization', `Bearer ${authToken}`)
    .send(updatedPeopleFamily)
    .expect(404)

  return response
})

it('Tentando atualizar pessoa vinculada à família específica sem o token', async () => {
  const idPeopleFamily = '5617e59e-a226-4168-8a7a-4085f0b699de'

  const updatedPeopleFamily = {
    function: 'Desenvolvedor FullStack Jr',
  }

  const response = await request(app.getHttpServer())
    .patch(`/peopleFamily/${idPeopleFamily}`)
    .send(updatedPeopleFamily)
    .expect(401)

  return response
})

it('Deletando pessoa vinculada à família específica', async () => {
  const idPeopleFamily = '5617e59e-a226-4168-8a7a-4085f0b699de'

  const response = await request(app.getHttpServer())
    .delete(`/peopleFamily/${idPeopleFamily}`)
    .set('Authorization', `Bearer ${authToken}`)
    .expect(200)

  return response
})

it('Tentando deletar pessoa vinculada à família específica. Id incorreto', async () => {
  const idPeopleFamily = '5617e59e-a226-4168-8a7a-4085f0b699da'

  const response = await request(app.getHttpServer())
    .delete(`/peopleFamily/${idPeopleFamily}`)
    .set('Authorization', `Bearer ${authToken}`)
    .expect(404)

  return response
})

it('Tentando deletar pessoa vinculada à família específica sem o token', async () => {
  const idPeopleFamily = '5617e59e-a226-4168-8a7a-4085f0b699de'

  const response = await request(app.getHttpServer())
    .delete(`/peopleFamily/${idPeopleFamily}`)
    .expect(401)

  return response
})