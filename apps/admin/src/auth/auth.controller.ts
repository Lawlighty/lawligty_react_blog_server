import { User } from '@libs/db/models/user.model';
import { Body, Controller, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReturnModelType, DocumentType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from './dto/update.dto';
import { CurrentUser } from './current-user.decorater';

@Controller('auth')
@ApiTags('用户')
export class AuthController {
  constructor(
    private JwtService: JwtService,
    @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>,
  ) {}
  @Post()
  @ApiOperation({ summary: '注册用户' })
  async register(@Body() dto: RegisterDto) {
    // let { username, password } = dto;
    // let res = await this.userModel.create({
    //   username,
    //   password,
    // });
    // return res;
    const { username, password, ref_code='' } = dto;
    const user_check = await this.userModel.findOne({ username: username });
    if (!user_check) {
      // 创建用户
      const new_user = {
        username,
        password,
        ref_code,
        auth: 'customer',
        nickname: username,
        gender: 2,
        avatar:
          'https://static-dev.roncoo.com/course/0948d9f30817454ea5386118fe1ac20a.jpg',
        introduc: '',
        tags: [],
        email: '',
        other1: '',
        other2: '',
      };

      const user = await this.userModel.create(new_user);
      return user;
    }
    return { status: 400, message: '该用户名已经注册!' };
  }

  @Post('login')
  @ApiOperation({ summary: '用户登录' })
  @UseGuards(AuthGuard('local'))
  async login(@Body() dto: LoginDto, @CurrentUser() user: DocumentType<User>) {
    return {
      status: 200,
      user: user.toJSON(),
      token: this.JwtService.sign({ _id: String(user._id) }), // 生成token 签名
      // token: this.JwtService.sign(user.toJSON()), // 生成token 签名
    };
  }

  @Get('user')
  @ApiOperation({ summary: '获取用户信息' })
  @UseGuards(AuthGuard('jwt')) // 策略 守卫
  @ApiBearerAuth() // 在swagger 上可用传递token
  // async user(@Req() req) {

  // 自定义 装饰器获取user
  async user(@CurrentUser() user: DocumentType<User>) {
    return { status: 200, data: user };
  }

  @Put(':id')
  @ApiOperation({ summary: '修改个人信息' })
  async UpdateUserInfo(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    await this.userModel.findByIdAndUpdate(id, dto);
    return { code: 200, message: '更新完成' };
  }
}
