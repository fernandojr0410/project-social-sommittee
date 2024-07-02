import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from './app.module';

export let app: INestApplication;
export let authToken: string;

beforeAll(async () => {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleRef.createNestApplication();

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true
  }));

  await app.init();

  try {
    const authResponse = await request(app.getHttpServer())
      .post('/users/auth/login')
      .send({ email: 'fernando.solomonbusiness@gmail.com', password: 'dcFwLB^4KW9f' })
      .expect(201);

    authToken = authResponse.body.access_token;
    expect(authToken).toBeDefined();
  } catch (error) {
    console.error('Error during authentication:', error);
    throw error;
  }
}, 30000);

afterAll(async () => {
  await app.close();
});

describe('Global setup', () => {
  it('should have a valid auth token', () => {
    expect(authToken).toBeDefined();
  });
});
