const express = require("express");
const arbitroModel = require("../models/arbitro");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ ok: true, data: arbitroModel.listar() });
});

router.get("/:id", (req, res) => {
  const arbitro = arbitroModel.obtener(Number(req.params.id));
  if (!arbitro) return res.status(404).json({ ok: false, msg: "Arbitro no encontrado" });
  res.json({ ok: true, data: arbitro });
});

router.post("/", (req, res) => {
  const { nombre } = req.body;
  if (!nombre) return res.status(400).json({ ok: false, msg: "nombre es requerido" });
  const arbitro = arbitroModel.crear({ nombre });
  res.status(201).json({ ok: true, data: arbitro });
});

router.put("/:id", (req, res) => {
  const arbitro = arbitroModel.actualizar(Number(req.params.id), req.body);
  if (!arbitro) return res.status(404).json({ ok: false, msg: "Arbitro no encontrado" });
  res.json({ ok: true, data: arbitro });
});

router.delete("/:id", (req, res) => {
  const ok = arbitroModel.eliminar(Number(req.params.id));
  if (!ok) return res.status(404).json({ ok: false, msg: "Arbitro no encontrado" });
  res.json({ ok: true, msg: "Arbitro eliminado" });
});

module.exports = router;
