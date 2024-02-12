import { ormconfig } from '../../orm.config';

export const jwtConstants = {
  secret: ormconfig.password as string,
};
