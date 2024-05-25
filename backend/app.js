import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app=express();

app.use(cors());
// app.use(cors({
    //     origin: process.env.CORS_ORIGIN,
    //     credentials: true
    // }));
    
    app.use(express.json({limit:"16kb"})); // agar form ka data json formate me aata he to use is middleware se use kiya jata he phle body-parser bhi use kiya jaat tha 
    app.use(urlencoded({extended:true,limit:"16kb"})); // jab url me data aata he to bo diffrent diffrent charecter leta he use shi formate me change krta he 
    app.use(express.static("public")) // agar hame koi cheej server pr store krna he to yha uska path dena hota he ye middleware usi kam me aata he 
    
    app.use(cookieParser()) // iska use ham isiliye krte he ki jab ham client side pr store cookie pr server se read writew operation kr ske 
    
    //import routes
    import publicRoutes from './routes/public.routes.js';
     import sellerRoutes from './routes/seller.routes.js';
     import buyerRoutes from './routes/buyer.routes.js';
    
     app.get('/', (req, res) => {
        res.send('Hey this is my API running 🥳')
      })
    app.use('/api/v1/auth',publicRoutes);
    app.use('/api/v1/seller',sellerRoutes);
    app.use('/api/v1/buyer',buyerRoutes);

export {app};