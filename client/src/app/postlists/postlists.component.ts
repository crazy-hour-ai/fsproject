import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../data_model/post.model';
import { PostsService } from '../services/posts.service';


@Component({
  selector: 'app-postlists',
  templateUrl: './postlists.component.html',
  styleUrls: ['./postlists.component.css']
})
export class PostlistsComponent implements OnInit {

  posts: Post[] = [];

  constructor(public postService: PostsService) { }

  ngOnInit() {
    this.posts = this.postService.getPosts();
  }

}
