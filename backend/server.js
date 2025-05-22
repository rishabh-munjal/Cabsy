import app from "./app.js";
import http from "http";
import dotenv from 'dotenv';

import { initializeSocket } from './socket.js';


dotenv.config();

const PORT = process.env.PORT || 3000;


const server = http.createServer(app);

initializeSocket(server);



server.listen(PORT , () => {
    console.log(`Server is running on port ${PORT}`);
})