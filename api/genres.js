const express = require("express")
const Joi = require("joi");

const router = express.Router();

let genres = [{
    genre: "Comedy",
    id: 0
  },
  {
    genre: "Horror",
    id: 1
  },
  {
    genre: "Action",
    id: 2
  },
  {
    genre: "Mystery",
    id: 3
  }
];


function genreRequestValidation(body) {
  const schema = {
    genre: Joi.string().min(3).required()
  };
  return Joi.validate(body, schema);
}

function findGenre(genre) {
  return genres.find(g => g.genre.toLowerCase() === genre.toLowerCase())
}

router.route("/")
  .get((req, res) => {
    res.send(genres);
  })
  .post((req, res) => {
    const validation = genreRequestValidation(req.body);

    if (validation.error) {
      return res
        .status(400)
        .send(`400 bad request. ${validation.error.details[0].message}`);
    } else if (findGenre(req.body.genre)) {
      return res.status(400).send(`${req.body.genre} genre already exists!`)
    }

    let genre = {
      genre: req.body.genre,
      id: genres.length + 1 // id goes 3 5 6 7 8... why? => bug!
    };
    genres.push(genre);
    res.send(genre);

  });
router.route("/:genre")
  .get((req, res) => {

    let genreObj = findGenre(req.params.genre);
    if (!genreObj) {
      return res.status(404).send("Genre Not Found!");
    }
    res.send(genreObj);


  })
  .put((req, res) => {
    const validation = genreRequestValidation(req.body);

    if (validation.error) {
      return res.status(400).send(`400 bad request. ${validation.error.details[0].message}`);
    }
    const genre = findGenre(req.params.genre)

    if (!genre) {
      return res.status(404).send(`404 bad request. ${req.body.genre} genre was not found`);
    }

    genre.genre = req.body.genre;
    res.send(genre);

  })
  .delete((req, res) => {

    const genre = findGenre(req.params.genre)

    if (!genre) {
      return res.status(404).send(`404 . ${req.params.genre} genre was not found`);
    }


    genres.splice(genres.indexOf(genre), 1)
    res.send(genre);

  });


module.exports = router;