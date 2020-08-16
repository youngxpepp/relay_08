import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { Rekognition, Config } from "aws-sdk";
import { ConfigService } from "@nestjs/config";
import { ImageBlob } from "aws-sdk/clients/rekognition";

@Injectable()
export class CompareFacesService {
    private rekognition: Rekognition;

    constructor(private configService: ConfigService) {
        this.rekognition = new Rekognition(
            new Config({
                region: this.configService.get("AWS_REKOGNITION_REGION"),
                accessKeyId: this.configService.get("AWS_REKOGNITION_ACCESS_KEY_ID"),
                secretAccessKey: this.configService.get("AWS_REKOGNITION_SECRET_ACCESS_KEY")
            })
        );
    }

    async compareFaces(source: ImageBlob, target: ImageBlob): Promise<number> {
        const response = await this.rekognition
            .compareFaces({
                SourceImage: {
                    Bytes: source
                },
                TargetImage: {
                    Bytes: target
                }
                // SimilarityThreshold: 80
            })
            .promise();

        if (response.FaceMatches?.length === 0) {
            return 0;
        }

        const similarities: number[] | undefined = response.FaceMatches?.map(faceMatch => {
            if (faceMatch.Similarity === undefined) {
                return 0;
            }
            return faceMatch.Similarity;
        });

        if (similarities === undefined) {
            throw new InternalServerErrorException();
        }

        similarities.sort((a, b) => a - b);

        return similarities[similarities.length - 1];
    }
}
