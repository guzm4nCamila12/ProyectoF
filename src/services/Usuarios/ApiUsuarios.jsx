const API_URL = "http://localhost:3000";

export const getUsuarios = async () => {
  const response = await fetch(`${API_URL}/usuarios`);
  return response.json();
};

export const getUsuarioById = async (id) => {
  const response = await fetch(`${API_URL}/usuarios/${id}`);
  return response.json();
};

export const insertarUsuario = async (nuevoUsuario) => {
  const response = await fetch(`${API_URL}/usuarios`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(nuevoUsuario),
  });
  return response.json();
};

export const actualizarUsuario = async (id, usuarioActualizado) => {
  const response = await fetch(`${API_URL}/usuarios/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(usuarioActualizado),
  });
  
};

export const eliminarUsuario = async (id) => {
  await fetch(`${API_URL}/usuarios/${id}`, { method: "DELETE" });
};
