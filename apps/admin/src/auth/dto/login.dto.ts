import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ description: '用户名', example: '用户名' })
  username: string;
  @ApiProperty({ description: '密码', example: '密码' })
  password: string;
}
