import { Comment } from "@prisma/client";

export interface ComentType extends Comment {
    
}

export interface CommentCreate {
    name: string
}
