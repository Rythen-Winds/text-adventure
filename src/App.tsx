import { Fragment, useContext } from 'react';
import './Game.css';
import { ActionType, GameContext } from './GameProvider';
import parseDescription from './parseDescription';
import { PreRequirement } from './Scenes';

function App() {
  const { state, dispatch } = useContext(GameContext)!;
  const { scene, questFlags, NPCRelationships } = state;

  const arePreRequirementsMet = (
    preRequirements?: PreRequirement[]
  ): boolean => {
    if (!preRequirements) return true;

    return preRequirements.every((req) => {
      switch (req.type) {
        case 'questFlag':
          if (req.requiredState === true) {
            return questFlags[req.flag] === req.requiredState;
          } else
            return (
              questFlags[req.flag] === false ||
              questFlags[req.flag] === undefined
            );
        case 'relationship':
          return (NPCRelationships[req.npc] || 0) >= req.minValue;
        default:
          return false;
      }
    });
  };

  const handleOptionClick = (actions: ActionType[]) => {
    actions.forEach((action) => dispatch(action));
  };

  const filteredOptions = scene.options.filter((option) =>
    arePreRequirementsMet(option.preRequirements)
  );

  return (
    <div id='game-container'>
      <div id='scene-container'>
        <div id='scene-content'>
          {scene.description.map((line, index) => (
            <Fragment key={index}>{parseDescription(line)}</Fragment>
          ))}

          <div className='option-container'>
            {filteredOptions.map((option, index) => (
              <button
                className='option-button'
                key={index}
                onClick={() => handleOptionClick(option.actions)}
              >
                {option.text}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
