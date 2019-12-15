import { Injectable } from '@angular/core';
import { Promotion } from '../data_model/promotion';
import { PROMOTION_ARRAY } from '../data_model/promotionArray';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  getPromotions(): Promotion[] {
    return PROMOTION_ARRAY;
  }

  getPromotion(id: string) : Promotion {
    return PROMOTION_ARRAY.filter( (promo) => (promo.id === id))[0];
  }

  getFeaturedPromotion(): Promotion {
    return PROMOTION_ARRAY.filter( (promo) => promo.featured)[0];
  }

  constructor() { }

}
