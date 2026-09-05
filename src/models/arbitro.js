let arbitros = [];
let nextId = 1;

function listar() {
  return arbitros;
}

function obtener(id) {
  return arbitros.find((a) => a.id === id);
}

function crear({ nombre }) {
  const arbitro = {
    id: nextId++,
    nombre,
  };
  arbitros.push(arbitro);
  return arbitro;
}

function actualizar(id, datos) {
  const arbitro = obtener(id);
  if (!arbitro) return null;
  Object.assign(arbitro, datos);
  return arbitro;
}

function eliminar(id) {
  const index = arbitros.findIndex((a) => a.id === id);
  if (index === -1) return false;
  arbitros.splice(index, 1);
  return true;
}

module.exports = {
  listar,
  obtener,
  crear,
  actualizar,
  eliminar,
};
