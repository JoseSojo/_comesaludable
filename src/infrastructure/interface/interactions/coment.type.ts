import { Comment } from "@prisma/client";

export interface ComentType extends Comment {
    
}

export interface CommentCreate {
    stars: number
    comment: string
    id: string
    type?: "restaurant" | "menu"
    userId: string
}
