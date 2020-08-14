import {
    Controller,
    Injectable,
    Post,
    Body,
    UsePipes,
    ValidationPipe,
    UseInterceptors
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "@src/user/User";
import { Repository, Connection } from "typeorm";
import { ApiBody, ApiResponse } from "@nestjs/swagger";
import { TransformInterceptor } from "@src/common/interceptor/TransformInterceptor";
import { UserControllerDto } from "./UserControllerDto";

@Controller("/users")
@Injectable()
export class UserController {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private connection: Connection,
        private transformInterceptor: TransformInterceptor
    ) {}

    @Post("/signup")
    @UsePipes(new ValidationPipe({ transform: true }))
    @UseInterceptors(new TransformInterceptor())
    @ApiBody({ type: UserControllerDto.SignUpRequestDto })
    @ApiResponse({ type: UserControllerDto.SignUpResponseDto })
    async signUp(
        @Body() requestDto: UserControllerDto.SignUpRequestDto
    ): Promise<UserControllerDto.SignUpResponseDto> {
        const existedUser: User | undefined = await this.usersRepository.findOne({
            where: {
                nickname: requestDto.getNickname()
            }
        });

        if (existedUser !== undefined) {
            throw new Error("해당 닉네임을 가진 사용자가 이미 존재합니다.");
        }

        const user = await this.usersRepository.save(
            new User(requestDto.getName(), requestDto.getNickname())
        );

        return new UserControllerDto.SignUpResponseDto(user.id, user.name, user.nickname);
    }
}
