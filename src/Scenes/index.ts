import { ActionType } from '../GameProvider';

export type Scene = {
  description: string[];
  options: Option[];
};

export type PreRequirement =
  | { type: 'questFlag'; flag: string; requiredState: boolean }
  | { type: 'relationship'; npc: string; minValue: number };

type Option = {
  preRequirements?: PreRequirement[];
  text: string;
  actions: ActionType[];
};
