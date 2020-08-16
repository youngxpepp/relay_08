/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-classes-per-file */

import { Expose } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export namespace ImageControllerDto {
    export class UploadImagesRequestDto {
        @ApiProperty()
        private image: string;

        constructor(image: string) {
            this.image = image;
        }

        public getImage(): string {
            return this.image;
        }
    }

    export class UploadImagesResponseDto {
        @ApiProperty({ name: "image_id" })
        @Expose({ name: "image_id" })
        private imageId: number;

        @ApiProperty()
        private image: string;

        constructor(imageId: number, image: string) {
            this.imageId = imageId;
            this.image = image;
        }

        public getImageId(): number {
            return this.imageId;
        }

        public getImage(): string {
            return this.image;
        }
    }
}
