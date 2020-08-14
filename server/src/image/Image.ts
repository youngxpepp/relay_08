import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Image {
    @PrimaryGeneratedColumn()
    imageId!: number;

    @Column({ type: "blob", name: "image" })
    image!: string;
}
