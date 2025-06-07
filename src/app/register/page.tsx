'use client';

import { useUserCrud } from '@/application/hooks/useUser';
import InputField from '@/infrastructure/components/ui/InputField';
import AuthLayout from '@/infrastructure/layout/AuthLayout';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const Register = () => {
  const router = useRouter()
  const user = useUserCrud(0,0);
  const [email, setEmail] = useState('');
  const [lastname, setLastname] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [errors, setErrors] = useState<{
    email?: string;
    lastname?: string;
    name?: string;
    password?: string;
    age?: string;
  }>({});

  const validateForm = () => {
    const newErrors: {
      email?: string;
      name?: string;
      lastname?: string;
      password?: string;
      age?: string;
    } = {};
    let isValid = true;

    if (!email) {
      newErrors.email = 'Correo requerido';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email address is invalid';
      isValid = false;
    }

    if (!lastname) {
      newErrors.lastname = 'Apellido is required';
      isValid = false;
    } else if (lastname.length < 3) {
      newErrors.lastname = 'Apellido must be at least 3 characters';
      isValid = false;
    }

    if (!name) {
      newErrors.name = 'Nombre is required';
      isValid = false;
    } else if (name.length < 3) {
      newErrors.name = 'Nombre must be at least 3 characters';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Contraseña requerida';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Contraseñamuy debil';
      isValid = false;
    }

    if (!age) {
      newErrors.age = 'Edad Requerida';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      user.createUser({email,lastname,name,password,age,acceptEmail:"si"})
        .then(() => router.push("/"))
        .catch((err) => {
          toast.error("Error al crear usuario");
        })
      ;
    }
  };

  return (
    <AuthLayout
      title="Create an Account"
      subtitle="Join NutriLife and start your healthy food journey"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField
          id="email"
          label="Correo"
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          error={errors.email}
        />

        <InputField
          id="name"
          label="Nombre"
          type="text"
          placeholder="johndoe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          error={errors.name}
        />

        <InputField
          id="lastname"
          label="Apellido"
          type="text"
          placeholder="johndoe"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          required
          error={errors.lastname}
        />

        <InputField
          id="password"
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          error={errors.password}
        />

        <InputField
          id="age"
          label="Edad"
          type="number"
          placeholder=""
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
          error={errors.age}
        />

        <div className="flex items-center">
          <input
            id="agree-terms"
            name="agree-terms"
            type="checkbox"
            className="h-4 w-4 border-gray-300 rounded text-green-600 focus:ring-green-500"
            required
          />
          <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-700">
            Acepta {' '}
            <a href="#" className="font-medium text-green-600 hover:text-green-500">
              Recibir
            </a>{' '}
            correos{' '}
            <a href="#" className="font-medium text-green-600 hover:text-green-500">
              Electronicos
            </a>
          </label>
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Create Account
          </button>
        </div>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Ya tienes cuenta?{' '}
          <Link href="/login" className="font-medium text-green-600 hover:text-green-500">
            Entrar
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Register;