import { Body, Controller, Delete, Get, Param, Post, Put, Res } from "@nestjs/common";
import { UserService } from "./user.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { CreateUserDto } from "./dto/create-user.dto";


@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    async create(@Body() createUserDto: CreateUserDto, @Res() response) {
        const dataClient = await this.userService.create(createUserDto)
        return response.status(200).json({ message: "Usuário cadastrado!", data: dataClient })
    }

    @Get()
    async findAll(@Res() response) {
        const dataClient = await this.userService.findAll()
        return response.status(200).json({ message: "Usuários Filtrados!", data: dataClient })
    }

    @Get(':id')
    async findOne(@Param('id') id: string, @Res() response) {
        const dataClient = await this.userService.findOne(+id)
        return response.status(200).json({ message: "Usuário Filtrado!", data: dataClient })
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Res() response) {
        const dataClient = await this.userService.update(+id, updateUserDto)
        return response.status(200).json({ message: "Usuário Atualizado!", data: dataClient })
    }

    @Delete(':id')
    async remove(@Param(':id') id: string, @Res() response) {
        const dataClient = await this.userService.remove(+id)
        return response.status(200).json({ message: "Usuário Deletado!", data: dataClient })
    }

}