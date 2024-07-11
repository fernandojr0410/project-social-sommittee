import request from "supertest"
import { app, authToken } from "../../global.e2e-spec"

it('Cadastrando doações', async () => {
  const newDonation = {
    description: '2 pacotes de arroz, 1 pacote de feijão',
    state: 'PENDING',
    address_zip_code: '85630489',
    address_street: 'Rua Para',
    address_neighborhood: 'Neva',
    address_city: 'Cascavel',
    address_state: 'PR',
    donor_id: '9e009377-52c6-48bb-a8af-1d2caece0044'
  }

  const response = await request(app.getHttpServer())
    .post('/donation/register')
    .set('Authorization', `Bearer ${authToken}`)
    .send(newDonation)
    .expect(201)

  return response
})

it('Tentando cadastrar doações faltando campos', async () => {
  const newDonation = {
    description: '2 pacotes de arroz, 1 pacote de feijão',
    address_zip_code: '85630489',
    address_street: 'Rua Para',
    address_neighborhood: 'Neva',
    address_city: 'Cascavel',
    address_state: 'PR',
    donor_id: '947ab750-47e3-4906-ad99-f85989269b1f'
  }

  const response = await request(app.getHttpServer())
    .post('/donation/register')
    .set('Authorization', `Bearer ${authToken}`)
    .send(newDonation)
    .expect(400)

  return response
})

it('Tentando cadastrar doações sem o token', async () => {
  const newDonation = {
    description: '2 pacotes de arroz, 1 pacote de feijão',
    state: 'PENDING',
    address_zip_code: '85630489',
    address_street: 'Rua Para',
    address_neighborhood: 'Neva',
    address_city: 'Cascavel',
    address_state: 'PR',
    donor_id: '947ab750-47e3-4906-ad99-f85989269b1f'
  }

  const response = await request(app.getHttpServer())
    .post('/donation/register')
    .send(newDonation)
    .expect(401)

  return response
})

it('Filtrando todas as doações', async () => {
  const response = await request(app.getHttpServer())
    .get('/donation')
    .set('Authorization', `Bearer ${authToken}`)
    .expect(200)

  return response
})

it('Tentando filtrar todas as doações sem o token', async () => {
  const response = await request(app.getHttpServer())
    .get('/donation')
    .expect(401)

  return response
})

it('Filtrando doações específicas', async () => {
  const idDonation = '72d375bb-5584-4e10-9414-cf12edd57782'

  const response = await request(app.getHttpServer())
    .get(`/donation/${idDonation}`)
    .set('Authorization', `Bearer ${authToken}`)
    .expect(200)

  return response
})

it('Tentando filtrar doações específicas. Id incorreto', async () => {
  const idDonation = '72d375bb-5584-4e10-9414-cf12edd57783'

  const response = await request(app.getHttpServer())
    .get(`/donation/${idDonation}`)
    .set('Authorization', `Bearer ${authToken}`)
    .expect(404)

  return response
})

it('Tentando filtrar doações específicas sem o token', async () => {
  const idDonation = '72d375bb-5584-4e10-9414-cf12edd57782'

  const response = await request(app.getHttpServer())
    .get(`/donation/${idDonation}`)
    .expect(401)

  return response
})

it('Atualizando doações específicas', async () => {
  const idDonation = '72d375bb-5584-4e10-9414-cf12edd57782'

  const updatedDonation = {
    description: '3 pacotes de arroz, 2 pacotes de feijão'
  }

  const response = await request(app.getHttpServer())
    .patch(`/donation/${idDonation}`)
    .set('Authorization', `Bearer ${authToken}`)
    .send(updatedDonation)
    .expect(200)

  return response
})

it('Tentando atualizar doações específicas. Id incorreto', async () => {
  const idDonation = '72d375bb-5584-4e10-9414-cf12edd57783'

  const updatedDonation = {
    description: '3 pacotes de arroz, 2 pacotes de feijão'
  }

  const response = await request(app.getHttpServer())
    .patch(`/donation/${idDonation}`)
    .set('Authorization', `Bearer ${authToken}`)
    .send(updatedDonation)
    .expect(404)

  return response
})

it('Tentando atualizar doações específicas sem o token', async () => {
  const idDonation = '72d375bb-5584-4e10-9414-cf12edd57782'

  const updatedDonation = {
    description: '3 pacotes de arroz, 2 pacotes de feijão'
  }

  const response = await request(app.getHttpServer())
    .patch(`/donation/${idDonation}`)
    .send(updatedDonation)
    .expect(401)

  return response
})

it('Deletando doações específicas', async () => {
  const idDonation = '72d375bb-5584-4e10-9414-cf12edd57782'

  const response = await request(app.getHttpServer())
    .delete(`/donation/${idDonation}`)
    .set('Authorization', `Bearer ${authToken}`)
    .expect(200)

  return response
})

it('Tentando deletar doações específicas. Id incorreto', async () => {
  const idDonation = '72d375bb-5584-4e10-9414-cf12edd57783'

  const response = await request(app.getHttpServer())
    .delete(`/donation/${idDonation}`)
    .set('Authorization', `Bearer ${authToken}`)
    .expect(404)

  return response
})

it('Tentando deletar doações específicas sem o token', async () => {
  const idDonation = '72d375bb-5584-4e10-9414-cf12edd57782'

  const response = await request(app.getHttpServer())
    .delete(`/donation/${idDonation}`)
    .expect(401)

  return response
})