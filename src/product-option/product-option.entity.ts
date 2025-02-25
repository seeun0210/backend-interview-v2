import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Product } from 'src/product/product.entity';
import { CartItem } from 'src/cart-item/cart-item.entity';

@Entity()
export class ProductOption extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: true })
  size: string | number; // 문자열 또는 숫자 유형을 가질 수 있음

  @Column()
  color: string;

  @Column()
  store: number;

  @ManyToOne(() => Product, (product) => product.options) // Product와의 다대일 관계 설정
  product: Product;

  @OneToMany(() => CartItem, (cartItem) => cartItem.productOption)
  cartItems: CartItem[];
}
