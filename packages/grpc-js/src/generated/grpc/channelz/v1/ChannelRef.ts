// Original file: proto/channelz.proto

import type { Long } from '@postman/proto-loader';

/**
 * ChannelRef is a reference to a Channel.
 */
export interface ChannelRef {
  /**
   * The globally unique id for this channel.  Must be a positive number.
   */
  'channel_id'?: (number | string | Long);
  /**
   * An optional name associated with the channel.
   */
  'name'?: (string);
}

/**
 * ChannelRef is a reference to a Channel.
 */
export interface ChannelRef__Output {
  /**
   * The globally unique id for this channel.  Must be a positive number.
   */
  'channel_id': (string);
  /**
   * An optional name associated with the channel.
   */
  'name': (string);
}
