import { Controller, Get, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

// import { Image } from "@src/image/Image"; // Entity
import { User } from "@src/user/User";

interface StatusResponse {
    status: string;
}

// https://it-zam.tistory.com/entry/nestjs%EC%97%90-database-%EC%97%B0%EA%B2%B0%ED%95%98%EA%B8%B0
@Controller("/images")
@Injectable()
export class ImageController {
    // constructor(
    //     @InjectRepository(Image)
    //     private imagesRepository: Repository<Image>
    // ) {}
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ) {}

    // @Get("/upload")
    @Get("/upload")
    public async uploadImages(): Promise<StatusResponse> {
        return {
            status: "OK"
        };
    }
    // public async uploadImages(@Body() name: Name): Promise<StatusResponse> {
    //     const user: User | undefined = await this.imagesRepository.findOne(1);
    //     console.log(user);

    //     return {
    //         status: "OK"
    //     };
    // }
}
