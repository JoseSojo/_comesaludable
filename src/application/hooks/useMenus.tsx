'use client'

import { useEffect, useState } from 'react';
import { ApiCrudMenuAdapter } from '@/infrastructure/adapters/ApiCrudMenuAdapter';
import { MenuType } from '@/infrastructure/interface/menu.type';
import { Filters } from '@/infrastructure/interface/filter';

export function useMenusCrud(page = 1, pageSize = 10, filters: Filters = {}) {
  const [list, setList] = useState<MenuType[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMenus(page, filters);
  }, [page, pageSize, JSON.stringify(filters)]);

  const fetchMenus = async (page: number, filtersOverride: Filters = {}) => {
    setLoading(true);
    try {
      const res = await ApiCrudMenuAdapter.getAll(page, pageSize, filtersOverride);
      setList(res.response.data);
      setTotal(res.response.total);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getMenuById = async (id: string) => {
    try {
      return await ApiCrudMenuAdapter.getById(id);
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const createMenu = async (data: any) => {
    try {
      const newMenu = await ApiCrudMenuAdapter.create(data);
      await fetchMenus(page, filters);
      return newMenu;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const updateMenu = async (id: string, data: any) => {
    try {
      const updatedMenu = await ApiCrudMenuAdapter.update(id, data);
      await fetchMenus(page, filters);
      return updatedMenu;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const deleteMenu = async (id: string) => {
    try {
      await ApiCrudMenuAdapter.delete(id);
      await fetchMenus(page, filters);
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
    refresh: (page:number, filters:Filters = {}) => fetchMenus(page, filters),
    getMenuById,
    createMenu,
    updateMenu,
    deleteMenu,
  };
}
