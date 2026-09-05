const POSICIONES = [
  "Colocador",
  "Libero",
  "Central",
  "Opuesto",
  "Punta",
];

let jugadores = [];
let nextId = 1;

function listar() {
  return jugadores;
}

function obtener(id) {
  return jugadores.find((j) => j.id === id);
}

function crear({ nombre, posicion }) {
  const jugador = {
    id: nextId++,
    nombre,
    posicion,
  };
  jugadores.push(jugador);
  return jugador;
}

function actualizar(id, datos) {
  const jugador = obtener(id);
  if (!jugador) return null;
  Object.assign(jugador, datos);
  return jugador;
}

function eliminar(id) {
  const index = jugadores.findIndex((j) => j.id === id);
  if (index === -1) return false;
  jugadores.splice(index, 1);
  return true;
}

module.exports = {
  POSICIONES,
  listar,
  obtener,
  crear,
  actualizar,
  eliminar,
};
