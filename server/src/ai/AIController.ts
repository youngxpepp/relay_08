import {
    Controller,
    Post,
    UsePipes,
    ValidationPipe,
    UseInterceptors,
    Body,
    BadRequestException,
    NotFoundException
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "@src/user/User";
import { Repository } from "typeorm";
import { Image } from "@src/image/Image";
import { TransformInterceptor } from "@src/common/interceptor/TransformInterceptor";
import { ApiBody, ApiResponse } from "@nestjs/swagger";
import { AIControllerDto } from "./AIControllerDto";
import { CompareFacesService } from "./CompareFacesService";

@Controller("/ai")
export class AIController {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Image)
        private imageRepository: Repository<Image>,
        private compareFacesService: CompareFacesService
    ) {}

    @Post("/compare-faces")
    @UsePipes(new ValidationPipe({ transform: true }))
    @UseInterceptors(new TransformInterceptor())
    @ApiBody({ type: AIControllerDto.CompareFacesRequestDto })
    @ApiResponse({ type: AIControllerDto.CompareFacesResponseDto })
    async compareFaces(
        @Body() requestDto: AIControllerDto.CompareFacesRequestDto
    ): Promise<AIControllerDto.CompareFacesResponseDto> {
        const jpegImageArr = requestDto.getComparedFace().split("data:image/jpeg;base64,");
        const pngImageArr = requestDto.getComparedFace().split("data:image/png;base64,");

        let comparedFace = "";
        if (jpegImageArr.length === 2) {
            comparedFace = jpegImageArr[1];
        } else if (pngImageArr.length === 2) {
            comparedFace = pngImageArr[1];
        } else {
            throw new BadRequestException("이미지는 PNG 또는 JPEG 형식이어야 합니다.");
        }

        const allUsers: User[] = await this.userRepository.find();

        const compareFacesResult = (
            await Promise.all(
                allUsers.map(user =>
                    this.compareFacesService.compareFaces(
                        user.image.image,
                        Buffer.from(comparedFace, "base64")
                    )
                )
            )
        )
            .map((similarity, index) => ({ user: allUsers[index], similarity }))
            .sort((a, b) => a.similarity - b.similarity);

        console.log(compareFacesResult);

        if (compareFacesResult[compareFacesResult.length - 1].similarity < 80) {
            throw new NotFoundException("유사한 인물을 찾을 수 없습니다.");
        }

        const { user } = compareFacesResult[compareFacesResult.length - 1];

        return new AIControllerDto.CompareFacesResponseDto(
            user.id,
            user.name,
            user.nickname,
            user.image.image.toString("base64"),
            compareFacesResult[compareFacesResult.length - 1].similarity
        );
    }
}
