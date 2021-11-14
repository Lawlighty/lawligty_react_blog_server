import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ description: '用户名', example: '用户名' })
  username: string;
  @ApiProperty({ description: '密码', example: '密码' })
  password: string;
  @ApiProperty({ description: '推荐码', example: '' })
  ref_code!: string;
}
