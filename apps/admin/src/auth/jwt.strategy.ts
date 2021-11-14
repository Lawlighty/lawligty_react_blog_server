import { Strategy, StrategyOptions, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { InjectModel } from 'nestjs-typegoose';
import { User } from '@libs/db/models/user.model';
import { ReturnModelType } from '@typegoose/typegoose';

export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  // token策略
  constructor(
    @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>,
  ) {
    // jwt ==>1.获取token , 2.还原token 生成的id (token由id生成)
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_TOKEN,
    } as StrategyOptions);
    console.log('进入token验证');
  }

  async validate(id) {
    const user = this.userModel.findById(id);
    return this.userModel.findById(id);
  }
}
