const express = require("express");

const jugadoresRouter = require("./src/routes/jugadores");
const equiposRouter = require("./src/routes/equipos");
const arbitrosRouter = require("./src/routes/arbitros");
const torneosRouter = require("./src/routes/torneos");
const partidosRouter = require("./src/routes/partidos");
const climaRouter = require("./src/routes/clima");

const app = express();

app.use(express.json());

app.get('/health', async (req, res) => {
    res.status(200).json( {
        ok: true,
        msg: "Server corriendo, todo bien :>)"
    });
})

app.use('/jugadores', jugadoresRouter);
app.use('/equipos', equiposRouter);
app.use('/arbitros', arbitrosRouter);
app.use('/torneos', torneosRouter);
app.use('/partidos', partidosRouter);
app.use('/clima', climaRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server en http://localhost:${PORT}`));
