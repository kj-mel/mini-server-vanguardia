const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {
  const lat = req.query.lat;
  const lon = req.query.lon;
  if (!lat || !lon) {
    return res.status(400).json({ ok: false, msg: "Se requieren lat y lon" });
  }

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
    const resp = await fetch(url);
    if (!resp.ok) {
      return res.status(resp.status).json({ ok: false, msg: "Open-Meteo fallo" });
    }
    const data = await resp.json();
    const cw = data.current_weather;
    res.json({
      ok: true,
      data: {
        temperatura: cw.temperature,
        viento: cw.windspeed,
        direccionViento: cw.winddirection,
        hora: cw.time,
      },
    });
  } catch (err) {
    res.status(500).json({ ok: false, msg: "Error al consultar Open-Meteo" });
  }
});

module.exports = router;
