/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-classes-per-file */

import { ApiProperty, ApiResponseProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export namespace UserControllerDto {
    export class SignUpRequestDto {
        @ApiProperty()
        private name: string;

        @ApiProperty()
        private nickname: string;

        @ApiProperty({ name: "image_id" })
        @Expose({ name: "image_id" })
        private imageId: number;

        constructor(name: string, nickname: string, imageId: number) {
            this.name = name;
            this.nickname = nickname;
            this.imageId = imageId;
        }

        public getName(): string {
            return this.name;
        }

        public getNickname(): string {
            return this.nickname;
        }

        public getImageId(): number {
            return this.imageId;
        }
    }

    export class SignUpResponseDto {
        @ApiProperty()
        private id: number;

        @ApiProperty()
        private name: string;

        @ApiProperty()
        private nickname: string;

        constructor(id: number, name: string, nickname: string) {
            this.id = id;
            this.name = name;
            this.nickname = nickname;
        }

        public getId(): number {
            return this.id;
        }

        public getName(): string {
            return this.name;
        }

        public getNickname(): string {
            return this.nickname;
        }
    }
}
