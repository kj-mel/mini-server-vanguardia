const express = require("express");
const partidoModel = require("../models/partido");
const torneoModel = require("../models/torneo");
const equipoModel = require("../models/equipo");
const arbitroModel = require("../models/arbitro");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ ok: true, data: partidoModel.listar() });
});

router.get("/:id", (req, res) => {
  const partido = partidoModel.obtener(Number(req.params.id));
  if (!partido) return res.status(404).json({ ok: false, msg: "Partido no encontrado" });
  res.json({ ok: true, data: partido });
});

router.post("/", (req, res) => {
  const { torneoId, equipoLocalId, equipoVisitanteId, arbitroId, sets } = req.body;
  if (!torneoModel.obtener(torneoId)) {
    return res.status(400).json({ ok: false, msg: "Torneo no encontrado" });
  }
  if (!equipoModel.obtener(equipoLocalId) || !equipoModel.obtener(equipoVisitanteId)) {
    return res.status(400).json({ ok: false, msg: "Equipo local o visitante no encontrado" });
  }
  if (arbitroId && !arbitroModel.obtener(arbitroId)) {
    return res.status(400).json({ ok: false, msg: "Arbitro no encontrado" });
  }
  const partido = partidoModel.crear({ torneoId, equipoLocalId, equipoVisitanteId, arbitroId, sets });
  torneoModel.agregarPartido(torneoId, partido.id);
  res.status(201).json({ ok: true, data: partido });
});

router.put("/:id", (req, res) => {
  const partido = partidoModel.actualizar(Number(req.params.id), req.body);
  if (!partido) return res.status(404).json({ ok: false, msg: "Partido no encontrado" });
  res.json({ ok: true, data: partido });
});

router.delete("/:id", (req, res) => {
  const ok = partidoModel.eliminar(Number(req.params.id));
  if (!ok) return res.status(404).json({ ok: false, msg: "Partido no encontrado" });
  res.json({ ok: true, msg: "Partido eliminado" });
});

module.exports = router;
