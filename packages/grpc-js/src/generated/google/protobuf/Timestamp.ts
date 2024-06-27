// Original file: null

import type { Long } from '@postman/proto-loader';

export interface Timestamp {
  'seconds'?: (number | string | Long);
  'nanos'?: (number);
}

export interface Timestamp__Output {
  'seconds': (string);
  'nanos': (number);
}
