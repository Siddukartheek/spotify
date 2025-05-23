import { Suspense } from 'react';
import CallbackClient from './client/callback-client';

export default function CallbackPage() {
  return (
    <Suspense fallback={<p className="text-white p-6">Loading...</p>}>
      <CallbackClient />
    </Suspense>
  );
}
