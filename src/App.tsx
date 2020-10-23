import React, { useState, useEffect, useRef } from "react";
import getRandomColor from "./utils/getRandomColor";
import Model from "./tensorflow/model";
import ThumbDownIcon from "./thumb-down.svg";
import ThumbUpIcon from "./thumb-up.svg";
import UpArrowIcon from "./up-arrow.svg";
import LoadingIcon from "./loading.svg";
import { Container, Header, VoteContainer, Button, GuessIcon, CheckboxLabel } from "./styles";

const App: React.FC = () => {
  const [currentColor, setCurrentColor] = useState(getRandomColor());
  const [colors, setColors] = useState([currentColor]);
  const [selections, setSelections] = useState([] as boolean[]);
  const [isLearning, setIsLearning] = useState(false);
  const [percentage, setPercentage] = useState(0.5);
  const [disableLearning, setDisableLearning] = useState(false);
  const model = useRef(new Model());

  useEffect(() => {
    if (selections.length > 0 && colors.length > 1) {
      setPercentage(model.current.predict(currentColor));
    }
  }, [currentColor, selections.length, colors.length]);

  useEffect(() => {
    if (
      !disableLearning &&
      selections.length > 0 &&
      selections.length % 10 === 0
    ) {
      setIsLearning(true);
      model.current.learn(colors.slice(0, -1), selections, () =>
        setIsLearning(false)
      );
    }
  }, [selections, colors, disableLearning]);

  const makeSelection = (colorLabel: boolean) => {
    const newColor = getRandomColor();
    setCurrentColor(newColor);
    setColors(previousColors => [...previousColors, newColor]);
    setSelections(previousSelections => [...previousSelections, colorLabel]);
  };

  return (
    <Container currentColor={currentColor}>
      <Header>
        <h1>Do you like this colour?</h1>
        <p>
          After every 10 selections ({10 - (selections.length % 10)} remaining)
          the model will try and learn your preferences and guess them (see
          arrow)
        </p>
        <CheckboxLabel>
          <input
            type="checkbox"
            name="disableLearning"
            onClick={() => setDisableLearning(!disableLearning)}
          />
          <b>Disable Learning</b> (improve performance after adequate learning
          has been achieved)
        </CheckboxLabel>
        <p>
          Check out the code for this on{" "}
          <a href="https://github.com/RowanCarmichael/machine-learning-color-picker">
            Github
          </a>
        </p>
      </Header>
      <VoteContainer>
        <Button onClick={() => makeSelection(true)}>
          <img src={ThumbUpIcon} alt="Thumb up" />
        </Button>
        <Button onClick={() => makeSelection(false)}>
          <img src={ThumbDownIcon} alt="Thumb down" />
        </Button>
        <GuessIcon
          src={isLearning ? LoadingIcon : UpArrowIcon}
          isLearning={isLearning}
          percentage={percentage}
        />
      </VoteContainer>
    </Container>
  );
};

export default App;
