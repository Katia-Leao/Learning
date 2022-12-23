//neste arquivo vão estar todas as características do usuário

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  adresses: object;
  purchases: object;
}
