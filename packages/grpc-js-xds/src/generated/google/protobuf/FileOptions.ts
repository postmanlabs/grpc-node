// Original file: null

import type { UninterpretedOption as _google_protobuf_UninterpretedOption, UninterpretedOption__Output as _google_protobuf_UninterpretedOption__Output } from '../../google/protobuf/UninterpretedOption';
import type { StatusAnnotation as _udpa_annotations_StatusAnnotation, StatusAnnotation__Output as _udpa_annotations_StatusAnnotation__Output } from '../../udpa/annotations/StatusAnnotation';

// Original file: null

export const _google_protobuf_FileOptions_OptimizeMode = {
  SPEED: 'SPEED',
  CODE_SIZE: 'CODE_SIZE',
  LITE_RUNTIME: 'LITE_RUNTIME',
} as const;

export type _google_protobuf_FileOptions_OptimizeMode =
  | 'SPEED'
  | 1
  | 'CODE_SIZE'
  | 2
  | 'LITE_RUNTIME'
  | 3

export type _google_protobuf_FileOptions_OptimizeMode__Output = typeof _google_protobuf_FileOptions_OptimizeMode[keyof typeof _google_protobuf_FileOptions_OptimizeMode]

export interface FileOptions {
  'javaPackage'?: (string);
  'javaOuterClassname'?: (string);
  'optimizeFor'?: (_google_protobuf_FileOptions_OptimizeMode);
  'javaMultipleFiles'?: (boolean);
  'goPackage'?: (string);
  'ccGenericServices'?: (boolean);
  'javaGenericServices'?: (boolean);
  'pyGenericServices'?: (boolean);
  /**
   * @deprecated
   */
  'javaGenerateEqualsAndHash'?: (boolean);
  'deprecated'?: (boolean);
  'javaStringCheckUtf8'?: (boolean);
  'ccEnableArenas'?: (boolean);
  'objcClassPrefix'?: (string);
  'csharpNamespace'?: (string);
  'uninterpretedOption'?: (_google_protobuf_UninterpretedOption)[];
  '.udpa.annotations.file_status'?: (_udpa_annotations_StatusAnnotation | null);
}

export interface FileOptions__Output {
  'javaPackage': (string);
  'javaOuterClassname': (string);
  'optimizeFor': (_google_protobuf_FileOptions_OptimizeMode__Output);
  'javaMultipleFiles': (boolean);
  'goPackage': (string);
  'ccGenericServices': (boolean);
  'javaGenericServices': (boolean);
  'pyGenericServices': (boolean);
  /**
   * @deprecated
   */
  'javaGenerateEqualsAndHash': (boolean);
  'deprecated': (boolean);
  'javaStringCheckUtf8': (boolean);
  'ccEnableArenas': (boolean);
  'objcClassPrefix': (string);
  'csharpNamespace': (string);
  'uninterpretedOption': (_google_protobuf_UninterpretedOption__Output)[];
  '.udpa.annotations.file_status': (_udpa_annotations_StatusAnnotation__Output | null);
}
