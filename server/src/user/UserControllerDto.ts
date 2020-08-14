/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-classes-per-file */

export namespace UserControllerDto {
    export class SignUpRequestDto {
        private name: string;

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
        private id: number;

        private name: string;

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
