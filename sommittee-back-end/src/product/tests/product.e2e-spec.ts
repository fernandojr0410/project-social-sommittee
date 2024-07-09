import request from 'supertest';
import { app, authToken } from '../../global.e2e-spec';

it('Cadastrando produto', async () => {
  const newProduct = {
    name: 'Camiseta feminina',
    description: 'Camiseta feminina adidas, rosa, manga curta, tamanho M',
    type: 'Camisetas'
  }

  const response = await request(app.getHttpServer())
    .post('/product/register')
    .set('Authorization', `Bearer ${authToken}`)
    .send(newProduct)
    .expect(201)

  return response;
});

it('Tentando cadastrar produto faltando campos', async () => {
  const newProduct = {
    name: 'Camiseta masculina',
    description: 'Camiseta masculina nike, preto, manga curta, tamanho G',
  };

  const response = await request(app.getHttpServer())
    .post('/product/register')
    .set('Authorization', `Bearer ${authToken}`)
    .send(newProduct)
    .expect(400);

  return response;
});


it('Tentando cadastrar produto sem o token', async () => {
  const newProduct = {
    name: 'Camiseta masculina',
    description: 'Camiseta masculina nike, preto, manga curta, tamanho G',
    type: 'Camisetas'
  }

  const response = await request(app.getHttpServer())
    .post('/product')
    .set('Authorization', `Bearer ${authToken}`)
    .send(newProduct)
    .expect(401)

  return response
})

it('Filtrando todos produtos', async () => {
  const response = await request(app.getHttpServer())
    .get('/product')
    .set('Authorization', `Bearer ${authToken}`)
    .expect(200)

  return response
})

// it('Tentando filtrar todos produtos sem o token', async () => {
//   const response = await request(app.getHttpServer())
//     .get('/product')
//     .expect(401)

//   return response
// })

// it('Filtrando produto específico', async () => {
//   const idProduct = '641956e4-5113-482e-8a62-de185f241a7a'

//   const response = await request(app.getHttpServer())
//     .get(`/product/${idProduct}`)
//     .set('Authorization', `Bearer ${authToken}`)
//     .expect(200)

//   return response
// })

it('Tentando filtrar produto específico. Id incorreto', async () => {
  const idProduct = '641956e4-5113-482e-8a62-de185f241a7b'

  const response = await request(app.getHttpServer())
    .get(`/product/${idProduct}`)
    .set('Authorization', `Bearer ${authToken}`)
    .expect(404)

  return response
})

// it('Tentando filtrar produto específico sem o token', async () => {
//   const idProduct = '641956e4-5113-482e-8a62-de185f241a7a'

//   const response = await request(app.getHttpServer())
//     .get(`/product/${idProduct}`)
//     .expect(401)

//   return response
// })

// it('Atualizando produto específico', async () => {
//   const idProduct = '641956e4-5113-482e-8a62-de185f241a7a'

//   const updatedData = {
//     description: 'Camiseta masculina adidas, preto, manga curta, tamanho G'
//   }

//   const response = await request(app.getHttpServer())
//     .patch(`/product/${idProduct}`)
//     .set('Authorization', `Bearer ${authToken}`)
//     .send(updatedData)
//     .expect(200)

//   return response
// })

// it('Tentando atualizar produto específico. Id incorreto', async () => {
//   const idProduct = '641956e4-5113-482e-8a62-de185f241a7b'

//   const updatedData = {
//     description: 'Camiseta masculina adidas, preto, manga curta, tamanho G'
//   }

//   const response = await request(app.getHttpServer())
//     .patch(`/product/${idProduct}`)
//     .set('Authorization', `Bearer ${authToken}`)
//     .send(updatedData)
//     .expect(404)

//   return response
// })

// it('Tentando atualizar produto específico sem o token', async () => {
//   const idProduct = '641956e4-5113-482e-8a62-de185f241a7a'

//   const updatedData = {
//     description: 'Camiseta masculina adidas, preto, manga curta, tamanho G'
//   }

//   const response = await request(app.getHttpServer())
//     .patch(`/product/${idProduct}`)
//     .send(updatedData)
//     .expect(401)

//   return response
// })

// it('Deletando produto específico', async () => {
//   const idProduct = '641956e4-5113-482e-8a62-de185f241a7a'

//   const response = await request(app.getHttpServer())
//     .delete(`/product/${idProduct}`)
//     .set('Authorization', `Bearer ${authToken}`)
//     .expect(200)

//   return response
// })

// it('Tentando deletar produto específico. Id incorreto', async () => {
//   const idProduct = '641956e4-5113-482e-8a62-de185f241a7b'

//   const response = await request(app.getHttpServer())
//     .delete(`/product/${idProduct}`)
//     .set('Authorization', `Bearer ${authToken}`)
//     .expect(404)

//   return response
// })

// it('Tentando deletar produto específico sem o token', async () => {
//   const idProduct = '641956e4-5113-482e-8a62-de185f241a7a'

//   const response = await request(app.getHttpServer())
//     .delete(`/product/${idProduct}`)
//     .expect(401)

//   return response
// })