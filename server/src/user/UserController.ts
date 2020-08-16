import {
    Controller,
    Post,
    Body,
    UsePipes,
    ValidationPipe,
    UseInterceptors,
    NotFoundException,
    BadRequestException
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "@src/user/User";
import { Repository } from "typeorm";
import { ApiBody, ApiResponse } from "@nestjs/swagger";
import { TransformInterceptor } from "@src/common/interceptor/TransformInterceptor";
import { Image } from "@src/image/Image";
import { UserControllerDto } from "./UserControllerDto";

@Controller("/users")
export class UserController {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        @InjectRepository(Image)
        private imageRepository: Repository<Image>
    ) {}

    @Post("/signup")
    @UsePipes(new ValidationPipe({ transform: true }))
    @UseInterceptors(new TransformInterceptor())
    @ApiBody({ type: UserControllerDto.SignUpRequestDto })
    @ApiResponse({ type: UserControllerDto.SignUpResponseDto })
    async signUp(
        @Body() requestDto: UserControllerDto.SignUpRequestDto
    ): Promise<UserControllerDto.SignUpResponseDto> {
        const [existedUser, existedImage]: [
            User | undefined,
            Image | undefined
        ] = await Promise.all([
            this.usersRepository.findOne({
                where: {
                    nickname: requestDto.getNickname()
                }
            }),
            this.imageRepository.findOne({
                where: {
                    imageId: requestDto.getImageId()
                }
            })
        ]);

        if (existedUser !== undefined) {
            throw new BadRequestException("해당 닉네임을 가진 사용자가 이미 존재합니다.");
        }

        if (existedImage === undefined) {
            throw new NotFoundException("해당 아이디를 가진 이미지가 존재하지 않습니다.");
        }

        const user = new User(requestDto.getName(), requestDto.getNickname());
        user.image = existedImage;

        await this.usersRepository.save(user);

        return new UserControllerDto.SignUpResponseDto(user.id, user.name, user.nickname);
    }
}
