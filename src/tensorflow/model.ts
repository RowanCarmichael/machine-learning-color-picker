import * as tf from '@tensorflow/tfjs';

export default class Model {
  model: tf.Sequential;
  setLabel: string[];
  constructor() {
    this.setLabel = [];
    this.model = tf.sequential();
    this.model.add(tf.layers.dense({units: 10, inputShape: [3], activation: 'sigmoid' }));
    this.model.add(tf.layers.dense({units: 10, activation: 'sigmoid' }));
    this.model.add(tf.layers.dense({units: 6, activation: 'softmax' }));
    this.model.compile({ loss: 'categoricalCrossentropy', optimizer: 'adam' });
  }

  learn(colors: number[][], labels: string[]) {
    const xs = tf.tensor(colors);
    this.setLabel = Array.from(new Set(labels))
    const ys = tf.oneHot(tf.tensor1d(labels.map((a) => (
      this.setLabel.findIndex(e => e === a)
    )), 'int32'), 6);

    this.model.fit(xs, ys, {epochs: 1000, shuffle: true}).then(() => {
      console.log('finished learning');
    }).catch((e) => {
      console.log(e.message);
    });
  }

  predict(color: number[]) {
    const t = this.model.predict(tf.tensor([color])) as tf.Tensor<tf.Rank>;
    const pred = t.dataSync();

    for (let i = 0; i < Array.from(pred).length; i += 1) {
      console.log(this.setLabel[i], Array.from(pred)[i]);
    }
  }
}
