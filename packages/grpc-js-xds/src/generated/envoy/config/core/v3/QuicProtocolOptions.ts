// Original file: deps/envoy-api/envoy/config/core/v3/protocol.proto

import type { UInt32Value as _google_protobuf_UInt32Value, UInt32Value__Output as _google_protobuf_UInt32Value__Output } from '../../../../google/protobuf/UInt32Value';
import type { QuicKeepAliveSettings as _envoy_config_core_v3_QuicKeepAliveSettings, QuicKeepAliveSettings__Output as _envoy_config_core_v3_QuicKeepAliveSettings__Output } from '../../../../envoy/config/core/v3/QuicKeepAliveSettings';
import type { Duration as _google_protobuf_Duration, Duration__Output as _google_protobuf_Duration__Output } from '../../../../google/protobuf/Duration';

/**
 * QUIC protocol options which apply to both downstream and upstream connections.
 * [#next-free-field: 9]
 */
export interface QuicProtocolOptions {
  /**
   * Maximum number of streams that the client can negotiate per connection. 100
   * if not specified.
   */
  'max_concurrent_streams'?: (_google_protobuf_UInt32Value | null);
  /**
   * `Initial stream-level flow-control receive window
   * <https://tools.ietf.org/html/draft-ietf-quic-transport-34#section-4.1>`_ size. Valid values range from
   * 1 to 16777216 (2^24, maximum supported by QUICHE) and defaults to 16777216 (16 * 1024 * 1024).
   * 
   * NOTE: 16384 (2^14) is the minimum window size supported in Google QUIC. If configured smaller than it, we will use 16384 instead.
   * QUICHE IETF Quic implementation supports 1 bytes window. We only support increasing the default window size now, so it's also the minimum.
   * 
   * This field also acts as a soft limit on the number of bytes Envoy will buffer per-stream in the
   * QUIC stream send and receive buffers. Once the buffer reaches this pointer, watermark callbacks will fire to
   * stop the flow of data to the stream buffers.
   */
  'initial_stream_window_size'?: (_google_protobuf_UInt32Value | null);
  /**
   * Similar to ``initial_stream_window_size``, but for connection-level
   * flow-control. Valid values rage from 1 to 25165824 (24MB, maximum supported by QUICHE) and defaults
   * to 25165824 (24 * 1024 * 1024).
   * 
   * NOTE: 16384 (2^14) is the minimum window size supported in Google QUIC. We only support increasing the default
   * window size now, so it's also the minimum.
   */
  'initial_connection_window_size'?: (_google_protobuf_UInt32Value | null);
  /**
   * The number of timeouts that can occur before port migration is triggered for QUIC clients.
   * This defaults to 4. If set to 0, port migration will not occur on path degrading.
   * Timeout here refers to QUIC internal path degrading timeout mechanism, such as PTO.
   * This has no effect on server sessions.
   */
  'num_timeouts_to_trigger_port_migration'?: (_google_protobuf_UInt32Value | null);
  /**
   * Probes the peer at the configured interval to solicit traffic, i.e. ACK or PATH_RESPONSE, from the peer to push back connection idle timeout.
   * If absent, use the default keepalive behavior of which a client connection sends PINGs every 15s, and a server connection doesn't do anything.
   */
  'connection_keepalive'?: (_envoy_config_core_v3_QuicKeepAliveSettings | null);
  /**
   * A comma-separated list of strings representing QUIC connection options defined in
   * `QUICHE <https://github.com/google/quiche/blob/main/quiche/quic/core/crypto/crypto_protocol.h>`_ and to be sent by upstream connections.
   */
  'connection_options'?: (string);
  /**
   * A comma-separated list of strings representing QUIC client connection options defined in
   * `QUICHE <https://github.com/google/quiche/blob/main/quiche/quic/core/crypto/crypto_protocol.h>`_ and to be sent by upstream connections.
   */
  'client_connection_options'?: (string);
  /**
   * The duration that a QUIC connection stays idle before it closes itself. If this field is not present, QUICHE
   * default 600s will be applied.
   * For internal corporate network, a long timeout is often fine.
   * But for client facing network, 30s is usually a good choice.
   */
  'idle_network_timeout'?: (_google_protobuf_Duration | null);
}

/**
 * QUIC protocol options which apply to both downstream and upstream connections.
 * [#next-free-field: 9]
 */
export interface QuicProtocolOptions__Output {
  /**
   * Maximum number of streams that the client can negotiate per connection. 100
   * if not specified.
   */
  'max_concurrent_streams': (_google_protobuf_UInt32Value__Output | null);
  /**
   * `Initial stream-level flow-control receive window
   * <https://tools.ietf.org/html/draft-ietf-quic-transport-34#section-4.1>`_ size. Valid values range from
   * 1 to 16777216 (2^24, maximum supported by QUICHE) and defaults to 16777216 (16 * 1024 * 1024).
   * 
   * NOTE: 16384 (2^14) is the minimum window size supported in Google QUIC. If configured smaller than it, we will use 16384 instead.
   * QUICHE IETF Quic implementation supports 1 bytes window. We only support increasing the default window size now, so it's also the minimum.
   * 
   * This field also acts as a soft limit on the number of bytes Envoy will buffer per-stream in the
   * QUIC stream send and receive buffers. Once the buffer reaches this pointer, watermark callbacks will fire to
   * stop the flow of data to the stream buffers.
   */
  'initial_stream_window_size': (_google_protobuf_UInt32Value__Output | null);
  /**
   * Similar to ``initial_stream_window_size``, but for connection-level
   * flow-control. Valid values rage from 1 to 25165824 (24MB, maximum supported by QUICHE) and defaults
   * to 25165824 (24 * 1024 * 1024).
   * 
   * NOTE: 16384 (2^14) is the minimum window size supported in Google QUIC. We only support increasing the default
   * window size now, so it's also the minimum.
   */
  'initial_connection_window_size': (_google_protobuf_UInt32Value__Output | null);
  /**
   * The number of timeouts that can occur before port migration is triggered for QUIC clients.
   * This defaults to 4. If set to 0, port migration will not occur on path degrading.
   * Timeout here refers to QUIC internal path degrading timeout mechanism, such as PTO.
   * This has no effect on server sessions.
   */
  'num_timeouts_to_trigger_port_migration': (_google_protobuf_UInt32Value__Output | null);
  /**
   * Probes the peer at the configured interval to solicit traffic, i.e. ACK or PATH_RESPONSE, from the peer to push back connection idle timeout.
   * If absent, use the default keepalive behavior of which a client connection sends PINGs every 15s, and a server connection doesn't do anything.
   */
  'connection_keepalive': (_envoy_config_core_v3_QuicKeepAliveSettings__Output | null);
  /**
   * A comma-separated list of strings representing QUIC connection options defined in
   * `QUICHE <https://github.com/google/quiche/blob/main/quiche/quic/core/crypto/crypto_protocol.h>`_ and to be sent by upstream connections.
   */
  'connection_options': (string);
  /**
   * A comma-separated list of strings representing QUIC client connection options defined in
   * `QUICHE <https://github.com/google/quiche/blob/main/quiche/quic/core/crypto/crypto_protocol.h>`_ and to be sent by upstream connections.
   */
  'client_connection_options': (string);
  /**
   * The duration that a QUIC connection stays idle before it closes itself. If this field is not present, QUICHE
   * default 600s will be applied.
   * For internal corporate network, a long timeout is often fine.
   * But for client facing network, 30s is usually a good choice.
   */
  'idle_network_timeout': (_google_protobuf_Duration__Output | null);
}
