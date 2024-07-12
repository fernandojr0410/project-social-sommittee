import request from "supertest"
import { app, authToken } from "../../global.e2e-spec"
import { decode } from 'jsonwebtoken';

// Função para decodificar o token JWT e extrair o ID do usuário
const getUserIdFromToken = (token: string): string | null => {
  try {
    const decoded: any = decode(token);
    return decoded?.id ?? null; // Ajuste conforme a estrutura do seu token
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

it('Anexando um arquivo', async () => {
  const userId = getUserIdFromToken(authToken);
  const newAttachment = {
    name: 'equipamento.png',
    user_id: userId,
    donation_id: 'bc031f37-69ac-4b38-bb30-e937c8eaf119'
  };

  const response = await request(app.getHttpAdapter())
    .post('/attachment/register')
    .set('Authorization', `Bearer ${authToken}`)
    .field('name', newAttachment.name) // Adiciona outros campos como campos de formulário
    .field('user_id', newAttachment.user_id)
    .field('donation_id', newAttachment.donation_id)
    .attach('file', '/Users/fernandojunior/Downloads/equipamento.png') // Usa .attach() para anexar o arquivo
    .expect(201);

  console.log("arquivo anexado", response.body);
  return response;
});