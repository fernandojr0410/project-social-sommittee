import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "../dto/create-user.dto";
import { UserEntity } from "../entities/user.entity";
import { PrismaService } from "../../prisma/prisma.service";
import { UpdateUserDto } from "../dto/update-user.dto";

@Injectable()
export class UserRepository {

    constructor(private readonly prisma: PrismaService) {
        console.log('Repositório: Usuário criado!')
    }

    async create(createUserDto: CreateUserDto): Promise<UserEntity> {
        return this.prisma.user.create({
            data: {
                ...createUserDto
            }
        })
    }

    async findAll(): Promise<UserEntity[]> {
        return this.prisma.user.findMany()
    }

    async findOne(id: number): Promise<UserEntity> {
        return this.prisma.user.findUnique({
            where: {
                id,
            }
        })
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
        return this.prisma.user.update({
            where: { id },
            data: updateUserDto
        })
    }

    async remove(id: number): Promise<UserEntity> {
        return this.prisma.user.delete({
            where: {
                id,
            }
        })
    }

}