let torneos = [];
let nextId = 1;

function listar() {
  return torneos;
}

function obtener(id) {
  return torneos.find((t) => t.id === id);
}

function crear({ nombre, equipos, arbitros }) {
  const torneo = {
    id: nextId++,
    nombre,
    equipos: equipos || [],
    arbitros: arbitros || [],
    partidos: [],
  };
  torneos.push(torneo);
  return torneo;
}

function agregarEquipo(torneoId, equipoId) {
  const torneo = obtener(torneoId);
  if (!torneo) return null;
  if (torneo.equipos.includes(equipoId)) return torneo;
  torneo.equipos.push(equipoId);
  return torneo;
}

function agregarArbitro(torneoId, arbitroId) {
  const torneo = obtener(torneoId);
  if (!torneo) return null;
  if (torneo.arbitros.includes(arbitroId)) return torneo;
  torneo.arbitros.push(arbitroId);
  return torneo;
}

function agregarPartido(torneoId, partidoId) {
  const torneo = obtener(torneoId);
  if (!torneo) return null;
  torneo.partidos.push(partidoId);
  return torneo;
}

function actualizar(id, datos) {
  const torneo = obtener(id);
  if (!torneo) return null;
  Object.assign(torneo, datos);
  return torneo;
}

function eliminar(id) {
  const index = torneos.findIndex((t) => t.id === id);
  if (index === -1) return false;
  torneos.splice(index, 1);
  return true;
}

module.exports = {
  listar,
  obtener,
  crear,
  agregarEquipo,
  agregarArbitro,
  agregarPartido,
  actualizar,
  eliminar,
};
