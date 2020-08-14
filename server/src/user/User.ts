import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: "nickname", unique: true })
    nickname!: string;

    @Column({ name: "name" })
    name!: string;
}
