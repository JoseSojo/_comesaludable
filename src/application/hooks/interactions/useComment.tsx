'use client'

import { useEffect, useState } from 'react';
import { Filters } from '@/infrastructure/interface/filter';
import { ComentType } from '@/infrastructure/interface/interactions/coment.type';
import { ApiCrudCommentAdapter } from '@/infrastructure/adapters/interactions/ApiCrudCommentAdapter';

export function useCommentCrud(page = 1, pageSize = 10, filters: Filters = {}) {
  const [list, setList] = useState<ComentType[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchComment(page, filters);
  }, [page, pageSize, JSON.stringify(filters)]);

  const fetchComment = async (page: number, filtersOverride: Filters = {}) => {
    setLoading(true);
    try {
      const res = await ApiCrudCommentAdapter.getAll(page, pageSize, filtersOverride);
      setList(res.response.data);
      setTotal(res.response.total);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getComentById = async (id: string) => {
    try {
      return await ApiCrudCommentAdapter.getById(id);
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const createComent = async (data: any) => {
    try {
      const newComent = await ApiCrudCommentAdapter.create(data);
      await fetchComment(page, filters);
      return newComent;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const updateComent = async (id: string, data: any) => {
    try {
      const updatedComent = await ApiCrudCommentAdapter.update(id, data);
      await fetchComment(page, filters);
      return updatedComent;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const deleteComent = async (id: string) => {
    try {
      await ApiCrudCommentAdapter.delete(id);
      await fetchComment(page, filters);
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
    refresh: (page:number, filters:Filters = {}) => fetchComment(page, filters),
    getComentById,
    createComent,
    updateComent,
    deleteComent,
  };
}
