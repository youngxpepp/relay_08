import { Controller, Get, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "@src/user/User";
import { Repository } from "typeorm";

interface TestResponse {
    id: number;
    password: number;
}

@Controller("/users")
@Injectable()
export class UserController {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ) {}

    @Get("/test4")
    async test(): Promise<TestResponse> {
        const user: User | undefined = await this.usersRepository.findOne(1);
        console.log(user);

        return {
            id: 123,
            password: 56
        };
    }

    @Get("/test")
    helloWorld(): string {
        return "hello world";
    }
}
