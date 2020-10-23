# machine-learning-color-picker
A machine learning experiment using TensorFlow (https://www.tensorflow.org/js) and React built in TypeScript.
Teach the neural network about what colours you like by selecting the thumbs up/down and see how it learns.
Check out the [Demo here!](https://rowancarmichael.github.io/machine-learning-color-picker/)

## About the learning model
See [model.ts](https://github.com/RowanCarmichael/machine-learning-color-picker/blob/master/src/tensorflow/model.ts) for the code.
This is constructing a simple sequential tensor flow model from scratch using 3 layers of neural networks. The model takes in an input shape of 3 numbers (0-255 for red/green/blue) which represents a colour. For each colour there will be a corresponding boolean representing whether you "like" the colour or not.
The model will attempt to predict whether you like or dislike a randomly generated colour (as a percentage decimal) based on it's learnings.