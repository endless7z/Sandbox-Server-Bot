class BotError extends Error {
  constructor(...args) {
    super(...args);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, BotError);
    };

    this.name = 'BotError';
  };
};

module.exports.BotError = BotError;