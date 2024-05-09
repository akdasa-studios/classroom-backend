import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { ApiTags, ApiBody, ApiConsumes } from '@nestjs/swagger'
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Media')
@Controller('media')
export class MediaController {
  constructor() {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file: Express.Multer.File) {
    console.log(file)
    return { path: file.filename }
  }
}
