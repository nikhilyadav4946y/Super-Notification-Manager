
export enum AppSource {
  Gmail = 'Gmail',
  Slack = 'Slack',
  Calendar = 'Calendar',
  Banking = 'Banking',
  GitHub = 'GitHub',
  Other = 'Other',
}

export interface Notification {
  id: string;
  source: AppSource;
  title: string;
  message: string;
  timestamp: number;
  isRead: boolean;
}
