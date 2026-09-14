'use client';

import { useParams } from 'next/navigation';
import { WorkItemView } from '@/features/routing/components';

export default function WorkItemPage() {
  const params = useParams();
  const workItemId = decodeURIComponent(String(params.id ?? ''));
  return <WorkItemView workItemId={workItemId} />;
}
