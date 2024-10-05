import React, { createContext, ReactNode, useReducer } from 'react';
import { Scene } from './Scenes';
import { SCENES } from './Scenes/Scenes';

export type ActionType =
  | { type: 'GO_TO_SCENE'; payload: string }
  | { type: 'SET_QUEST_FLAG'; payload: { flag: string; value: boolean } }
  | { type: 'INCREASE_RELATIONS'; payload: { npc: string; value: number } }
  | { type: 'DECREASE_RELATIONS'; payload: { npc: string; value: number } }
  | { type: 'TOGGLE_DEV' };

interface GameState {
  scene: Scene;
  questFlags: { [key: string]: boolean };
  NPCRelationships: { [key: string]: number };
  devMode: boolean;
}

const initialState: GameState = {
  scene: SCENES.intro,
  questFlags: {},
  NPCRelationships: {},
  devMode: false,
};

const gameReducer = (state: GameState, action: ActionType): GameState => {
  switch (action.type) {
    case 'GO_TO_SCENE':
      const newScene = SCENES[action.payload];
      if (!newScene) {
        console.error(`${action.payload} is not a valid scene`);
        return state;
      }
      return {
        ...state,
        scene: newScene,
      };

    case 'SET_QUEST_FLAG':
      return {
        ...state,
        questFlags: {
          ...state.questFlags,
          [action.payload.flag]: action.payload.value,
        },
      };
    case 'INCREASE_RELATIONS':
      return {
        ...state,
        NPCRelationships: {
          ...state.NPCRelationships,
          [action.payload.npc]:
            (state.NPCRelationships[action.payload.npc] || 0) +
            action.payload.value,
        },
      };

    case 'DECREASE_RELATIONS':
      return {
        ...state,
        NPCRelationships: {
          ...state.NPCRelationships,
          [action.payload.npc]:
            (state.NPCRelationships[action.payload.npc] || 0) -
            action.payload.value,
        },
      };
    case 'TOGGLE_DEV': {
      return {
        ...state,
        devMode: !state.devMode,
      };
    }

    default:
      return state;
  }
};

interface GameContextType {
  state: GameState;
  dispatch: React.Dispatch<ActionType>;
}

export const GameContext = createContext<GameContextType | undefined>(
  undefined
);

interface GameContextProviderProps {
  children: ReactNode;
}

export const GameProvider: React.FC<GameContextProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};
