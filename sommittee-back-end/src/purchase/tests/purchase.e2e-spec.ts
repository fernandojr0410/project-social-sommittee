import request from "supertest"
import { app, authToken } from "../../global.e2e-spec"

// it('Cadastrando compra', async () => {
//   const newPurchase = {
//     purchase_date: '17/07/2024',
//     supplier: 'Rogério da Silva',
//     value_amount: 200,
//     status: 'pago',
//     receipt_id: 'c42f7f59-08b9-4c43-a121-838330c676dc',
//     stock_id: '6b940c80-1549-4274-9152-4c0775fe27ba'
//   }
//   const response = await request(app.getHttpServer())
//     .post('/purchase/register')
//     .set('Authorization', `Bearer ${authToken}`)
//     .send(newPurchase)
//     .expect(201)
//   return response
// })

it('Tentando cadastrar compra faltando campos', async () => {
  const newPurchase = {
    purchase_date: '17/07/2024',
    value_amount: 200,
    status: 'pago',
    receipt_id: 'c42f7f59-08b9-4c43-a121-838330c676dc',
    stock_id: '6b940c80-1549-4274-9152-4c0775fe27ba'
  }
  const response = await request(app.getHttpServer())
    .post('/purchase/register')
    .set('Authorization', `Bearer ${authToken}`)
    .send(newPurchase)
    .expect(400)
  return response
})

// it('Tentando cadastrar compra sem o token', async () => {
//   const newPurchase = {
//     purchase_date: '17/07/2024',
//     supplier: 'Rogério da Silva',
//     value_amount: 200,
//     status: 'pago',
//     receipt_id: 'c42f7f59-08b9-4c43-a121-838330c676dc',
//     stock_id: '6b940c80-1549-4274-9152-4c0775fe27ba'
//   }
//   const response = await request(app.getHttpServer())
//     .post('/purchase/register')
//     .send(newPurchase)
//     .expect(401)
//   return response
// })

// it('Filtrando todas as compras', async () => {
//   const response = await request(app.getHttpServer())
//     .get('/purchase')
//     .set('Authorization', `Bearer ${authToken}`)
//     .expect(200)

//   return response
// })

// it('Tentando filtrar todas as compras sem o token', async () => {
//   const response = await request(app.getHttpServer())
//     .get('/purchase')
//     .expect(401)

//   return response
// })

// it('Filtrando compra específica', async () => {
//   const idPurchase = '2ff7652d-13d6-49ac-a60a-1708058d4bad'
//   const response = await request(app.getHttpServer())
//     .get(`/purchase/${idPurchase}`)
//     .set('Authorization', `Bearer ${authToken}`)
//     .expect(200)

//   return response
// })

// it('Tentando filtrar compra específica. Id incorreto', async () => {
//   const idPurchase = '2ff7652d-13d6-49ac-a60a-1708058d4bae'
//   const response = await request(app.getHttpServer())
//     .get(`/purchase/${idPurchase}`)
//     .set('Authorization', `Bearer ${authToken}`)
//     .expect(404)

//   return response
// })

// it('Tentando filtrar compra específica sem o token', async () => {
//   const idPurchase = '2ff7652d-13d6-49ac-a60a-1708058d4bad'
//   const response = await request(app.getHttpServer())
//     .get(`/purchase/${idPurchase}`)
//     .expect(401)

//   return response
// })

// it('Atualizando compra específica', async () => {
//   const idPurchase = '2ff7652d-13d6-49ac-a60a-1708058d4bad'

//   const updatedData = {
//     status: 'Pendente'
//   }
//   const response = await request(app.getHttpServer())
//     .patch(`/purchase/${idPurchase}`)
//     .set('Authorization', `Bearer ${authToken}`)
//     .send(updatedData)
//     .expect(200)

//   return response
// })

// it('Tentando atualizar compra específica. Id incorreto', async () => {
//   const idPurchase = '2ff7652d-13d6-49ac-a60a-1708058d4bae'

//   const updatedData = {
//     status: 'Pendente'
//   }
//   const response = await request(app.getHttpServer())
//     .patch(`/purchase/${idPurchase}`)
//     .set('Authorization', `Bearer ${authToken}`)
//     .send(updatedData)
//     .expect(404)

//   return response
// })

// it('Tentando atualizar compra específica sem o token', async () => {
//   const idPurchase = '2ff7652d-13d6-49ac-a60a-1708058d4bad'

//   const updatedData = {
//     status: 'Pendente'
//   }
//   const response = await request(app.getHttpServer())
//     .patch(`/purchase/${idPurchase}`)
//     .send(updatedData)
//     .expect(401)

//   return response
// })

// it('Deletando compra específica', async () => {
//   const idPurchase = '2ff7652d-13d6-49ac-a60a-1708058d4bad'

//   const response = await request(app.getHttpServer())
//     .delete(`/purchase/${idPurchase}`)
//     .set('Authorization', `Bearer ${authToken}`)
//     .expect(200)

//   return response
// })

// it('Tentando deletar compra específica. Id incorreto', async () => {
//   const idPurchase = '2ff7652d-13d6-49ac-a60a-1708058d4bae'

//   const response = await request(app.getHttpServer())
//     .delete(`/purchase/${idPurchase}`)
//     .set('Authorization', `Bearer ${authToken}`)
//     .expect(404)

//   return response
// })

// it('Tentando deletar compra específica sem o token', async () => {
//   const idPurchase = '2ff7652d-13d6-49ac-a60a-1708058d4bad'

//   const response = await request(app.getHttpServer())
//     .delete(`/purchase/${idPurchase}`)
//     .expect(401)

//   return response
// })