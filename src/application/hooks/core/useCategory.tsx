'use client'

import { useEffect, useState } from 'react';
import { Filters } from '@/infrastructure/interface/filter';
import { CategoryType } from '@/infrastructure/interface/core/category.type';
import { ApiCrudCategoryAdapter } from '@/infrastructure/adapters/core/ApiCrudCategoryAdapter';

export function useCategoryCrud(page = 1, pageSize = 10, filters: Filters = {}) {
  const [list, setList] = useState<CategoryType[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCategory(page, filters);
  }, [page, pageSize, JSON.stringify(filters)]);

  const fetchCategory = async (page: number, filtersOverride: Filters = {}) => {
    setLoading(true);
    try {
      const res = await ApiCrudCategoryAdapter.getAll(page, pageSize, filtersOverride);
      setList(res.response.data);
      setTotal(res.response.total);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryById = async (id: string) => {
    try {
      return await ApiCrudCategoryAdapter.getById(id);
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const createCategory = async (data: any) => {
    try {
      const newCategory = await ApiCrudCategoryAdapter.create(data);
      await fetchCategory(page, filters);
      return newCategory;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const updateCategory = async (id: string, data: any) => {
    try {
      const updatedCategory = await ApiCrudCategoryAdapter.update(id, data);
      await fetchCategory(page, filters);
      return updatedCategory;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      await ApiCrudCategoryAdapter.delete(id);
      await fetchCategory(page, filters);
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
    refresh: (page:number, filters:Filters = {}) => fetchCategory(page, filters),
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
  };
}
