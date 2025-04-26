import { app } from "@/app";
import "dotenv/config"; //carrega o '.env' automaticamente

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
