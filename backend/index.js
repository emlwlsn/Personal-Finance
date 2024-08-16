import express from "express";
import mongoose from "mongoose";
import financialRecordRouter from "./routes/financial-records.js";
import cors from 'cors';

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

const mongoURI = "mongodb+srv://emilwilson25:Vc2UVdhFF1h94L0p@personalfinance.qlokvnp.mongodb.net/?retryWrites=true&w=majority&appName=PersonalFinance";

mongoose
    .connect(mongoURI)
    .then(() => {console.log('Connected to MongoDB');})
    .catch((err) => console.error("Failed to connect to MongoDB: ", err));

app.use('/financial-records', financialRecordRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});