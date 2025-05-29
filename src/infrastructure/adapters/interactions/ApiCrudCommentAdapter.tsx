import { Filters } from "../../interface/filter";

const BASE_URL = '/api/v1/interaction/comment';
const ErrorMessages = {
  paginate: "No hay resultados.",
  find: "No se encontró.",
  update: "Error al actualizar",
  delete: "Error al eliminar",
  create: "Comentario creado.",
}
const SuccessMessage = {
  paginate: "",
  find: "",
  update: "Actualización exitosa.",
  delete: "Registro eliminado.",
  create: "Registro creado.",
}

export class ApiCrudCommentAdapter {
  static async getAll(page: number = 1, pageSize: number = 10, filter: Filters) {
    const res = await fetch(`${BASE_URL}?page=${page}&pageSize=${pageSize}&param=${filter && filter.param ? filter.param : ""}`);
    if (!res.ok) throw new Error(ErrorMessages.paginate);
    return {response:await res.json(), message: null};
  }

  static async getById(id: string) {
    const res = await fetch(`${BASE_URL}/${id}`);
    if (!res.ok) throw new Error(ErrorMessages.find);
    return {response:await res.json(), message: null};
  }

  static async create(data: any) {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(ErrorMessages.create);
    return {response:res.json(), message: SuccessMessage.create};
  }

  static async update(id: string, data: any) {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(ErrorMessages.update);
    return {response:res.json(), message: SuccessMessage.update};
  }

  static async delete(id: string) {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error(ErrorMessages.delete);
    return {response:res.json(), message: SuccessMessage.delete};
  }
}