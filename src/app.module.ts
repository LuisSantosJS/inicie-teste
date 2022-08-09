import { Module } from '@nestjs/common';
import { JwtStrategy } from './auth/guard/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthService } from './auth/service/auth.service';
import { AuthController } from './auth/controller/auth.controller';
import { UserController } from './user/controller/user.controller';
import { UserService } from './user/service/user.service';
import { PostService } from './post/service/post.service';
import { PostController } from './post/controller/post.controller';
import { CommentController } from './comment/controller/comment.controller';
import { CommentService } from './comment/service/comment.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    PassportModule,
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [AuthController, UserController, PostController, CommentController],
  providers: [AuthService, JwtStrategy, UserService, PostService, CommentService],
})
export class AppModule { }
