const express = require("express");

const app = express();

app.get('/health', async (req, res) => {
    res.status(200).json( {
        ok: true,
        msg: "Server corriendo, todo bien :>)"
    });
})

// REST para el arbitro
app.get('/arbitro', async (req, res) => {
    // Aqui vemos si manda por parametro un id
    res.status(200).json( {
        ok: true,
        msg: "Server corriendo, todo bien :>)"
    });
})

app.post('/arbitro', async (req, res) => {
    res.status(200).json( {
        ok: true,
        msg: "Server corriendo, todo bien :>)"
    });
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server en http://localhost:${PORT}`));
