import express from "express";
import cors from 'cors';
import connectDB from "./config/db.js";

import userRoutes from "./routes/user.routes.js"
import captainRoutes from "./routes/captain.routes.js";
import mapsRoutes from "./routes/maps.routes.js";

connectDB();



const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.get('/' , (req , res) => {
    res.send('Hello World!')
})

app.use('/api/user' , userRoutes );
app.use('/api/captain' , captainRoutes );
app.use('/api/maps' , mapsRoutes );


export default app;
