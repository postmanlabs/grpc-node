// Original file: deps/envoy-api/envoy/config/core/v3/base.proto

/**
 * Envoy supports :ref:`upstream priority routing
 * <arch_overview_http_routing_priority>` both at the route and the virtual
 * cluster level. The current priority implementation uses different connection
 * pool and circuit breaking settings for each priority level. This means that
 * even for HTTP/2 requests, two physical connections will be used to an
 * upstream host. In the future Envoy will likely support true HTTP/2 priority
 * over a single upstream connection.
 */
export const RoutingPriority = {
  DEFAULT: 'DEFAULT',
  HIGH: 'HIGH',
} as const;

/**
 * Envoy supports :ref:`upstream priority routing
 * <arch_overview_http_routing_priority>` both at the route and the virtual
 * cluster level. The current priority implementation uses different connection
 * pool and circuit breaking settings for each priority level. This means that
 * even for HTTP/2 requests, two physical connections will be used to an
 * upstream host. In the future Envoy will likely support true HTTP/2 priority
 * over a single upstream connection.
 */
export type RoutingPriority =
  | 'DEFAULT'
  | 0
  | 'HIGH'
  | 1

/**
 * Envoy supports :ref:`upstream priority routing
 * <arch_overview_http_routing_priority>` both at the route and the virtual
 * cluster level. The current priority implementation uses different connection
 * pool and circuit breaking settings for each priority level. This means that
 * even for HTTP/2 requests, two physical connections will be used to an
 * upstream host. In the future Envoy will likely support true HTTP/2 priority
 * over a single upstream connection.
 */
export type RoutingPriority__Output = typeof RoutingPriority[keyof typeof RoutingPriority]
