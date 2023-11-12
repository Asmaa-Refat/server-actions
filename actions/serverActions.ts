  //server actions
  'use server';

  import { Product } from "@/typings";
  import { revalidateTag } from "next/cache";
  
  export const addProductToDatabase = async (e: FormData) => {
  
      const productName = e.get('product')?.toString();
      const price = e.get('price')?.toString();
      
      //defensive programming statement
      if(!productName || !price) return;
  
      const newProduct: Product = {
        productName,  // a trick instead of (productName: productName)
        price,
      }
      
      await fetch("https://654fcf2b358230d8f0cdb71e.mockapi.io/products", {
        method: 'Post',
        body: JSON.stringify(newProduct),
        headers: {
          'Content-Type': 'application/json'
        },
      })
      revalidateTag('products');
  };