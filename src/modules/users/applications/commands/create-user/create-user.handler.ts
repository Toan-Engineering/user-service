import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreateUserCommand } from './create-user.command';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler implements ICommandHandler<CreateUserCommand> {
	execute(_command: CreateUserCommand): Promise<string> {
		return Promise.resolve('User created successfully');
	}
}
