'use client'

import { useEffect, useState } from 'react';
import { Filters } from '@/infrastructure/interface/filter';
import { RestaurantsType } from '@/infrastructure/interface/restaurant.type';
import { ApiCrudRestaurantAdapter } from '@/infrastructure/adapters/ApiCrudRestaurantAdapter';
import { UbicationCreate } from '@/infrastructure/interface/map/map';

export function useRestaurantCrud(page = 1, pageSize = 10, filters: Filters = {}) {
  const [list, setList] = useState<RestaurantsType[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRestaurant(page, filters);
  }, [page, pageSize, JSON.stringify(filters)]);

  const fetchRestaurant = async (page: number, filtersOverride: Filters = {}) => {
    setLoading(true);
    try {
      const res = await ApiCrudRestaurantAdapter.getAll(page, pageSize, filtersOverride);
      setList(res.response.data);
      setTotal(res.response.total);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getRestaurantById = async (id: string) => {
    try {
      return await ApiCrudRestaurantAdapter.getById(id);
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const createRestaurant = async (data: any) => {
    try {
      const newRestaurant = await ApiCrudRestaurantAdapter.create(data);
      await fetchRestaurant(page, filters);
      return newRestaurant;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const updateRestaurant = async (id: string, data: any) => {
    try {
      const updatedRestaurant = await ApiCrudRestaurantAdapter.update(id, data);
      await fetchRestaurant(page, filters);
      return updatedRestaurant;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const deleteRestaurant = async (id: string) => {
    try {
      await ApiCrudRestaurantAdapter.delete(id);
      await fetchRestaurant(page, filters);
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const createOrUpdateLocation = async (id: string, data: UbicationCreate) => {
    try {
      const locationFound = await ApiCrudRestaurantAdapter.location(id, data);
      // await fetchRestaurant(page, filters);
      return locationFound;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const getAllUbications = async () => {
    try {
      const locationFound = await ApiCrudRestaurantAdapter.getLocation();
      // await fetchRestaurant(page, filters);
      return locationFound;
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
    createOrUpdateLocation,
    getAllUbications,
    refresh: (page:number, filters:Filters = {}) => fetchRestaurant(page, filters),
    getRestaurantById,
    createRestaurant,
    updateRestaurant,
    deleteRestaurant,
  };
}
