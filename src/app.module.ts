import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './typeorm-setting/configs/typeorm.configs';
import { LikeModule } from './like/like.module';
import { CartModule } from './cart/cart.module';
import { ReviewModule } from './review/review.module';
import { ProductOptionModule } from './product-option/product-option.module';
import { CartItemModule } from './cart-item/cart-item.module';
import { MypageModule } from './mypage/mypage.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    UsersModule,
    ProductModule,
    LikeModule,
    CartModule,
    ReviewModule,
    ProductOptionModule,
    CartItemModule,
    MypageModule,
  ],
})
export class AppModule {}
