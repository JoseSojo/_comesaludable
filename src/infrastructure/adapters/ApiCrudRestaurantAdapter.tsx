import { Filters } from "../interface/filter";
import { Ubication, UbicationCreate } from "../interface/map/map";
import { RestaurantsType } from "../interface/restaurant.type";

const BASE_URL = '/api/v1/restaurant';
const ErrorMessages = {
  paginate: "No hay resultados.",
  find: "No se encontró.",
  update: "Error al actualizar",
  delete: "Error al eliminar",
  create: "Error al crear.",
  location: "Error en la ubicación.",
}
const SuccessMessage = {
  paginate: "",
  find: "",
  update: "Actualización exitosa.",
  delete: "Registro eliminado.",
  create: "Registro creado.",
  location: "Ubicación exitosa.",
}

export class ApiCrudRestaurantAdapter {
  static async getAll(page: number = 1, pageSize: number = 10, filter: Filters) {
    const res = await fetch(`${BASE_URL}?page=${page}&pageSize=${pageSize}&environment=${filter && filter.environment ? filter.environment : ""}&type=${filter && filter.type ? filter.type : ""}&param=${filter && filter.param ? filter.param : ""}`);
    if (!res.ok) throw new Error(ErrorMessages.paginate);
    return {response:await res.json(), message: null};
  }

  static async getById(id: string): Promise<{ response: RestaurantsType, message: string|null }> {
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

  static async location(id: string, data: UbicationCreate) {
    const res = await fetch(`${BASE_URL}/location/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({...data, id}),
    });
    if (!res.ok) throw new Error(ErrorMessages.location);
    return {response:res.json(), message: SuccessMessage.location};
  }

  static async getLocation() {
    const res = await fetch(`${BASE_URL}/location`);
    if (!res.ok) throw new Error(ErrorMessages.location);
    const json = await res.json() as { data:RestaurantsType[], total: number }
    return {response:json, message: SuccessMessage.location};
  }

  static async delete(id: string) {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error(ErrorMessages.delete);
    return {response:res.json(), message: SuccessMessage.delete};
  }
}