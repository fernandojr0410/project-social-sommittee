import request from "supertest"
import { app, authToken } from "../../global.e2e-spec"

it('Anexando arquivo', async () => {
  const newAttachment = {
    file_path: '/Users/fernandojunior/Downloads/equipamento.png',
    user_id: '97e4cff7-37a3-4c6a-bf28-1ff10aae5da0',
    donation_id: 'bc031f37-69ac-4b38-bb30-e937c8eaf119'
  };
  const response = await request(app.getHttpServer())
    .post('/attachment/register')
    .set('Authorization', `Bearer ${authToken}`)
    .send(newAttachment)
    .expect(201);

  console.log('Arquivo anexado:', response.body);
  return response
});

it('Tentando anexar arquivo faltando campo', async () => {
  const newAttachment = {
    user_id: '97e4cff7-37a3-4c6a-bf28-1ff10aae5da0',
    donation_id: 'bc031f37-69ac-4b38-bb30-e937c8eaf119'
  };
  const response = await request(app.getHttpServer())
    .post('/attachment/register')
    .set('Authorization', `Bearer ${authToken}`)
    .send(newAttachment)
    .expect(400)

  return response
})

it('Tentando anexar arquivo sem o tokn', async () => {
  const newAttachment = {
    file_path: '/Users/fernandojunior/Downloads/equipamento.png',
    user_id: '97e4cff7-37a3-4c6a-bf28-1ff10aae5da0',
    donation_id: 'bc031f37-69ac-4b38-bb30-e937c8eaf119'
  };
  const response = await request(app.getHttpServer())
    .post('/attachment/register')
    .send(newAttachment)
    .expect(401);

  console.log('Arquivo anexado:', response.body);
  return response
});

it('Filtrando todos anexos', async () => {
  const response = await request(app.getHttpServer())
    .get('/attachment')
    .set('Authorization', `Bearer ${authToken}`)
    .expect(200)

  return response
})

it('Tentando filtrar todos anexos sem o token', async () => {
  const response = await request(app.getHttpServer())
    .get('/attachment')
    .expect(401)

  return response
})

it('Filtrando anexo específico', async () => {
  const idAttachment = 'b49f8c12-fe1a-4a4f-ba8c-ee86b7dab8eb'
  const response = await request(app.getHttpServer())
    .get(`/attachment/${idAttachment}`)
    .set('Authorization', `Bearer ${authToken}`)
    .expect(200)

  return response
})

it('Tentando filtrar anexo específico. Id incorreto', async () => {
  const idAttachment = 'b49f8c12-fe1a-4a4f-ba8c-ee86b7dab8ec'
  const response = await request(app.getHttpServer())
    .get(`/attachment/${idAttachment}`)
    .set('Authorization', `Bearer ${authToken}`)
    .expect(404)

  return response
})

it('Tentando filtrar anexo específico sem o token', async () => {
  const idAttachment = 'b49f8c12-fe1a-4a4f-ba8c-ee86b7dab8eb'
  const response = await request(app.getHttpServer())
    .get(`/attachment/${idAttachment}`)
    .expect(401)

  return response
})

it('Atualizando anexo específico', async () => {
  const idAttachment = 'b49f8c12-fe1a-4a4f-ba8c-ee86b7dab8eb'

  const updatedAttachment = {
    file_path: '/Users/fernandojunior/Downloads/control-id-1.png'
  }
  const response = await request(app.getHttpServer())
    .patch(`/attachment/${idAttachment}`)
    .set('Authorization', `Bearer ${authToken}`)
    .send(updatedAttachment)
    .expect(200)

  return response
})

it('Tentando atualizar anexo específico. Id incorreto', async () => {
  const idAttachment = 'b49f8c12-fe1a-4a4f-ba8c-ee86b7dab8ec'

  const updatedAttachment = {
    file_path: '/Users/fernandojunior/Downloads/control-id-1.png'
  }
  const response = await request(app.getHttpServer())
    .patch(`/attachment/${idAttachment}`)
    .set('Authorization', `Bearer ${authToken}`)
    .send(updatedAttachment)
    .expect(404)

  return response
})

it('Tentando atualizar anexo específico sem o token', async () => {
  const idAttachment = 'b49f8c12-fe1a-4a4f-ba8c-ee86b7dab8eb'

  const updatedAttachment = {
    file_path: '/Users/fernandojunior/Downloads/control-id-1.png'
  }
  const response = await request(app.getHttpServer())
    .patch(`/attachment/${idAttachment}`)
    .send(updatedAttachment)
    .expect(401)

  return response
})

it('Deletando anexo específico', async () => {
  const idAttachment = 'b49f8c12-fe1a-4a4f-ba8c-ee86b7dab8eb'

  const response = await request(app.getHttpServer())
    .delete(`attachment/${idAttachment}`)
    .set('Authorization', `Bearer ${authToken}`)
    .expect(200)

  return response
})

it('Tentando deletar anexo específico. Id incorreto', async () => {
  const idAttachment = 'b49f8c12-fe1a-4a4f-ba8c-ee86b7dab8ec'

  const response = await request(app.getHttpServer())
    .delete(`attachment/${idAttachment}`)
    .set('Authorization', `Bearer ${authToken}`)
    .expect(404)

  return response
})

it('Tentando deletar anexo específico sem o token', async () => {
  const idAttachment = 'b49f8c12-fe1a-4a4f-ba8c-ee86b7dab8eb'

  const response = await request(app.getHttpServer())
    .delete(`attachment/${idAttachment}`)
    .expect(401)

  return response
})