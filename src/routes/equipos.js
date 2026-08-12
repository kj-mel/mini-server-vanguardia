const express = require("express");
const equipoModel = require("../models/equipo");
const jugadorModel = require("../models/jugador");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ ok: true, data: equipoModel.listar() });
});

router.get("/:id", (req, res) => {
  const equipo = equipoModel.obtener(Number(req.params.id));
  if (!equipo) return res.status(404).json({ ok: false, msg: "Equipo no encontrado" });
  res.json({ ok: true, data: equipo });
});

router.post("/", (req, res) => {
  const { nombre } = req.body;
  if (!nombre) return res.status(400).json({ ok: false, msg: "nombre es requerido" });
  const equipo = equipoModel.crear({ nombre });
  res.status(201).json({ ok: true, data: equipo });
});

router.put("/:id", (req, res) => {
  const equipo = equipoModel.actualizar(Number(req.params.id), req.body);
  if (!equipo) return res.status(404).json({ ok: false, msg: "Equipo no encontrado" });
  res.json({ ok: true, data: equipo });
});

router.delete("/:id", (req, res) => {
  const ok = equipoModel.eliminar(Number(req.params.id));
  if (!ok) return res.status(404).json({ ok: false, msg: "Equipo no encontrado" });
  res.json({ ok: true, msg: "Equipo eliminado" });
});

router.post("/:id/jugadores", (req, res) => {
  const { jugadorId } = req.body;
  if (!jugadorModel.obtener(jugadorId)) {
    return res.status(400).json({ ok: false, msg: "Jugador no encontrado" });
  }
  const equipo = equipoModel.agregarJugador(Number(req.params.id), jugadorId);
  if (!equipo) return res.status(404).json({ ok: false, msg: "Equipo no encontrado" });
  res.json({ ok: true, data: equipo });
});

router.delete("/:id/jugadores/:jugadorId", (req, res) => {
  const equipo = equipoModel.quitarJugador(Number(req.params.id), Number(req.params.jugadorId));
  if (!equipo) return res.status(404).json({ ok: false, msg: "Equipo no encontrado" });
  res.json({ ok: true, data: equipo });
});

module.exports = router;
