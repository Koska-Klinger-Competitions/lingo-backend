import { Controller, Get, Param, Query } from '@nestjs/common';
import { CourseService } from './course.service';

@Controller('course')
export class CourseController {
    constructor(private courseService: CourseService) {}

	@Get('langs')
	getAllCourses() {
		return this.courseService.getAllCourses(); 
	}

    @Get()
    getCourses(@Query('lang') lang: string) {
        return this.courseService.getCourses(lang)
    }

    @Get(':lang-:id')
    getCourse(@Param('lang') lang, @Param('id') id: string) {
        return this.courseService.getCourse(lang, id)
    }

    @Get(':lang-:id/vocab')
    getCourseWords(@Param('lang') lang, @Param('id') id: string) {
        return this.courseService.getCourseWords(lang, id)
    }
}
