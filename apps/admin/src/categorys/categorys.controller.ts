import { Category } from '@libs/db/models/category.model';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';
import { CreateCategoryDto } from './dtos/create-category.dto';

@Crud({
  model: Category,
  routes: {
    // get
    find: {
      populate: 'parentid',
      sort: 'orderNum',
      decorators: [ApiOperation({ summary: '查询分类列表' })],
    },
    // get:id
    findOne: {
      decorators: [ApiOperation({ summary: '查看分类详情' })],
    },
    // post
    create: {
      decorators: [ApiOperation({ summary: '创建分类' })],
      dto: CreateCategoryDto,
    },
    // put
    update: {
      decorators: [ApiOperation({ summary: '更新分类' })],
    },
    // delete:id
    delete: {
      decorators: [ApiOperation({ summary: '删除分类' })],
    },
  },
})
@Controller('categorys')
@ApiTags('分类')
export class CategorysController {
  constructor(
    @InjectModel(Category)
    private readonly model: ReturnModelType<typeof Category>,
  ) {}

  // 重写创建
  @Post()
  @ApiOperation({ summary: '创建我的类型' })
  async Create(@Body() dto: CreateCategoryDto) {
    const category = await this.model.findOne({ name: dto.name });
    if (!category) {
      await this.model.create(dto);
      return { status: 200, message: '创建成功' };
    }

    return { status: 400, message: '标签已经存在' };
  }
}
