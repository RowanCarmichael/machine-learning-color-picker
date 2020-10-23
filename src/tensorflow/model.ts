import * as tf from '@tensorflow/tfjs';

export default class Model {
  model: tf.Sequential;
  currentSelections: boolean[] ;
  constructor() {
    this.currentSelections = [true, false];
    this.model = tf.sequential();
    this.model.add(tf.layers.dense({units: 10, inputShape: [3], activation: 'sigmoid' }));
    this.model.add(tf.layers.dense({units: 10, activation: 'sigmoid' }));
    this.model.add(tf.layers.dense({units: 2, activation: 'softmax' }));
    this.model.compile({ loss: 'categoricalCrossentropy', optimizer: 'adam' });
  }

  learn(colors: number[][], selections: boolean[], onFinishedLearning: () => void) {
    console.log('learning...')
    const xs = tf.tensor(colors);
    this.currentSelections = Array.from(new Set(selections))
    const ys = tf.oneHot(tf.tensor1d(selections.map(selection => (
      this.currentSelections.findIndex(currentSelection => currentSelection === selection)
    )), 'int32'), 2);

    this.model.fit(xs, ys, {epochs: 200, shuffle: true}).then(() => {
      onFinishedLearning();
      console.log('learning finished')
    }).catch((e: { message: string }) => {
      console.log(e.message);
    });
  }

  predict(color: number[]) {
    console.log('predicting...')
    const tensor = this.model.predict(tf.tensor([color])) as tf.Tensor<tf.Rank>;
    const prediction = tensor.dataSync();
    let truePercentage = 0.5;
    if (this.currentSelections.length === 1) {
      this.currentSelections[1] = !this.currentSelections[0]
    }

    for (let i = 0; i < Array.from(prediction).length; i += 1) {
      console.log(this.currentSelections[i], Array.from(prediction)[i]);
      if (this.currentSelections[i]) {
        truePercentage = Array.from(prediction)[i] as number;
      }
    }

    return truePercentage;
  }
}
