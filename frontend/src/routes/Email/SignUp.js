import React, { useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import * as S from "./style";
import bgEllipse from "../../assets/bg-ellipse.png";
import { registerClient } from "../../services/auth.service";

function SignUp() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const passwordHint = useMemo(() => {
    if (!password) return "";
    if (password.length < 8) return "Hasło musi mieć minimum 8 znaków.";
    return "";
  }, [password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email || !password || !confirm) {
      setError("Uzupełnij wszystkie pola.");
      return;
    }
    if (password.length < 8) {
      setError("Hasło musi mieć minimum 8 znaków.");
      return;
    }
    if (password !== confirm) {
      setError("Hasła nie są takie same.");
      return;
    }

    try {
      setLoading(true);
      await registerClient({ email, password });
      setSuccess("Konto utworzone. Sprawdź skrzynkę e-mail i potwierdź adres, aby się zalogować.");
      // opcjonalnie: po chwili przenieś na login
      // setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        "Nie udało się utworzyć konta. Spróbuj ponownie.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <S.Wrapper $bg={bgEllipse}>
      <S.Container>
        <S.Card>
          <S.Header>
            <S.Title>Utwórz konto</S.Title>
            <S.Subtitle>
              Załóż konto, potwierdź e-mail i uzyskaj dostęp do panelu klienta.
            </S.Subtitle>
          </S.Header>

          <S.Form onSubmit={handleSubmit}>
            <S.Field>
              <S.Label>E-mail</S.Label>
              <S.Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="np. jan@firma.pl"
                autoComplete="email"
              />
            </S.Field>

            <S.Field>
              <S.Label>Hasło</S.Label>
              <S.Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="minimum 8 znaków"
                autoComplete="new-password"
              />
              {!!passwordHint && <S.Helper>{passwordHint}</S.Helper>}
            </S.Field>

            <S.Field>
              <S.Label>Powtórz hasło</S.Label>
              <S.Input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="powtórz hasło"
                autoComplete="new-password"
              />
            </S.Field>

            {error && <S.Alert $type="error">{error}</S.Alert>}
            {success && <S.Alert $type="success">{success}</S.Alert>}

            <S.Button type="submit" disabled={loading}>
              {loading ? "Tworzę konto..." : "Zarejestruj się"}
            </S.Button>

            <S.Footer>
              <span>Masz już konto?</span>
              <S.FooterLink as={Link} to="/login">
                Zaloguj się
              </S.FooterLink>
            </S.Footer>
          </S.Form>
        </S.Card>

        <S.SideInfo>
          <S.Badge>Bezpieczne logowanie</S.Badge>
          <S.SideTitle>Weryfikacja e-mail</S.SideTitle>
          <S.SideText>
            Po rejestracji wyślemy link aktywacyjny. Dopiero po potwierdzeniu adresu e-mail
            zalogujesz się do panelu.
          </S.SideText>

          <S.SideList>
            <li>Nowoczesny panel klienta</li>
            <li>Dostęp do zakupów i plików</li>
            <li>Szybkie wsparcie</li>
          </S.SideList>

          <S.GhostButton type="button" onClick={() => navigate("/login")}>
            Mam konto — loguję się
          </S.GhostButton>
        </S.SideInfo>
      </S.Container>
    </S.Wrapper>
  );
}

export default SignUp;
