let equipos = [];
let nextId = 1;

function listar() {
  return equipos;
}

function obtener(id) {
  return equipos.find((e) => e.id === id);
}

function crear({ nombre }) {
  const equipo = {
    id: nextId++,
    nombre,
    jugadores: [],
  };
  equipos.push(equipo);
  return equipo;
}

function agregarJugador(equipoId, jugadorId) {
  const equipo = obtener(equipoId);
  if (!equipo) return null;
  if (equipo.jugadores.includes(jugadorId)) return equipo;
  equipo.jugadores.push(jugadorId);
  return equipo;
}

function quitarJugador(equipoId, jugadorId) {
  const equipo = obtener(equipoId);
  if (!equipo) return null;
  equipo.jugadores = equipo.jugadores.filter((id) => id !== jugadorId);
  return equipo;
}

function actualizar(id, datos) {
  const equipo = obtener(id);
  if (!equipo) return null;
  Object.assign(equipo, datos);
  return equipo;
}

function eliminar(id) {
  const index = equipos.findIndex((e) => e.id === id);
  if (index === -1) return false;
  equipos.splice(index, 1);
  return true;
}

module.exports = {
  listar,
  obtener,
  crear,
  agregarJugador,
  quitarJugador,
  actualizar,
  eliminar,
};
