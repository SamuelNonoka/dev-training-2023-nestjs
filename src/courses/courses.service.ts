import { Injectable, NotFoundException } from '@nestjs/common';
import { Course } from './entities/courses.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './entities/tags.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
  constructor (
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>
  ) {}

  async findAll() {
    return this.courseRepository.find({
      relations: ['tags']
    })
  }

  async findOne(id: string) {
    const course = await this.courseRepository.findOne({
      where: { id },
      relations: ['tags']
    })
  
    if (!course) {
      throw new NotFoundException(`Course ID ${id} not found`)
    }

    return course
  }

  async create (createCourseDto: CreateCourseDto) {
    const tags = await Promise.all(createCourseDto.tags.map(name => this.preloadTagByName(name)))

    const course = this.courseRepository.create({
      ...createCourseDto,
      tags
    })

    return this.courseRepository.save(course)
  }

  async update (id: string, updateCourseDto: UpdateCourseDto) {
    const tags = updateCourseDto.tags && await Promise.all(updateCourseDto.tags.map(name => this.preloadTagByName(name)))

    const course = await this.courseRepository.preload({
      ...updateCourseDto,
      id,
      tags
    })

    if (!course) {
      throw new NotFoundException(`Course ID ${id} not found`)
    }

    return this.courseRepository.save(course)
  }

  async remove (id: string) {
    const course = await this.courseRepository.findOne({
      where: { id }
    })

    if (!course) {
      throw new NotFoundException(`Course ID ${id} not found`)
    }

    return this.courseRepository.remove(course)
  }

  private async preloadTagByName (name: string): Promise<Tag> {
    const tag = await this.tagRepository.findOne({ where: { name }})

    if (tag) {
      return tag
    }

    return this.tagRepository.create({ name })
  }
}
