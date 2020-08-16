import {
    Controller,
    Post,
    Body,
    Injectable,
    UsePipes,
    ValidationPipe,
    UseInterceptors,
    BadRequestException
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ImageControllerDto } from "@src/image/ImageControllerDto";
import { Image } from "@src/image/Image";
import { TransformInterceptor } from "@src/common/interceptor/TransformInterceptor";
import { ApiBody, ApiResponse } from "@nestjs/swagger";

@Controller("/images")
@Injectable()
export class ImageController {
    constructor(
        @InjectRepository(Image)
        private imagesRepository: Repository<Image>
    ) {}

    @Post("/upload")
    @UsePipes(new ValidationPipe({ transform: true }))
    @UseInterceptors(new TransformInterceptor())
    @ApiBody({ type: ImageControllerDto.UploadImagesRequestDto })
    @ApiResponse({ type: ImageControllerDto.UploadImagesResponseDto })
    public async uploadImages(
        @Body() requestDto: ImageControllerDto.UploadImagesRequestDto
    ): Promise<ImageControllerDto.UploadImagesResponseDto> {
        const image = new Image();
        const jpegImageArr = requestDto.getImage().split("data:image/jpeg;base64,");
        const pngImageArr = requestDto.getImage().split("data:image/png;base64,");

        if (jpegImageArr.length === 2) {
            image.image = Buffer.from(jpegImageArr[1], "base64");
        } else if (pngImageArr.length === 2) {
            image.image = Buffer.from(pngImageArr[1], "base64");
        } else {
            throw new BadRequestException("이미지는 PNG 또는 JPEG 형식이어야 합니다.");
        }

        await this.imagesRepository.save(image);

        return new ImageControllerDto.UploadImagesResponseDto(
            image.imageId,
            image.image.toString("base64")
        );
    }
}
