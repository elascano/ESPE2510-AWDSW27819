import express from "express";
import morgan from "morgan";
import countriesRouter from "./routes/countries.mjs";

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.set("json spaces", 2); // pretty print

app.get("/health", (_, res) => res.json({ ok: true, service: "rest-countries-api" }));
app.use("/v1/country", countriesRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || "Internal Server Error" });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`REST Countries API en http://localhost:${PORT}`));
