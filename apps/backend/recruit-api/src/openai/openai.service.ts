import { Injectable, Logger } from '@nestjs/common';
import OpenAI from 'openai';
import { StatusType } from '../notification/enum/statis.enum';

@Injectable()
export class OpenaiService {
  private openai: OpenAI;
  private readonly logger = new Logger(OpenaiService.name);

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPEN_AI_API_KEY
    });
  }

  async generatePersonalNotification(name: string, status: StatusType, position: string): Promise<string> {
    const prompt = `The candidate's status has changed. His/Her name: ${name}, position: ${position}, status: ${status}`;

    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: [
              {
                type: 'text',
                text: "You are an HR assistant responsible for sending out personalized notification messages to job candidates. Depending on the status of the candidate's application, generate a message that is polite, professional, and reflective of the specific status. Here are guidelines for each status:\n\n1. **Signed up**: Welcome the candidate and confirm their application has been received.\n2. **Interview - Round 1**: Inform the candidate about their first interview and provide encouragement.\n3. **Task posted**: Notify the candidate that a task has been assigned and provide instructions or encouragement.\n4. **Task expired**: Inform the candidate that the task deadline has passed and offer support or next steps.\n5. **Task Returned**: Let the candidate know that their task has been reviewed and provide feedback or next steps.\n6. **Interview - Round 2**: Notify the candidate about the second interview and encourage them to prepare.\n7. **Notified - Offer**: Congratulate the candidate on receiving an offer and express excitement about the possibility of them joining the team.\n8. **Notified - Rejected**: Express regret that the offer was not accepted or that the application was unsuccessful, and encourage the candidate to stay in touch or reapply in the future.\n\nAlways maintain a tone that is respectful, empathetic, and encouraging, regardless of the status. The messages should be concise and clearly communicate the status update while inviting further communication if needed.\n"
              }
            ]
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: prompt
              }
            ]
          }
        ],
        temperature: 0.25,
        max_tokens: 75,
        top_p: 0.8,
        frequency_penalty: 0,
        presence_penalty: 0,
        response_format: {
          type: 'text'
        }
      });

      return response.choices[0].message.content;
    } catch (error) {
      const fallbackResponse = `Hi ${name}, Your application status has changed: ${status}. Please let me know if you have any questions or concerns.`;
      this.logger.error(error);
      return fallbackResponse;
    }
  }
}
