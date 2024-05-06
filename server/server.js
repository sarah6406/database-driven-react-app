import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const dbConnectionString = process.env.DATABASE_URL;

const db = new pg.Pool({ connectionString: dbConnectionString });

app.get("/", (req, res) => {
  res.json("This is my root route");
});

app.get("/forum", async (req, res) => {
  const result = await db.query(`SELECT 
  person.id,
  person.name,
  person.age,
  person.message,
  ARRAY_AGG(favethings.category) AS favethings
FROM person
JOIN person_favethings ON person.id = person_favethings.person_id
JOIN favethings ON person_favethings.favethings_id = favethings.id
GROUP BY person.id, person.name, person.age, person.message
`);
  res.json(result.rows); // accessing the returned object to only show the inputted data from Supabase
});

app.get("/forum/:category", async (req, res) => {
  const category = req.params.category;
  const result = await db.query(
    `SELECT 
    person.id,
    person.name,
    person.age,
    person.message,
    ARRAY_AGG(favethings.category) AS favethings
  FROM person
  JOIN person_favethings ON person.id = person_favethings.person_id
  JOIN favethings ON person_favethings.favethings_id = favethings.id
  WHERE person_favethings.favethings_id = ($1)
  GROUP BY person.id, person.name, person.age, person.message
  `,
    [category]
  );
  res.json(result.rows); // accessing the returned object to only show the inputted data from Supabase
});

app.post("/forum", async (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const message = req.body.message;
  const favethings = req.body.favethings;
  console.log(req.body);
  const newPost = await db.query(
    `INSERT INTO person (name, age, message) VALUES ($1, $2, $3) RETURNING *`,
    [name, age, message]
  );
  console.log(newPost);
  const junction = await db.query(
    `INSERT INTO person_favethings VALUES ($1, $2)`,
    [newPost.rows[0].id, favethings]
  );
  res.json(newPost);
});

// app.delete("/forum", async (req, res) => {
//     const res = await db.query("DELETE FROM rows WHERE id = $1", [id]);
// })

app.listen(8080, () => {
  console.log("I am running on PORT 8080");
});
