/**
 * Timing diagrams for the lifecycle race page. Each timeline shows the model's
 * lifecycle (INIT, the baseline request, its response, READY), when the topic
 * handler registers, when a event arrives, and what becomes of that event.
 * Pure SVG, no data: the scenarios are the lesson.
 */
const W = 640;
const X = { init: 70, request: 220, response: 400, ready: 480, end: 610 };

interface Scenario {
  title: string;
  /** Where the handler registers: default is at READY, INIT is early. */
  registration: 'default' | 'INIT';
  /** When the event arrives. */
  eventAt: number;
  eventLabel: string;
  without: string;
  with: string;
}

const SCENARIOS: Scenario[] = [
  {
    title: 'A. Event before the handler exists',
    registration: 'default',
    eventAt: 300,
    eventLabel: 'delta',
    without:
      'Nothing is subscribed yet, so the event is dropped. The model does not receive the change.',
    with: 'Register at INIT so the subscription exists first; replay.bufferSize also lets a late subscriber receive the last events.',
  },
  {
    title: 'B. Event while the baseline is in flight',
    registration: 'INIT',
    eventAt: 300,
    eventLabel: 'delta',
    without:
      'The delta is applied to an empty container, then the baseline response arrives and adds the same note again, or replaces it with an older state.',
    with: 'requiresBaseline queues the event until the response lands; AFTER_REQUEST replays it once, on top of the baseline.',
  },
  {
    title: 'C. Event before the request was sent',
    registration: 'INIT',
    eventAt: 140,
    eventLabel: 'stale delta',
    without: 'The event describes state the baseline will already contain. Applying it first repeats a change the baseline carries, or applies a state older than the baseline.',
    with: 'AFTER_REQUEST discards it, since the baseline supersedes it. ALL would replay it; NONE drops every queued event.',
  },
  {
    title: 'D. Event after the response',
    registration: 'INIT',
    eventAt: 550,
    eventLabel: 'delta',
    without: 'Applied as it arrives. This is the steady state and needs no option.',
    with: 'Unchanged: once the baseline has answered, events pass straight through to the handler.',
  },
];

const Lane = ({ y, label }: { y: number; label: string }) => (
  <>
    <text x={8} y={y + 4} fontSize={11} fill="currentColor" opacity={0.7}>
      {label}
    </text>
    <line x1={X.init - 20} x2={X.end} y1={y} y2={y} stroke="currentColor" opacity={0.25} />
  </>
);

const Tick = ({ x, y, label, above }: { x: number; y: number; label: string; above?: boolean }) => (
  <>
    <line x1={x} x2={x} y1={y - 6} y2={y + 6} stroke="currentColor" opacity={0.6} />
    <text x={x} y={above ? y - 10 : y + 18} fontSize={10} textAnchor="middle" fill="currentColor" opacity={0.8}>
      {label}
    </text>
  </>
);

const Timeline = ({ s }: { s: Scenario }) => {
  const H = 215;
  const lifecycleY = 62;
  const handlerY = 122;
  const eventY = 182;
  const registerX = s.registration === 'INIT' ? X.init : X.ready;
  const dropped = s.eventAt < registerX;
  // a event nobody is subscribed to is never queued, only lost
  const queued = !dropped && s.eventAt > X.request && s.eventAt < X.response;
  const stale = s.eventAt < X.request && !dropped;
  const eventColor = dropped ? '#c0504d' : stale ? '#b58900' : '#6b8fd6';
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-label={s.title} style={{ display: 'block', maxWidth: W }}>
      <text x={8} y={18} fontSize={13} fontWeight={600} fill="currentColor">
        {s.title}
      </text>

      {/* lifecycle: the phases, with the baseline request drawn as a bar */}
      <Lane y={lifecycleY} label="lifecycle" />
      <rect x={X.request} y={lifecycleY - 5} width={X.response - X.request} height={10} fill="#6b8fd6" opacity={0.35} />
      <Tick x={X.init} y={lifecycleY} label="INIT" above />
      <Tick x={X.request} y={lifecycleY} label="request sent" above />
      <Tick x={X.response} y={lifecycleY} label="response" above />
      <Tick x={X.ready} y={lifecycleY} label="READY" above />
      <text x={(X.request + X.response) / 2} y={lifecycleY + 20} fontSize={10} textAnchor="middle" fill="#6b8fd6">
        baseline in flight
      </text>

      {/* handler: registration point, then the span during which it is subscribed */}
      <Lane y={handlerY} label="handler" />
      <line x1={registerX} x2={X.end} y1={handlerY} y2={handlerY} stroke="#3aa876" strokeWidth={3} opacity={0.45} />
      <polygon
        points={`${registerX},${handlerY - 8} ${registerX + 6},${handlerY + 4} ${registerX - 6},${handlerY + 4}`}
        fill="#3aa876"
      />
      <text x={registerX} y={handlerY - 14} fontSize={10} textAnchor={registerX > W - 120 ? 'end' : 'start'} fill="#3aa876">
        {s.registration === 'INIT' ? 'registered at INIT' : 'registered at READY (default)'}
      </text>
      <text x={X.end} y={handlerY + 18} fontSize={10} textAnchor="end" fill="currentColor" opacity={0.6}>
        subscribed from here on
      </text>

      {/* topic: the event, and what the framework does with it */}
      <Lane y={eventY} label="topic" />
      {queued && (
        <line x1={s.eventAt} x2={X.response} y1={eventY} y2={eventY} stroke="#6b8fd6" strokeWidth={3} strokeDasharray="5 4" />
      )}
      <circle cx={s.eventAt} cy={eventY} r={6} fill={eventColor} />
      <text x={s.eventAt} y={eventY + 20} fontSize={10} textAnchor="middle" fill="currentColor" opacity={0.8}>
        {s.eventLabel}
      </text>
      {queued && (
        <text x={X.response} y={eventY - 14} fontSize={10} textAnchor="end" fill="#6b8fd6">
          held until the response, then applied
        </text>
      )}
      {dropped && (
        <text x={s.eventAt + 12} y={eventY - 14} fontSize={10} fill="#c0504d">
          dropped: nothing is subscribed yet
        </text>
      )}
      {stale && (
        <text x={s.eventAt + 12} y={eventY - 14} fontSize={10} fill="#b58900">
          older than the baseline: AFTER_REQUEST discards it
        </text>
      )}
      {!queued && !dropped && !stale && (
        <text x={s.eventAt - 12} y={eventY - 14} fontSize={10} textAnchor="end" fill="#6b8fd6">
          applied as it arrives
        </text>
      )}
    </svg>
  );
};

export const RaceTimelines = () => (
  <div style={{ display: 'grid', gap: '1.25rem', margin: '1rem 0' }}>
    {SCENARIOS.map((s) => (
      <div key={s.title}>
        <Timeline s={s} />
        <dl style={{ margin: '0.25rem 0 0', fontSize: '0.9rem', display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '0.2rem 0.75rem', alignItems: 'baseline' }}>
          <dt style={{ fontWeight: 600 }}>without</dt>
          <dd style={{ margin: 0 }}>{s.without}</dd>
          <dt style={{ fontWeight: 600 }}>with</dt>
          <dd style={{ margin: 0 }}>{s.with}</dd>
        </dl>
      </div>
    ))}
  </div>
);
