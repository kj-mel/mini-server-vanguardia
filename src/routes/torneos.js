const express = require("express");
const torneoModel = require("../models/torneo");
const equipoModel = require("../models/equipo");
const arbitroModel = require("../models/arbitro");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ ok: true, data: torneoModel.listar() });
});

router.get("/:id", (req, res) => {
  const torneo = torneoModel.obtener(Number(req.params.id));
  if (!torneo) return res.status(404).json({ ok: false, msg: "Torneo no encontrado" });
  res.json({ ok: true, data: torneo });
});

router.post("/", (req, res) => {
  const { nombre, equipos, arbitros } = req.body;
  if (!nombre) return res.status(400).json({ ok: false, msg: "nombre es requerido" });
  const torneo = torneoModel.crear({ nombre, equipos, arbitros });
  res.status(201).json({ ok: true, data: torneo });
});

router.put("/:id", (req, res) => {
  const torneo = torneoModel.actualizar(Number(req.params.id), req.body);
  if (!torneo) return res.status(404).json({ ok: false, msg: "Torneo no encontrado" });
  res.json({ ok: true, data: torneo });
});

router.delete("/:id", (req, res) => {
  const ok = torneoModel.eliminar(Number(req.params.id));
  if (!ok) return res.status(404).json({ ok: false, msg: "Torneo no encontrado" });
  res.json({ ok: true, msg: "Torneo eliminado" });
});

router.post("/:id/equipos", (req, res) => {
  const { equipoId } = req.body;
  if (!equipoModel.obtener(equipoId)) {
    return res.status(400).json({ ok: false, msg: "Equipo no encontrado" });
  }
  const torneo = torneoModel.agregarEquipo(Number(req.params.id), equipoId);
  if (!torneo) return res.status(404).json({ ok: false, msg: "Torneo no encontrado" });
  res.json({ ok: true, data: torneo });
});

router.post("/:id/arbitros", (req, res) => {
  const { arbitroId } = req.body;
  if (!arbitroModel.obtener(arbitroId)) {
    return res.status(400).json({ ok: false, msg: "Arbitro no encontrado" });
  }
  const torneo = torneoModel.agregarArbitro(Number(req.params.id), arbitroId);
  if (!torneo) return res.status(404).json({ ok: false, msg: "Torneo no encontrado" });
  res.json({ ok: true, data: torneo });
});

module.exports = router;
