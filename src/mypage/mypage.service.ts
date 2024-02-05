import { Injectable } from '@nestjs/common';
import { UserRepository } from '../users/users.repository';
import { User } from 'src/users/user.entity';
@Injectable()
export class MypageService {
  constructor(private userRepository: UserRepository) {}

  async getMyReviews(user: User) {
    const userInfo = await this.userRepository.findOne({
      where: { id: user.id },
      relations: ['reviews', 'reviews.product'],
    });
    const simplifiedReviews = userInfo.reviews.map((review) => ({
      id: review.id,
      title: review.title,
      content: review.content,
      satisfaction_level: review.satisfaction_level,
      created_at: review.created_at,
      updated_at: review.updated_at,
      product: {
        id: review.product.id,
        name: review.product.name,
        description: review.product.description,
        price: review.product.price,
        brand: review.product.brand,
        category: review.product.category,
      },
    }));
    return simplifiedReviews;
  }

  async getMyLikes(user: User) {
    const userInfo = await this.userRepository.findOne({
      where: { id: user.id },
      relations: ['likes', 'likes.product'],
    });
    const result = userInfo.likes.map((like) => ({
      id: like.id,
      product: {
        id: like.product.id,
        name: like.product.name,
        description: like.product.description,
        view_count: like.product.view_count,
        total_store: like.product.total_store,
        brand: like.product.brand,
        category: like.product.category,
      },
    }));
    return result;
  }
}
