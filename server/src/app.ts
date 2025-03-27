import express,{Request,Response} from "express";
import config from "config"
import "./utils/dbConnect"



const PORT : string = config.get<string>("PORT") 

const app = express();

app.get("/",(req:Request,res:Response) : void=>{
    res.json({message : "heloo"})
})

// converting port from string to number before listening
app.listen(Number(PORT),()=>{
    console.log("server is running at localhost:5000")
})