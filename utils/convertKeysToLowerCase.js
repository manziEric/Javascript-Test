"use strict";

export const convertKeysToLowerCase = (outputValue) =>
  Object.fromEntries(
    Object.entries(outputValue).map(([key, value]) => [
      key.toLowerCase(),
      value,
    ])
  );
