'use client';

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { signIn, getSession, signOut } from 'next-auth/react';
import { User } from '@prisma/client';
import { RestaurantsType } from '@/infrastructure/interface/restaurant.type';

type AuthContextType = {
  auth: boolean;
  admin: boolean;
  restaurant: boolean;
  user: any;
  loadding: boolean;
  logout: typeof signOut,
  restaurantData: RestaurantsType | null;
  login: {
    user: (email: string, password: string) => Promise<{ redirect: string, message: string } | { error: string; }>,
    admin: (email: string, password: string) => Promise<{ redirect: string, message: string } | { error: string; }>,
    restaurant: (code: string) => Promise<{ redirect: string, message: string } | { error: string; }>,
  }
};

const LoginUser = async (email: string, password: string) => {

  return { error: 'Credenciales inválidas' }
}

const LoginRestaurant = async (code: string) => {
  return { error: 'Credenciales inválidas' }
}

const DefaultAuth: AuthContextType = {
  auth: false,
  admin: false,
  loadding: true,
  restaurant: false,
  user: {},
  restaurantData: null,
  logout: signOut,
  login: {
    admin: LoginUser,
    restaurant: LoginRestaurant,
    user: LoginUser,
  },
}

const AuthContext = createContext<AuthContextType>(DefaultAuth);

export const AuthProvider = ({ children }: { children: ReactNode }) => {

  const [loadding, setLoadding] = useState<boolean>(true);
  const [auth, setAuth] = useState<boolean>(false);
  const [admin, setAdmin] = useState<boolean>(false);
  const [restaurant, setRestaurant] = useState<boolean>(false);
  const [user, setUser] = useState<any | null>(null);
  const [restaurantData, setRestaurantData] = useState<RestaurantsType | null>(null);

  const LoginUser = async (email: string, password: string) => {
    console.log("# # # # # #")
    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (res?.ok) {
      setAuth(true);
      console.log(res);
      if (res.url?.includes("admin")) setAdmin(true);
      return { redirect: "", message: "Inicio Exitoso" };
    }
    return { error: 'Credenciales inválidas' }
  }

  const LoginRestaurant = async (code: string) => {
    const res = await signIn('credentials', {
      redirect: false,
      code
    });

    if (res?.ok) {
      setRestaurant(true);
      setAuth(true);
      const response = await getSession();
      console.log(response);
      if (response) {
        const user = response.user as any;
        setRestaurant(user.access ? true : false);
        setRestaurantData(user);
      }
      return { redirect: '', message: "Inicio Exitoso" };
    }

    return { error: 'Credenciales inválidas' }
  }

  useEffect(() => {
    (async () => {
      setLoadding(true);
      const response = await getSession();
      if (response) {
        const user = response.user as User;
        const rest = user as any;

        console.log(rest)
        if (rest.access) {
          const entity = rest as RestaurantsType;
          setRestaurant(entity.access ? true : false);
          setRestaurantData(entity);
        } else {
          setUser(user);
          setAdmin(user.admin ? true : false);
          setAdmin(user.email === "comesaludable2025" ? true : false)
          setAuth(true);
        }


      }
      setLoadding(false);
    })()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        auth,
        admin,
        restaurant,
        user,
        loadding,
        login: {
          admin: LoginUser,
          user: LoginUser,
          restaurant: LoginRestaurant,
        },
        logout: () => signOut({ callbackUrl: process.env.NEXTAUTH_URL + '/login' }),
        restaurantData
      }}
      
    >
      <div className='bg-white dark:bg-gray-700'>{children}</div>
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);