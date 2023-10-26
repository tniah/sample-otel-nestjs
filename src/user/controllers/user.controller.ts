import {Body, Controller, Get, Param, Post} from "@nestjs/common";
import {UserCreateInputDto} from "../dtos/user-create-input.dto";
import {UserService} from "../services/user.service";
import {UserOutputDto} from "../dtos/user-output.dto";
import {BaseApiResponseDto} from "../../shared/dtos/base-api-response.dto";


@Controller({
    path: 'users',
    version: ['1']
})
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {
    }

    @Get()
    async getUsers(): Promise<BaseApiResponseDto<UserOutputDto[]>> {
        const {users, count} = await this.userService.getUsers(10, 0);
        return {data: users, meta: {count}};
    }

    @Post()
    async createUser(
        @Body() input: UserCreateInputDto
    ): Promise<BaseApiResponseDto<UserOutputDto>> {
        console.log(input)
        const user = await this.userService.createUser(input);
        return {'data': user, 'meta': {}};
    }

    @Get(':id')
    async getUser(
        @Param('id') id: number
    ): Promise<BaseApiResponseDto<UserOutputDto>> {
        const user = await this.userService.getUserById(id);
        return {data: user, meta: {}};
    }
}