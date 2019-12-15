import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { RestaurantdetailsComponent } from './restaurantdetails/restaurantdetails.component';
import { LoginComponent } from './login/login.component';
import { RecipeComponent } from './recipe/recipe.component';


const routes: Routes = [
  {path:'home', component:HomeComponent},
  {path:'menu', component:MenuComponent},
  {path:'recipe', component:RecipeComponent},
  {path:'contact', component:ContactComponent},
  {path:'restaurantdetails/:id', component:RestaurantdetailsComponent},
  {path:'login', component:LoginComponent},
  {path:'*', redirectTo:'/home', pathMatch:'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash:false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
