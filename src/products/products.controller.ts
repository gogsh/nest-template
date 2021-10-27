import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Header,
  Redirect,
} from '@nestjs/common'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { ProductsService } from './products.service'
import { Product } from './schemas/product.schema'

@Controller('products')
export class ProductsController {

  // Инъекция сервиса в контроллер
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  // @Redirect('https://google.com', 301)
  getAll(): Promise<Product[]> {
    return this.productsService.getAll()
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<Product> {
    return this.productsService.getById(id)
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Cache-Control', 'none')
  create(@Body() сreateProductDto: CreateProductDto): Promise<Product> {
    return this.productsService.create(сreateProductDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Product> {
    return this.productsService.remove(id)
  }

  @Put(':id')
  update(@Body() updateProductDto: UpdateProductDto, @Param('id') id: string): Promise<Product> {
    return this.productsService.update(id, updateProductDto)
  }
}
