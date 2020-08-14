import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { User } from "@src/user/User";
import { UserController } from "./user/UserController";

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: "mysql",
                host: configService.get("DATABASE_HOST"),
                port: configService.get("DATABASE_PORT"),
                username: configService.get("DATABASE_USERNAME"),
                password: configService.get("DATABASE_PASSWORD"),
                database: configService.get("DATABASE_NAME"),
                entities: [User],
                synchronize: true
            }),
            inject: [ConfigService]
        }),
        TypeOrmModule.forFeature([User]),
        ConfigModule.forRoot()
    ],
    controllers: [UserController],
    providers: []
})
export class AppModule {}