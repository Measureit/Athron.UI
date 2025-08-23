import React from 'react';

const Blog: React.FC = () => {
    return (
        <div className="container-fluid p-4">
            <div className="row mb-4">
                <div className="col">
                    <h1 className="fw-bold text-primary">
                        <i className="bi bi-journal-text me-3"></i>
                        Blog
                    </h1>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="card border-0 shadow-sm mb-4 w-100">
                        <div className="card-body">
                            <h3 className="fw-bold mb-3">Trening piłki nożnej – przykładowa sesja</h3>
                            <p>
                                <strong>Data:</strong> 23 sierpnia 2025<br/>
                                <strong>Autor:</strong> Trener Athron
                            </p>
                            <p>
                                Dzisiaj przedstawiamy przykładową sesję treningową dla młodych piłkarzy. Celem treningu jest poprawa techniki podań, kontroli piłki oraz współpracy zespołowej.
                            </p>
                            <h5 className="mt-4">Plan treningu:</h5>
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Blog;
