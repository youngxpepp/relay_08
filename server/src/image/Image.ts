import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Image {
    @PrimaryGeneratedColumn()
    imageId!: number;

    @Column({ type: "longblob", name: "image" })
    image!: Buffer;
}
