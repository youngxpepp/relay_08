/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-classes-per-file */

import { Expose } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export namespace AIControllerDto {
    export class CompareFacesRequestDto {
        @ApiProperty({ name: "compared_face" })
        @Expose({ name: "compared_face" })
        private comparedFace: string;

        constructor(comparedFace: string) {
            this.comparedFace = comparedFace;
        }

        getComparedFace() {
            return this.comparedFace;
        }
    }

    export class CompareFacesResponseDto {
        @ApiProperty({ name: "user_id" })
        @Expose({ name: "user_id" })
        private userId: number;

        @ApiProperty({ name: "user_name" })
        @Expose({ name: "user_name" })
        private userName: string;

        @ApiProperty({ name: "user_nickname" })
        @Expose({ name: "user_nickname" })
        private userNickname: string;

        @ApiProperty({ name: "user_image" })
        @Expose({ name: "user_image" })
        private userImage: string;

        @ApiProperty({ name: "similarity" })
        private similarity: number;

        constructor(
            userId: number,
            userName: string,
            userNickname: string,
            userImage: string,
            similarity: number
        ) {
            this.userId = userId;
            this.userName = userName;
            this.userNickname = userNickname;
            this.userImage = userImage;
            this.similarity = similarity;
        }
    }
}
