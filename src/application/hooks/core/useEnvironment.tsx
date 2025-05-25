'use client'

import { useEffect, useState } from 'react';
import { Filters } from '@/infrastructure/interface/filter';
import { EnvironmentType } from '@/infrastructure/interface/core/environment.type';
import { ApiCrudEnvironmentAdapter } from '@/infrastructure/adapters/core/ApiCrudEnvironmentAdapter';

export function useEnvironmentCrud(page = 1, pageSize = 10, filters: Filters = {}) {
  const [list, setList] = useState<EnvironmentType[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEnvironment(page, filters);
  }, [page, pageSize, JSON.stringify(filters)]);

  const fetchEnvironment = async (page: number, filtersOverride: Filters = {}) => {
    setLoading(true);
    try {
      const res = await ApiCrudEnvironmentAdapter.getAll(page, pageSize, filtersOverride);
      setList(res.response.data);
      setTotal(res.response.total);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getEnvironmentById = async (id: string) => {
    try {
      return await ApiCrudEnvironmentAdapter.getById(id);
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const createEnvironment = async (data: any) => {
    try {
      const newEnvironment = await ApiCrudEnvironmentAdapter.create(data);
      await fetchEnvironment(page, filters);
      return newEnvironment;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const updateEnvironment = async (id: string, data: any) => {
    try {
      const updatedEnvironment = await ApiCrudEnvironmentAdapter.update(id, data);
      await fetchEnvironment(page, filters);
      return updatedEnvironment;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const deleteEnvironment = async (id: string) => {
    try {
      await ApiCrudEnvironmentAdapter.delete(id);
      await fetchEnvironment(page, filters);
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
    refresh: (page:number, filters:Filters = {}) => fetchEnvironment(page, filters),
    getEnvironmentById,
    createEnvironment,
    updateEnvironment,
    deleteEnvironment,
  };
}
