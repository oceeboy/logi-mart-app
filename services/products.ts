import { http } from '../libs/ky';

export interface ProductDataProps {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  createdAt: Date;
}

async function getAllProduct() {
  const data: ProductDataProps = await http.get('product').json();
  return data;
}

export { getAllProduct };
