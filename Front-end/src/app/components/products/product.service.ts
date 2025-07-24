import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {
  private baseUrl = 'http://localhost:7000/api/products';

  constructor(private http: HttpClient) { }

  getUserByToken(): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<any>(`${this.baseUrl}/user/product/token`, { headers: headers, withCredentials: true });
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }

  getProductByName(name: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${name}`);
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }

  /*createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product);
  }

  updateProduct(id: string, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/${id}`, product);
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }*/

  getCartByUserId(userId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${userId}/cart`);
  }  

}