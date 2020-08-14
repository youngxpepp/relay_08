export namespace ImageControllerDto {
    export class ImageDto {
        private image: string;

        constructor(image: string) {
            this.image = image;
        }

        public getImage(): string {
            return this.image;
        }
    }
}
