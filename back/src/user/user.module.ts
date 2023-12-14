import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt'
import { JwtAuthGuard } from './user.guard';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './user.strategy';
import { UserGateway } from './user.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule.register({
    global: true,
    secret: 'test',
    signOptions: { expiresIn: '60d' },
  }),
  PassportModule.register({
    defaultStrategy: 'jwt'
  })],
  controllers: [UserController],
  providers: [UserService, JwtAuthGuard, JwtStrategy, UserGateway]
})
export class UserModule { }
