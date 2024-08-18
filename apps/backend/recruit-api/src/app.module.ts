import { Module } from '@nestjs/common';

import { NotificationsController } from './notification/notification.controller';
import { OpenaiModule } from './openai/openai.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [OpenaiModule, EmailModule],
  controllers: [NotificationsController],
  providers: [],
})
export class AppModule {}
