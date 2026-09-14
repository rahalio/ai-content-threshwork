'use client';

import { useParams } from 'next/navigation';
import { QueueDetailView } from '@/features/queues/components';

export default function QueueDetailPage() {
  const params = useParams();
  const queueId = decodeURIComponent(String(params.id ?? ''));
  return <QueueDetailView queueId={queueId} />;
}
