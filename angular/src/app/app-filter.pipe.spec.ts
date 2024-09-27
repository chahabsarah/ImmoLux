import { FilterPipe } from './app-filter.pipe'; // Assurez-vous d'importer le bon nom de pipe

describe('FilterPipe', () => { // Utilisez le même nom de pipe que celui défini dans la classe
  it('create an instance', () => {
    const pipe = new FilterPipe(); // Utilisez le même nom de pipe que celui défini dans la classe
    expect(pipe).toBeTruthy();
  });
});
