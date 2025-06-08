'use client'

import { useEffect, useState } from 'react';
import { ApiCrudMenuAdapter } from '@/infrastructure/adapters/ApiCrudMenuAdapter';
import { MenuType } from '@/infrastructure/interface/menu.type';
import { Filters } from '@/infrastructure/interface/filter';
import { ApiGalleryAdapter } from '@/infrastructure/adapters/ApiGalleryAdapter';
import { ImageType } from '@/infrastructure/interface/core/file.type';

export function useGallery(page = 1, pageSize = 10, filters: Filters = {  }) {
  const [list, setList] = useState<ImageType[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const adapter = new ApiGalleryAdapter();

  useEffect(() => {
    fetchGallery(page);
  }, [page, pageSize, JSON.stringify(filters)]);

  const fetchGallery = async (page: number) => {
    setLoading(true);
    try {
      const res = await adapter.getAll(page,10);
      setList(res.response.output);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // const createGallery = async (data: any) => {
  //   try {
  //     // const newGallery = await adapter.create(data);
  //     await fetchGallerys(page, filters);
  //     // return newGallery;
  //   } catch (err: any) {
  //     setError(err.message);
  //     throw err;
  //   }
  // };

  // const deleteGallery = async (id: string) => {
  //   try {
  //     // await adapter.delete(id);
  //     await fetchGallerys(page, filters);
  //   } catch (err: any) {
  //     setError(err.message);
  //     throw err;
  //   }
  // };

  return {
    list,
    total,
    loading,
    error,
    refresh: (page:number) => fetchGallery(page),
  };
}
