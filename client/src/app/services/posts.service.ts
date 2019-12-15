import { Injectable } from '@angular/core';
import { Post } from '../data_model/post.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PostClass } from '../data_model/postclass';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  posts : Post[] = [];
  postclass: PostClass;

  comment: Post;

  httpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getPosts() {
    return this.posts;
  }

  addPost(title : string , content: string, author: string, comment_date: string) {
    const post: Post = {title: title, content: content, author: author, comment_date: comment_date};
    this.posts.push(post);
  }

  postComment(posts : Post[])  {
    return this.http.post<Post[]>('/test',this.posts[0], this.httpOption).toPromise();
  }

  getComment(): Promise<PostClass> {
    console.info('>>> getComment');
    return this.http.get<PostClass>('/api/comment').toPromise();
  }

}
