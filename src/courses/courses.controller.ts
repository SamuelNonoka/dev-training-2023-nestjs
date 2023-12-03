import { Body, Controller, Get, Param, Post, HttpCode, Delete, HttpStatus, Put } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('courses')
export class CoursesController {
  constructor (private readonly courseService: CoursesService) {}  

  @Get()
  findAll () {
    return this.courseService.findAll()
  } 

  @Get(':id')
  findOne (@Param('id') id: string) {
    return this.courseService.findOne(id)
  }
  
  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.create(createCourseDto)
  }

  @Put('id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(id, updateCourseDto)
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(id)
  }
}
