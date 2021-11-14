import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ description: '用户名' })
  username: string;
  @ApiProperty({ description: '昵称' })
  nickname: string;
  @ApiProperty({ description: '性别' })
  gender: number;
  @ApiProperty({ description: '头像' })
  avatar: string;
}
