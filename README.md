# SimpleNotes by Paweł Charysz

SimpleNotes to prosta aplikacja pozwalająca na tworzenie i edycję odręcznych notatek przystosowana zarówno do użytku na PC jak i mobilnie. Do używania aplikacji wymagane jest utworzenie konta i zweryfikowanie adresu e-mail, lub zalogowanie się za pomocą konta Google. 

Adres aplikacji:
https://erdahil.github.io/SimpleNotes/ 

## Użyte technologie:
- React - podstawa całej aplikacji, pozwala budować interaktywne UI z komponentami.
- Vite - szablon aplikacji przyśpieszający tworzenie projektu.
- react-router-dom - biblioteka do obsługi routingu, czyli nawigacji między różnymi widokami aplikacji.
- @supabase/supabase-js – oficjalny klient Supabase, który pozwala łączyć się z backendem, obsługiwać logowanie (w tym Google OAuth), oraz zapisywać i pobierać dane oraz pliki. Wybrany z powodu wygodnego darmowego planu.
- uuid – prosta biblioteka do generowania unikalnych identyfikatorów.
- react-sketch-canvas – komponent React obsługujący tworzenie odręcznych notatek na canvasie
- TypeScript - typowany język oparty na JavaScript

## Instrukcja uruchomienia projektu lokalnie:
w folderze projektu należy uruchomić komendy:
npm install
npm run dev
