"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const snipModel_1 = __importDefault(require("./model/snipModel"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Connect to MongoDB
mongoose_1.default
    .connect(process.env.MONGO_URI)
    .then((conn) => {
    console.log(`connected to db at ${conn.connection.host}`);
})
    .catch((error) => {
    console.log(error.message, "wrong password");
    process.exit(1);
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// app.use(() => );
// app.use(bodyParser.json());
// CRUD operations:
app.post("/snips", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const snip = new snipModel_1.default(req.body);
        yield snip.save();
        res.status(201).send(snip);
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
app.get("/snips", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Reached Server");
        const rawSnips = yield snipModel_1.default.find();
        const snips = rawSnips.reverse();
        console.log(snips);
        res.send(snips);
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
app.put("/snips/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Reached Server");
        const snip = yield snipModel_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.send(snip);
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
app.delete("/snips/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Reached Server");
        const snip = yield snipModel_1.default.findByIdAndDelete(req.params.id);
        if (!snip)
            res.status(404).send("No snip found");
        res.status(200).send();
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
