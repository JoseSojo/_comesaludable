'use client'

import { useEffect, useState } from 'react';
import { Filters } from '@/infrastructure/interface/filter';
import { TypeType } from '@/infrastructure/interface/core/type.type';
import { ApiCrudTypeAdapter } from '@/infrastructure/adapters/core/ApiCrudTypeAdapter';

export function useTypeCrud(page = 1, pageSize = 10, filters: Filters = {}) {
  const [list, setList] = useState<TypeType[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchType(page, filters);
  }, [page, pageSize, JSON.stringify(filters)]);

  const fetchType = async (page: number, filtersOverride: Filters = {}) => {
    setLoading(true);
    try {
      const res = await ApiCrudTypeAdapter.getAll(page, pageSize, filtersOverride);
      setList(res.response.data);
      setTotal(res.response.total);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getTypeById = async (id: string) => {
    try {
      return await ApiCrudTypeAdapter.getById(id);
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const createType = async (data: any) => {
    try {
      const newType = await ApiCrudTypeAdapter.create(data);
      await fetchType(page, filters);
      return newType;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const updateType = async (id: string, data: any) => {
    try {
      const updatedType = await ApiCrudTypeAdapter.update(id, data);
      await fetchType(page, filters);
      return updatedType;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const deleteType = async (id: string) => {
    try {
      await ApiCrudTypeAdapter.delete(id);
      await fetchType(page, filters);
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  return {
    list,
    total,
    loading,
    error,
    refresh: (page:number, filters:Filters = {}) => fetchType(page, filters),
    getTypeById,
    createType,
    updateType,
    deleteType,
  };
}
