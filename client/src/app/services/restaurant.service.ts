import { Injectable } from '@angular/core';
import { Restaurant } from '../data_model/restaurant';
import { RESTAURANT_ARRAY } from '../data_model/restaurantArray';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private http: HttpClient) { }

  getRestaurants(): Promise<Restaurant> {

    console.info('>>> getrestaurants')
    return this.http.get<Restaurant>('/api/orders').toPromise();
  }

  getRestaurant(id: string): Promise<Restaurant> {
    return new Promise(resolve => {
      setTimeout(() => resolve(RESTAURANT_ARRAY.filter((restau) => (restau.id === id))[0]), 2000);
    })
  }

  getFeaturedRestaurant(): Promise<Restaurant> {
    return new Promise(resolve => {
      setTimeout(() => resolve(RESTAURANT_ARRAY.filter((restau) => restau.featured)[0]), 1000);
    })
  }

  postComment(restaurantId: string, comment: any) {
    return this.http.post('/api/order' + restaurantId + '/comments', comment);
  }

}
