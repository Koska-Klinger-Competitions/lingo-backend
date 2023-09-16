import { Controller, Get, Param } from '@nestjs/common';
import { AudioService } from './audio.service';

@Controller('audio')
export class AudioController {
    constructor(private audioService: AudioService) {}

    @Get(':lang/:id')
    getAudio(@Param('lang') lang: string, @Param('id') id: string) {
        return this.audioService.getAudio(lang, id)
    }
}
