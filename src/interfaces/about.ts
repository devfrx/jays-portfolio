export interface ProfileStat {
  value: string;
  label: string;
}

export interface StoryParagraph {
  id: number;
  icon: string;
  title: string;
  content: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

export interface ValueItem {
  title: string;
  icon: string;
  description: string;
  code: string;
}

export interface Interest {
  name: string;
  icon: string;
  description: string;
}

export interface FunFact {
  id: number;
  emoji: string;
  text: string;
}
