import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { User } from 'src/users/user.entity';
import { Review } from './review.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/users/get-user.decorator';
import { UpdateReviewDto } from './dto/update-review.dto';

@Controller('api/review')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard())
  async createReview(
    @Query('productId') productId: number,
    @Body() createReviewDto: CreateReviewDto,
    @GetUser() user: User,
  ): Promise<{ message: string; review: Review }> {
    console.log(Number(productId));
    return this.reviewService.createReview(
      Number(productId),
      createReviewDto,
      user,
    );
  }

  @Get()
  getReviewsByProduct(@Query('productId') productId: number): Promise<
    {
      id: number;
      title: string;
      content: string;
      satisfaction_level: number;
      user: { nickname: string };
    }[]
  > {
    {
      return this.reviewService.getReviewsByProduct(productId);
    }
  }

  @Patch('/:id')
  @UseGuards(AuthGuard())
  updateReview(
    @Param('id') id: number,
    @GetUser() user: User,
    @Body() updateReviewDto: UpdateReviewDto,
  ): Promise<{
    message: string;
    review: {
      id: number;
      title: string;
      content: string;
      satisfaction_level: number;
      user: { nickname: string };
    };
  }> {
    return this.reviewService.updateReview(id, user, updateReviewDto);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  deleteReview(
    @Param('id') id: number,
    @GetUser() user: User,
  ): Promise<{ message: string }> {
    return this.reviewService.deleteReview(id, user);
  }
}
