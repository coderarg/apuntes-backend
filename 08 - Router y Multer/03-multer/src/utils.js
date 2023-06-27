import { dirname } from 'path';
import { fileURLToPath} from 'URL';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default __dirname;