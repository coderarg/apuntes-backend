import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { hashSync, compareSync, genSaltSync } from 'bcrypt';

export const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Método que recibe password sin hashear y retorna password hasheada
 * @param { string } password
 * @returns { string } password hasheada
 * @example 
 * createHash('1234')
 */
export const createHash = password => hashSync(password, genSaltSync(10));

/**
 * Método que compara password hasheada con password de login
 * @param { string } user 
 * @param { string } password
 * @returns boolean
 */
export const isValidPassword = (password, user) => compareSync(password, user.password);