import { Suspense } from 'react';
import CallbackClient from './client/callbackclient';

export default function CallbackPage() {
  return (
    <Suspense fallback={<p className="text-white p-6">Loading...</p>}>
      <CallbackClient />
    </Suspense>
  );
}
