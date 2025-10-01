/*
 * Copyright 2023 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import { experimental, LoadBalancingConfig } from "@grpc/grpc-js";
import { register } from "../src";
import assert = require("assert");
import parseLoadbalancingConfig = experimental.parseLoadBalancingConfig;
import { EXPERIMENTAL_RING_HASH } from "../src/environment";

register();

/**
 * Describes a test case for config parsing. input is passed to
 * parseLoadBalancingConfig. If error is set, the expectation is that that
 * operation throws an error with a matching message. Otherwise, toJsonObject
 * is called on the result, and it is expected to match output, or input if
 * output is unset.
 */
interface TestCase {
  name: string;
  input: object,
  output?: object;
  error?: RegExp;
  skipIf?: boolean;
}

/* The main purpose of these tests is to verify that configs that are expected
 * to be valid parse successfully, and configs that are expected to be invalid
 * throw errors. The specific output of this parsing is a lower priority
 * concern.
 * Note: some tests have an expected output that is different from the output,
 * but all non-error tests additionally verify that parsing the output again
 * produces the same output. */
const allTestCases: {[lbPolicyName: string]: TestCase[]} = {
  cds: [
    {
      name: 'populated cluster field',
      input: {
        cluster: 'abc'
      }
    },
    {
      name: 'empty',
      input: {},
      error: /cluster/
    },
    {
      name: 'non-string cluster',
      input: {
        cluster: 123
      },
      error: /string.*cluster/
    }
  ],
  xds_cluster_impl: [
    {
      name: 'required fields',
      input: {
        cluster: 'abc',
        child_policy: [{round_robin: {}}]
      }
    },
    {
      name: 'non-string cluster',
      input: {
        cluster: 123,
        child_policy: [{round_robin: {}}]
      },
      error: /string.*cluster/
    }
  ],
  priority: [
    {
      name: 'empty fields',
      input: {
        children: {},
        priorities: []
      }
    },
    {
      name: 'populated fields',
      input: {
        children: {
          child0: {
            config: [{round_robin: {}}],
            ignore_reresolution_requests: true
          },
          child1: {
            config: [{round_robin: {}}],
            ignore_reresolution_requests: false
          }
        },
        priorities: ['child0', 'child1']
      }
    }
  ],
  weighted_target: [
    {
      name: 'empty targets field',
      input: {
        targets: {}
      }
    },
    {
      name: 'populated targets field',
      input: {
        targets: {
          target0: {
            weight: 1,
            child_policy: [{round_robin: {}}]
          },
          target1: {
            weight: 2,
            child_policy: [{round_robin: {}}]
          }
        }
      }
    }
  ],
  xds_cluster_manager: [
    {
      name: 'empty children field',
      input: {
        children: {}
      }
    },
    {
      name: 'populated children field',
      input: {
        children: {
          child0: {
            child_policy: [{round_robin: {}}]
          }
        }
      }
    }
  ],
  ring_hash: [
    {
      name: 'empty config',
      input: {},
      output: {
        min_ring_size: 1024,
        max_ring_size: 4096
      },
      skipIf: !EXPERIMENTAL_RING_HASH
    },
    {
      name: 'populated config',
      input: {
        min_ring_size: 2048,
        max_ring_size: 8192
      },
      skipIf: !EXPERIMENTAL_RING_HASH
    },
    {
      name: 'min_ring_size too large',
      input: {
        min_ring_size: 8_388_609
      },
      error: /min_ring_size/,
      skipIf: !EXPERIMENTAL_RING_HASH
    },
    {
      name: 'max_ring_size too large',
      input: {
        max_ring_size: 8_388_609
      },
      error: /max_ring_size/,
      skipIf: !EXPERIMENTAL_RING_HASH
    }
  ]
}

describe('Load balancing policy config parsing', () => {
  for (const [lbPolicyName, testCases] of Object.entries(allTestCases)) {
    describe(lbPolicyName, () => {
      for (const testCase of testCases) {
        it(testCase.name, function() {
          if (testCase.skipIf) {
            this.skip();
          }
          const lbConfigInput = {[lbPolicyName]: testCase.input};
          if (testCase.error) {
            assert.throws(() => {
              parseLoadbalancingConfig(lbConfigInput);
            }, testCase.error);
          } else {
            const expectedOutput = testCase.output ?? testCase.input;
            const parsedJson = parseLoadbalancingConfig(lbConfigInput).toJsonObject();
            assert.deepStrictEqual(parsedJson, {[lbPolicyName]: expectedOutput});
            // Test idempotency
            assert.deepStrictEqual(parseLoadbalancingConfig(parsedJson).toJsonObject(), parsedJson);
          }
        });
      }
    });
  }
});
