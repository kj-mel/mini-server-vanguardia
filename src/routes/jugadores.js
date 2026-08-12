const express = require("express");
const jugadorModel = require("../models/jugador");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ ok: true, data: jugadorModel.listar() });
});

router.get("/:id", (req, res) => {
  const jugador = jugadorModel.obtener(Number(req.params.id));
  if (!jugador) return res.status(404).json({ ok: false, msg: "Jugador no encontrado" });
  res.json({ ok: true, data: jugador });
});

router.post("/", (req, res) => {
  const { nombre, posicion } = req.body;
  if (!nombre) return res.status(400).json({ ok: false, msg: "nombre es requerido" });
  if (!jugadorModel.POSICIONES.includes(posicion)) {
    return res.status(400).json({ ok: false, msg: `posicion debe ser una de: ${jugadorModel.POSICIONES.join(", ")}` });
  }
  const jugador = jugadorModel.crear({ nombre, posicion });
  res.status(201).json({ ok: true, data: jugador });
});

router.put("/:id", (req, res) => {
  const jugador = jugadorModel.actualizar(Number(req.params.id), req.body);
  if (!jugador) return res.status(404).json({ ok: false, msg: "Jugador no encontrado" });
  res.json({ ok: true, data: jugador });
});

router.delete("/:id", (req, res) => {
  const ok = jugadorModel.eliminar(Number(req.params.id));
  if (!ok) return res.status(404).json({ ok: false, msg: "Jugador no encontrado" });
  res.json({ ok: true, msg: "Jugador eliminado" });
});

module.exports = router;
