import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as S from "./style";
import bgEllipse from "../../assets/bg-ellipse.png";
import { login, resendVerification } from "../../services/auth.service";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [needsVerification, setNeedsVerification] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setNeedsVerification(false);

    if (!email || !password) {
      setError("Uzupełnij e-mail i hasło.");
      return;
    }

    try {
      setLoading(true);
      const data = await login({ email, password });

      // token do localStorage (tak jak masz w adminie)
      if (data?.token) localStorage.setItem("accessToken", data.token);

      // opcjonalnie: możesz zrobić fetch /me i przekierować po roli,
      // ale na razie prosto:
      navigate("/account"); // ustaw swoją ścieżkę panelu klienta
    } catch (err) {
      const status = err?.response?.status;
      const msg = err?.response?.data?.message || "Nie udało się zalogować.";

      // 403 = "Please verify your email before logging in."
      if (status === 403) {
        setNeedsVerification(true);
        setError("Najpierw potwierdź adres e-mail. Wyślemy link ponownie, jeśli trzeba.");
        return;
      }

      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError("");
    setSuccess("");

    if (!email) {
      setError("Wpisz e-mail, na który mamy wysłać link aktywacyjny.");
      return;
    }

    try {
      setResendLoading(true);
      const data = await resendVerification({ email });
      setSuccess(data?.message || "Link weryfikacyjny został wysłany. Sprawdź skrzynkę e-mail.");
    } catch (err) {
      const msg = err?.response?.data?.message || "Nie udało się wysłać maila. Spróbuj ponownie.";
      setError(msg);
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <S.Wrapper $bg={bgEllipse}>
      <S.Container>
        <S.Card>
          <S.Header>
            <S.Title>Zaloguj się</S.Title>
            <S.Subtitle>Wpisz dane, aby przejść do panelu klienta.</S.Subtitle>
          </S.Header>

          <S.Form onSubmit={handleLogin}>
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
                placeholder="Twoje hasło"
                autoComplete="current-password"
              />
            </S.Field>

            {error && <S.Alert $type="error">{error}</S.Alert>}
            {success && <S.Alert $type="success">{success}</S.Alert>}

            <S.Button type="submit" disabled={loading}>
              {loading ? "Loguję..." : "Zaloguj się"}
            </S.Button>

            {needsVerification && (
              <S.SecondaryRow>
                <S.SecondaryButton
                  type="button"
                  onClick={handleResend}
                  disabled={resendLoading}
                >
                  {resendLoading ? "Wysyłam..." : "Wyślij link aktywacyjny ponownie"}
                </S.SecondaryButton>
              </S.SecondaryRow>
            )}

            <S.Footer>
              <span>Nie masz konta?</span>
              <S.FooterLink as={Link} to="/register">
                Zarejestruj się
              </S.FooterLink>
            </S.Footer>
          </S.Form>
        </S.Card>

        <S.SideInfo>
          <S.Badge>Twoje konto</S.Badge>
          <S.SideTitle>Szybki dostęp</S.SideTitle>
          <S.SideText>
            Zaloguj się, aby zobaczyć swoje zakupy, pobrać pliki i zarządzać kontem.
          </S.SideText>

          <S.SideList>
            <li>Historia zakupów</li>
            <li>Dostęp do plików</li>
            <li>Wsparcie i aktualizacje</li>
          </S.SideList>

          <S.GhostButton type="button" onClick={() => navigate("/register")}>
            Utwórz konto
          </S.GhostButton>
        </S.SideInfo>
      </S.Container>
    </S.Wrapper>
  );
}

export default Login;
