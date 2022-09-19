import dotenv from 'dotenv';
import app from './index';


dotenv.config();

const PORT = Number(process.env.PORT) || 5000;
app.listen(PORT, () => {
  console.log(`Server online at: ${PORT}`);
});