export interface DeliveryType {
  displayValue: string;
  logicalValue: string;
}

export interface SessionType {
  displayValue: string;
  logicalValue: string;
}

export interface SessionLevel {
  displayValue: string;
  logicalValue: string;
}

export interface Tag {
  displayValue: string;
  logicalValue: string;
}

export interface Location {
  displayValue: string;
  logicalValue: string;
}

export interface Speaker {
  SpeakerTyp?: string;
  SpeakerId: string;
  RegistrantKey: string;
}

export interface Session {
  sessionId: string;
  sessionCode: string;
  title: string;
  sortTitle: string;
  description: string;
  speakerNames: string;
  startDateTime: string;
  endDateTime: string;
  durationInMinutes: number;
  sessionType: SessionType;
  sessionLevel: SessionLevel[];
  deliveryTypes: DeliveryType[];
  tags: Tag[];
  location: Location;
  onDemand: string;
  hasOnDemand: boolean;
  onDemandThumbnail: string;
  ogImage: string;
  hasLiveStream: boolean;
  heroSession: boolean;
  sortRank: number;
  partnerType: { displayValue: string; logicalValue: string }[];
  industry: { displayValue: string; logicalValue: string }[];
  businessFocus: { displayValue: string; logicalValue: string }[];
  product: { displayValue: string; logicalValue: string }[];
  solutionArea: { displayValue: string; logicalValue: string }[];
  topic: { displayValue: string; logicalValue: string }[];
}
