/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-classes-per-file */

import { ApiProperty, ApiResponseProperty } from "@nestjs/swagger";

export namespace UserControllerDto {
    export class SignUpRequestDto {
        @ApiProperty()
        private name: string;

        @ApiProperty()
        private nickname: string;

        constructor(name: string, nickname: string) {
            this.name = name;
            this.nickname = nickname;
        }

        public getName(): string {
            return this.name;
        }

        public getNickname(): string {
            return this.nickname;
        }
    }

    export class SignUpResponseDto {
        @ApiResponseProperty()
        private id: number;

        @ApiResponseProperty()
        private name: string;

        @ApiResponseProperty()
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
