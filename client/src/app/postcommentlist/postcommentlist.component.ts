import { Component, OnInit, EventEmitter } from '@angular/core';

import { Restaurant } from '../data_model/restaurant';
import { RESTAURANT_ARRAY } from '../data_model/restaurantArray';

import { Params, ActivatedRoute } from '@angular/router';
import { RestaurantService } from '../services/restaurant.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-postcommentlist',
  templateUrl: './postcommentlist.component.html',
  styleUrls: ['./postcommentlist.component.css']
})
export class PostcommentlistComponent implements OnInit {

  enterValue = '';
  enterTitle = '';
  enterContent = '';
  newPost = 'No content';
  postCreated = new EventEmitter();

  restaurant: Restaurant;


  constructor(private restaurantService: RestaurantService,
    private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    // console.log(typeof id);

    // this.restaurant = this.restaurantService.getRestaurant(id);
    this.restaurantService.getRestaurant(id)
      .then(restau => this.restaurant = restau);
    console.log(this.restaurant);
  }

  posts = [{ title: "", content: "" }]
  addPost() {
    this.posts.push()
  }

  onAddPost() {
    const POSTS = { title: this.enterTitle, content: this.enterContent };

  }
}
