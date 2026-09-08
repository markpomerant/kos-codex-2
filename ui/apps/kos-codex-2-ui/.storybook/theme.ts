import { create } from 'storybook/theming';

import logo from '../src/assets/kos-logo.png';

export default create({
  base: 'dark',
  brandTitle: 'KOS Codex',
  brandImage: logo,
  brandUrl: './?path=/docs/home--docs',
  brandTarget: '_self',
  barSelectedColor: '#4E4E4E',
  barBg: '#262626',
  fontBase: "'Nunito Sans', sans-serif",
  colorPrimary: 'crimson',
  colorSecondary: '#4E4E4E',
});
