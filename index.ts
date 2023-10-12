import express, { Request, Response } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import Snip, { ISnip } from "./model/snipModel";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
const app = express();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI as string)
  .then((conn) => {
    console.log(`connected to db at ${conn.connection.host}`);
  })
  .catch((error) => {
    console.log(error.message, "wrong password");
    process.exit(1);
  });
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(() => );
// app.use(bodyParser.json());

// CRUD operations:

app.post("/snips", async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const snip: ISnip = new Snip(req.body);
    await snip.save();
    res.status(201).send(snip);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/snips", async (req: Request, res: Response) => {
  try {
    console.log("Reached Server");
    const rawSnips = await Snip.find();
    const snips = rawSnips.reverse();
    console.log(snips)

    res.send(snips);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.put("/snips/:id", async (req: Request, res: Response) => {
  try {
    console.log("Reached Server");
    const snip = await Snip.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.send(snip);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete("/snips/:id", async (req: Request, res: Response) => {
  try {
    console.log("Reached Server");
    const snip = await Snip.findByIdAndDelete(req.params.id);
    if (!snip) res.status(404).send("No snip found");
    res.status(200).send();
  } catch (error) {
    res.status(500).send(error);
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
