import styled from '@emotion/styled';

import { Header } from './header';
import coreConceptsIcon from './assets/core-concepts.svg';
import dispenseConceptsIcon from './assets/dispenser-concepts.svg';
import rightCaretIcon from './assets/right-caret.svg';

const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 930px;
  margin: 0 auto;
  padding: 48px 20px;
`;

const ListTitle = styled.h2`
  font-family: 'Montserrat', sans-serif;
  font-size: 20px;
  font-weight: 800;
  margin: 0 0 16px;
  padding: 0;
  border: 0;
`;

const Item = styled.div`
  border: 1px solid #0000000f;
  border-radius: 8px;
  padding-right: 16px;
  background-color: #fff;
  box-shadow: 0 0 16px 0 #0000001a;
  display: flex;
  align-items: center;
  gap: 32px;
  overflow: hidden;
`;

const ItemLogo = styled.div<{ backgroundColor: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.backgroundColor};
  flex: 0 0 104px;
  min-height: 104px;
  align-self: stretch;
`;

const ItemText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-grow: 1;
  padding: 8px 0;
`;

const ItemTitle = styled.h2`
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  margin: 0;
  padding: 0;
  border: 0;
`;

const ItemDescription = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  margin: 0;
`;

const LinkText = styled.a<{ disabled?: boolean }>`
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: ${(props) => (props.disabled ? '#ccc' : '#0293dc')};
  text-decoration: none;
  min-width: 142px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

interface Collection {
  title: string;
  description: string;
  icon: string;
  color: string;
  docsId?: string;
}

// The page renders inside Storybook's preview iframe. A link to another page has
// to address the manager (the top window), or the preview opens on its own.
const docsHref = (docsId: string): string => {
  const inManager = window.parent !== window;
  const base = inManager ? window.parent.location.href : window.location.href;
  const path = inManager
    ? `?path=/docs/${docsId}`
    : `iframe.html?id=${docsId}&viewMode=docs`;
  return new URL(path, base).toString();
};

const COLLECTIONS: Collection[] = [
  {
    title: 'Core Concepts',
    description:
      'Models, containers, relationships, services, topics, futures, configuration and troubles.',
    icon: coreConceptsIcon,
    color: '#FFB400',
    docsId: 'foundations-simple-model--docs',
  },
  {
    title: 'Dispense Concepts',
    description: 'The concepts specific to dispenser applications.',
    icon: dispenseConceptsIcon,
    color: '#09BAEE',
  },
];

export const LandingPage = () => (
  <div>
    <Header />
    <ItemList>
      <ListTitle>Collections</ListTitle>
      {COLLECTIONS.map((collection) => (
        <Item key={collection.title}>
          <ItemLogo backgroundColor={collection.color}>
            <img src={collection.icon} alt="" />
          </ItemLogo>
          <ItemText>
            <ItemTitle>{collection.title}</ItemTitle>
            <ItemDescription>{collection.description}</ItemDescription>
          </ItemText>
          {collection.docsId ? (
            <LinkText href={docsHref(collection.docsId)} target="_top">
              Open <img src={rightCaretIcon} width="16" alt="" />
            </LinkText>
          ) : (
            <LinkText as="span" disabled>
              Coming soon
            </LinkText>
          )}
        </Item>
      ))}
    </ItemList>
  </div>
);
