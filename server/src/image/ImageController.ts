import { Controller, Post, Body, Injectable, UsePipes, ValidationPipe } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ImageControllerDto } from "@src/image/Image.dto";
import { Image } from "@src/image/Image";

@Controller("/images")
@Injectable()
export class ImageController {
    constructor(
        @InjectRepository(Image)
        private imagesRepository: Repository<Image>
    ) {}

    @Post("/upload")
    @UsePipes(new ValidationPipe({ transform: true }))
    public async uploadImages(@Body() requestDto: ImageControllerDto.ImageDto): Promise<Number> {
        const entity: Image = new Image();
        entity.image = requestDto.getImage();

        const idValue = await this.imagesRepository.save(entity);
        return idValue.imageId;
    }
}
