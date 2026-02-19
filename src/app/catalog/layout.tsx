import type { ReactNode } from 'react';

import Section from '@/components/ui/Section/Section';
import Container from '@/components/ui/Container/Container';

export default function CatalogLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Section>
      <Container>
        {children}
      </Container>
    </Section>
  );
}
