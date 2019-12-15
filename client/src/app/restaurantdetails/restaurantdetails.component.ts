import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { Restaurant } from '../data_model/restaurant';
import { RESTAURANT_ARRAY } from '../data_model/restaurantArray';

import { Params, ActivatedRoute } from '@angular/router';
import { RestaurantService } from '../services/restaurant.service';
import { Location } from '@angular/common';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { HttpClient } from '@angular/common/http';

import { PostsService } from '../services/posts.service';
import { Post } from '../data_model/post.model';
import { PostClass } from '../data_model/postclass';


@Component({
  selector: 'app-restaurantdetails',
  templateUrl: './restaurantdetails.component.html',
  styleUrls: ['./restaurantdetails.component.css']
})
export class RestaurantdetailsComponent implements OnInit {

  enterValue = '';

  restaurant: Restaurant;
  posts: PostClass;

  @ViewChild('cform', { static: false }) commentFormDirective;

  constructor(private restaurantService: RestaurantService,
    private route: ActivatedRoute, private location: Location,
    private postService: PostsService) { }

  commentForm: FormGroup;


  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    // console.log(typeof id);
    // this.restaurant = this.restaurantService.getRestaurant(id);
    this.restaurantService.getRestaurant(id)
      .then(restau => this.restaurant = restau);
    console.log(this.restaurant);

    this.postService.getComment()
      .then(result => {
        this.posts = result;
        // .then(result => this.posts[0] = result[0]);
        console.log("get comment from service", this.posts);
      })
  }
  goBack(): void {
    this.location.back();
  }
  
}
