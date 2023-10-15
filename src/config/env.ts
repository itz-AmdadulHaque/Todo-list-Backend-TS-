import { cleanEnv, str } from 'envalid'

const env = cleanEnv(process.env, {
    PORT: str(),
    DB_URL: str()
});

export default env;