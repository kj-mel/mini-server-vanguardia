let partidos = [];
let nextId = 1;

function listar() {
  return partidos;
}

function obtener(id) {
  return partidos.find((p) => p.id === id);
}

function crear({ torneoId, equipoLocalId, equipoVisitanteId, arbitroId, sets }) {
  const partido = {
    id: nextId++,
    torneoId,
    equipoLocalId,
    equipoVisitanteId,
    arbitroId,
    sets: sets || [],
    estado: "programado",
  };
  partidos.push(partido);
  return partido;
}

function actualizar(id, datos) {
  const partido = obtener(id);
  if (!partido) return null;
  Object.assign(partido, datos);
  return partido;
}

function eliminar(id) {
  const index = partidos.findIndex((p) => p.id === id);
  if (index === -1) return false;
  partidos.splice(index, 1);
  return true;
}

module.exports = {
  listar,
  obtener,
  crear,
  actualizar,
  eliminar,
};
