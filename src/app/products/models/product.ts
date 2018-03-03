import { Image } from "./image";

export interface Product {
    _id: string;
    name: string;
    number: string;
    description: string;
    images: Array<Image>
}