import { Component, EventEmitter, Output, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Post } from '../data_model/post.model';
import { PostsService } from '../services/posts.service';

import { Restaurant } from '../data_model/restaurant';
import { PostClass } from '../data_model/postclass';

@Component({
  selector: 'app-postcreate',
  templateUrl: './postcreate.component.html',
  styleUrls: ['./postcreate.component.css']
})
export class PostcreateComponent implements OnInit {

  enteredTitle = "";
  enteredContent = "";
  posts: Post[];
  postCopy: Post;

  postss: PostClass;

  restaurant: Restaurant;

  constructor(public postService: PostsService) { }

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const post: Post = {
      title: form.value.title,
      content: form.value.content,
      author: form.value.author,
      comment_date: form.value.comment_date
    };
    console.log(this.postService.addPost(post.title, post.content, post.author, post.comment_date));

    console.log(this.posts);

    this.postService.postComment(this.posts)
      .then(result => {
        console.log("post comment >>> ", result);
      })
      .catch(
        error => console.log(error.status, error.message)
      );
  }

  ngOnInit() {
    this.posts = this.postService.getPosts();

    this.postService.getComment()
      .then(result => {
        this.postss = result;
        console.log("get comment from service", this.postss);
      })
  }
}
