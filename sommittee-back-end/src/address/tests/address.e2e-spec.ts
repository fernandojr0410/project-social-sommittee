// import request from 'supertest';
// import { Test } from '@nestjs/testing';
// import { INestApplication } from '@nestjs/common';
// import { AppModule } from '../../app.module'

// describe('Address', () => {
//   let app: INestApplication;

//   beforeAll(async () => {

//     const moduleRef = await Test.createTestingModule({
//       imports: [AppModule]
//     })
//       .compile();

//     app = moduleRef.createNestApplication();
//     await app.init();

//     it(`/POST users`, () => {
//       return request(app.getHttpServer())
//         .post('/users/auth/login')
//         .send({ email: 'jeferson.guido@gmail.com', password: 'Teste@123' })
//         .expect(201)
//         .then((response) => {
//           const { token } = response.body.token
//           expect(token).toBeDefined()
//           return token
//         })
//     })

//   });

//   // it(`/GET address`, () => {
//   //   return request(app.getHttpServer())
//   //     .get('/address')
//   //     .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImplZmVyc29uLmd1aWRvQGdtYWlsLmNvbSIsImlkIjoiNzM1MTFkMGEtNWMzZS00MDI4LTk1OTMtMTgwNjA1ZjY5YWIxIiwiaWF0IjoxNzE5NDAzODk4LCJleHAiOjE3MTk0OTAyOTh9.132Sb-Z-Y-69b_svnumCQ9MN0sKg1TfVOJg350LPj6s')
//   //     .expect(200)
//   // });

//   it(`/GET address`, async () => {
//     const token = await request(app.getHttpServer())
//       .post('/users/auth')
//       .send({ email: 'jeferson.guido@gmail.com', password: 'Teste@123' })
//       .expect(201)
//       .then((response) => response.body.token)

//     return request(app.getHttpServer())
//       .get('/address')
//       .set('Authorization', `Bearer ${token}`)
//       .expect(200)
//   })

//   afterAll(async () => {
//     await app.close();
//   });

// })


import request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../app.module';

describe('Address', () => {
  let app: INestApplication;
  let token: string;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  // it('/POST users/auth/login', async () => {
  //   const response = await request(app.getHttpServer())
  //     .post('/users/auth/login')
  //     .send({ email: 'jeferson.guido@gmail.com', password: 'Teste@123' })
  //     .expect(201);

  //   const { access_token: authToken } = response.body;
  //   expect(authToken).toBeDefined();

  //   token = authToken;
  // });


  it('/POST - users/auth/login', async () => {
    const authResponse = await request(app.getHttpServer())
      .post('/users/auth/login')
      .send({ email: 'jeferson.guido@gmail.com', password: 'Teste@123' })
      .expect(201);

    const authToken = authResponse.body.access_token;
    expect(authToken).toBeDefined();
    console.log(authToken);


    try {
      const response = await request(app.getHttpServer())
        .get('/address')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      console.log("Requisição GET /address:", response.body);
      return response;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error("Token Inválido!");
        throw error;
      } else {
        console.error("Erro requisição GET /address:", error.message);
        throw error;
      }
    }
  })
})