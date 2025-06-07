'use client';

import { Send, User } from "lucide-react";
import { useState } from "react";
import StarRating from "../common/StartRatting";
import toast from "react-hot-toast";
import { useCommentCrud } from "@/application/hooks/interactions/useComment";
import { useAuth } from "@/domain/context/AuthContext";

interface Props {
    coment: 'APP' | 'RESTAURANTE' | 'MENU'
    title?: string;
    id?: string;
    cllb?: () => void
}

export default function CommentGlobal({ coment,id,title,cllb }: Props) {
    const { createComent } = useCommentCrud(0,0,{});

    const { user } = useAuth();
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (rating === 0 || !comment.trim()) {
            return;
        }

        setIsSubmitting(true);

        // Simulate API call
        await createComent({
            id,
            comment,
            stars: rating,
            userId: user.id,
            for: coment
        })

        // Reset form
        setRating(0);
        setComment('');
        setIsSubmitting(false);
        if(cllb) cllb();
        return toast.success('Gracias por comentar')
    };

    const isFormValid = rating > 0 && comment.trim();

    return (
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 border border-orange-100 lg:w-[60%] m-auto my-5">
            <div className="flex items-center mb-6">
                <div className="bg-emerald-500 rounded-full p-2 mr-3">
                    <Send className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                    {
                        title ? title :
                        coment === 'RESTAURANTE' ? <>Que opinas del Restaurante?</>
                        : coment === 'MENU' ? <>Que opinas del Menu?</>
                        : <>Dejanos un comentario</>
                    }
                </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                        Escribe tu comentario:
                    </label>
                    <textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 resize-none"
                        placeholder="Escribri aqui..."
                        required
                    />
                    <div className="text-right text-sm text-gray-500 mt-1">
                        {comment.length}/500
                    </div>
                </div>

                <div>
                    <div className="flex items-center space-x-2">
                        <StarRating rating={rating} onRatingChange={setRating} size="lg" />
                        <span className="text-sm text-gray-600 ml-2">
                            {rating > 0 && `${rating} out of 5 stars`}
                        </span>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={!isFormValid || isSubmitting}
                    className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 ${isFormValid && !isSubmitting
                            ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                >
                    {isSubmitting ? (
                        <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            Enviando...
                        </div>
                    ) : (
                        <div className="flex items-center justify-center">
                            <Send className="w-5 h-5 mr-2" />
                            Enviar
                        </div>
                    )}
                </button>
            </form>
        </div>
    );
} 
