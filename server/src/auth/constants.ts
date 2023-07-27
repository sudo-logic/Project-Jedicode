import { ormconfig } from 'src/orm.config';

export const jwtConstants = {
  secret: ormconfig.password,
};
