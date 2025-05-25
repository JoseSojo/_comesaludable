"use client"

import { ChangeEvent, FormEvent, useState } from "react";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import toast from "react-hot-toast";
import { User } from "@prisma/client";
import { UserCreate } from "@/infrastructure/interface/user.type";
import { useUserCrud } from "@/application/hooks/useUser";

type CustomType = UserCreate | null;

interface Props {
    initialData: CustomType;
    end: () => void
}

export default function UserForm({ initialData, end }: Props) {
    const instance = useUserCrud();
    const [data, setData] = useState<CustomType>(initialData);

    const HandleChange = (value: string, name: keyof UserCreate) => {
        setData((prev: CustomType): CustomType => {
            return { ...prev, [name]: value } as CustomType;
        });
    }

    const HandleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        (async () => {
            try {
                if(data) data.acceptEmail = "si";
                const result = await instance.createUser(data);
                toast.success(result.message);
                end();
            } catch (error) {
                toast.error(instance.error);
            }
        })()
    }

    return (
        <form onSubmit={HandleSubmit} className="">
            <div className="w-full flex justify-center">
                <h2 className="text-2xl text-gray-600">Crear ambiente</h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-3">
                <label>
                    <span className="text-gray-500 text-xs font-bold">Nombre</span>
                    <Input onChange={(e: ChangeEvent<HTMLInputElement>) => HandleChange(e.target.value, "name")} type="text" placeholder="John" required />
                </label>
                <label>
                    <span className="text-gray-500 text-xs font-bold">Apellido</span>
                    <Input onChange={(e: ChangeEvent<HTMLInputElement>) => HandleChange(e.target.value, "lastname")} type="text" placeholder="Doe" required />
                </label>
                <label className="col-span-2">
                    <span className="text-gray-500 text-xs font-bold">Correo</span>
                    <Input onChange={(e: ChangeEvent<HTMLInputElement>) => HandleChange(e.target.value, "email")} type="email" placeholder="JohnDoe@gmail.com" required />
                </label>
                <label className="col-span-2">
                    <span className="text-gray-500 text-xs font-bold">Contraseña</span>
                    <Input onChange={(e: ChangeEvent<HTMLInputElement>) => HandleChange(e.target.value, "password")} type="password" placeholder="* * * * * * * *" required />
                </label>
                <label className="col-span-2">
                    <span className="text-gray-500 text-xs font-bold">Edad</span>
                    <Input onChange={(e: ChangeEvent<HTMLInputElement>) => HandleChange(e.target.value, "age")} type="number" placeholder="+18" required />
                </label>
            </div>

            <div className="w-full flex justify-end mt-3">
                <Button text="Enviar" type="submit" />
            </div>
        </form>
    )
}
