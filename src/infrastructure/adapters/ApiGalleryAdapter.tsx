import { ImageType } from "../interface/core/file.type";

const BASE_URL = '/api/v1/upload';
const ErrorMessages = {
}
const SuccessMessage = {
}

export class ApiGalleryAdapter {
  async getAll(page: number = 1, pageSize: number = 10) {
    const url = `${BASE_URL}?page=${page}&pageSize=${pageSize}`;
    const res = await fetch(url);
    const files = await res.json() as { output:ImageType[] };
    console.log(files);
    return {response:files, message: null};
  }
}