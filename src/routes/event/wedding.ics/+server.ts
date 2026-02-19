import type { RequestHandler } from '@sveltejs/kit';
import kr from '../../../../src/locales/kr.json' assert { type: 'json' };

function toIcsDate(d: Date) {
  return d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}

// 한국시간 2025-09-20 16:40 ~ 18:40
const startUtc = '20250920T074000Z';
const endUtc = '20250920T094000Z';

export const GET: RequestHandler = async () => {
  const nowUtc = toIcsDate(new Date());

  const title = `${kr.cover.names.groom}❤${kr.cover.names.bride} ${kr.calendar.wedding_phrase}`;
  const description = kr.meta.og_description.replace(/\n/g, '\\n');
  const location = `${kr.location.venue_name}, ${kr.location.venue_address}`;

  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//kth9916//wedding//EN',
    'BEGIN:VEVENT',
    `UID:uid-${Date.now()}@kth9916-wedding`,
    `DTSTAMP:${nowUtc}`,
    `DTSTART:${startUtc}`,
    `DTEND:${endUtc}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  return new Response(ics, {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      // 다운로드가 아닌 '열기' 유도를 위해 inline
      'Content-Disposition': 'inline; filename="wedding.ics"',
      'Cache-Control': 'no-store'
    }
  });
};
