'use client'

import { useEffect, useState, useCallback } from 'react';
import { Filters } from '@/infrastructure/interface/filter';
import { ComentType, CommentCreate } from '@/infrastructure/interface/interactions/coment.type';
import { ApiCrudCommentAdapter } from '@/infrastructure/adapters/interactions/ApiCrudCommentAdapter';

export function useCommentCrud(page = 1, pageSize = 10, filters: Filters = {}) {
  const [list, setList] = useState<ComentType[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Memoize the fetch function to prevent unnecessary recreations
  const fetchComment = async (pageToFetch: number, filtersOverride: Filters = {}) => {
    if(page === 0) return;
    setLoading(true);
    try {
      const res = await ApiCrudCommentAdapter.getAll(pageToFetch, pageSize, filtersOverride);
      setList(res.response.data);
      setTotal(res.response.total);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  } // Only recreate if pageSize changes

  useEffect(() => {
    fetchComment(page, filters);
  }, [page, pageSize, JSON.stringify(filters)]); // Proper dependencies

  const getComentById = async (id: string) => {
    try {
      return await ApiCrudCommentAdapter.getById(id);
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const createComent = async (data: CommentCreate) => {
    try {
      const newComent = await ApiCrudCommentAdapter.create(data);
      // await fetchComment(page, filters); // Uses current page and filters
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
    refresh: fetchComment, // Simplified since it already accepts page and filters
    getComentById,
    createComent,
    updateComent,
    deleteComent,
  };
}