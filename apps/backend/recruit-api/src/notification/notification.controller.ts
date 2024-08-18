import { Body, Controller, Post } from '@nestjs/common';

import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { EmailService } from '../email/email.service';
import { OpenaiService } from '../openai/openai.service';
import { CreateNotificationDto } from './dto/ create-notification.dto';
import { NotificationResponseDto } from './dto/notification-response.dto';

@ApiTags('notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(
    private readonly openaiService: OpenaiService,
    private readonly emailService: EmailService
  ) {}

  @Post('status-change')
  @ApiBody({ type: CreateNotificationDto })
  @ApiOkResponse({
    description: 'Generate personalized notification message for a user',
    type: NotificationResponseDto,
  })
  async getPersonalizedNotification(
    @Body() createNotificationDto: CreateNotificationDto
  ): Promise<NotificationResponseDto> {
    const { name, status, position, email } = createNotificationDto;

    const message = await this.openaiService.generatePersonalNotification(
      name,
      status,
      position
    );

    this.emailService.sendStatusUpdateEmail(email, message, 'Status Update');

    return <NotificationResponseDto>{
      message: message,
    };
  }
}
