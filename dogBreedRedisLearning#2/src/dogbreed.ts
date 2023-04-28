export function getDogs() {
  return new Promise((resolve, _) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: 'Luna',
          breed: 'Caucasian Shepherd',
        },
        {
          id: 2,
          name: 'Ralph',
          breed: 'Husky',
        },
        {
          id: 3,
          name: 'tiger',
          breed: 'Indian',
        },
        {
          id: 4,
          name: 'tomy',
          breed: 'Indian',
        },
      ]);
    }, 1000);
  });
}
