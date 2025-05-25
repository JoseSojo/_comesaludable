'use client'

import { useEffect, useState } from 'react';
import { Filters } from '@/infrastructure/interface/filter';
import { UserType } from '@/infrastructure/interface/user.type';
import { ApiCrudUserAdapter } from '@/infrastructure/adapters/ApiCrudUserAdapter';

export function useUserCrud(page = 1, pageSize = 10, filters: Filters = {}) {
  const [list, setList] = useState<UserType[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUser(page, filters);
  }, [page, pageSize, JSON.stringify(filters)]);

  const fetchUser = async (page: number, filtersOverride: Filters = {}) => {
    setLoading(true);
    try {
      const res = await ApiCrudUserAdapter.getAll(page, pageSize, filtersOverride);
      setList(res.response.data);
      setTotal(res.response.total);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getUserById = async (id: string) => {
    try {
      return await ApiCrudUserAdapter.getById(id);
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const createUser = async (data: any) => {
    try {
      const newUser = await ApiCrudUserAdapter.create(data);
      await fetchUser(page, filters);
      return newUser;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const updateUser = async (id: string, data: any) => {
    try {
      const updatedUser = await ApiCrudUserAdapter.update(id, data);
      await fetchUser(page, filters);
      return updatedUser;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const deleteUser = async (id: string) => {
    try {
      await ApiCrudUserAdapter.delete(id);
      await fetchUser(page, filters);
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
    refresh: (page:number, filters:Filters = {}) => fetchUser(page, filters),
    getUserById,
    createUser,
    updateUser,
    deleteUser,
  };
}
