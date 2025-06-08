'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

interface Props {
    use: string;
    id: string
}

export default function UploadForm({id,use}: Props) {
    const [file, setFile] = useState<File | null>(null);
    const [message, setMessage] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);
        formData.append('use', use);
        formData.append('id', id);

        const url = `/api/v1/upload/`;
        const res = await fetch(url, {
            method: 'POST',
            body: formData,
        });

        const data = await res.json();
        toast(data.message);

        if (data.filename) {
            setImageUrl(`/uploads/${data.filename}`);
        }
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow-lg">
            <form onSubmit={handleSubmit} className="flex">
                <input
                    lang='es'
                    type="file"
                    accept="image/*"
                    className='flex-1 max-w-[80%] text-center flex items-center h-full bg-white border border-gray-300 py-2 rounded'
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
                <button type="submit" className="w-[20%] bg-blue-500 text-white px-4 py-2 rounded">
                    Subir
                </button>
            </form>
            {imageUrl && <img src={imageUrl} alt="Subida" className="mt-4 max-w-xs" />}
        </div>
    );
}
