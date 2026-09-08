import('reflect-metadata')
  .then(() => import('./bootstrap'))
  .catch((err) => console.error(err));
