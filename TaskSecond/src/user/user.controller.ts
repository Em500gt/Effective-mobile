import { Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('reset-problems')
    async resetProblemsFlag(): Promise<{ updatedCount: number }> {
        const updatedCount = await this.userService.resetProblemsFlag();
        return { updatedCount };
    }
}
