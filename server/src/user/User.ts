import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { Image } from "@src/image/Image";
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: "nickname", unique: true })
    nickname!: string;

    @Column({ name: "name" })
    name!: string;

    @OneToOne(() => Image)
    @JoinColumn()
    image!: Image;
}
