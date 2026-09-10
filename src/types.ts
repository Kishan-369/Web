export interface SceneData {
  id: number;
  title: string;
  subtitle?: string;
  gujaratiTitle?: string;
  gujaratiSubtitle?: string;
  category?: string;
}

export interface SoundConfig {
  enabled: boolean;
  volume: number;
  droneActive: boolean;
  heartbeatActive: boolean;
}

export type LanguageMode = 'mixed' | 'gujarati' | 'english';

export interface QuizQuestion {
  id: number;
  questionEn: string;
  questionGu: string;
  optionsEn: { text: string; score: number }[];
  optionsGu: { text: string; score: number }[];
}

export interface MetricItem {
  value: string;
  labelEn: string;
  labelGu: string;
  detailEn: string;
  detailGu: string;
  iconName: string;
}
