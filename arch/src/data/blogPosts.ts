export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  image?: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: 'Trening piłki nożnej – przykładowa sesja',
    excerpt: 'Dzisiaj przedstawiamy przykładową sesję treningową dla młodych piłkarzy. Celem treningu jest poprawa techniki podań, kontroli piłki oraz współpracy zespołowej.',
    author: 'Trener Athron',
    date: '23 sierpnia 2025',
    category: 'Trening',
    content: `
      <h5>Plan treningu:</h5>
      <ol>
        <li><strong>Rozgrzewka (15 min):</strong> Bieganie, dynamiczne rozciąganie, ćwiczenia z piłką.</li>
        <li><strong>Ćwiczenia techniczne (25 min):</strong> Prowadzenie piłki, podania, przyjęcia, zwroty.</li>
        <li><strong>Mała gra (20 min):</strong> Gra 5 na 5 na małym boisku, nacisk na szybkie podania i ruch bez piłki.</li>
        <li><strong>Ćwiczenia zespołowe (20 min):</strong> Współpraca w grupach, komunikacja, ustawienie na boisku.</li>
        <li><strong>Chłodzenie (10 min):</strong> Rozciąganie statyczne, omówienie treningu.</li>
      </ol>
      
      <h5 className="mt-4">Wskazówki:</h5>
      <ul>
        <li>Skup się na dokładności podań i kontroli piłki.</li>
        <li>Motywuj zawodników do komunikacji i współpracy.</li>
        <li>Obserwuj postępy i dostosuj ćwiczenia do poziomu grupy.</li>
      </ul>
      
      <p className="mt-4">
        Powodzenia na boisku! Jeśli masz pytania lub chcesz podzielić się własnym planem treningowym, napisz w komentarzu.
      </p>
    `,
  },
  {
    id: 2,
    title: 'Znaczenie kondycji fizycznej w piłce nożnej',
    excerpt: 'Kondycja fizyczna jest kluczowym elementem sukcesu każdego piłkarza. W tym artykule omówimy, jak systematyczne treningi kondycyjne wpływają na wydajność.',
    author: 'Trener Athron',
    date: '15 sierpnia 2025',
    category: 'Kondycja',
    content: `
      <p>Kondycja fizyczna jest kluczowym elementem sukcesu każdego piłkarza. W tym artykule omówimy, jak systematyczne treningi kondycyjne wpływają na wydajność podczas meczu.</p>
      
      <h5>Główne elementy kondycji piłkarza:</h5>
      <ul>
        <li><strong>Wytrzymałość aerobowa:</strong> Zdolność do utrzymania wysiłku przez cały mecz.</li>
        <li><strong>Siła mięśniowa:</strong> Niezbędna do skutecznych podań, strzałów i obrony.</li>
        <li><strong>Szybkość:</strong> Zdolność do szybkich akcji i wybiegów.</li>
        <li><strong>Zwinność:</strong> Umiejętność szybkiego zmieniania kierunku.</li>
      </ul>
      
      <p className="mt-3">Regularny trening kondycyjny, połączony z prawidłową dieta i odpoczynkiem, to recepta na sukces.</p>
    `,
  },
  {
    id: 3,
    title: 'Jak trenować taktykę zespołową',
    excerpt: 'Taktyka zespołowa jest równie ważna co umiejętności indywidualne. Dowiedz się, jak efektywnie uczyć graczy poprawnego ustawienia i komunikacji.',
    author: 'Trener Athron',
    date: '10 sierpnia 2025',
    category: 'Taktyka',
    content: `
      <p>Taktyka zespołowa jest równie ważna co umiejętności indywidualne. W tym artykule dowiesz się, jak efektywnie trenować poprawne ustawienie i komunikację na boisku.</p>
      
      <h5>Elementy taktyki zespołowej:</h5>
      <ol>
        <li><strong>Formacja drużyny:</strong> Wybór odpowiedniej formacji do stylu gry.</li>
        <li><strong>Pozycjonowanie:</strong> Zrozumienie roli każdego gracza.</li>
        <li><strong>Komunikacja:</strong> Stała wymiana informacji między graczami.</li>
        <li><strong>Przechodzenie piłki:</strong> Szybka i dokładna wymiana zagrań.</li>
      </ol>
      
      <p className="mt-3">Dobrze wdrażająca drużyna to gwarancja lepszych wyników.</p>
    `,
  },
];
