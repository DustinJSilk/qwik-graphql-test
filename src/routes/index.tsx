import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { Link } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <div>
      Home page
      <br />
      <Link href='/child'>Go to page with request</Link>
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Home',
};
