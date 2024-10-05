import { useContext } from 'react';
import { GameContext } from './GameProvider';
import './DevTools.css';
import { SCENES } from './Scenes/Scenes';

const DevTools = () => {
  const SceneNames = Object.keys(SCENES);
  const { dispatch } = useContext(GameContext)!;
  console.log(SceneNames);

  const getSceneGoTos = (sceneName: string) => {
    const goTos: string[] = [];

    SCENES[sceneName].options.forEach((option) => {
      option.actions.forEach((action) => {
        if (action.type === 'GO_TO_SCENE' && action.payload) {
          goTos.push(action.payload);
        }
      });
    });

    return goTos;
  };

  return (
    <div id='DevWindow'>
      <div id='scene-data'>
        {SceneNames.map((scene, index) => {
          return (
            <div
              className='scene-details'
              key={index}
            >
              <h3 className='scene-title'>{scene}</h3>
              {getSceneGoTos(scene).map((goTo, index) => {
                return (
                  <p
                    key={index}
                    style={{
                      color: SceneNames.includes(goTo) ? 'black' : 'white',
                    }}
                  >
                    {goTo}
                  </p>
                );
              })}
            </div>
          );
        })}
      </div>
      <button
        onClick={() => {
          dispatch({ type: 'TOGGLE_DEV' });
        }}
      >
        Leave dev mode
      </button>
    </div>
  );
};

export default DevTools;
