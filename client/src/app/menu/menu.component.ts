import { Component, OnInit, ViewChild } from '@angular/core';
import { RESTAURANT_ARRAY } from '../data_model/restaurantArray';
import { Restaurant} from '../data_model/restaurant';
import { RestaurantService } from '../services/restaurant.service';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {

  restaurants:Restaurant;

  selectedRestaurant: Restaurant;

  @ViewChild(MatPaginator, {static: false}) paginator : MatPaginator;

  constructor(private restaurantService : RestaurantService) { }

  ngOnInit() {
  
    this.restaurantService.getRestaurants()
      .then(result => {
        console.info('>>> result', result)
        this.restaurants = result;        
      })
  }
}
