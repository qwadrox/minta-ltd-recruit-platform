/**
 * Recruit API
 * API for recruitment platform
 *
 * The version of the OpenAPI document: 1.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

/**
 * Status of the event
 */
export type StatusType =
  | 'Signed up'
  | 'Interview - Round 1'
  | 'Task posted'
  | 'Task expired'
  | 'Task Returned'
  | 'Interview - Round 2'
  | 'Notified - Offer'
  | 'Notified - Rejected';

export const StatusType = {
  SignedUp: 'Signed up' as StatusType,
  InterviewRound1: 'Interview - Round 1' as StatusType,
  TaskPosted: 'Task posted' as StatusType,
  TaskExpired: 'Task expired' as StatusType,
  TaskReturned: 'Task Returned' as StatusType,
  InterviewRound2: 'Interview - Round 2' as StatusType,
  NotifiedOffer: 'Notified - Offer' as StatusType,
  NotifiedRejected: 'Notified - Rejected' as StatusType
};
