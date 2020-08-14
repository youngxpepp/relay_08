import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { User } from "@src/user/User";
import { Image } from "@src/image/Image";
import { UserController } from "./user/UserController";
import { ImageController } from "./image/ImageController";
import { AnalysisController } from "./analysis/AnalysisController";

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
                entities: [User, Image],
                synchronize: true
            }),
            inject: [ConfigService]
        }),
        TypeOrmModule.forFeature([User, Image]),
        ConfigModule.forRoot()
    ],
    controllers: [UserController, ImageController, AnalysisController],
    providers: []
})
export class AppModule {}
