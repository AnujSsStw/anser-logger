# answer-logger

A simple tool to log answers to an error occur during a .catch(e).

## Installation

```bash
npm install answer-logger
```

## Usage

```javascript
const answerLogger = require("answer-logger");

try {
  await answerLogger(async () => {
    const answer = await doSomething();
    return answer;
  });
} catch (e) {
  // e is the answer
  answerLogger.logger(e);
}
```
