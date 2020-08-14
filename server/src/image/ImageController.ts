import { Controller, Post, Body, Injectable, UsePipes, ValidationPipe } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ImageControllerDto } from "@src/image/Image.dto";
import { Image } from "@src/image/Image";

interface StatusResponse {
    status: string;
}

@Controller("/images")
@Injectable()
export class ImageController {
    constructor(
        @InjectRepository(Image)
        private imagesRepository: Repository<Image>
    ) {}

    @Post("/upload")
    @UsePipes(new ValidationPipe({ transform: true }))
    public async uploadImages(
        @Body() requestDto: ImageControllerDto.ImageDto
    ): Promise<StatusResponse> {
        const entity: Image = new Image();
        entity.image = requestDto.getImage();
        await this.imagesRepository.save(entity);
        return {
            status: "OK"
        };
    }
}
