import { Controller, Post, Body, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ImageDto } from "@src/image/Image.dto";
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
    public async uploadImages(@Body() image: ImageDto): Promise<StatusResponse> {
        const entity: Image = new Image();
        entity.image = image.image;
        await this.imagesRepository.save(entity);

        return {
            status: "OK"
        };
    }
}
