import {dirname} from 'path';
import { fileURLToPath } from 'url';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';

export const __dirname = dirname(fileURLToPath(import.meta.url));

export const createHash = (password) => hashSync(password, genSaltSync(10));
export const isValidPassword = (password, user) => compareSync(password, user.password);

