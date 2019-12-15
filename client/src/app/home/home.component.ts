import { Component, OnInit } from '@angular/core';
import { Promotion } from '../data_model/promotion';
import { PromotionService } from '../services/promotion.service';

import { Restaurant } from '../data_model/restaurant';
import { RestaurantService } from '../services/restaurant.service';

import { SearchService } from '../services/search.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  restaurant: Restaurant;
  promotion: Promotion;
  user = { search: '' };
  totalresult: number;

  searchresult: Restaurant[];

  constructor(private restaurantService: RestaurantService,
    private promotionService: PromotionService,
    private searchService: SearchService,
    private http: HttpClient) {

  }

  ngOnInit() {
    this.restaurantService.getFeaturedRestaurant()
      .then(rest => this.restaurant = rest);
    this.promotion = this.promotionService.getFeaturedPromotion();
  }

  searchSubmit() {
    console.log(this.user);

    this.getSearchService()
      .then(result => {
        this.searchresult = result;
        console.log("search result >>> ", result);
        this.totalresult = this.searchresult.length;
      })
  }

  getSearchService(): Promise<any> {
    return this.http.get<any>(`/api/search?q=${this.user['search']}`).toPromise();
  }

}
