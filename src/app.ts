import express from "express";
import fs from "fs";
import readline from "readline";
import cors from "cors";

const app = express();
const port = 3000;

const corsOptions = {
  origin: "http://localhost:4200",
};

const stream = fs.createReadStream("src/films.csv");
const reader = readline.createInterface({ input: stream });

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

app.get("/films", cors(corsOptions), (req, res) => {
  const yearFilter = req.query.year;
  const genreFilter = req.query.genre;

  const filtered = films.filter((film) => {
    let isValid = true;
    if (yearFilter) {
      isValid &&= film.year.toString() === yearFilter;
    }

    if (isValid && genreFilter) {
      isValid &&= film.genres.includes(genreFilter);
    }

    return isValid;
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
