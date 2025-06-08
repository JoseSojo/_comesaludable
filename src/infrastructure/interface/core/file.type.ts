import { CoreFiles, Photos } from "@prisma/client";

export interface ImageType extends Photos {
    photoReference: CoreFiles
}
