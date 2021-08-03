"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const readline_1 = __importDefault(require("readline"));
const cors_1 = __importDefault(require("cors"));
const app = express_1.default();
const port = 3000;
const corsOptions = {
    origin: "http://localhost:4200",
};
const stream = fs_1.default.createReadStream("src/films.csv");
const reader = readline_1.default.createInterface({ input: stream });
const films = [];
const FIELD_ID = 0;
const FIELD_NAME = 1;
const FIELD_GENRE_1 = 2;
const FIELD_GENRE_2 = 3;
const FIELD_YEAR = 4;
reader.on("line", (row) => {
    const tokens = row.split(",");
    const newFilm = {
        id: tokens[FIELD_ID],
        name: tokens[FIELD_NAME],
        genres: [tokens[FIELD_GENRE_1], tokens[FIELD_GENRE_2]],
        year: tokens[FIELD_YEAR],
    };
    films.push(newFilm);
});
app.get("/films", cors_1.default(corsOptions), (req, res) => {
    const yearFilter = req.query.year;
    const genreFilter = req.query.genre;
    const filtered = films.filter((film) => {
        let result = true;
        if (yearFilter) {
            result && (result = film.year.toString() === yearFilter);
        }
        if (result && genreFilter) {
            result && (result = film.genres.includes(genreFilter));
        }
        return result;
    });
    const pageNumber = +req.query.p || 0;
    const perPage = +req.query.perPage || 10;
    res.send({
        total: filtered.length,
        data: filtered.slice(pageNumber * perPage, (pageNumber + 1) * perPage - 1),
    });
});
app.listen(port, () => {
    return console.log(`server is listening on ${port}`);
});
//# sourceMappingURL=app.js.map