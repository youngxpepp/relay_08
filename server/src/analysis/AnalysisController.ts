import { Controller, Injectable, Post, Body, UsePipes, ValidationPipe } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ImageControllerDto } from "@src/image/Image.dto";
import { Image } from "@src/image/Image";

@Controller("/analysis")
@Injectable()
export class AnalysisController {
    constructor(
        @InjectRepository(Image)
        private imagesRepository: Repository<Image>
    ) {}

    @Post("/data")
    @UsePipes(new ValidationPipe({ transform: true }))
    async faceAnalysis(@Body() requestDto: ImageControllerDto.ImageDto): Promise<String> {
        const requstImg = requestDto.getImage(); // 요청 받은 이미지
        console.log(requstImg);

        // 이미 있는 전체 파일과 비교 (일정 비교 결과 이상 JSON 출력)
        const allImage = this.findAll();
        console.log(allImage);

        // 가장 동일한 img 리턴
        return "test";
    }

    async findAll(): Promise<Image[]> {
        return this.imagesRepository.find();
    }
}
