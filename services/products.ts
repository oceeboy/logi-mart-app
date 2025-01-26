import { http } from '../libs/ky';

export type ProductDataProps = {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  createdAt: Date;
};

// check improvement during test
async function getAllProduct() {
  const data: Response = await http.get('product').json();
  return data;
}

export { getAllProduct };
